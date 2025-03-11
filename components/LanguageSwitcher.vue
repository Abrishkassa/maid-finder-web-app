<template>
  <div class="language-switcher">
    <button @click="switchLanguage('en')" :class="{ active: locale === 'en' }">
      English
    </button>
    <button @click="switchLanguage('am')" :class="{ active: locale === 'am' }">
      Amharic
    </button>
  </div>
</template>

<script setup>
// Import the useI18n composable from nuxt-i18n
const { locale, setLocale } = useI18n();

// Function to switch languages
const switchLanguage = (lan) => {
  setLocale(lan); // Use setLocale to change the language
};
</script>

<style scoped>
.language-switcher {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

button {
  padding: 8px 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #fff;
  cursor: pointer;
}

button.active {
  background-color: #007bff;
  color: #fff;
  border-color: #007bff;
}
</style>
