<template>
  <v-app>
    <v-row align="center" class="list-group px-3 mx-auto">
      <v-spacer></v-spacer>
      <!-- 搜索栏 -->
      <v-row elevation="12" class="flex">
        <v-col cols="12" sm="8">
          <v-text-field v-model="search" clearable prepend-icon="mdi-magnify" label="可输入文章标题或作者进行查找" class="input-search" v-on:keyup.enter="page = 1; retrievePosts();"></v-text-field>
          <template >

          </template>
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
      <v-card class="mx-auto" tile elevation="18">
        <template v-slot:expanded-item="{ headers, item }">
          <td :colspan="headers.length">
            More info about {{ item.title }}
          </td>
        </template>

        <!-- 标题及功能按钮(添加新文章, 刷新列表, 删除所有(需要管理员权限才显示)) -->
        <v-card-title class="list">
          <v-row>
            <v-col cols="12" sm="4" class="ml-1">
              <h2>文章列表</h2>
            </v-col>
            <!-- 按钮,添加新文章 -->
            <v-col cols="12" sm="2" class="mr-5">
              <PostDialogFrom @addPost="addPost"></PostDialogFrom>
            </v-col>
            <!-- 按钮,刷新文章列表 -->
            <v-col cols="12" sm="2" class="ml-5">
              <v-btn tile dark color="green" @click="refreshList()">
                <v-icon left>mdi-cached</v-icon>
                刷新列表
              </v-btn>
            </v-col>
            <!-- 按钮,删除所有文章 -->
            <v-col cols="12" sm="2" class="ml-5">
              <v-btn class="mx-auto" tile dark color="error" @click="removeAllPosts">
                <v-icon left>mdi-delete</v-icon>
                删除所有
              </v-btn>
            </v-col>
          </v-row>
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

          <!-- 分页(页数选择) -->
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
            :loading="loading"
            loading-text="获取所有文章中..."
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
            <Post :index="item.index" :currentPost="item.post" :currentPost_copy="item.post" @cancelEdit="cancelEdit" @editPost="editPost"></Post>
            <v-icon small color="error" @click="deletePost(item.id)">
              mdi-delete
            </v-icon>
          </template>
        </v-data-table>
      </v-card>
    </v-row>
    <v-spacer></v-spacer>
  </v-app>
</template>

<script>
import PostDataService from "../services/PostDataService";
import PostDialogFrom from "@/components/PostDialogFrom";
import Post from "@/components/Post";

export default {
  name: "posts-list",
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
      loading: true,
      headers: [
        { text: "标题", align: "start", sortable: false, value: "title" },
        { text: "内容", value: "content", sortable: false },
        { text: "作者", value: "author", sortable: false },
        { text: "编辑/删除", value: "actions", sortable: false },
      ],
      page: 1,
      totalPages: 0,
      pageSize: 6,
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
        post: post,
      };
    },

    // 新增文章结果
    addPost(addPost) {
      console.log(addPost.msg);
      if (addPost.success){
        this.$send(addPost.msg,'success');
      }
      else this.$send(addPost.msg,'error');
      this.refreshList();
    },

    // 编辑文章结果
    editPost(editPost) {
      console.log(editPost.msg);
      // alert(editPost.id);
      if (editPost.success){
        this.$send(editPost.msg,'success');
      }
      else  this.$send(editPost.msg,'error');

      // 如果是更新文章, 则刷新表格中该文章内容
      if(editPost.index !== -1){
        this.updateThePost(editPost.index);
      }
      // this.refreshList();
    },

    // 刷新表格显示的文章内容
    updateThePost(index) {
      this.posts[index].id = this.posts[index].post.id;
      this.posts[index].title = this.posts[index].post.title.substr(0, 20) + "...";
      this.posts[index].content = this.posts[index].post.content.substr(0, 20) + "...";
      this.posts[index].id = this.posts[index].post.author;
    },

    // 取消编辑
    cancelEdit(index) {
      console.log('取消编辑 文章序号:',index);
      // 只刷新该文章, 重新从服务器获取数据
      PostDataService.get(this.posts[index].id)
          .then(response => {
            this.posts[index].post = response.data;
            console.log('刷新该文章成功');
          })
          .catch(e => {
            console.log(e);
          });
    },

    //更据搜索框参数及分页数获取mongodb数据库中所有满足条件(标题或作者名符合)的文章
    retrievePosts() {
      const params = this.getRequestParams(
          this.search,
          this.page,
          this.pageSize
      );
      //显示加载进度条
      this.loading = true;
      PostDataService.getAll(params)
          .then(response => {
            const { posts, totalPages } = response.data;
            this.totalPages = totalPages;
            this.posts = posts.map(this.getDisplayPost);
            //加上序列号(不是id)方便定位识别
            for (let [index, post] of new Map(this.posts.map((item, i) => [i, item]))){
              post['index'] = index;
              // console.log(index,post);
            }
            //关闭加载进度条
            this.loading = false;
            this.$send('成功刷新文章列表, 文章总数:'+response.data.totalItems, 'success', 1000);
            console.log('成功查询, 文章总数:'+response.data.totalItems);
          })
          .catch(e => {
            console.log(e);
          });
    },

    //刷新文章列表
    refreshList() {
      this.retrievePosts();
      this.currentPost = null;
      this.currentIndex = -1;

      console.log('成功刷新文章列表');
    },

    //删除所有,只有管理员才有删除权限
    removeAllPosts() {
      if(!this.isAdmin){
        this.retrievePosts();
        console.log('抱歉,你没有删除权限!');
        this.$swal.fire({
          title: '抱歉,你没有删除权限!',
          icon: 'error',
          html: '或许你可以向管理员申请权限...<br>(或者使用他的账号 用户名: hjw 密码: 123456)',
          confirmButtonText: '好吧',
        })
      }
      else {
        this.$swal.fire({
          title: '是否确认删除所有文章',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#d33',
          confirmButtonText: '确认删除',
          cancelButtonText: '取消'
        }).then((result) => {
          if (result.isConfirmed) {
            PostDataService.deleteAll()
                .then(response => {
                  console.log(response.data);
                  this.$send('成功删除所有文章!', 'success');
                  this.refreshList();
                })
                .catch(e => {
                  console.log(e);
                  this.$send(e.toString(), 'error');
                });
          }
        })
      }
    },

    //删除选中文章,只有管理员才有删除权限
    deletePost(id) {
      if(!this.isAdmin){
        this.retrievePosts();
        console.log('抱歉,你没有删除权限!');
        this.$swal.fire({
          title: '抱歉,你没有删除权限!',
          icon: 'error',
          html: '或许你可以向管理员申请权限...<br>(或者使用他的账号 用户名: hjw 密码: 123456)',
          confirmButtonText: '好吧',
        })
      }
      else {
        this.$swal.fire({
          title: '是否确认删除该文章?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#d33',
          confirmButtonText: '确认删除',
          cancelButtonText: '取消'
        }).then((result) => {
          if (result.isConfirmed) {
            PostDataService.delete(id)
                .then(response => {
                  console.log(response.data);
                  // this.$send(response.data.message,'success');
                  this.$send('成功删除该文章!','success');
                  this.refreshList();
                })
                .catch(e => {
                  console.log(e);
                  this.$send(e.toString(),'error');
                });
          }
        })
      }
    },
  },
  computed: {
    // 获取当前用户信息
    currentUser: function () {
      return  this.$store.state.auth.user;
    },
    // 判断当前用户是否为管理员
    isAdmin: function () {
      for (let role of this.currentUser.roles) {
        if (role==="ROLE_ADMIN"||role==="ROLE_MODERATOR"){
          return true;
        }
      }
      return false;
    },
  },
  // 默认第一次加载所有文章数据
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
