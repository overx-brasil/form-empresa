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

        <p
          v-if="success"
          class="text-green-600 text-center text-sm font-medium"
        >
          Solicitação enviada com sucesso! Em breve entraremos em contato.
        </p>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BaseEmpresaForm from '@/components/BaseEmpresaForm.vue'
import bgImage from '@/assets/img2.png'
import axios from 'axios'
const API_BASE = 'https://whatsapp.overxbrasil.com.br'

const form = ref({})
const loading = ref(false)
const success = ref(false)

async function submit() {
  loading.value = true
  success.value = false

  try {
    await axios.post(`${API_BASE}/solicitacoes/empresa`, form.value)
    success.value = true
  } catch (e) {
    console.error(e)
    alert('Erro ao enviar solicitação')
  } finally {
    loading.value = false
  }
}
</script>
