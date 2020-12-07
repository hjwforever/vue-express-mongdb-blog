<template>
  <div>
    <!--    <v-parallax :src="require('../assets/bg.jpg')" elevation="18"></v-parallax>-->
    <v-row class="text-center">
      <v-col cols="2" offset="5">
        <v-img
            :src="require('../assets/logo.png')"
            contain
            class="circle-img"
        ></v-img>
      </v-col>
    </v-row>


    <v-col cols="8" offset="2">
      <v-card class="text-center" elevation="20">
        <!-- 如果已登录 -->
        <v-col v-if="currentUser">
          <h6 class="display-1 font-weight-bold mb-3" style="user-select: none">
            Hello,  <span class="blue--text">{{ currentUser.username }}</span> !<br />
            Welcome to <a href="https://github.com/hjwforever/vue-express-mongdb-blog" target="_blank">Vue-Express-MongoDB-Blog</a> by <span class="font-italic">HJW</span>
          </h6>
        </v-col>
        <!-- 如果未登录 -->
        <v-col v-else class="m-4">
          <h6 class="display-1 font-weight-bold" style="user-select: none">
            Hello !<br>
            Welcome to <a href="https://github.com/hjwforever/vue-express-mongdb-blog" target="_blank">Vue-Express-MongoDB-Blog</a> by <span class="font-italic">HJW</span><br><br>
            ①普通账号(可注册), 不具有删除及修改权限:<br>
            <v-chip x-large text-color="blue" label> 用户名: test  密码:123456</v-chip> <br>
            ②管理员账号(联系管理员注册), 具有删除及修改权限:<br>
            <v-chip x-large text-color="blue" label> 用户名: hjw   密码:123456</v-chip>
          </h6>
        </v-col>
      </v-card>
    </v-col>


    <!-- 拓展列表, 可无限加载服务器中的文章数据, 点击展开查看细节 -->
    <v-col cols="10" offset="1">
      <v-expansion-panels focusable popout>
      <v-app-bar aria-expanded="false" class="v-expansion-panel"  src="https://picsum.photos/2019/1080?random">
        <v-row no-gutters class="text-warning">
          <v-col cols="3">
            <v-card-title>
              序号 标题
            </v-card-title>
          </v-col>
          <v-col cols="2">
            <v-card-title>
              作者
            </v-card-title>
          </v-col>
          <v-col
              cols="7"
          >
            <v-card-title>
              内容
            </v-card-title>
          </v-col>
        </v-row>
      </v-app-bar>
      <v-expansion-panel v-for="(post, index) in posts" :key="post.id" >
        <v-expansion-panel-header :color="colors[index%colors.length]" class="text-white">
          <template v-slot:default="{ open }">
            <v-row no-gutters>
              <v-col cols="3">
                {{ index+1 }}.  {{ post.title }}
              </v-col>
              <v-col cols="2">
                <v-fade-transition leave-absolute>
                  <v-chip v-if="!open" pill dark color="#52c147" >
                    <v-avatar left>
                      <v-img :src="authorUrl(post.author)"></v-img>
                    </v-avatar>
                    {{ post.author }}
                  </v-chip>
                </v-fade-transition>
              </v-col>
              <v-col
                  cols="7"
                  class="text--secondary"
              >
                <v-fade-transition leave-absolute>
                  <span
                      v-if="!open"
                      class="text-white"
                  >
                    {{ post.content.length>20 ? post.content.substr(0, 20) + "..." : post.content }}
                  </span>
                </v-fade-transition>
              </v-col>
            </v-row>
          </template>
        </v-expansion-panel-header>
        <v-expansion-panel-content class="mt-4">
          <PostItem :post="post" :color="colors[index%colors.length]"></PostItem>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    </v-col>
    <!-- 随着页面下滚动, 无限从服务器数据库获取数据 -->
    <infinite-loading @infinite="infiniteHandler"></infinite-loading>
  </div>
</template>

<script>
import PostItem from "@/components/Infinite/PostItem";
import PostDataService from "@/services/PostDataService";

export default {
  name: 'Home',
  components: {PostItem,},
  data: () => ({
    page: 0,
    size: 6, //每次加载文章数
    posts: [],
    colors: ["#f94144","#f3722c","#f8961e","#f9844a","#f9c74f","#90be6d","#43aa8b","#4d908e","#577590","#277da1"],
  }),
  methods: {
    infiniteHandler($state, page, size) {
      const params= {
              page: page||this.page,
              size: size||this.size,
            };
      PostDataService.getAll(params).
        then(({ data }) => {
          if (data.posts.length) {
            this.page += 1;
            // console.log(data);
            // console.log(data.posts);
            this.posts.push(...data.posts);
            $state.loaded();
          } else {
            $state.complete();
          }
        });
    },
    authorUrl(author) {
      return `http://img.aruoxi.top/image/${author}.jpg`;
    }
  },
  computed: {
    currentUser() {
      let user = this.$store.state.auth.user;
      if(!user){
        this.$send('暂无发表或管理文章的权限,请登录或注册', 'error', 10000);

      }
      return user;
    },
  },
}
</script>

<style scoped>
.circle-img {
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  border-radius: 50%;
}
</style>
