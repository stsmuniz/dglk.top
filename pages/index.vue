<script setup lang="ts">

</script>

<template>
  <Header />
  <section class="hero bg-gray-800 py-8 flex flex-col items-center">
    <h1 class="font-bold text-6xl my-8">dglk.top</h1>
    <p class="text-xl">Um encurtador de links simples e com as ferramentas que você precisa</p>
    <UButton size="xl" class="my-4" :ui="{ rounded: 'rounded-full' }" to="/dashboard">Cadastre-se agora</UButton>
  </section>
  <UContainer class="flex flex-col">
  </UContainer>
</template>

<style scoped>

</style>