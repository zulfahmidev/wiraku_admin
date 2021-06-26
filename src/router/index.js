import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/Dashboard.vue';

// Course
import Courses from '../views/Courses.vue';
import CreateCourse from '../views/course/CreateCourse.vue'

import DetailCourse from '../views/DetailCourse.vue';
import Mentors from '../views/Mentors.vue';
import Transactions from '../views/Transactions.vue';
import Settings from '../views/Settings.vue';

const router = createRouter({
  history: createWebHistory('/'),
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard,
    },
    // Course
    {
      path: '/course',
      name: 'Courses',
      component: Courses,
    },
    {
      path: '/course/create',
      name: 'Create Course',
      component: CreateCourse,
    },
    {
      path: '/course/:id/edit',
      props: true,
      name: 'EditCourse',
      component: DetailCourse,
    },
    {
      path: '/mentor',
      name: 'Mentors',
      component: Mentors,
    },
    {
      path: '/transaction',
      name: 'Transactions',
      component: Transactions,
    },
    {
      path: '/settings',
      name: 'Settings',
      component: Settings,
    },
  ]
})

export default router