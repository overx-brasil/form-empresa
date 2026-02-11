import FormEmpresa from '@/pages/FormEmpresa.vue'
import SolicitacaoSucesso from '@/pages/SolicitacaoSucesso.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {path: '/', name: 'FormEmpresa', component: FormEmpresa},
  {path: '/solicitacao-sucesso', name: 'SolicitacaoSucesso', component: SolicitacaoSucesso}
]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
