<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="title">Title</label>
        <input
            type="text"
            class="form-control"
            id="title"
            required
            v-model="post.title"
            name="title"
        />
      </div>

      <div class="form-group">
        <label for="content">Content</label>
        <input
            class="form-control"
            id="content"
            required
            v-model="post.content"
            name="content"
        />
      </div>

      <button @click="savePost" class="btn btn-success">发表</button>
    </div>

    <div v-else>
      <h4>已成功发表博客文章!</h4>
      <button class="btn btn-success" @click="newTutorial">再次添加</button>
    </div>
  </div>
</template>

<script>
import PostDataService from "../services/PostDataService";

export default {
  name: "add-post",
  data() {
    return {
      post: {
        id: null,
        title: "",
        content: "",
      },
      submitted: false
    };
  },
  methods: {
    savePost() {
      var data = {
        title: this.post.title,
        description: this.post.content
      };

      PostDataService.create(data)
          .then(response => {
            this.post.id = response.data.id;
            console.log(response.data);
            this.submitted = true;
          })
          .catch(e => {
            console.log(e);
          });
    },

    newTutorial() {
      this.submitted = false;
      this.post = {};
    }
  }
};
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>
