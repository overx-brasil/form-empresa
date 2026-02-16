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
          :value="localForm.cnpj"
          @input="onCnpj"
          placeholder="00.000.000/0000-00"
          maxlength="18"
          required
          class="form-input border border-black rounded-md w-full px-3 py-1.5"
        />
      </div>

      <div>
        <label class="form-label">CPF</label>
        <input
          :value="localForm.cpf"
          @input="onCpf"
          placeholder="000.000.000-00"
          maxlength="14"
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
        :value="localForm.telefone"
        @input="onTelefone"
        placeholder="(00) 00000-0000"
        maxlength="15"
        required
        class="form-input border border-black rounded-md w-full px-3 py-1.5"
      />
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div>
        <label class="form-label">CEP</label>
        <input
          :value="localForm.cep"
          @input="onCep"
          placeholder="00000-000"
          maxlength="9"
          required
          class="form-input border border-black rounded-md w-full px-3 py-1.5"
        />
      </div>

      <div>
        <label class="form-label">UF</label>
        <input
          :value="localForm.uf"
          @input="onUf"
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
        placeholder="Rua, Avenida, etc."
        required
        class="form-input border border-black rounded-md w-full px-3 py-1.5"
      />
    </div>

    <div>
      <label class="form-label">Cidade</label>
      <input
        v-model="localForm.cidade"
        placeholder="Digite a cidade"
        required
        class="form-input border border-black rounded-md w-full px-3 py-1.5"
      />
    </div>

    <div>
      <label class="form-label">Número</label>
      <input
        v-model="localForm.numero"
        placeholder="00"
        required
        class="form-input border border-black rounded-md w-full px-3 py-1.5"
      />
    </div>

    <div>
      <label class="form-label">Link do Cardápio</label>
      <input
        v-model="localForm.linkCardapio"
        type="url"
        placeholder="https://"
        required
        class="form-input border border-black rounded-md w-full px-3 py-1.5"
      />
    </div>

    <p class="text-xs text-gray-500 text-center">
      ⚠️ Preencha todos os campos corretamente para prosseguir.
    </p>

    <p
      v-if="touched && !isValid"
      class="text-xs text-red-600 text-center">
      Existem campos inválidos ou incompletos.
    </p>
  </div>
</template>

<script setup lang="ts">
import { reactive, watch, computed, ref } from 'vue'

const props = defineProps({
  modelValue: { type: Object, required: true }
})

const emit = defineEmits(['update:modelValue', 'validation'])

const touched = ref(false)

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
    touched.value = true

    emit('update:modelValue', { ...localForm })
  },
  { deep: true }
)

const onlyNumbers = (v: string) => v.replace(/\D/g, '')

const maskCpf = (v: string) =>
  v
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2')

const maskCnpj = (v: string) =>
  v
    .replace(/^(\d{2})(\d)/, '$1.$2')
    .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
    .replace(/\.(\d{3})(\d)/, '.$1/$2')
    .replace(/(\d{4})(\d)/, '$1-$2')

const maskTelefone = (v: string) =>
  v
    .replace(/^(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{5})(\d)/, '$1-$2')

const maskCep = (v: string) =>
  v.replace(/(\d{5})(\d)/, '$1-$2')


function onCpf(e: Event) {
  localForm.cpf = maskCpf(onlyNumbers((e.target as HTMLInputElement).value))
}

function onCnpj(e: Event) {
  localForm.cnpj = maskCnpj(onlyNumbers((e.target as HTMLInputElement).value))
}

function onTelefone(e: Event) {
  localForm.telefone = maskTelefone(
    onlyNumbers((e.target as HTMLInputElement).value)
  )
}

function onCep(e: Event) {
  localForm.cep = maskCep(onlyNumbers((e.target as HTMLInputElement).value))
}

function onUf(e: Event) {
  localForm.uf = (e.target as HTMLInputElement).value
    .replace(/[^a-zA-Z]/g, '')
    .toUpperCase()
}

const isValid = computed(() => {
  return (
    localForm.nome.trim() !== '' &&
    localForm.cnpj.length === 18 &&
    localForm.cpf.length === 14 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(localForm.email) &&
    /^\(\d{2}\) \d{4,5}-\d{4}$/.test(localForm.telefone) &&
    localForm.cep.length === 9 &&
    localForm.uf.length === 2 &&
    localForm.bairro.trim() !== '' &&
    localForm.logradouro.trim() !== '' &&
    localForm.cidade.trim() !== '' &&
    localForm.numero.trim() !== '' &&
    localForm.linkCardapio.trim() !== ''
  )
})


watch(
  isValid,
  (val) => emit('validation', val),
  { immediate: true }
)
</script>
