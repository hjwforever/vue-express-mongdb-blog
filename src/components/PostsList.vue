<template>
  <v-app>
    <v-row align="center" class="list px-3 mx-auto">
      <v-spacer></v-spacer>
      <!-- 搜索栏 -->
      <v-row elevation="12">
        <v-col cols="12" sm="8">
          <v-text-field v-model="search" prepend-icon="mdi-magnify" label="可输入文章标题或作者进行查找" class="input-search" v-on:keyup.enter="page = 1; retrievePosts();"></v-text-field>
        </v-col>
        <v-col cols="12" sm="2">
          <v-btn
              class="mx-2"
              fab
              dark
              color="cyan"
              @click="page = 1; retrievePosts();"
          >
            <v-icon dark>
              mdi-magnify
            </v-icon>
          </v-btn>
        </v-col>
      </v-row>

      <!--  文章列表  -->
      <v-col cols="12" sm="12">
        <v-card class="mx-auto" tile elevation="18">
          <template v-slot:expanded-item="{ headers, item }">
            <td :colspan="headers.length">
              More info about {{ item.title }}
            </td>
          </template>

          <!-- 标题及功能按钮(添加新文章, 刷新列表, 删除所有(需要管理员权限才显示)) -->
          <v-card-title>
            文章列表
            <!-- 按钮,添加新文章 -->
            <PostDialogFrom @addPost="addPost"></PostDialogFrom>
            <!-- 按钮,刷新文章列表 -->
            <v-btn tile dark color="green" @click="refreshList(true)">
              <v-icon left>mdi-cached</v-icon>
              刷新列表
            </v-btn>
            <!-- 按钮,删除所有文章 -->
            <v-btn class="mx-auto" tile dark color="error" @click="removeAllPosts" v-if=isAdmin()>
              <v-icon left>mdi-delete</v-icon>
              删除所有
            </v-btn>
          </v-card-title>

          <!-- 分页选择按钮 -->
          <v-row class="mx-auto">
            <v-col cols="4" sm="3">
              <v-select
                  v-model="pageSize"
                  :items="pageSizes"
                  label="每页文章数"
                  @change="handlePageSizeChange"
              ></v-select>
            </v-col>

            <v-col cols="12" sm="9">
              <v-pagination
                  v-model="page"
                  :length="totalPages"
                  circle
                  total-visible="7"
                  next-icon="mdi-menu-right"
                  prev-icon="mdi-menu-left"
                  @input="handlePageChange"
              ></v-pagination>
            </v-col>
          </v-row>
          <v-data-table
              :headers="headers"
              :items="posts"
              disable-pagination
              :hide-default-footer="true"
          >
            <template v-slot:[`item.author`]="{ item }">
              <v-chip pill>
                <v-avatar left>
                  <v-img src="http://img.aruoxi.top/image/favcionx32.ico"></v-img>
                </v-avatar>
                {{ item.author }}
              </v-chip>
            </template>
            <template v-slot:[`item.actions`]="{ item }">
<!--              <v-icon small class="mr-2" @click="editpost(item.id)">-->
<!--                mdi-pencil-->
<!--              </v-icon>-->
              <Post :currentPost="item.post" @editPost="editPost"></Post>
              <v-icon small color="error" @click="deletePost(item.id)">
                mdi-delete
              </v-icon>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
import PostDataService from "../services/PostDataService";
import PostDialogFrom from "@/components/PostDialogFrom";
import Post from "@/components/Post";

export default {
  name: "posts-list",
  inject:['currentUser','send'],
  components: { Post, PostDialogFrom },
  data() {
    return {
      alert: true,
      success_msg: false,
      warn_msg: false,
      msg: 'this is a alert message',
      timeout: 1100,
      posts: [],
      currentPost: null,
      currentIndex: -1,
      search: "",
      formTitle: "新文章",
      form: {
        id: null,
        title: '',
        content: '',
        author: ''
      },
      headers: [
        { text: "标题", align: "start", sortable: false, value: "title" },
        { text: "内容", value: "content", sortable: false },
        { text: "作者", value: "author", sortable: false },
        { text: "编辑/删除", value: "actions", sortable: false },
      ],
      page: 1,
      totalPages: 0,
      pageSize: "all",
      pageSizes: [3, 6, 9, "all"],
    };
  },
  methods: {
    // 分页相关
    getRequestParams(search, page, pageSize) {
      let params = {};

      if (search) {
        params["title"] = search;
      }

      if (page) {
        params["page"] = page - 1;
      }

      if (pageSize) {
        params["size"] = pageSize;
      }

      if (search){
        params["title"] = search;
        params["author"] = search;
      }

      return params;
    },
    handlePageChange(value) {
      this.page = value;
      this.retrievePosts();
    },

    handlePageSizeChange(size) {
      this.pageSize = size;
      this.page = 1;
      this.retrievePosts();
    },

    getDisplayPost(post) {
      return {
        id: post.id,
        title: post.title.substr(0, 20) + "...",
        content: post.content.substr(0, 20) + "...",
        author: post.author,
        post: post
      };
    },

    // 新增文章结果
    addPost(addPost) {
      console.log(addPost.msg);
      if (addPost.success){
        this.send(addPost.msg,'success');
      }
      else this.send(addPost.msg,'error');
      this.refreshList();
    },

    // 编辑文章结果
    editPost(editPost) {
      console.log(editPost.msg);
      if (editPost.success){
        this.send(editPost.msg,'success');
      }
      else  this.send(editPost.msg,'error');
      this.refreshList();
    },

    //  更新文章
    updatePost() {
      const data = {
        title: this.form.title,
        content: this.form.content,
      };
      PostDataService.update(this.currentPost.id,data)
          .then(response => {
            this.form.id = response.data.id;
            console.log(response.data);
            this.submitted = true;
            this.refreshList();
          })
          .catch(e => {
            console.log(e);
          });
    },

    //判断是否为管理员
    isAdmin() {
      let roles = JSON.parse(localStorage.getItem("user")).roles;
      for (let role of roles) {
        if (role==="ROLE_ADMIN"||role==="ROLE_MODERATOR"){
          return true;
        }
      }
      return false;
    },

    //获取mongodb中所有文章
    retrievePosts() {
      const params = this.getRequestParams(
          this.search,
          this.page,
          this.pageSize
      );

      PostDataService.getAll(params)
          .then(response => {
            const { posts, totalPages } = response.data;
            this.posts = posts.map(this.getDisplayPost);
            this.totalPages = totalPages;

            // this.posts = response.data;
            // console.log(response.data);
            // console.log("成功查询文章");
          })
          .catch(e => {
            console.log(e);
          });
    },

    //刷新文章列表
    refreshList(log) {
      this.retrievePosts();
      this.currentPost = null;
      this.currentIndex = -1;

      console.log('成功刷新文章列表');
      if(log) {
        this.send('成功刷新文章列表', 'success', 1000);
      }
    },

    setActivePost(post, index) {
      this.currentPost = post;
      this.currentIndex = index;
    },

    //删除所有,只有管理员权限才有这个按钮
    removeAllPosts() {
      alert("delete all");
      // swal({
      //   title:"是否确认删除所有文章",
      //   icon:"warning",
      //   buttons: true,
      //   dangerMode: true,
      // }).then((willDelete) => {
      //   if (willDelete){
      //     console.log("删除所有")
      //     PostDataService.deleteAll()
      //         .then(response => {
      //           console.log(response.data);
      //           this.refreshList();
      //         })
      //         .catch(e => {
      //           console.log(e);
      //         });
      //   }
      // });
    },

    //搜索标题title或作者author
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

    //删除选中文章
    deletePost() {
      alert("deletPost");
      // swal({
      //   title:"是否确认删除该文章",
      //   icon:"warning",
      //   buttons: true,
      //   dangerMode: true,
      // }).then((willDelete) => {
      //   if (willDelete){
      //     PostDataService.delete(this.currentPost.id)
      //         .then(response => {
      //           console.log(response.data);
      //
      //           this.refreshList();
      //           // this.reload();
      //         })
      //         .catch(e => {
      //           console.log(e);
      //         });
      //   }
      // });
    },

    //保存新文章
    savePost() {
      var data = {
        title: this.form.title,
        content: this.form.content,
        author: this.$store.state.auth.user.username
      };
      PostDataService.create(data)
          .then(response => {
            this.form.id = response.data.id;
            console.log(response.data);
            this.submitted = true;
            this.refreshList();
          })
          .catch(e => {
            console.log(e);
          });
    }
  },
  mounted() {
    this.retrievePosts();
    this.isAdmin();
  }
};
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
.v-chip {
  user-select: none;
}

.theme--light .v-pagination .v-pagination__item {
  outline : 0;
}

li {
  outline : 0;
}
</style>
