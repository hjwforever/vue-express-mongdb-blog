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
        <h1 class="display-2 font-weight-bold mb-3">
          Hello,  {{ currentUser.username }} !<br />
          Welcome to Vue-Express-MongoDB-Blog by HJW
        </h1>
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
