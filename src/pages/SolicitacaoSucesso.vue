<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 px-4">
    <div class="bg-white p-8 rounded-2xl shadow-lg text-center max-w-md">

      <div class="flex justify-center mb-4">
        <div class="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
          <svg
            class="w-10 h-10 text-green-600"
            fill="none"
            stroke="currentColor"
            stroke-width="3"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
      </div>

      <h1 class="text-2xl font-bold text-green-600 mb-4">
        Solicitação enviada!
      </h1>

      <p class="text-gray-600 mb-6">
        Recebemos sua solicitação com sucesso.<br />
        Nossa equipe entrará em contato em breve.
      </p>

      <p class="text-sm text-gray-400 mb-8">
        Você será redirecionado automaticamente em
        <span class="font-semibold text-gray-600">
          {{ countdown }}s
        </span>
      </p>

      <a
        href="https://overx.com.br/"
        class="inline-block bg-orange-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-orange-700 transition"
      >
        Ir agora para o site
      </a>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const countdown = ref(10)
let timer: number

onMounted(() => {
  timer = window.setInterval(() => {
    countdown.value--

    if (countdown.value === 0) {
      clearInterval(timer)
      window.location.href = 'https://overx.com.br/'
    }
  }, 1000)
})

onUnmounted(() => {
  clearInterval(timer)
})
</script>
