<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    <div class="flex flex-col bg-white p-8 font-serif rounded-lg shadow-lg w-auto  text-center">
      <div class="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
        <div @click="role(2)"class="border bg-lime-200 p-6 md:p-10 rounded-lg hover:bg-lime-500 w-full md:w-auto text-decoration-none">
          <h2 class="text-xl md:text-2xl font-bold text-black">Householder/Client</h2>
        </div>
        <div @click="role(3)" class="border bg-lime-200 p-6 md:p-10 rounded-lg hover:bg-lime-500 w-full md:w-auto text-decoration-none">
          <h2 class="text-xl md:text-2xl font-bold text-black">Maid/Job Seeker</h2>
        </div>
      </div>
      <div class="flex flex-row justify-center items-center gap-4">
        <p class="text-gray-600">Already Have an account?</p>
        <button
          class="bg-black text-white font-semibold px-6 py-1 rounded-lg hover:bg-lime-800 transition duration-300">
          Login
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
 const role = (id) => {
    navigateTo(`/signup/${id}`);
  };
definePageMeta({
  layout: 'custom'
})
</script>