<template>
  <div class="grid grid-cols-1 gap-5">
    <div>
      <label class="form-label">Nome da Empresa</label>
      <input
        v-model="localForm.nome"
        type="text"
        placeholder="Digite o nome da empresa"
        required
        class="form-input border border-black rounded-md w-full px-3 py-1.5"
      />
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div>
        <label class="form-label">CNPJ</label>
        <input
          v-model="localForm.cnpj"
          type="text"
          placeholder="00.000.000/0000-00"
          required
          class="form-input border border-black rounded-md w-full px-3 py-1.5"
        />
      </div>

      <div>
        <label class="form-label">CPF</label>
        <input
          v-model="localForm.cpf"
          type="text"
          placeholder="000.000.000-00"
          required
          class="form-input border border-black rounded-md w-full px-3 py-1.5"
        />
      </div>
    </div>

    <div>
      <label class="form-label">Email de Contato</label>
      <input
        v-model="localForm.email"
        type="email"
        placeholder="email@exemplo.com"
        required
        class="form-input border border-black rounded-md w-full px-3 py-1.5"
      />
    </div>

    <div>
      <label class="form-label">Telefone</label>
      <input
        v-model="localForm.telefone"
        type="text"
        placeholder="(00) 00000-0000"
        required
        class="form-input border border-black rounded-md w-full px-3 py-1.5"
      />
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div>
        <label class="form-label">CEP</label>
        <input
          v-model="localForm.cep"
          type="text"
          placeholder="00000-000"
          required
          class="form-input border border-black rounded-md w-full px-3 py-1.5"
        />
      </div>

      <div>
        <label class="form-label">UF</label>
        <input
          v-model="localForm.uf"
          type="text"
          maxlength="2"
          placeholder="SP"
          required
          class="form-input border border-black rounded-md w-full px-3 py-1.5 uppercase"
        />
      </div>

      <div>
        <label class="form-label">Bairro</label>
        <input
          v-model="localForm.bairro"
          type="text"
          placeholder="Digite o bairro"
          required
          class="form-input border border-black rounded-md w-full px-3 py-1.5"
        />
      </div>
    </div>

    <div>
      <label class="form-label">Logradouro</label>
      <input
        v-model="localForm.logradouro"
        type="text"
        placeholder="Rua, Avenida, etc."
        required
        class="form-input border border-black rounded-md w-full px-3 py-1.5"
      />
    </div>

    <div>
      <label class="form-label">Cidade</label>
      <input
        v-model="localForm.cidade"
        type="text"
        placeholder="Digite a cidade"
        required
        class="form-input border border-black rounded-md w-full px-3 py-1.5"
      />
    </div>

    <div>
      <label class="form-label">Número</label>
      <input
        v-model="localForm.numero"
        type="text"
        placeholder="00"
        class="form-input border border-black rounded-md w-full px-3 py-1.5"
      />
    </div>

    <div>
      <label class="form-label">Link do Cardápio</label>
      <input
        v-model="localForm.linkCardapio"
        type="url"
        placeholder="https://"
        class="form-input border border-black rounded-md w-full px-3 py-1.5"
      />
    </div>


  </div>
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue'

const props = defineProps({
  modelValue: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['update:modelValue'])

const localForm = reactive({
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
})

watch(
  () => props.modelValue,
  (val) => Object.assign(localForm, val || {}),
  { immediate: true }
)

watch(
  localForm,
  () => {
    emit('update:modelValue', {
      ...localForm,
      linkCardapio:
        localForm.linkCardapio?.trim() === ''
          ? undefined
          : localForm.linkCardapio,
    })
  },
  { deep: true }
)
</script>
