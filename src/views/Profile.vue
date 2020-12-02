<template>
  <div class="container">
    <header class="title-heading">
      <h3>
        <strong>{{currentUser.username}}</strong> 个人信息
      </h3>
    </header>
    <p>
      <strong>Token:</strong>
      {{currentUser.accessToken.substring(0, 20)}} ... {{currentUser.accessToken.substr(currentUser.accessToken.length - 20)}}
    </p>
    <p>
      <strong>Id:</strong>
      {{currentUser.id}}
    </p>
    <p>
      <strong>Email:</strong>
      {{currentUser.email}}
    </p>
    <strong>Authorities:</strong>
    <ul>
      <li v-for="(role,index) in currentUser.roles" :key="index">{{role}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Profile',
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push('/login');
    }
  }
};
</script>

<style scoped>
.title-heading {
  text-align: center;
  margin-bottom: 2rem;
  user-select: none;
  color: rgba(0,0,0,0.75);
  text-shadow: 0.4rem 0.5rem 0.3rem rgba(0, 0, 0, 0.5);
}
</style>
