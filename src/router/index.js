import { createRouter, createWebHistory } from 'vue-router'
import Index from "../views/IndexView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/:id",
      name: "Index",
      component: Index
    },
    {
      path: "/botones/:user",
      name: "Botones",
      component: () => import("../views/BotonesView.vue")
    },
    {
      path: "/question/:user/:id",
      name: "Question",
      component: () => import("../views/QuestionView.vue")
    }
  ]
})

export default router
