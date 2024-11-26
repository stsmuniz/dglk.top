<script setup lang="ts">
import {definePageMeta} from "#imports";

definePageMeta({
  middleware: ['track']
})

const route = useRoute()
const shortCode: string = route.params.shortCode
const uselink = useLinks()
const url = ref('')
try {
  const {url} = await uselink.getLink(shortCode)
  uselink.redirect(shortCode)
} catch (error) {
  throw createError({
    statusCode: 404,
    message: 'Page not found.',
  })
}
</script>
<template>
  <UContainer class="flex flex-col justify-center items-center">
    <h1>Você será redirecionado em alguns segundos</h1>
    <p>Se não funcionar, <a :href="url">Clique aqui</a></p>
  </UContainer>
</template>