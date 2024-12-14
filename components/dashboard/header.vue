<script setup lang="ts">
import {useUserStore} from "~/stores/user";

const links = [
  {name: 'home', to: '/dashboard/'},
  {name: 'links', to: '/dashboard/links'}
]

const {user} = useUserStore();


const menu = [
  [{
    label: 'Gerenciar Usuário',
    icon: 'i-heroicons-pencil-square-solid',
    to: '/dashboard/user',
  }], [{
    label: 'Sair',
    icon: 'i-heroicons-arrow-right-on-rectangle-solid',
    click: () => logout(),
  }]
]

const logout = async () => {
  const router = useRouter();
  const { deleteUser } = useUserStore()

  deleteUser()
  await router.push('/login');
}
</script>

<template>
  <header class="bg-gray-500">
    <UContainer class="flex items-center">
      <ULink to="/dashboard">
        <span class="font-bold text-lg">dglk.top</span>
      </ULink>
      <UHorizontalNavigation :links="links" class="mx-4">
        <template #default="{link}">
          <span class="group-hover:text-primary relative">{{link.name}}</span>
        </template>
      </UHorizontalNavigation>
      <UDropdown :items="menu">
        <UButton
            color="white"
            variant="link"
            label="menu"
            icon="heroicons-user-circle-solid"
        >
          {{user.name}}
        </UButton>
      </UDropdown>
    </UContainer>
  </header>
</template>