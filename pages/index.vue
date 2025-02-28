<template>
  <div class="bg-gray-90 min-h-screen">
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
          <a href="#" class="text-gray-700 hover:text-green-700">Log in</a>
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
          Our organization helps you find trusted helpers or <br /> next job with ease!
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
  
  <!--Searchbar From Here-->   
  <div>
    <form class="flex flex-col justify-center md:flex-row gap-3">
      <div class="flex">
        <input type="text" placeholder="search for maid"
          class="w-full md:w-80 px-3 h-10 rounded-l border-2 border-black focus:outline-none focus:border-green-500">
        <button type="submit" class="bg-black text-white rounded-r px-2 md:px-3 py-0 md:py-1">Search</button>
      </div>
      <select id="filtertype" name="filter"
        class=" h-10 border-2 border-black focus:outline-none focus:border-green-500 text-black rounded px-2 md:px-3 py-0 md:py-1 tracking-wider">
        <option value="All" selected="">All</option>
        <option value="Freemium">Freemium</option>
        <option value="Free">Free</option>
        <option value="Paid">Paid</option>
      </select>
    </form>

    <!--Maid Section-->  

    <section class="p-6 text-center">
      <div class="flex items-center">
        <h2 class="text-2xl font-semibold bg-lime-400 text-black px-3 py-1 rounded-md">
          Maids
        </h2>
        <p class="ml-2 align-text-top text-gray-600">Find the perfect helper for your home today!</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <div v-for="maid in maids" :key="maid.id"
          class="bg-white shadow-lg rounded-lg px-6 py-3 flex flex-col items-left border ">
          <img :src="maid.picture" alt="Maid Picture" class="w-48 h-48 object-cover rounded-md" />

          <div class="text-left mt-3">
            <p class="font-bold">Name: {{ maid.name }}</p>
            <p>Experience: {{ maid.experience }} Years</p>
            <p>Location: {{ maid.location }}</p>
            <p>Skills: {{ maid.skills }}</p>
            <p>Rate: ${{ maid.rate }}/hr</p>
            <p class="text-green-600 font-semibold">✔ Verified & Background Checked</p>
            <p class="text-gray-500">Available for Full-time & Part-time</p>
          </div>

          <div class="flex gap-2 mt-4 justify-between">
            <button class="bg-gray-900 text-white px-4 py-2 rounded-md font-semibold">
              View Profile
            </button>
            <button class="bg-lime-400 text-black px-4 py-2 rounded-md font-semibold">
              Hire Now
            </button>
          </div>
        </div>
      </div>
    </section>

    <!--How it Works section Starts Here-->     

    <section class="p-6 text-center">
      <div class="flex items-center">
        <h2 class="text-2xl font-semibold bg-lime-400 text-black px-3 py-1 rounded-md">
          How it works
        </h2>
        <p class="ml-2 align-text-top text-gray-600">Step by step Guide</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <div v-for="maid in maids" :key="maid.id"
          class="bg-white shadow-lg rounded-lg px-6 py-3 flex flex-col items-left border ">
          <img :src="maid.picture" alt="Maid Picture" class="w-48 h-48 object-cover rounded-md" />

          <div class="text-left mt-3">
            <p class="font-bold">Name: {{ maid.name }}</p>
            <p>Experience: {{ maid.experience }} Years</p>
            <p>Location: {{ maid.location }}</p>
            <p>Skills: {{ maid.skills }}</p>
            <p>Rate: ${{ maid.rate }}/hr</p>
            <p class="text-green-600 font-semibold">✔ Verified & Background Checked</p>
            <p class="text-gray-500">Available for Full-time & Part-time</p>
          </div>

          <div class="flex gap-2 mt-4 justify-between">
            <button class="bg-gray-900 text-white px-4 py-2 rounded-md font-semibold">
              View Profile
            </button>
            <button class="bg-lime-400 text-black px-4 py-2 rounded-md font-semibold">
              Hire Now
            </button>
          </div>
        </div>
      </div>
    </section>

    <section>
      <h2>Testimonials</h2>
      <Testimonial v-for="testimonial in testimonials" :key="testimonial.id" :testimonial="testimonial" />
    </section>
  </div>
</template>

<script setup>
const maids = [
  {
    id: 1,
    name: "Gete Wame",
    experience: 5,
    location: "New York, NY",
    skills: "Housekeeping, Childcare, Cooking",
    rate: 15,
    picture: "/path-to-image.jpg",
  },
  {
    id: 1,
    name: "Gete Wame",
    experience: 5,
    location: "New York, NY",
    skills: "Housekeeping, Childcare, Cooking",
    rate: 15,
    picture: "/path-to-image.jpg",
  },
  {
    id: 2,
    name: "Gete Wame",
    experience: 5,
    location: "New York, NY",
    skills: "Housekeeping, Childcare, Cooking",
    rate: 15,
    picture: "/path-to-image.jpg",
  }
];
</script>

<!-- <style scoped>
.maids-grid {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}
</style> -->