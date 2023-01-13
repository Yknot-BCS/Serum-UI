import api from 'src/boot/api';
import { defineStore } from 'pinia';
const bcrypt = require('bcryptjs');

export interface Login {
  email: string;
  password: string;
  isAuthorized?: boolean;
  msg?: string;
  expanded?: boolean;
}

export const useLoginStore = defineStore('login', {
  state: (): Login => ({
    email: '',
    password: '',
    isAuthorized: false,
    msg: '',
    expanded: false
  }),

  getters: {},

  actions: {
    async setLoginDetails(_login: Login) {
      const res = await api.getUserSalt({ email: _login.email });
      if (res.msg != null) {
        this.msg = res.msg;
        return;
      }

      this.email = _login.email;
      const pass = _login.password;
      this.password = await bcrypt.hashSync(pass + res.salt, res.salt);
    },

    async authorize() {
      if (this.isAuthorized) throw new Error('Already logged in');
      await api.login(this.$state).then((res) => {
        this.isAuthorized = res.isAuthorized;
        this.msg = res.msg;
      });
    },

    clear() {
      this.$reset();
    }
  }
});
