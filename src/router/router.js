import {createRouter, createWebHistory} from "vue-router";

import PostPage from '@/pages/PostPage.vue'
import PostPageVuex from '@/pages/PostPageVuex.vue'
import PostPageComposition from '@/pages/PostPageComposition.vue'
import PostDetailPage from '@/pages/PostDetailPage.vue'

const routes = [
    /*{
        path: '/',
        component: PostPage
    },
    {
        path: '/',
        component: PostPageVuex
    },*/
    {
        path: '/',
        component: PostPageComposition
    },
    {
        path: '/posts/:id',
        component: PostDetailPage
    },
]

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
})

export default router;