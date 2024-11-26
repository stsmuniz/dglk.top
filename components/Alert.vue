<script setup lang="ts">
const {alertMessage  = '', alertType = 'warning'} = defineProps(['alertMessage', 'alertType'])

const alertTypes = {
  warning: {
    icon: 'i-heroicons-exclamation-triangle-solid',
    color: 'red'
  },
  success: {
    icon: 'i-heroicons-check',
    color: 'green'
  }
};
</script>

<template>
  <UAlert
      class="z-10 transition transform ease-in-out delay-150 duration-500 -translate-y-32 w-[95%] max-w-7xl fixed"
      :title="alertMessage"
      :icon="alertTypes[alertType].icon" variant="solid" :color="alertTypes[alertType].color"
      :close-button="{ icon: 'i-heroicons-x-mark-20-solid', color: 'white', variant: 'link'}"
  />
</template>

<style scoped>

</style>