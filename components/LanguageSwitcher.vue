<template>
  <div class="relative">
    <!-- Language Toggle Button -->
    <button
      @click="toggleLanguageDropdown"
      class="flex items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white rounded-full"
    >
      <Icon :name="currentLanguage.icon" class="size-6" />
      <span class="hidden md:inline ml-2">{{ currentLanguage.label }}</span>
    </button>

    <!-- Language Dropdown -->
    <div
      v-if="isLanguageDropdownOpen"
      class="absolute right-0 mt-2 w-32 bg-white dark:bg-gray-800 rounded-lg shadow-lg z-50"
    >
      <ul>
        <li
          v-for="(lang, index) in languages"
          :key="index"
          @click="changeLanguage(lang)"
          class="px-4 py-2 text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
        >
          <div class="flex items-center space-x-2">
            <Icon :name="lang.icon" class="size-5" />
            <span>{{ lang.label }}</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useI18n } from "vue-i18n"; // or useI18n from nuxt-i18n if using Nuxt
import { useRouter } from "vue-router"; // or useRouter from nuxt

const { locale, setLocale } = useI18n();
const router = useRouter();

// Reactive state for dropdown visibility
const isLanguageDropdownOpen = ref(false);

// Available languages with flags and names
const languages = [
  { code: "en", label: "English", icon: "circle-flags:us" },
  { code: "am", label: "Amharic", icon: "circle-flags:et" },
  // Add more languages as needed
];

// Current language (computed based on the active locale)
const currentLanguage = computed(() => {
  return languages.find((lang) => lang.code === locale.value) || languages[0];
});

// On component mount, load the saved language from localStorage
onMounted(() => {
  const savedLanguage = localStorage.getItem("selectedLanguage");
  if (savedLanguage) {
    setLocale(savedLanguage);
  }

  // Add click outside listener
  document.addEventListener("click", handleClickOutside);
});

// Remove event listener on component unmount
onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});

// Watch for route changes and sync the locale
router.afterEach(() => {
  const savedLanguage = localStorage.getItem("selectedLanguage");
  if (savedLanguage && savedLanguage !== locale.value) {
    setLocale(savedLanguage);
  }
});

// Toggle language dropdown
const toggleLanguageDropdown = () => {
  isLanguageDropdownOpen.value = !isLanguageDropdownOpen.value;
};

// Change language
const changeLanguage = (lang) => {
  setLocale(lang.code); // Update the locale using nuxt-i18n
  localStorage.setItem("selectedLanguage", lang.code); // Save the selected language to localStorage
  isLanguageDropdownOpen.value = false; // Close the dropdown
};

// Handle click outside to close dropdown
const handleClickOutside = (event) => {
  const dropdown = document.querySelector(".relative");
  if (dropdown && !dropdown.contains(event.target)) {
    isLanguageDropdownOpen.value = false;
  }
};
</script>
