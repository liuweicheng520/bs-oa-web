const admin = [
  {
    path: '/admin/handleAffairs',
    component: () => import( '@/views/handleAffairs/TheHandleAffairs.vue')
  },
  {
    path: '/admin/article',
    component: () => import( '@/views/article/TheAdminArticle.vue')
  },
  // {
    // path: '/admin/course',
    // component: () => import( '@/views/course/TheAdminCourse.vue')
  // },
  {
    path: '/admin/user',
    component: () => import( '@/views/user/TheAdminUser.vue')
  },
  // {
    // path: '/admin/question',
    // component: () => import( '@/views/question-group/TheAdminQuestionGroup.vue')
  // },
  {
    path: '/admin/question/:id',
    component: () => import( '@/views/question/TheAdminQuestion.vue')
  },
];

export {admin};
