<template>
  <div class="list row">
    <div class="col-md-8">
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Search by title or author"
               v-model="search"/>
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button"
                  @click="searchResult"
          >
            查找
          </button>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <h4>Posts List</h4>
      <ul class="list-group">
        <li class="list-group-item"
            :class="{ active: index == currentIndex }"
            v-for="(post, index) in posts"
            :key="index"
            @click="setActivePost(post, index)"
        >
          <h5>{{ post.title }}</h5>    <span>{{ post.author }}</span>6
        </li>
      </ul>

      <button class="m-3 btn btn-sm btn-danger" @click="removeAllPosts" v-if=isadmin()>
<!--      <button class="m-3 btn btn-sm btn-danger" @click="removeAllTutorials" v-if=>-->
        删除所有
      </button>
    </div>
    <div class="col-md-6">
      <div v-if="currentPost">
        <h4>Post</h4>
        <div>
          <label><strong>Title:</strong></label> {{ currentPost.title }}
        </div>
        <div>
          <label><strong>Author:</strong></label> {{ currentPost.author }}
        </div>
        <div>
          <label><strong>Content:</strong></label> {{ currentPost.content }}
        </div>
<!--        <div>-->
<!--          <label><strong>Status:</strong></label> {{ currentPost.published ? "Published" : "Pending" }}-->
<!--        </div>-->
        <!--class="badge badge-success mr-2"-->
        <button class="badge badge-primary mr-2"
                :href="'/posts/' + currentPost.id" @click="editpost"
        >
          编辑
        </button>
        <button class="badge badge-danger"
                @click="deletePost"
        >
          删除
        </button>

      </div>

      <div v-else>
        <br />
        <p>请选中文章以显示详情...</p>
      </div>
    </div>

  </div>
</template>

<script>
import PostDataService from "../services/PostDataService";

export default {
  name: "posts-list",
  // inject:['reload'],
  data() {
    return {
      posts: [],
      currentPost: null,
      currentIndex: -1,
      search: "",
    };
  },
  methods: {
    editpost() {
      this.$router.push({ name: "add" });
    },
    isadmin() {
      let roles = JSON.parse(localStorage.getItem("user")).roles;
      for (let role of roles) {
        if (role==="ROLE_ADMIN"||role==="ROLE_MODERATOR"){
          return true;
        }
      }
      return false;
    },
    retrievePosts() {
      PostDataService.getAll()
          .then(response => {
            this.posts = response.data;
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
    },

    refreshList() {
      this.retrievePosts();
      this.currentPost = null;
      this.currentIndex = -1;
    },

    setActivePost(post, index) {
      this.currentPost = post;
      this.currentIndex = index;
    },

    removeAllPosts() {
      PostDataService.deleteAll()
          .then(response => {
            console.log(response.data);
            this.refreshList();
          })
          .catch(e => {
            console.log(e);
          });
    },

    searchResult() {
      PostDataService.findByTitleOrAuthor(this.search)
          .then(response => {
            this.posts = response.data;
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
    },

    deletePost() {
      PostDataService.delete(this.currentPost.id)
          .then(response => {
            console.log(response.data);

            this.refreshList();
            // this.reload();
          })
          .catch(e => {
            console.log(e);
          });
    }
  },
  mounted() {
    this.retrievePosts();
  }
};
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>
