<script setup lang="ts">
import {useUserStore} from "~/stores/user";
import * as Yup from "yup";
import {useUsers} from "~/composables/useUsers";

definePageMeta({
  title: 'Usuário',
  layout: 'dashboard',
})

const { user, updateUser } = useUserStore();
const {editUser, deleteUser} = useUsers()

const schema = Yup.object().shape({
  email: Yup.string().email('E-mail inválido').required('Obrigatório'),
  name: Yup.string()
      .min(4, 'Deve ter no mínimo 4 caracteres')
})

type Schema = InferType<typeof schema>

const state = reactive({
  email: user?.email,
  name: user?.name,
})

const passwordState = reactive({
  password: undefined,
  repeat_password: undefined,
})

const passwordSchema = Yup.object().shape({
  password: Yup.string()
      .min(8, 'Deve ter no mínimo 8 caracteres')
      .required('Obrigatório'),
  repeat_password: Yup.string()
      .oneOf([Yup.ref('password'), null], 'As senhas não conferem')
      .min(8, 'Deve ter no mínimo 8 caracteres')
      .required('Obrigatório')
})

const editUserData = async () => {
  try {
    await schema.validate(state, {abortEarly: false});
    const {name, email} = await editUser(user._id, state);
    const updatedData = {name: name, email: email}
    updateUser(updatedData);
    openAlert('Usuário atualizado com sucesso', 'success')
  } catch (e) {
    openAlert('Erro ao atualizar dados do usuário', 'warning')
  }
}
const editUserPassword = async () => {
  try {
    const res = editUser(user._id, passwordState);
    openAlert('Senha atualizada com sucesso', 'success')
  } catch (e) {
    openAlert('Erro ao atualizar senha', 'warning')
  }
}

const isDeleteAccModalOpen = ref(false)

const deleteAccount = async () => {
  try {
    const res = deleteUser(user._id)
    logout()
  } catch (e) {
    openAlert('Erro ao tentar excluir conta', 'warning')
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

const logout = async () => {
  const router = useRouter();
  const { deleteUser } = useUserStore()

  deleteUser()
  await router.push('/login');
}

</script>

<template>
  <Alert
      :alert-message="message"
      :alert-type="type"
      :class="[isAlertOpen ? ' translate-y-0' : ' -translate-y-32']"
      @close="closeAlert"
  />
  <UModal v-model="isDeleteAccModalOpen">
    <UCard class="text-center">
      <h2>Tem certeza que quer excluir sua conta?</h2>
      <p>Esta ação não pode ser revertida</p>
      <template #footer>
        <div class="grid grid-cols-2 gap-4">
          <UButton type="submit" color="red" variant="outline" block @click="deleteAccount">Excluir</UButton>
          <UButton color="primary" @click="isDeleteAccModalOpen = false" block>Cancelar</UButton>
        </div>
      </template>
    </UCard>
  </UModal>
  <h1>Usuário</h1>
  <UContainer class="my-4">
    <UCard>
      <template #header>
        <h2>Editar Dados de usuário</h2>
      </template>
      <UForm :schema="schema" :state="state" class="space-y-4">
        <UFormGroup label="Email" name="email">
          <UInput v-model="state.email" type="email"/>
        </UFormGroup>
        <UFormGroup label="Nome" name="text">
          <UInput v-model="state.name" type="text"/>
        </UFormGroup>
      </UForm>
      <template #footer>
        <UFormGroup class="w-full content-around">
          <UButton type="submit" block @click="editUserData">Enviar</UButton>
        </UFormGroup>
      </template>
    </UCard>
    <UCard class="my-4">
      <template #header>
        <h2>Editar Senha</h2>
      </template>
      <UForm :schema="passwordSchema" :state="passwordState" class="space-y-4">
        <UFormGroup label="Senha" name="password">
          <UInput v-model="passwordState.password" type="password"/>
        </UFormGroup>
        <UFormGroup label="Repita a Senha" name="repeat_password">
          <UInput v-model="passwordState.repeat_password" type="password"/>
        </UFormGroup>
      </UForm>
      <template #footer>
        <UFormGroup class="w-full content-around">
          <UButton type="submit" block @click="editUserPassword">Enviar</UButton>
        </UFormGroup>
      </template>
    </UCard>
    <UCard class="my-4">
      <UButton block size="lg" color="red" @click="isDeleteAccModalOpen = true">
        Excluir Conta
      </UButton>
    </UCard>
  </UContainer>
</template>

<style scoped>

</style>