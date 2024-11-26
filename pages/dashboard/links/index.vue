<script setup lang="ts">
import {object, string, type InferType, bool} from 'yup'
import type {FormSubmitEvent} from '#ui/types'
import type {User} from "~/interfaces/user";
import {randomString} from "~/utils/randomString";
import {useUserLink} from "~/composables/useUserLink";

const userStore = useUserStore()
const user: User | null = userStore.user
const config = useRuntimeConfig();
const appUrl = config.public.appUrl;

definePageMeta({
  title: 'Dashboard',
  layout: 'dashboard',
})

const page = ref(1)

const userLinks = useUserLink()

const linksData = await userLinks.getLinks(user._id, {page: page.value})

const links = ref({})
const linkLength = ref(0)

links.value = linksData.links
linkLength.value = linksData.linkLength

watch(page, async () => {
  const linksData = await userLinks.getLinks(user._id, {page: page.value})
  links.value = linksData.links
  linkLength.value = linksData.linkLength
})

const cols = [
  {key: 'url', label: 'Url Original'},
  {key: 'shortCode', label: 'Url Encurtada'},
  {key: 'clicks', label: 'Clicks'},
  {key: 'active', label: 'Ativa'},
  {key: 'details', label: 'Detalhes'},
  {key: 'actions'}
]

const items = row => [
  [{
    label: row.active ? 'Desativar' : 'Ativar',
    icon: 'i-heroicons-archive-box-20-solid',
    click: () => toggleActiveLink(row._id, !row.active),
  }], [{
    label: 'Excluir',
    icon: 'i-heroicons-trash-20-solid',
    click: () => deleteLink(row._id),
  }]
]

const toggleActiveLink = async (id: String, newStatus: bool) => {
  try {
    await userLinks.updateUserLink(id, {active: newStatus})
    const linkIndex = links.value.findIndex(link => link._id === id)
    links.value[linkIndex].active = newStatus
    openAlert("Link atualizado", 'success')
  } catch (error) {
    openAlert("Erro ao atualizar", 'warning')
  }
}

const deleteLink = async (id: String) => {
  try {
    await userLinks.deleteUserLink(id)
    links.value = links.value.filter(obj => obj._id !== id)
    openAlert("Link atualizado", 'success')
  } catch (error) {
    openAlert("Erro ao atualizar", 'warning')
  }
}

const isNewModalOpen = ref(false)

const schema = object({
  url: string().url('Url inválida').required('Obrigatório'),
  shortCode: string().required('Obrigatório').min(5),
})

type Schema = InferType<typeof schema>

const initialState = {
  url: undefined,
  shortCode: randomString(5),
  user_id: user?._id
}

const state = ref(initialState)

const updateShortCode = () => {
  state.value.shortCode = randomString(5)
}

async function onSubmit(event: FormSubmitEvent<Schema>) {
  try {
    await userLinks.createLink(state.value)
    state.value = {
      url: undefined,
      shortCode: randomString(5),
      user_id: user?._id
    }
    isNewModalOpen.value = false
    openAlert("Link Cadastrado", 'success')
  } catch (error) {
    openAlert("Erro ao cadastrar", 'warning')
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
  <Alert
      :alert-message="message"
      :alert-type="type"
      :class="[isAlertOpen ? ' translate-y-0' : ' -translate-y-32']"
      @close="closeAlert"
  />
  <div class="flex justify-between">
    <h1>Links</h1>
    <UButton icon="i-heroicons-plus-20-solid" @click="isNewModalOpen = true">Novo</UButton>
    <UModal v-model="isNewModalOpen">
      <UForm :schema="schema" :state="state" @submit="onSubmit">
        <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
          <template #header>
            <h1>Novo Link</h1>
          </template>
          <UFormGroup label="Url" name="url">
            <UInput v-model="state.url" type="url"/>
          </UFormGroup>
          <UFormGroup label="URL Encurtada" name="shortCode">
            <div class="flex justify-items-center">
              <p>https://dogl.ink/</p>
              <UInput v-model="state.shortCode"/>
              <UButton icon="i-heroicons-arrow-path" class="mx-2" color="white" @click="updateShortCode" />
            </div>
          </UFormGroup>
          <template #footer>
            <UButton type="submit">Adicionar Link</UButton>
          </template>
        </UCard>
      </UForm>
    </UModal>
  </div>
  <UTable :rows="links" :columns="cols">
    <template #shortCode-data="{row}">
      {{ `${appUrl}/${row.shortCode}` }}
    </template>
    <template #active-data="{row}">
      <UIcon v-if="row.active" name="i-heroicons-check-circle-solid" class="w-5 h-5 text-green-500"/>
      <UIcon v-else name="i-heroicons-x-circle-solid" class="w-5 h-5 text-red-500"/>
    </template>
    <template #details-data="{row}">
      <ULink :to="`${appUrl}/dashboard/links/${row._id}`">
        <UButton icon="i-heroicons-magnifying-glass"
                 size="2xs"
        >
        </UButton>
      </ULink>
    </template>
    <template #actions-data="{row}">
      <UDropdown :items="items(row)">
        <UButton
            color="gray"
            variant="ghost"
            icon="i-heroicons-ellipsis-horizontal-20-solid"
        />
      </UDropdown>
    </template>
  </UTable>
  <div
      v-if="linkLength > 10"
      class="flex justify-center px-3 py-3.5 border-t border-gray-200 dark:border-gray-700"
  >
    <UPagination
        v-model="page"
        :total="linkLength"
    />
  </div>
</template>