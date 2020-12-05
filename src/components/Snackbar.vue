<template>
  <v-snackbar top text v-model="visible" :color="color">
    <v-icon dark :color="color">
      {{ icon }}
    </v-icon>
    {{ this.$store.state.snackbar.msg }}
    <!-- 关闭按钮 -->
    <template v-slot:action="{ attrs }" >
      <v-btn v-bind="attrs" v-if="showClose" icon @click="close" :color="color"
      ><v-icon>mdi-close</v-icon>
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    visible:{
      get: function (){
        return this.$store.state.snackbar.visible;
      },
      set: function (){
      }
    },
    icon:{
      get: function (){
        if (this.color === 'success'){
          return 'mdi-check';
        }else if(this.color === 'error'){
          return 'mdi-alert';
        }else {
          return '';
        }
      },
      set: function (){
      }
    },
    showClose() {
      return this.$store.state.snackbar.showClose;
    },
    color() {
      return this.$store.state.snackbar.color;
    },
  },
  methods: {
    close() {
      this.$store.commit("snackbar/CLOSE_SNACKBAR");
    },
  },
  send(msg, color, timeout) {
    this.$store.dispatch('snackbar/openSnackbar',{
      msg: msg,
      color: color,
      timeout: timeout
    })
  }
};
</script>
