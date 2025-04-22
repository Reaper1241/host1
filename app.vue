<script setup>
import { apiNew } from '@/constants';
import { useAppStore } from '/stores/AppStore.js';

const appStore = useAppStore();

if (process.client) {
  appStore.entry = document.referrer;
  appStore.reffer = window.location.search;
}

const fetchWithTimeout = (url, timeoutDuration = 5000) => {
  return Promise.race([
    useFetch(url),
    new Promise((_, reject) => setTimeout(() => reject(new Error('Request timed out')), timeoutDuration))
  ]);
}

const fetchData = async () => {
  const fetchPromises = [
    fetchWithTimeout(`${apiNew}attributes`),
    fetchWithTimeout(`${apiNew}brands`),
    fetchWithTimeout(`${apiNew}pages`),
    fetchWithTimeout(`${apiNew}filters/brands?brand_tag_id=3`),
  ];

  const startTime = performance.now();

  try {
    const results = await Promise.all(fetchPromises);

    appStore.app = results[0].data.value;
    appStore.newBrands = results[1].data.value;
    appStore.newSeo = results[2].data.value;
    appStore.chinaBrands = results[3].data.value;
  } catch (error) {
    console.error('Failed to fetch data:', error);

    throw createError({
      statusCode: 500,
      statusMessage: 'Ошибка API',
    })

  } finally {
    const endTime = performance.now();
    const durationInSeconds = (endTime - startTime) / 1000;

    if (process.server) {
      console.log(`SSR Total fetch time: ${durationInSeconds.toFixed(2)} seconds`);
    }
  }
};

await fetchData();

onMounted(async () => {
  try {
    const response = await fetch(`/api/ip`);
    const data = await response.json();
    appStore.ip = data.ip;
  } catch (error) {
    console.error('IP fetch error', error);
  }
});

appStore.setAttributes();
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style lang="scss"></style>
