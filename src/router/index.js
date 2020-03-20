import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 点相同路由不报错
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
}

const Home = () =>
  import ('../views/home/Home')
const GradeSearch = () =>
  import ('../views/gradeSearch/GradeSearch')
const SignUp = () =>
  import ('../views/signUp/SignUp')
const PaySearch = () =>
  import ('../views/paySearch/PaySearch')
const Register = () =>
  import ('../views/register/Register')
const Space = () =>
  import ('../views/space/Space')
const routes = [{
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
  },
  {
    path: '/gradeSearch',
    name: 'gradeSearch',
    component: GradeSearch,
  },
  {
    path: '/signUp',
    name: 'signUp',
    component: SignUp,
  },
  {
    path: '/paySearch',
    name: 'paySearch',
    component: PaySearch,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
  },
  {
    path: '/space',
    name: 'space',
    component: Space,
    meta: {
      requireAuth: true
    }
  },
  // {
  //   path: '/detail/:iid',
  //   component: Detail,
  // },
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router