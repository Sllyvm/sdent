import Vue from "vue";
import VueRouter from "vue-router";
import Home from '../layout/index.vue'
import LoginView from '../views/login/Login.vue'

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/",
    name: "layout",
    redirect:'/index',
    component: Home,
    children:[
      {
        path:"/index",
        name:"index",
       
        component:()=>import("../views/index")
      },
      {
        path:"/goods",
        name:"goods",
        meta:{
           title:"商品管理" 
        },
        component:()=>import("../views/goods")
      },
      {
        path:"/members",
        name:"members",
        meta:{
            title:"会员管理"
        },
        component:()=>import("../views/members")
      },
      {
        path:"/supplier",
        name:"supplier",
        meta:{
           title:"供应商管理" 
        },
        component:()=>import("../views/supplier")
      },
      
        {
          path:"/employees",
          name:"employees",
          meta:{
            title:"员工管理"
          },
          component:()=>import("../views/employees")
        }
      
    ]
  },
  {
    path: "/ce",
    name: "ce",
    component: ()=>import ('../views/supplier_copy/index.vue'),
  },
 
];

const router = new VueRouter({
  routes,
});

export default router;
