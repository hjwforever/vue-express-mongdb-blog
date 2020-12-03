<template>
  <div class="flex">
    <v-dialog
        v-model="dialog"
        persistent
        max-width="600px"
    >
      <template v-slot:activator="{ on, attrs }" >
        <v-row
            align="center"
            justify="space-around"

        >
          <v-btn
              tile
              color="primary"
              v-bind="attrs"
              v-on="on"
          >
            <v-icon left>
              mdi-pencil
            </v-icon>
            添加新文章
          </v-btn>
        </v-row>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">新文章</span>
        </v-card-title>
        <v-card-text>
          <v-container fluid>
            <v-form
                ref="form"
                v-model="valid"
            >
            <v-row>
              <v-col
                  cols="12"
                  sm="6"
                  md="4"
              >
                <v-text-field
                    label="Title"
                    hint="文章标题"
                    v-model="title"
                    :rules="[v => !!v || '标题不可为空']"
                    required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-textarea
                    label="Content"
                    hint="文章内容"
                    v-model="content"
                    multi
                    auto-grow
                    rows="3"
                    clearable
                    clear-icon="mdi-close-circle"
                    :rules="[v => !!v || '文章内容不可为空']"
                    required
                ></v-textarea>
              </v-col>
<!--              <v-col-->
<!--                  cols="12"-->
<!--                  sm="6"-->
<!--              >-->
<!--                <v-autocomplete-->
<!--                    :items="['生活', '科技', '前端', '后端', 'Vue', 'Nodejs', '工具', '娱乐', '教程']"-->
<!--                    label="标签"-->
<!--                    multiple-->
<!--                ></v-autocomplete>-->
<!--              </v-col>-->
            </v-row>
            </v-form>
          </v-container>
        </v-card-text>
        <v-card-actions class="flex">
          <v-chip
              pill
          >
            <v-avatar left>
              <v-img src="http://img.aruoxi.top/image/favcionx32.ico"></v-img>
            </v-avatar>
            {{ currentUser.username }}
          </v-chip>

          <v-spacer></v-spacer>
          <v-btn
              right
              @click="reset"
          >
            取消
          </v-btn>

          <v-btn
              right
              :disabled="!valid"
              color="success"
              @click="savePost"
          >
            提交
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import PostDataService from "@/services/PostDataService";

export default {
  name: "PostDialogFrom",
  data: () => ({
      valid: true,
      dialog: false,
      title: '',
      content: '',
      addPost:{
        success: false,
        msg: '',
      },
      rules: {
      email: v => !!(v || '').match(/@/) || 'Please enter a valid email',
      length: len => v => (v || '').length >= len || `Invalid character length, required ${len}`,
      password: v => !!(v || '').match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(_|[^\w])).+$/) ||
          'Password must contain an upper case letter, a numeric character, and a special character',
      required: v => !!v || 'This field is required',
    },
  }),
  methods: {
    validate () {
      this.$refs.form.validate();
    },
    reset () {
      this.$refs.form.reset();
      this.dialog = false;
    },
    // resetValidation () {
    //   this.$refs.form.resetValidation()
    // },
    //保存新文章
    savePost() {
      const data = {
        title: this.title,
        content: this.content,
        author: this.currentUser.username
      };
      PostDataService.create(data)
          .then(response => {
            console.log(response.data);
            this.addPost.success = true;
            this.addPost.msg = '成功发表新文章!';
          })
          .catch(e => {
            this.addPost.success = false;
            this.addPost.msg = e.toString();
            console.log(e);
          })
          .finally(() => {
            this.$emit('addPost', this.addPost);
          });
      this.reset();
    }
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },

}
</script>
