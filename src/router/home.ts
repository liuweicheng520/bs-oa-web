const home = [
    {
        path: '/home/school',
        component: () => import( '@/views/school/TheSchool.vue')
    },
    {
        path: '/home/school/:id',
        component: () => import( '@/views/school/TheSchoolDetail.vue')
    },
    {
        path: '/home/statistics',
        component: () => import( '@/views/statistics/TheStatistics.vue')
    },
    {
        path: '/home/article',
        component: () => import( '@/views/article/TheArticle.vue')
    },
    {
        path: '/home/article/:id',
        component: () => import( '@/views/article/TheArticleDetail.vue')
    },
    // {
    //   // path: '/home/question',
    //   // component: () => import( '@/views/question-group/TheQuestionGroup.vue')
    // },
    {
        path: '/home/question/:id',
        component: () => import( '@/views/question/TheQuestion.vue')
    },
    // {
    //   // path: '/home/course',
    //   // component: () => import( '@/views/course/TheCourse.vue')
    // },
    // {
    //
    //     path: '/home/bbs',
    //     component: () => import( '@/views/bbs/TheBbs.vue')
    // },
    // {
    // path: '/home/bbs/:id',
    // component: () => import( '@/views/bbs/TheBbsDiscuss.vue')
    // },
    {
        path: '/home/collect',
        component: () => import( '@/views/user-collect/TheCollect.vue')
    },
];

export {home};
