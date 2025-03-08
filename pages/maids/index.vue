<template>
    <div class="p-10 bg-gray-90 min-h-screen">
      <h2 class="text-2xl font-bold">Browse Verified Maids</h2>
      <div class="grid grid-cols-3 gap-4">
        <MaidCard v-for="maid in maids" :key="maid.id" :maid="maid" />
      </div>
  </div>
  </template>
  
  <script setup>
    const { data: maids } = await useFetch('/api/maids');
  </script>