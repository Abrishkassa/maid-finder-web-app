<template>
    <div>
      <h1 class="text-2xl font-bold">{{ maid.name }}</h1>
      <p>Experience: {{ maid.experience }} years</p>
      <button class="bg-green-500 text-white px-4 py-2 rounded">Hire Now</button>
    </div>
  </template>
  
  <script setup>
    const route = useRoute();
    const { data: maid } = await useFetch(`/api/maids/${route.params.id}`);
  </script>