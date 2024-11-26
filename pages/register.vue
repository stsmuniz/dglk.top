<script setup lang="ts">
import { object, string, type InferType } from "yup";
import type { FormSubmitEvent } from "#ui/types";

const schema = object({
  name: string()
      .min(4, 'Deve ter no mínimo 4 letras')
      .required('Obrigatório'),
  email: string().email('E-mail inválido').required('Obrigatório'),
  password: string()
      .min(8, 'Deve ter no mínimo 8 caracteres')
      .required('Obrigatório')
})

type Schema = InferType<typeof schema>

const state = reactive({
  name: undefined,
  email: undefined,
  password: undefined,
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
  try {
    const { data, error } = await $fetch('/api/users/create', {
      method: 'POST',
      body: state
    })

    openAlert('Conta criada com sucesso, agora volte para a página de login', 'success')
  } catch (e) {
    openAlert('Erro ao criar conta', 'warning')
  }
}
const isAlertOpen = ref<Boolean>(false)


const message = ref('')
const type = ref('success')
function closeAlert() {
  isAlertOpen.value = false
}

function openAlert(alertMessage: String, alertType: String) {
  isAlertOpen.value = true
  message.value = alertMessage
  type.value = alertType
}
</script>

<template>
  <UContainer class="mt-4">
    <Alert
        :alert-message="message"
        :alert-type="type"
        :class="[isAlertOpen ? ' translate-y-0' : ' -translate-y-36']"
        @close="closeAlert"
    />
  </UContainer>
  <UContainer class="h-screen flex justify-center items-center">
    <UCard class="m-8 w-full md:w-1/2 lg:w-1/4">
      <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
        <UFormGroup label="Nome" name="name">
          <UInput v-model="state.name" type="name" />
        </UFormGroup>
        <UFormGroup label="Email" name="email">
          <UInput v-model="state.email" type="email" />
        </UFormGroup>
        <UFormGroup label="Senha" name="password">
          <UInput v-model="state.password" type="password" />
        </UFormGroup>
        <UFormGroup class="w-full content-around">
          <UButton type="submit" block>Criar Conta</UButton>
          <UDivider label="OU" class="my-2"/>
          <UButton to="login" variant="link" block>Login</UButton>
        </UFormGroup>
      </UForm>
    </UCard>
  </UContainer>
</template>

<style scoped>

</style>