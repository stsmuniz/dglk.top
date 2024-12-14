<script setup lang="ts">
import type {FormSubmitEvent} from "#ui/types";
import * as Yup from "yup";
import type {InferType} from "yup";
import {useUsers} from "~/composables/useUsers";

const {editUser, getUserByPasswordToken} = useUsers()
const route = useRoute()


const schema = Yup.object().shape({
  password: Yup.string()
      .min(8, 'Deve ter no mínimo 8 caracteres')
      .required('Obrigatório'),
  repeat_password: Yup.string()
      .oneOf([Yup.ref('password'), null], 'As senhas não conferem')
      .min(8, 'Deve ter no mínimo 8 caracteres')
      .required('Obrigatório')
})

type Schema = InferType<typeof schema>

const state = reactive({
  password: undefined,
  repeat_password: undefined,
})

const onSubmit = async (event: FormSubmitEvent<Schema>) => {
  try {
    const res = editUser(user._id, state);
    openAlert('Senha atualizada com sucesso', 'success')
  } catch (e) {
    openAlert('Erro ao atualizar senha', 'warning')
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
    <UCard class="my-4">
      <template #header>
        <h2>Editar Senha</h2>
      </template>
      <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
        <UFormGroup label="Senha" name="password">
          <UInput v-model="state.password" type="password"/>
        </UFormGroup>
        <UFormGroup label="Repita a Senha" name="repeat_password">
          <UInput v-model="state.repeat_password" type="password"/>
        </UFormGroup>
      </UForm>
      <template #footer>
        <UFormGroup class="w-full content-around">
          <UButton type="submit" block>Enviar</UButton>
        </UFormGroup>
      </template>
    </UCard>
  </UContainer>
</template>

<style scoped>

</style>