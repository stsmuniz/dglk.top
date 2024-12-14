<script setup lang="ts">
definePageMeta({
  title: 'Recuperar Senha',
})
import { string, type InferType } from "yup";
import type { FormSubmitEvent } from "#ui/types";
import * as Yup from "yup";

const schema = Yup.object().shape({
  email: string().email('E-mail inválido').required('Obrigatório'),
})

type Schema = InferType<typeof schema>

const state = reactive({
  email: undefined,
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
  try {
    const { data, error } = await $fetch('/api/auth/reset-password/recovery', {
      method: 'POST',
      body: state
    })

    openAlert('Um e-mail foi enviado para o endereço fornecido. Acesse-o para obter as próximas instruções', 'success')
  } catch (e) {
    openAlert('Erro ao tentar enviar o e-mail para recuperação de senha. Confira os dados e tente novamente mais tarde', 'warning')
  }
}
const isAlertOpen = ref<Boolean>(false)


const message = ref('')
const type = ref('success')
function closeAlert() {
  isAlertOpen.value = false
}

function openAlert(alertMessage: string, alertType: string) {
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
  <UContainer class="h-screen flex justify-center items-center flex-col">
    <h1 class="text-center font-bold text-6xl my-8">dglk.top</h1>
    <UCard class="m-8 w-full md:w-1/2">
      <template #header>
        <h2>Recuperar Senha</h2>
      </template>
      <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
        <UFormGroup label="Email" name="email">
          <UInput v-model="state.email" type="email" />
        </UFormGroup>
        <UFormGroup class="w-full content-around">
          <UButton type="submit" block>Enviar</UButton>
          <UDivider label="OU" class="my-2"/>
          <UButton to="login" variant="link" block>Login</UButton>
        </UFormGroup>
      </UForm>
    </UCard>
  </UContainer>
</template>

<style scoped>

</style>