export default async function call(method, args) {
	if (!args) {
		args = {};
	}

	const res = await fetch(`/api/method/${method}`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json; charset=utf-8',
			'X-Frappe-Site-Name': window.location.hostname
		},
		body: JSON.stringify(args)
	});

	if (res.ok) {
		const data = await res.json();
		if (data.docs) {
			return data;
		}
		return data.message;
	} else {
		let response = await res.text();
		let error, exception;
		try {
			error = JSON.parse(response);
		} catch (e) {}
		let errorParts = [
			[method, error.exc_type, error._error_message].filter(Boolean).join(' ')
		];
		if (error.exc) {
			exception = error.exc;
			try {
				exception = JSON.parse(exception)[0];
			} catch (e) {}
			errorParts.push(exception);
		}
		let e = new Error(errorParts.join('\n'));
		e.exc_type = error.exc_type;
		e.exc = exception;
		e.messages = error._server_messages
			? JSON.parse(error._server_messages)
			: [];
		e.messages = e.messages.concat(error.message);
		e.messages = e.messages.map(m => {
			try {
				return JSON.parse(m);
			} catch (error) {
				return m;
			}
		});
		throw e;
	}
}
