<template>
  <footer class="bg-white dark:bg-black font-serif text-dark pt-4 bottom-0">
    <div class="container mx-auto px-4">
      <div class="flex justify-between items-center mb-8">
        <!-- MailFinder Section -->
        <div>
          <h2 class="text-2xl font-bold dark:text-white">MailFinder</h2>
        </div>

        <!-- Navs -->
        <div class="justify-around">
          <nav class="hidden md:flex space-x-6 text-dark dark:text-[#F3F3F3]">
            <a href="#" class="hover:text-[#B9FF66]">About us</a>
            <a href="#" class="hover:text-[#B9FF66]">Services</a>
            <a href="#" class="hover:text-[#B9FF66]">Maids</a>
            <a href="#" class="hover:text-[#B9FF66]">How it works</a>
          </nav>
        </div>
        <div class="flex justify-between gap-4">
          <Icon
            name="mdi:linkedin"
            class="w-8 h-8 mb-4 text-black dark:text-white hover:text-[#A0E55C]"
          />
          <Icon
            name="ic:baseline-facebook"
            class="w-8 h-8 mb-4 text-black dark:text-white hover:text-[#A0E55C]"
          />
          <Icon
            name="line-md:twitter-x"
            class="w-8 h-8 mb-4 text-black dark:text-white hover:text-[#A0E55C]"
          />
        </div>
      </div>

      <div class="flex gap-24">
        <!-- Contact Us Section -->
        <div>
          <h3
            class="text-xl font-semibold bg-[#B9FF66] text-[#191A23] px-2 py-1 rounded-md mb-4"
          >
            Contact Us:
          </h3>
          <ul class="text-dark dark:text-gray-400">
            <li class="mb-2">Email: info@maildfinder.com</li>
            <li class="mb-2">Phone: +25194317302</li>
            <li class="mb-2">
              Address: Hossana<br />
              Hossana, Ethiopia 0000
            </li>
          </ul>
        </div>

        <!-- Newsletter Section -->
        <div
          class="w-4xl mx-auto border bg-gray dark:bg-[#20233f] p-10 rounded-lg"
        >
          <h3 class="text-xl dark:text-white font-semibold mb-4">
            Subscribe to News
          </h3>
          <form @submit.prevent="subscribe" class="flex gap-2">
            <input
              type="email"
              v-model="email"
              class="w-full px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-700 text-white placeholder-[#F3F3F3] dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#B9FF66]"
              placeholder="Enter your email"
              required
            />
            <button
              type="submit"
              class="bg-[#B9FF66] text-[#191A23] font-semibold px-6 py-2 rounded-md hover:bg-[#A0E55C] transition-colors duration-200"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <!-- Footer Bottom -->
      <div class="border-t border-dark dark:border-white mt-8 pt-8 text-center">
        <p class="text-black dark:text-white items-center justify-center">
          © 2025. All Rights Reserved. |
          <a href="#" class="hover:text-[#B9FF66]">Privacy Policy</a>
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref } from "vue";

// Reactive state for email input
const email = ref("");

// Function to handle newsletter subscription
const subscribe = () => {
  console.log("Subscribed with email:", email.value);
  alert("Thank you for subscribing!");
  email.value = ""; // Clear the input after submission
};
</script>
