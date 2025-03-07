<template>
     <footer class="bg-black font-serif text-white pt-4 bottom-0 mt-4">
      <div class="container mx-auto px-4">
        <div class="flex justify-between items-center mb-8">
          <!-- MailFinder Section -->
          <div>
            <h2 class="text-2xl font-bold">MailFinder</h2>
          </div>

          <!--navs-->
          <div class="justify-around">
            <nav class="hidden md:flex space-x-6 text-white">
              <a href="#" class="hover:text-green-700">About us</a>
              <a href="#" class="hover:text-green-700">Services</a>
              <a href="#" class="hover:text-green-700">Maids</a>
              <a href="#" class="hover:text-green-700">How it works</a>
            </nav>
          </div>
          <div class="justify-between gap-12">
            <Icon
              name="mdi:linkedin"
              style="color: white"
              class="w-8 h-8 mb-4 text-lime-400"
            />
            <Icon
              name="ic:baseline-facebook"
              style="color: white"
              class="w-8 h-8 mb-4 text-lime-400"
            />
            <Icon
              name="line-md:twitter-x"
              style="color: white"
              class="w-8 h-8 mb-4 text-lime-400"
            />
          </div>
        </div>

        <div class="flex gap-24">
          <!-- Contact Us Section -->
          <div>
            <h3
              class="text-xl font-semibold bg-lime-400 text-black px-2 py-1 rounded-md mb-4"
            >
              Contact Us:
            </h3>
            <ul class="text-gray-400">
              <li class="mb-2">Email: info@maildfinder.com</li>
              <li class="mb-2">Phone: +25194317302</li>
              <li class="mb-2">
                Address: Hossana<br />
                Hossana, Ethiopia 0000
              </li>
            </ul>
          </div>

          <!-- Newsletter Section -->
          <div class="w-4xl mx-auto border bg-gray-800 p-10 rounded-lg">
            <h3 class="text-xl font-semibold mb-4">Subscribe to News</h3>
            <form @submit.prevent="subscribe" class="flex gap-4">
              <input
                type="email"
                v-model="email"
                class="w-full px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-lime-400"
                placeholder="Enter your email"
                required
              />
              <button
                type="submit"
                class="bg-lime-400 text-black font-semibold px-6 py-2 rounded-md hover:bg-lime-500 transition-colors duration-200"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <!-- Footer Bottom -->
        <div class="border-t border-gray-700 mt-8 pt-8 text-center">
          <p class="text-gray-400">
            © 2025. All Rights Reserved. |
            <a href="#" class="hover:text-lime-400">Privacy Policy</a>
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