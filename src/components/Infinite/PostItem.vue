<template>

  <v-card
      :color='color'
      dark
      elevation="20"
  >
      <v-card-title>{{ post.title }}</v-card-title>
      <v-card-subtitle>
        作者:
        <v-chip pill dark color="#52c147" >
          <v-avatar left>
            <v-img src="http://img.aruoxi.top/image/favcionx32.ico"></v-img>
          </v-avatar>
          {{ post.author }}
        </v-chip>
        {{ post.createdAt.substr(0,10) }}  {{ post.createdAt.substr(11,8) }}

        <span v-if="post.createdAt !== post.updatedAt">
          最后修改于 {{ post.updatedAt.substr(0,10) }}  {{ post.updatedAt.substr(11,8) }}
        </span>
      </v-card-subtitle>
    <v-col offset="1">
      <v-card-text >
        <v-row v-for="(line, index) in post.content.split('\n')" :key="index">{{ line }}</v-row></v-card-text>
    </v-col>


  </v-card>
</template>

<script>
export default {
  name: "PostItem",
  props: {
    post: {
      type: Object,
      required: true
    },
    color: {
      type: String,
      required: true,
      default: function () {
        return '#1F7087'
      }
    }
  },
}
</script>

<style scoped>

</style>
