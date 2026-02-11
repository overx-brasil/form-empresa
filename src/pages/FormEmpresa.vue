<template>
  <div
    class="min-h-screen flex items-start justify-center px-4 py-12 bg-cover bg-center bg-no-repeat"
    :style="{ backgroundImage: `url(${bgImage})` }"
  >
    <div
      class="w-full max-w-3xl bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
    >
      <div class="flex flex-col items-center gap-3 py-6 bg-gray-900 px-4 sm:px-6">
        <div
          class="w-20 h-20 sm:w-24 sm:h-24 bg-white rounded-xl flex items-center justify-center shadow-md"
        >
          <img src="@/assets/logo1.png" alt="Logo Overx" class="h-8 w-auto sm:h-10" />
        </div>

        <h1 class="text-white text-lg sm:text-xl md:text-2xl font-semibold text-center">
          Solicitação de Cadastro de Empresa
        </h1>

        <p class="text-gray-300 text-xs sm:text-sm text-center max-w-xs sm:max-w-md">
          Preencha os dados abaixo para solicitar o cadastro da sua empresa em nossa plataforma.
        </p>
      </div>

      <form @submit.prevent="submit" class="p-4 sm:p-6 space-y-4">
        <BaseEmpresaForm v-model="form" />

        <button
          type="submit"
          :disabled="loading"
          class="w-full bg-orange-600 text-white py-3 rounded-xl font-semibold
                 hover:bg-orange-700 transition disabled:bg-orange-400 disabled:cursor-not-allowed"
        >
          {{ loading ? 'Enviando...' : 'Enviar Solicitação' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import BaseEmpresaForm from '@/components/BaseEmpresaForm.vue'
import bgImage from '@/assets/img2.png'
import axios from 'axios'


const API_BASE = 'https://whatsapp.overxbrasil.com.br'
const router = useRouter()
const initialForm = {
  nome: '',
  cnpj: '',
  cpf: '',
  email: '',
  telefone: '',
  cep: '',
  uf: '',
  bairro: '',
  logradouro: '',
  cidade: '',
  numero: '',
  linkCardapio: undefined
}

const form = ref({ ...initialForm })

const loading = ref(false)

async function submit() {
  loading.value = true

  try {
    await axios.post(`${API_BASE}/solicitacoes/empresa`, form.value)

    form.value = { ...initialForm }

    router.push('/solicitacao-sucesso')

  } catch (e) {
    console.error(e)
    alert('Não foi possível enviar sua solicitação. Tente novamente.')
  } finally {
    loading.value = false
  }
}

</script>
