<script setup lang="ts">
import {BarChart, PieChart} from 'vue-chart-3';
const graphColors = ['#77CEFF', '#0079AF', '#123E6B', '#97B0C4', '#A5C8ED'];

const prepareChartData = (data) => ({
  labels: data.map(el => el.name),
  datasets: [
    {
      data: data.map(el => el.count),
      backgroundColor: graphColors,
    },
  ],
});

definePageMeta({
  title: 'Link',
  layout: 'dashboard',
})

const config = useRuntimeConfig();
const appUrl = config.public.appUrl;

const route = useRoute()
const { getLink } = useUserLink()

const linkData = ref()
const os = ref()
const browser = ref()
const city = ref()
const country = ref()

try {
  const data = await getLink(route.params._id)
  os.value = prepareChartData(jsonAggregator(data.link_clicks, 'os'))
  browser.value = prepareChartData(jsonAggregator(data.link_clicks, 'browser'))
  city.value = prepareChartData(jsonAggregator(data.link_clicks, 'location.city'))
  country.value = prepareChartData(jsonAggregator(data.link_clicks, 'location.country'))
  linkData.value = data
} catch (error) {
  throw createError({
    statusCode: 404,
    message: 'Page not found.',
  })
}
</script>

<template>
  <div class="flex justify-between">
    <h1>Informações do Link</h1>
    <ULink to="/dashboard/links" ><UButton icon="i-heroicons-arrow-uturn-left">Voltar</UButton></ULink>
  </div>
  <UContainer class="my-4">
    <div class="cards grid grid-cols-1 lg:grid-cols-4 gap-4 mx-auto my-2">
      <UCard>
        <template #header>
          <p>Link Original</p>
        </template>
        <p class="text-gray-300">{{ linkData.url }}</p>
      </UCard>
      <UCard>
        <template #header>
          <p>Link Encurtado</p>
        </template>
        <ULink :to="`${appUrl}/${linkData.shortCode}`" target="_blank"><span class="text-gray-300">{{ `${appUrl}/${linkData.shortCode}` }}</span></ULink>
      </UCard>
      <UCard>
        <template #header>
          <p>Status</p>
        </template>
        <span v-if="linkData.active">
          <UIcon name="i-heroicons-check-circle-solid" class="w-5 h-5 text-green-500"/>
          <span class="ml-2">Ativa</span>
        </span>
        <span v-else>
          <UIcon name="i-heroicons-x-circle-solid" class="w-5 h-5 text-red-500"/>
          <span>Inativa</span>
        </span>
      </UCard>
      <UCard>
        <template #header>
          <p>Total de cliques</p>
        </template>
        <p class="text-gray-300 text-4xl font-bold">{{ linkData.clicks }}</p>
      </UCard>
    </div>
    <div class="charts w-full">
    </div>
  </UContainer>
  <UContainer class="my-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
    <UCard class="chart text-center">
      <h1>Sistemas Operacionais</h1>
      <PieChart :chartData="os" />
    </UCard>
    <UCard class="chart text-center">
      <h1>Navegadores</h1>
      <BarChart :chartData="browser" />
    </UCard>
    <UCard class="chart text-center">
      <h1>Cidades</h1>
      <PieChart :chartData="city" />
    </UCard>
    <UCard class="chart text-center">
      <h1>Países</h1>
      <PieChart :chartData="country" />
    </UCard>
  </UContainer>
</template>

<style scoped>

</style>