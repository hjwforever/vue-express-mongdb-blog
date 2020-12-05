<template>
  <v-container class="mx-auto">
    <v-alert
        text
        color="error"
        icon="mdi-database-alert"
        border="left"
    >
      出错了, 请重试或检查错误...
    </v-alert>
  </v-container>
</template>

<script>
export default {
name: "Error"
}
</script>
