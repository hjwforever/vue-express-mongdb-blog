<template>
  <v-footer
      padless
  >
    <v-card
        flat
        tile
        width="100%"
        class="blue lighten-1 text-center"
        elevation="6"
        color="#385F73"
    >
      <!-- 页脚图标 -->
<!--      <v-card-text>-->
<!--        <v-btn-->
<!--            v-for="icon in icons"-->
<!--            :key="icon"-->
<!--            class="mx-4"-->
<!--            icon-->
<!--        >-->
<!--          <v-icon size="24px">-->
<!--            {{ icon }}-->
<!--          </v-icon>-->
<!--        </v-btn>-->
<!--      </v-card-text>-->
<!--      <v-divider></v-divider>-->
      <v-card-text class="white--text">
          {{ new Date().getFullYear() }} —
        <a href="https://github.com/hjwforever/vue-express-mongdb-blog" target="_blank" style="color: #201aec;">
          Vue-Express-MongoDB-BlogManage</a>
          by<strong> 18301127 HJW</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  name: "Footer",
  data: () => ({
    icons: [
      'mdi-home',
      'mdi-email',
      'mdi-calendar',
      'mdi-delete',
      'mdi-thumb-up',
      'mdi-thumb-down',
    ],
  }),
  methods: {
    toHome() {

    }
  }
}
</script>

<style scoped>

</style>
