<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 px-4">
    <div class="bg-white p-8 rounded-2xl shadow-lg text-center max-w-md">
      <h1 class="text-2xl font-bold text-green-600 mb-4">
        Solicitação enviada!
      </h1>

      <p class="text-gray-600 mb-6">
        Recebemos sua solicitação com sucesso.
        Nossa equipe entrará em contato em breve.
      </p>

      <router-link
        to="/"
        class="inline-block bg-orange-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-orange-700 transition"
      >
        Voltar para o início
      </router-link>
    </div>
  </div>
</template>
