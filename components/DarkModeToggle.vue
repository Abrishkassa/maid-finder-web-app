<template>
  <div class="flex justify-center items-center">
    <button @click="changeColor" class="h-12 w-12 rounded-lg p-2">
      <!-- Moon icon for light mode -->
      <Icon
        v-if="colorMode.value === 'light'"
        name="solar:moon-bold"
        class="h-8 w-8 text-gray-700 dark:text-gray-300"
      />

      <!-- Sun icon for dark mode -->
      <Icon
        v-else
        name="ic:baseline-wb-sunny"
        class="h-8 w-8 text-yellow-500"
      />
    </button>
  </div>
</template>

<script setup>
const colorMode = useColorMode();

const changeColor = () => {
  colorMode.preference = colorMode.value === "light" ? "dark" : "light";
};
</script>

<style scoped>
/* Add any custom styles here if needed */
</style>
