<template>
  <v-container class="mx-auto">
    <v-alert
        text
        color="teal"
        icon="mdi-database-search"
        border="left"
    >
      没有查询结果哟...
    </v-alert>
  </v-container>
</template>

<script>
export default {
name: "NoResults"
}
</script>
