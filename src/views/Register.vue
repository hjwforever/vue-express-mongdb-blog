<template>
  <v-row >
    <v-col cols="4" offset="4" class="mt-5">
      <v-card color="#f7f7f7">
        <v-col cols="4" offset="4">
          <v-img src="//ssl.gstatic.com/accounts/ui/avatar_2x.png" max-width="96px" class="profile-img-card"></v-img>
        </v-col>
        <v-row>
          <v-col cols="8" offset="2">
            <v-form
                ref="form"
                v-model="valid"
            >
              <v-text-field
                  v-model="user.username"
                  :counter="10"
                  :rules="usernameRules"
                  label="username"
                  required
              ></v-text-field>

              <v-text-field
                  v-model="user.email"
                  :rules="emailRules"
                  label="E-mail"
                  required
              ></v-text-field>

              <v-text-field
                  v-model="user.password"
                  :rules="passwordRules"
                  label="password"
                  type="password"
                  required
              ></v-text-field>

              <v-text-field
                  v-model="rePassword"
                  :rules="rePasswordRules"
                  label="rePassword"
                  type="password"
                  required
              ></v-text-field>

              <v-card-actions >
                <v-spacer></v-spacer>
                <v-btn
                    color="primary"
                    class="mr-4"
                    to="/login"
                    style="text-decoration: none"
                >
                  前往登录
                </v-btn>
                <v-btn
                    :disabled="!valid"
                    color="success"
                    class="mr-4"
                    @click="handleRegister"
                >
                  注册
                </v-btn>

                <v-btn
                    color="accent"
                    class="mr-4"
                    @click="reset"
                >
                  清除
                </v-btn>
              </v-card-actions>
            </v-form>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import User from '../models/user';

export default {
  name: 'Register',
  data() {
    return {
      valid: false,
      user: new User('', '', ''),
      usernameRules: [
        v => !!v || '请输入用户名',
        v => (v && v.length >= 3 && v.length <= 10) || '用户名长度为3~10位',
      ],
      emailRules: [
        v => !!v || '请输入邮箱',
        v => /.+@.+\..+/.test(v) || '邮箱格式错误',
      ],
      passwordRules: [
        v => !!v || '请填写密码',
        v => (v && v.length >= 6 && v.length <= 18) || '密码长度为6~18位',
      ],
      rePassword: '',
      rePasswordRules: [
        v => !!v || '请确认密码',
        v => (v && v === this.user.password) || '两次密码输入不一致',
      ],
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },
  mounted() {
    if (this.loggedIn) {
      this.$router.push('/profile');
    }
  },
  methods: {
    handleRegister() {
      this.$validator.validate().then(isValid => {
        if (isValid) {
          this.$store.dispatch('auth/register', this.user).then(
              () => {
                this.$send(this.user.username+'注册成功! ','success');
                this.$router.push('/user');
              },
              error => {
                this.$send(this.user.username+'注册失败!'+
                    error.toString(),'error');
              }
          );
        }
      });
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
