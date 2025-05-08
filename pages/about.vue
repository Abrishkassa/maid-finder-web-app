<template>
  <div class="min-h-screen">
    <!-- Hero Section -->
    <div
      class="max-w-7xl mx-auto px-8 py-12 grid md:grid-cols-1 gap-8 items-center mb-8 relative min-h-[400px]"
      :style="{
        backgroundImage: 'url(/MaidPic.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }"
    >
      <!-- Overlay to improve text readability -->
      <div class="absolute inset-0 bg-black bg-opacity-50"></div>

      <!-- Centered Content -->
      <div class="relative z-10 text-center">
        <h1 class="text-4xl md:text-5xl font-bold text-white mb-4">About Us</h1>
        <p class="text-white mb-6 max-w-2xl mx-auto">
          We are dedicated to connecting households with trusted and
          professional maids to make your life easier. Our mission is to provide
          a seamless experience for both employers and maids, ensuring safety,
          reliability, and satisfaction.
        </p>
        <a
          href="#"
          class="px-6 py-3 text-white bg-black hover:text-black hover:bg-lime-400 dark:text-[#191A23] font-medium text-regular rounded-lg dark:hover:bg-[#A0E55C] transition"
        >
          Learn More
        </a>
      </div>
    </div>
    <!-- Our Mission Section -->
    <section class="py-6 px-8 bg-[#F3F3F3] dark:bg-[#191A23]">
      <div class="container mx-auto px-4">
        <!-- Header Section -->
        <div class="text-center mb-8">
          <h2
            class="text-3xl font-serif font-semibold dark:bg-[#191A23] text-lime-500 px-3 py-1 rounded-md inline-block"
          >
            Our Mission
          </h2>
          <p
            class="max-w-2xl mx-auto font-serif mt-2 text-gray-600 dark:text-[#F3F3F3]"
          >
            We aim to revolutionize the way households find and hire maids by
            providing a platform that prioritizes trust, transparency, and
            convenience.
          </p>
        </div>

        <!-- Mission Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-4">
          <!-- Mission Card -->
          <div
            class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center"
          >
            <Icon
              name="ic:baseline-verified"
              class="w-12 h-12 mb-4 text-[#B9FF66] mx-auto"
            />
            <h3 class="text-xl font-semibold dark:text-[#F3F3F3]">
              Verified Maids
            </h3>
            <p class="text-gray-600 dark:text-[#F3F3F3]">
              All maids on our platform undergo thorough background checks and
              verification processes.
            </p>
          </div>

          <!-- Mission Card -->
          <div
            class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center"
          >
            <Icon
              name="ic:baseline-security"
              class="w-12 h-12 mb-4 text-[#B9FF66] mx-auto"
            />
            <h3 class="text-xl font-semibold dark:text-[#F3F3F3]">
              Safety First
            </h3>
            <p class="text-gray-600 dark:text-[#F3F3F3]">
              Your safety and peace of mind are our top priorities. We ensure
              every maid is reliable and trustworthy.
            </p>
          </div>

          <!-- Mission Card -->
          <div
            class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center"
          >
            <Icon
              name="ic:baseline-support"
              class="w-12 h-12 mb-4 text-[#B9FF66] mx-auto"
            />
            <h3 class="text-xl font-semibold dark:text-[#F3F3F3]">
              24/7 Support
            </h3>
            <p class="text-gray-600 dark:text-[#F3F3F3]">
              Our dedicated support team is available around the clock to assist
              you with any queries or concerns.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Our Story Section -->
    <section class="py-6 px-8">
      <div class="container mx-auto px-4">
        <!-- Header Section -->
        <div class="text-center mb-8">
          <h2
            class="text-3xl font-serif font-semibold dark:bg-[#191A23] text-lime-500 px-3 py-1 rounded-md inline-block"
          >
            Our Story
          </h2>
          <p
            class="max-w-2xl mx-auto font-serif mt-2 text-gray-600 dark:text-[#F3F3F3]"
          >
            Founded in 2023, we started with a simple goal: to make it easier
            for households to find reliable and professional maids. Today, we
            are proud to serve thousands of families across the country.
          </p>
        </div>

        <!-- Story Content -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
          <!-- Left Content -->
          <div class="flex justify-center">
            <img
              src="/cleaning.png"
              alt="Our Story"
              class="max-w-full h-auto rounded-lg"
            />
          </div>

          <!-- Right Content -->
          <div class="flex flex-col justify-center">
            <p class="text-gray-600 dark:text-[#F3F3F3] mb-4">
              Our journey began with a small team of passionate individuals who
              believed in the power of technology to solve everyday problems. We
              saw the challenges households faced in finding trustworthy maids
              and decided to create a solution.
            </p>
            <p class="text-gray-600 dark:text-[#F3F3F3]">
              Over the years, we have grown into a trusted platform, connecting
              families with skilled maids who meet their specific needs. Our
              commitment to quality and customer satisfaction has been the
              driving force behind our success.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="px-4 sm:px-8 lg:px-12 bg-[#F3F3F3] dark:bg-[#191A23]">
      <div
        class="container mx-auto bg-white dark:bg-gray-800 font-serif border-2 rounded-2xl px-6 sm:px-12 py-8 sm:py-10 text-left"
      >
        <!-- Heading -->
        <h2 class="text-2xl sm:text-3xl font-bold mb-2 dark:text-[#F3F3F3]">
          Join Us Today
        </h2>

        <!-- Description -->
        <p
          class="text-gray-600 dark:text-[#F3F3F3] mb-6 sm:mb-8 max-w-full sm:max-w-96"
        >
          Whether you're looking for a maid or want to join our team, we're here
          to help. Let's work together to create a better experience for
          households and maids alike.
        </p>

        <!-- Join Now Button -->
        <a
          href="#"
          class="inline-block bg-black hover:text-black hover:bg-lime-400 dark:bg-[#B9FF66] text-white dark:text-[#191A23] font-semibold px-6 py-2 rounded-md dark:hover:bg-[#A0E55C] transition-colors duration-200"
        >
          Join Now
        </a>
      </div>
    </section>
  </div>
</template>

<script setup>
// No additional logic is needed for this page
</script>
