import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/Dashboard.vue';


import Courses from '../views/Courses.vue';
import CreateCourse from '../views/course/CreateCourse.vue'

import DetailCourse from '../views/DetailCourse.vue';
import Mentors from '../views/Mentors.vue';
import trend from '../views/trend.vue';
import lapkeuangan from '../views/lapkeuangan.vue';
import Transactions from '../views/Transactions.vue';
import Admin from '../views/Admin.vue';
import Settings from '../views/Settings.vue';
import SettingCategory from '../views/settings/SettingCategory.vue';
import SettingAccount from '../views/settings/SettingAccount.vue';

const router = createRouter({
  history: createWebHistory('/'),
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard,
      // meta: {
      //   forRole: 'admin',
      // }
    },
    // Course
    {
      path: '/course',
      name: 'Courses',
      component: Courses,
      meta: {
        forRole: 'admin',
      }
    },
    {
      path: '/course/create',
      name: 'Create Course',
      component: CreateCourse,
      meta: {
        forRole: 'admin',
      }
    },
    {
      path: '/course/:id/edit',
      props: true,
      name: 'EditCourse',
      component: DetailCourse,
      meta: {
        forRole: 'admin',
      }
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Admin,
      meta: {
        forRole: 'superadmin',
      }
    },
    {
      path: '/mentor',
      name: 'Mentors',
      component: Mentors,
      meta: {
        forRole: 'admin',
      }
    },
    {
      path: '/trend',
      name: 'trend',
      component: trend,
      meta: {
        forRole: 'admin',
      }
    },
    {
      path: '/lapkeuangan',
      name: 'lapkeuangan',
      component: lapkeuangan,
      meta: {
        forRole: 'admin',
      }
    },
    {
      path: '/transaction',
      name: 'Transactions',
      component: Transactions,
      meta: {
        forRole: 'admin',
      }
    },
    {
      path: '/setting',
      name: 'Settings',
      component: Settings,
      meta: {
        forRole: 'admin',
      }
    },
    {
      path: '/setting/category',
      name: 'Setting Category',
      component: SettingCategory,
      meta: {
        forRole: 'admin',
      }
    },
    {
      path: '/setting/account',
      name: 'Setting Account',
      component: SettingAccount,
      meta: {
        forRole: 'admin',
      }
    },
  ]
})


import store from '../store';

router.beforeEach((...args) => {
  let user = store._state.data.user;
  if (args[0].name != 'Dashboard' && store.isLogged) {
    if (args[0].meta.forRole.toLowerCase() == user.roles.toLowerCase()) {
      return args[2]();
    }else {
      router.push({name:'Dashboard', params: []});
    }
  }
})

export default router;