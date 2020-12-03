
<template>
  <div class="flex">
    <header class="title-heading">
      <h3>{{content}}</h3>
    </header>
    <PostsList></PostsList>
  </div>
</template>

<script>
import UserService from '../services/user.service';
import PostsList from "@/components/PostsList";

export default {
  name: 'User',
  components: { PostsList },
  data() {
    return {
      content: '',
    };
  },
  mounted() {
    UserService.getUserBoard().then(
        response => {
          this.content = response.data;
        },
        error => {
          this.content =
              (error.response && error.response.data && error.response.data.message) ||
              error.message ||
              error.toString();
        }
    );
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
