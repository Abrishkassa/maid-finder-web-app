<template>
  <div class="bg-gray-50 min-h-screen">
    <!-- Header -->
    <header class="w-full bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-6 flex items-center justify-between py-4">
        <!-- Logo -->
        <div class="flex items-center space-x-2">
          <span class="text-lg font-semibold text-gray-800">MaidFinder</span>
        </div>
        <!-- Navigation Links -->
        <nav class="hidden md:flex space-x-6 text-gray-700">
          <a href="#" class="hover:text-green-700">About us</a>
          <a href="#" class="hover:text-green-700">Services</a>
          <a href="#" class="hover:text-green-700">Maids</a>
          <a href="#" class="hover:text-green-700">How it works</a>
        </nav>
        <!-- Right Buttons -->
        <div class="flex items-center space-x-4">
          <a href="#" class="text-gray-700 hover:text-gray-900">Log in</a>
          <a href="#"
            class="px-6 py-2 bg-black text-white text-regular rounded-lg font-medium hover:bg-green-600 transition">
            Register
          </a>
        </div>
      </div>
    </header>

    <!-- Hero Section -->
    <div class="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-8 items-center">
      <!-- Left Content -->
      <div>
        <h1 class="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Find Trusted Maids <br /> Near You
        </h1>
        <p class="text-gray-600 mb-6">
          Our organization helps you find trusted helpers or next job with ease!
        </p>
        <a href="#"
          class="px-6 py-3 bg-black text-white font-medium text-regular rounded-lg hover:bg-green-600 transition">
          Get Started
        </a>
      </div>

      <!-- Right Content -->
      <div class="flex justify-center">
        <img src="/public/MaidPic.jpg" alt="maid pic" class="max-w-full h-auto" />
      </div>
    </div>
  </div>

  <div>
    <header>
      <h1>Find Trusted Maids Near You</h1>
      <input type="text" placeholder="Search..." />
    </header>

    <section>
      <h2>Maid Profiles</h2>
      <div class="maids-grid">
        <MaidCard v-for="maid in maids" :key="maid.id" :maid="maid" />
      </div>
    </section>

    <section>
      <h2>How It Works</h2>
      <ol>
        <li>Search suitable maids</li>
        <li>Check profiles & reviews</li>
        <li>Implementation</li>
        <li>Pay securely & rate</li>
      </ol>
    </section>

    <section>
      <h2>Testimonials</h2>
      <Testimonial v-for="testimonial in testimonials" :key="testimonial.id" :testimonial="testimonial" />
    </section>
  </div>
</template>

<script setup>
import MaidCard from '../components/MaidCard.vue';
import Testimonial from '../components/Testimonial.vue';

const maids = [
  { id: 1, name: 'Maid 1', description: 'Experienced and trustworthy', photo: 'maid1.jpg' },
  { id: 2, name: 'Maid 2', description: 'Friendly and reliable', photo: 'maid2.jpg' },
  // Add more maids as needed
];

const testimonials = [
  { id: 1, name: 'John Doe', feedback: 'Great service!' },
  { id: 2, name: 'Jane Smith', feedback: 'Very satisfied!' },
  // Add more testimonials as needed
];
</script>

<style scoped>
.maids-grid {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}
</style>