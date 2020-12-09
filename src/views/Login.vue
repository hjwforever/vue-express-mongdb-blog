<template>
  <v-row class="mx-auto mt-15">
    <v-col cols="6" offset="3" >
      <v-card color="#f7f7f7">
        <v-col offset="3" offset-sm="5">
          <v-img src="//ssl.gstatic.com/accounts/ui/avatar_2x.png" max-width="96px" class="profile-img-card"></v-img>
        </v-col>
        <v-col cols="8" offset="1" offset-sm="2" >
          <v-form
              ref="form"
              v-model="valid"
          >
            <v-text-field
                v-model="user.username"
                label="username"
                :rules="[v => !!v || '请输入用户名']"
                required
            ></v-text-field>


            <v-text-field
                v-model="user.password"
                label="password"
                type="password"
                :rules="[v => !!v || '请输入密码']"
                required
                @keydown.enter="handleLogin"
            ></v-text-field>


            <v-card-actions>
              <div class="m-auto">
                <v-btn
                    small
                    class="mr-4 mb-1"
                    color="primary"
                    to="/register"
                    style="text-decoration: none"
                >
                  前往注册
                </v-btn>
                <v-btn
                    :disabled="!valid"
                    class="mr-4 mb-1"
                    color="success"
                    @click="handleLogin"
                >
                  登录
                </v-btn>

                <v-btn
                    small
                    color="accent"
                    @click="reset"
                >
                  清除
                </v-btn>
              </div>
            </v-card-actions>
          </v-form>
        </v-col>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import User from '../models/user';

export default {
  name: 'Login',
  data() {
    return {
      valid: false,
      user: new User('', ''),
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },
  created() {
    if (this.loggedIn) {
      this.$router.push('/profile');
    }
  },
  methods: {
    handleLogin() {
      if (this.user.username && this.user.password) {
        this.$store.dispatch('auth/login', this.user).then(
            () => {
              this.$send(this.user.username+'登录成功!','success');
              this.$router.push('/user'); //登录成功则转到用户模块(文章管理模块)
            },
            error => {
              this.$send(this.user.username+'登录失败! '+error.toString(),'error');
            }
        );
      }
    },
    reset() {
      this.$refs.form.reset()
    },
  }
};
</script>

<style scoped>
.profile-img-card {
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  border-radius: 50%;
}
</style>
