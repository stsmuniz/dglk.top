<script setup lang="ts">
import {object, string, type InferType} from "yup";
import type {FormSubmitEvent} from "#ui/types";
import {useUserStore} from "~/stores/user";

const router = useRouter();
const store = useUserStore();

const schema = object({
  email: string().email('E-mail inválido').required('Obrigatório'),
  password: string()
      .min(8, 'Deve ter no mínimo 8 caracteres')
      .required('Obrigatório')
})

type Schema = InferType<typeof schema>

const state = reactive({
  email: undefined,
  password: undefined,
})

const onSubmit = async (event: FormSubmitEvent<Schema>) => {
  try {
    await schema.validate(state, {abortEarly: false});

    const {token, user} = await $fetch('/api/auth/login', {
      method: 'POST',
      body: state
    })

    store.storeUser({token, user});
    await router.push('/dashboard');
  } catch (e) {
    console.error(e)
  }
}
</script>

<template>
  <UContainer class="h-screen flex justify-center items-center">
    <UCard class="m-8 w-full md:w-1/2 lg:w-1/4">
      <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
        <UFormGroup label="Email" name="email">
          <UInput v-model="state.email" type="email"/>
        </UFormGroup>
        <UFormGroup label="Senha" name="password">
          <UInput v-model="state.password" type="password"/>
        </UFormGroup>
        <UFormGroup class="w-full content-around">
          <UButton type="submit" block>Entrar</UButton>
          <UDivider label="OU" class="my-2"/>
          <UButton to="register" variant="link" block>Criar conta</UButton>
        </UFormGroup>
      </UForm>
    </UCard>
  </UContainer>
</template>

<style scoped>

</style>