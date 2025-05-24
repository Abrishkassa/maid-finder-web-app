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
        <Icon
          name="mdi:account-group"
          class="w-16 h-16 mx-auto mb-4 text-lime-400"
        />
        <h1 class="text-4xl md:text-5xl font-bold text-white mb-4">About Us</h1>
        <p class="text-white mb-6 max-w-2xl mx-auto">
          We are dedicated to connecting households with trusted and
          professional maids to make your life easier.
        </p>
        <a
          href="#"
          class="inline-flex items-center px-6 py-3 text-white bg-black hover:text-black hover:bg-lime-400 dark:text-[#191A23] font-medium text-regular rounded-lg dark:hover:bg-[#A0E55C] transition"
        >
          <Icon name="mdi:arrow-right" class="mr-2" />
          Learn More
        </a>
      </div>
    </div>

    <!-- Our Mission Section -->
    <section class="py-6 px-8 bg-[#F3F3F3] dark:bg-[#191A23]">
      <div class="container mx-auto px-4">
        <!-- Header Section -->
        <div class="text-center mb-8">
          <Icon
            name="mdi:target"
            class="w-12 h-12 mx-auto mb-2 text-lime-500"
          />
          <h2
            class="text-3xl font-serif font-semibold dark:bg-[#191A23] text-lime-500 px-3 py-1 rounded-md inline-block"
          >
            Our Mission
          </h2>
          <p
            class="max-w-2xl mx-auto font-serif mt-2 text-gray-600 dark:text-[#F3F3F3]"
          >
            We aim to revolutionize the way households find and hire maids
            through technology.
          </p>
        </div>

        <!-- Mission Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-4">
          <!-- Mission Card 1 -->
          <div
            class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center hover:transform hover:scale-105 transition"
          >
            <Icon
              name="mdi:shield-check"
              class="w-12 h-12 mb-4 text-[#B9FF66] mx-auto"
            />
            <h3 class="text-xl font-semibold dark:text-[#F3F3F3]">
              Verified Maids
            </h3>
            <p class="text-gray-600 dark:text-[#F3F3F3]">
              All maids undergo thorough background checks and verification.
            </p>
          </div>

          <!-- Mission Card 2 -->
          <div
            class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center hover:transform hover:scale-105 transition"
          >
            <Icon
              name="mdi:clock-check"
              class="w-12 h-12 mb-4 text-[#B9FF66] mx-auto"
            />
            <h3 class="text-xl font-semibold dark:text-[#F3F3F3]">
              Reliable Service
            </h3>
            <p class="text-gray-600 dark:text-[#F3F3F3]">
              On-time service with professional standards guaranteed.
            </p>
          </div>

          <!-- Mission Card 3 -->
          <div
            class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center hover:transform hover:scale-105 transition"
          >
            <Icon
              name="mdi:headset"
              class="w-12 h-12 mb-4 text-[#B9FF66] mx-auto"
            />
            <h3 class="text-xl font-semibold dark:text-[#F3F3F3]">
              24/7 Support
            </h3>
            <p class="text-gray-600 dark:text-[#F3F3F3]">
              Dedicated support team available anytime.
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
          <Icon
            name="mdi:book-open"
            class="w-12 h-12 mx-auto mb-2 text-lime-500"
          />
          <h2
            class="text-3xl font-serif font-semibold dark:bg-[#191A23] text-lime-500 px-3 py-1 rounded-md inline-block"
          >
            Our Story
          </h2>
          <p
            class="max-w-2xl mx-auto font-serif mt-2 text-gray-600 dark:text-[#F3F3F3]"
          >
            How five software engineering students created a revolutionary
            platform.
          </p>
        </div>

        <!-- Story Content -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
          <!-- Left Content -->
          <div class="flex justify-center">
            <img
              src="/cleaning.png"
              alt="Our Story"
              class="max-w-full h-auto rounded-lg shadow-lg"
            />
          </div>

          <!-- Right Content -->
          <div class="flex flex-col justify-center">
            <div class="mb-6 flex items-start">
              <Icon name="mdi:school" class="w-8 h-8 mr-3 mt-1 text-lime-600" />
              <div>
                <h3 class="text-xl font-semibold mb-2 dark:text-[#F3F3F3]">
                  University Beginnings
                </h3>
                <p class="text-gray-600 dark:text-[#F3F3F3]">
                  As 2021 software engineering students at Wachemo University,
                  we combined our skills to solve real problems.
                </p>
              </div>
            </div>

            <div class="mb-6 flex items-start">
              <Icon
                name="mdi:lightbulb-on"
                class="w-8 h-8 mr-3 mt-1 text-lime-600"
              />
              <div>
                <h3 class="text-xl font-semibold mb-2 dark:text-[#F3F3F3]">
                  The Idea
                </h3>
                <p class="text-gray-600 dark:text-[#F3F3F3]">
                  In November 2025, we launched MaidFinder to connect families
                  with trusted domestic help.
                </p>
              </div>
            </div>

            <div class="flex items-start">
              <Icon
                name="mdi:chart-line"
                class="w-8 h-8 mr-3 mt-1 text-lime-600"
              />
              <div>
                <h3 class="text-xl font-semibold mb-2 dark:text-[#F3F3F3]">
                  Growth
                </h3>
                <p class="text-gray-600 dark:text-[#F3F3F3]">
                  From university project to serving thousands of families
                  across Ethiopia.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Team Section -->
    <section class="py-6 px-8 bg-[#F3F3F3] dark:bg-[#191A23]">
      <div class="container mx-auto px-4">
        <div class="text-center mb-8">
          <Icon
            name="mdi:account-group"
            class="w-12 h-12 mx-auto mb-2 text-lime-500"
          />
          <h2
            class="text-3xl font-serif font-semibold dark:bg-[#191A23] text-lime-500 px-3 py-1 rounded-md inline-block"
          >
            Meet The Team
          </h2>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          <div
            v-for="member in team"
            :key="member.name"
            class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center hover:shadow-lg transition"
          >
            <div
              class="w-24 h-24 mx-auto mb-4 rounded-full bg-gray-200 overflow-hidden border-2 border-lime-400"
            >
              <img
                :src="member.photo"
                :alt="member.name"
                class="w-full h-full object-cover"
              />
            </div>
            <h3 class="text-xl font-semibold dark:text-[#F3F3F3]">
              {{ member.name }}
            </h3>
            <p
              class="text-gray-600 dark:text-[#F3F3F3] mb-3 flex items-center justify-center"
            >
              <Icon :name="member.icon" class="w-5 h-5 mr-1" />
              {{ member.role }}
            </p>
            <div class="flex justify-center space-x-3">
              <a href="#" class="text-gray-500 hover:text-lime-600">
                <Icon name="mdi:linkedin" class="w-6 h-6" />
              </a>
              <a href="#" class="text-gray-500 hover:text-lime-600">
                <Icon name="mdi:github" class="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="px-4 sm:px-8 lg:px-12 bg-[#F3F3F3] dark:bg-[#191A23]">
      <div
        class="container mx-auto bg-white dark:bg-gray-800 font-serif border-2 rounded-2xl px-6 sm:px-12 py-8 sm:py-10 text-left"
      >
        <div class="flex items-start">
          <Icon name="mdi:email-send" class="w-12 h-12 mr-4 text-lime-600" />
          <div>
            <h2 class="text-2xl sm:text-3xl font-bold mb-2 dark:text-[#F3F3F3]">
              Join Us Today
            </h2>
            <p
              class="text-gray-600 dark:text-[#F3F3F3] mb-6 sm:mb-8 max-w-full sm:max-w-96"
            >
              Find your perfect maid or join our professional network.
            </p>
            <a
              href="#"
              class="inline-flex items-center bg-black hover:text-black hover:bg-lime-400 dark:bg-[#B9FF66] text-white dark:text-[#191A23] font-semibold px-6 py-2 rounded-md dark:hover:bg-[#A0E55C] transition-colors duration-200"
            >
              <Icon name="mdi:account-plus" class="mr-2" />
              Get Started
            </a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const team = [
  {
    name: "Manuhe Wolde",
    role: "Frontend Developer",
    photo: "/default-avatar.png",
    icon: "mdi:code-tags",
  },
  {
    name: "Gutu Tamiru",
    role: "Backend Developer",
    photo: "/default-avatar.png",
    icon: "mdi:server",
  },
  {
    name: "Kenaol Bekele",
    role: "Frontend Developer",
    photo: "/default-avatar.png",
    icon: "mdi:monitor",
  },
  {
    name: "Abrham Kassa",
    role: "Frontend Developer",
    photo: "/default-avatar.png",
    icon: "mdi:palette",
  },
  {
    name: "Habtamu Fentahun",
    role: "Backend Developer",
    photo: "/default-avatar.png",
    icon: "mdi:database",
  },
];
</script>
