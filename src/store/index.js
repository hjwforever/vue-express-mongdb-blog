import Vue from 'vue';
import Vuex from 'vuex';

import { auth } from './auth.module';
import { snackbar } from "./snackbar.module";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        auth,
        snackbar
    }
});
