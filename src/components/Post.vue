<template>
  <v-dialog v-model="editPostDialog"  max-width="600px" persistent>
    <template v-slot:activator="{ on, attrs }" >
        <v-btn
            tile
            icon
            color="primary"
            v-bind="attrs"
            v-on="on"
            @click="$emit('editStart',index);"
        >
          <v-icon small class="mr-2">
            mdi-pencil
          </v-icon>
        </v-btn>
    </template>

    <v-card  v-if="currentPost" class="container mx-auto">
      <v-card-title>编辑文章</v-card-title>

        <v-form v-model="valid" ref="form" lazy-validation>
          <v-col
              cols="12"
              sm="6"
              md="4"
          >
            <v-text-field
                label="文章标题"
                hint="文章标题"
                v-model="currentPost.title"
                :rules="[v => !!v || '标题不可为空']"
                required
            ></v-text-field>

            <v-icon color="blue darken-2">mdi-account</v-icon>
            <span>作者</span>
            <v-spacer></v-spacer>
            <v-chip pill>
              <v-avatar left>
                <v-img src="http://img.aruoxi.top/image/favcionx32.ico"></v-img>
              </v-avatar>
              {{ currentPost.author }}
            </v-chip>
          </v-col>

          <v-col cols="12" sm="12" md="12">
            <v-textarea
                label="文章内容"
                hint="文章内容"
                multi
                v-model="currentPost.content"
                auto-grow
                rows="3"
                clearable
                filled
                clear-icon="mdi-close-circle"
                :rules="[v => !!v || '文章内容不可为空']"
                required
            ></v-textarea>
          </v-col>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" small class="mr-2" @click="cancel">
              返回
            </v-btn>

            <v-btn color="error" small class="mr-2" @click="deletePost">
              删除
            </v-btn>

            <v-btn color="success" small :disabled="!valid" @click="updatePost">
              更新
            </v-btn>
          </v-card-actions>
        </v-form>
    </v-card>

    <v-card v-else>
      <br />
      <v-card-text>请选中文章以显示详情...</v-card-text>
    </v-card>
  </v-dialog>


</template>

<script>
import PostDataService from "../services/PostDataService";

export default {
  name: "post",
  props:{
    currentPost: null,
    currentPost_copy: null,
    index: Number
  },
  data() {
    return {
      valid: false,
      editPostDialog: false,
      editPost:{
        success: false,
        msg: '',
        index: -1,
      },
    };
  },
  methods: {
    // 取消
    cancel() {
      this.editPostDialog=false;
      this.$emit('cancelEdit',this.index);
    },
    // 删除
    deletePost() {
      if(!this.isAdmin){
        console.log('抱歉,你没有删除权限!');
        this.$swal.fire({
          title: '抱歉,你没有删除权限!',
          icon: 'error',
          text: '或许你可以向管理员申请权限...',
          confirmButtonText: '好吧',
        });
        this.currentPost= this.currentPost_copy;
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
                PostDataService.delete(this.currentPost.id)
                    .then(response => {
                      console.log(response.data);
                      this.editPost.success = true;
                      this.editPost.msg = '该文章已成功删除!';
                    })
                    .catch(e => {
                      console.log(e);
                      this.editPost.success = false;
                      this.editPost.msg = e.toString();
                    })
                    .finally(() => {
                      this.editPost.index = -1;
                      this.$emit("editPost", this.editPost);
                    })
              }
        })
      }
      this.editPostDialog=false
    },
    // 更新
    updatePost() {
      if(!this.isAdmin){
        console.log('抱歉,你没有更新权限!');
        this.currentPost = this.currentPost_copy;
        this.$swal.fire({
          title: '抱歉,你没有更新权限!',
          icon: 'error',
          text: '或许你可以向管理员申请权限...',
          confirmButtonText: '好吧',
        });
      }
      else {
        PostDataService.update(this.currentPost.id, this.currentPost)
            .then(response => {
              console.log(response.data);
              this.editPost.index = this.index;
              this.editPost.success = true;
              this.editPost.msg = '该文章已成功更新!';
            })
            .catch(e => {
              console.log(e);
              this.editPost.index = -1;
              this.editPost.success = false;
              this.editPost.msg = e.toString();
            })
            .finally(() => {
              this.$emit("editPost", this.editPost);
            });
      }
      this.editPostDialog=false
    },
    // 通过id从服务器获取相应文章
    getPost() {
      PostDataService.get(this.currentPost.id)
          .then(response => {
            this.currentPost = response.data;
            //this.$parent.posts[this.currentPost.index].post = response.data;
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
    },
  },
  computed: {
    // 获取当前用户信息
    currentUser() {
      return this.$store.state.auth.user;
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
  // watch: {
  //   postTitle(title) {
  //     console.log(title);
  //     if (this.editPostDialog){
  //       this.$emit('editStart',this.editPost.index);
  //     }else {
  //       this.$emit('editEnd',this.editPost.index);
  //     }
  //   }
  // }
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>
