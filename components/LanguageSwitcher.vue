<template>
  <div class="language-switcher">
    <select
      v-model="locale"
      @change="switchLanguage"
      class="h-12 px-4 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 focus:outline-none"
    >
      <option value="en">
        <Icon name="circle-flags:us-um" class="h-4 w-4 inline-block" /> English
      </option>
      <option value="am">
        <Icon name="circle-flags:et" class="h-4 w-4 inline-block" /> Amharic
      </option>
    </select>
  </div>
</template>

<script setup>
// Import the useI18n composable from nuxt-i18n
const { locale, setLocale } = useI18n();

// Available languages with flags and names
const availableLocales = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "am", name: "Amharic", flag: "🇪🇹" },
  // Add more languages as needed
];

// Function to switch languages
const switchLanguage = (event) => {
  const selectedLanguage = event.target.value;
  setLocale(selectedLanguage); // Use setLocale to change the language
};
</script>
