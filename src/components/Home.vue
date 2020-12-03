<template>
  <div class="flex">
<!--    <v-parallax :src="require('../assets/bg.jpg')" elevation="18"></v-parallax>-->
    <v-row class="text-center">
      <v-col cols="12">
        <v-img
          :src="require('../assets/logo.png')"
          class="my-3"
          contain
          height="160"
        />
      </v-col>

      <v-col class="mb-4">
        <h6 class="display-2 font-weight-bold mb-3">
          Hello,  <span class="blue--text">{{ currentUser.username }}</span> !<br />
          Welcome to <a href="https://github.com/hjwforever/vue-express-mongdb-blog" target="_blank">Vue-Express-MongoDB-Blog</a> by <span class="font-italic">HJW</span>
        </h6>
      </v-col>
    </v-row>
  </div>
</template>

<script>
  export default {
    name: 'HelloWorld',

    data: () => ({
    }),
    computed: {
      currentUser() {
        return this.$store.state.auth.user;
      }
    },
  }
</script>
