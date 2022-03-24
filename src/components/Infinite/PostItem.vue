<template>
  <v-card
      :color='color'
      dark
      elevation="20"
  >
      <v-card-title>{{ post.title }}</v-card-title>
      <v-card-subtitle>
        作者:
        <v-chip pill dark color="#52c147" >
          <v-avatar left>
            <v-img :src="authorUrl"></v-img>
          </v-avatar>
          {{ post.author }}
        </v-chip>
        {{ post.createdAt.substr(0,10) }}  {{ post.createdAt.substr(11,8) }}

        <span v-if="post.createdAt !== post.updatedAt">
          最后修改于 {{ post.updatedAt.substr(0,10) }}  {{ post.updatedAt.substr(11,8) }}
        </span>
      </v-card-subtitle>

      <v-col cols="6" offset="3">
        <v-card-text >
          <v-row v-for="(line, index) in post.content.split('\n')" :key="index">{{ line }}</v-row></v-card-text>
      </v-col>

    <v-col cols="1" offset="8">
      <v-card-actions>
        <v-btn
            icon
            tile
            @click="like(false)">
          {{ post.likes.length }}
          <v-icon right color="blue">
            mdi-thumb-up
          </v-icon>
        </v-btn>
        <v-btn
            icon
            tile
            @click="like(true)">
          <v-icon right color="purple">
            mdi-thumb-down
          </v-icon>
        </v-btn>
      </v-card-actions>
    </v-col>
  </v-card>
</template>

<script>
import PostDataService from "../../services/PostDataService";

export default {
  name: "PostItem",
  props: {
    post: {
      type: Object,
      required: true
    },
    color: {
      type: String,
      required: true,
      default: function () {
        return '#1F7087'
      }
    }
  },
  methods: {
    // 以当前登陆者的身份点赞
    like(unlike) {
      if (this.hasPermission()) {
        const data = {
          id: this.post.id,
          userId: this.currentUser.id,
          unlike: unlike //  Boolean值, 是否以当前登陆者的身份取消点赞
        }

        PostDataService.like(data)
          .then( res => {
            console.log(res.data)
            if (res.status===200){  // 操作(点赞或取消点赞)成功
              unlike ?   // 判断当前操作类型, 是否为取消点赞
                  this.post.likes.splice(this.post.likes.indexOf(this.currentUser.id), 1):  // 若取消点赞成功
                  this.post.likes.push(this.currentUser.id);                                // 若点赞成功
              this.$send(unlike ? '取消点赞成功!' : '点赞成功!', 'success', 1500);
            }
            else {   // 操作(点赞或取消点赞)重复
              this.$send(unlike ? '你现在没有对该文章点赞!' : '你已经点过赞了!', 'success', 1500);
            }
          })
          .catch( e => {
            console.log(e.toString())
          })
          .finally( () => {
            console.log(`当前文章《${this.post.title}》的点赞总数为${this.post.likes.length} ,列表(用户id)如下:`, this.post.likes);
          })
      }
    },

    // 判断是否登录
    hasPermission() {
      if(!this.currentUser){
        console.log('抱歉,请登录后再进行操作!');
        this.$swal.fire({
          title: '抱歉,请登录后再进行操作!',
          icon: 'error',
          confirmButtonText: '好吧',
        })

        return false;
      }
      return true;
    }
  },
  computed: {
    // 获取当前用户信息
    currentUser: function () {
      return  this.$store.state.auth.user;
    },
    authorUrl: function () {
      return `https://cdn.aruoxi.com/vue-express-blog/${this.post.author}.jpg`;
    }
  },
}
</script>

<style scoped>

</style>
