<script setup lang="ts">
import {useUserStore} from "~/stores/user";

const links = [
  {name: 'Login', to: '/dashboard/login'},
  {name: 'Cadastrar', to: '/dashboard/register'}
]
</script>

<template>
  <header class="bg-gray-800 fixed w-full">
    <UContainer class="flex items-center justify-between">
      <ULink to="/dashboard">
        <span class="font-bold text-lg">dglk.top</span>
      </ULink>
      <div class="nav-container py-2 grid gap-2 grid-cols-2">
        <UButton to="/login" variant="outline">Acessar</UButton>
        <UButton to="/register">Cadastrar</UButton>
      </div>
    </UContainer>
  </header>
</template>