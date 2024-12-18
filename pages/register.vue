<script setup lang="ts">
import { string, type InferType } from "yup";
import type { FormSubmitEvent } from "#ui/types";
import * as Yup from "yup";
import {useUsers} from "~/composables/useUsers";

definePageMeta({
  title: 'Criar Conta',
})

const schema = Yup.object().shape({
  name: string()
      .min(4, 'Deve ter no mínimo 4 letras')
      .required('Obrigatório'),
  email: string().email('E-mail inválido').required('Obrigatório'),
  password: string()
      .min(8, 'Deve ter no mínimo 8 caracteres')
      .required('Obrigatório'),
  repeat_password: Yup.string()
      .oneOf([Yup.ref('password'), null], 'As senhas não conferem')
      .min(8, 'Deve ter no mínimo 8 caracteres')
      .required('Obrigatório')
})

type Schema = InferType<typeof schema>

const state = reactive({
  name: undefined,
  email: undefined,
  password: undefined,
  repeat_password: undefined,
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
  try {
    const { data, error } = await useUsers().createUser(state)

    openAlert('Conta criada com sucesso, agora volte para a página de login', 'success')
  } catch (e) {
    console.log(e)
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
  <UContainer class="h-screen flex justify-center items-center flex-col">
    <h1 class="text-center font-bold text-6xl my-8">dglk.top</h1>
    <UCard class="m-8 w-full md:w-1/2">
      <template #header>
        <h2>Criar Conta</h2>
      </template>
      <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
        <UFormGroup label="Nome Completo" name="name">
          <UInput v-model="state.name" type="name" />
        </UFormGroup>
        <UFormGroup label="Email" name="email">
          <UInput v-model="state.email" type="email" />
        </UFormGroup>
        <UFormGroup label="Senha" name="password">
          <UInput v-model="state.password" type="password" />
        </UFormGroup>
        <UFormGroup label="Repita a Senha" name="repeat_password">
          <UInput v-model="state.repeat_password" type="password" />
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