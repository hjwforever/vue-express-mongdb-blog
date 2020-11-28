<template>
  <div class="container">
    <header class="jumbotron">
      <h3>{{content}}</h3>
    </header>
    <PostsList></PostsList>
    <AddPost></AddPost>
  </div>
</template>

<script>
import UserService from '../services/user.service';
import PostsList from "@/components/PostsList";
import AddPost from "@/components/AddPost";

export default {
  name: 'User',
  components: { AddPost, PostsList},
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
