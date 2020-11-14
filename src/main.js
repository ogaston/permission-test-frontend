import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import FormPermission from "./pages/FormPermission";
import ListPermission from "./pages/ListPermission";

Vue.config.productionTip = false;

Vue.use(VueRouter);

const routes = [
  { path: "/new", component: FormPermission },
  { path: "/permission/:id", component: FormPermission },
  { path: "/", component: ListPermission },
];

const router = new VueRouter({
  routes,
});

new Vue({
  render: (h) => h(App),
  router,
}).$mount("#app");
