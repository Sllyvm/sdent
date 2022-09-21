import Vue from "vue";
import VueRouter from "vue-router";
import Home from '../layout/index.vue'
import LoginView from '../views/login/Login.vue'

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "login",
    component: LoginView,
  },
  {
    path: "/index",
    name: "index",
    component: Home,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
