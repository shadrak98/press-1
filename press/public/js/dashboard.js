import Vue from 'vue/dist/vue.js';
import VueRouter from 'vue-router/dist/vue-router.js';

import DashboardRoot from "./DashboardRoot.vue";
import SiteDetail from "./SiteDetail.vue";
import SiteList from "./SiteList.vue";

Vue.use(VueRouter);
const routes = [
	{
		name: "site-list",
		path: '/',
		component: SiteList,
	},
	{
		name: "site-detail",
		path: '/site',
		component: SiteDetail,
	},
];

const router = new VueRouter({
	mode: 'hash',
	base: "dashboard",
	routes: routes,
});

new Vue({
	el: ".dashboard-container",
	router: router,
	template: "<dashboard-root/>",
	components: {
		DashboardRoot
	}
});
