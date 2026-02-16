<template>
  <div
    class="relative min-h-screen flex items-center justify-center px-4 bg-cover bg-center bg-no-repeat"
    :style="{ backgroundImage: `url(${bgImage})` }"
  >
    <div
      class="absolute left-0 top-0 hidden md:flex h-full w-1/2 flex-col p-10 bg-cover bg-center items-start"
    >
      <div class="absolute inset-0 bg-black bg-opacity-50"></div>

      <div class="relative z-10 mt-12">
        <img
          src="@/assets/logo.svg"
          alt="Company Logo"
          class="h-24 w-auto"
        />
      </div>
    </div>

    <div
      class="relative z-10 w-full max-w-3xl bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
    >
      <div class="flex flex-col items-center gap-3 py-6 bg-gray-900 px-4 sm:px-6">
        <h1 class="text-white text-lg sm:text-xl md:text-2xl font-semibold text-center">
          Solicitação de Cadastro de Empresa
        </h1>

        <p class="text-gray-300 text-xs sm:text-sm text-center max-w-xs sm:max-w-md">
          Preencha os dados abaixo para solicitar o cadastro da sua empresa em nossa plataforma.
        </p>
      </div>

      <form @submit.prevent="submit" class="p-4 sm:p-6 space-y-4">
        <BaseEmpresaForm
          v-model="form"
          @validation="formIsValid = $event"
        />

        <button
          type="submit"
          :disabled="loading || !formIsValid"
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
  linkCardapio: ''
}
const formIsValid = ref(false)
const form = ref({ ...initialForm })

const loading = ref(false)

async function submit() {
  if (!formIsValid.value) {
    alert('Preencha todos os campos corretamente.')
    return
  }

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
