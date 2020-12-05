<template>
  <v-app>
      <v-app-bar app dark flat >
        <v-app-bar-nav-icon @click.prevent class="mr-3">
          <v-img src="http://img.aruoxi.top/image/favcionx64.ico" draggable="false"></v-img>
        </v-app-bar-nav-icon>
<!--        <v-icon href class="navbar-brand" @click.prevent>-->
<!--          &lt;!&ndash;:src="require('./assets/logo.png')"&ndash;&gt;-->
<!--          <v-img src="http://img.aruoxi.top/image/favcionx64.ico" draggable="false"></v-img></v-icon>-->

        <!-- 主页,不需要权限 -->
        <v-btn to="/home" text style="text-decoration:none;">
          <v-icon>mdi-home</v-icon>
          主页
        </v-btn>

        <!-- 需要有管理员权限才会显示 -->
<!--        <v-btn v-if="showAdminBoard" to="/admin" text style="text-decoration:none;">-->
<!--          管理员面板-->
<!--        </v-btn>-->

        <!-- 只需要登陆后的用户权限 -->
        <v-btn v-if="currentUser" to="/user" text style="text-decoration:none;">
          <v-icon>mdi-file-cog-outline</v-icon>
          文章管理
        </v-btn>

        <v-spacer></v-spacer>

        <!-- 未登录则显示 注册 和 登录 按钮 -->
        <div v-if="!currentUser">
          <v-btn to="/register" text style="text-decoration:none;">
            <v-icon>mdi-account-plus-outline</v-icon>
            注册
          </v-btn>
          <v-btn  to="/login" text style="text-decoration:none;">
            <v-icon>mdi-login-variant</v-icon>
            登录
          </v-btn>
        </div>

        <!-- 登录则显示 个人信息 和 登出 按钮 -->
        <div v-else>
          <v-btn  to="/profile" text style="text-decoration:none;">
            <v-icon>mdi-account</v-icon>
            {{ currentUser.username }}
          </v-btn>
          <v-btn  @click.prevent="logOut" text style="text-decoration:none;">
            <v-icon>mdi-logout-variant</v-icon>
            登出
          </v-btn>
        </div>
      </v-app-bar>
    <v-main>
      <router-view />
      <!--消息提示, 由Vuetify的snackbar自行封装而成的消息通知组件-->
      <Message></Message>
    </v-main>
    <Footer></Footer>
  </v-app>
</template>

<script>
import Message from "@/components/Snackbar";
import Footer from "@/components/Footer";

export default {
  name: 'App',
  components:{
    Message,
    Footer
  },
  provide(){
    return{
      currentUser:this.currentUser,
    }
  },
  data () {
    return {
      isRouterAlive: true
    }
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    showAdminBoard() {
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes('ROLE_ADMIN');
      }

      return false;
    },
    showModeratorBoard() {
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes('ROLE_MODERATOR');
      }

      return false;
    }
  },
  methods: {
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    },
    // reload () {
    //   this.isRouterAlive = false
    //   this.$nextTick(() => (this.isRouterAlive = true))
    // }
  }
};
</script>

<style scoped>
  .navbar-brand img {
    margin: 0;
    padding: 0;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    border-radius: 50%;
    border: 1px solid #333;
    text-decoration: none;
  }

  .title-heading {
    text-align: center;
    /*margin-bottom: 8rem;*/
    color: rgba(0,0,0,0.75);
    text-shadow: 0.4rem 0.5rem 0.3rem rgba(0, 0, 0, 0.5);
  }
  .container {
    position: absolute;
    top: 2rem;
  }

  .inline-button {
  //display:inline-block;
  //margin: 22px;
  }
</style>
