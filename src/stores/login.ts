import api from 'src/boot/api';
import { defineStore } from 'pinia';

export interface Login {
  username: string;
  password: string;
  isAuthorized?: boolean;
}

export const useLoginStore = defineStore('login', {
  state: (): Login => ({
    username: '',
    password: '',
    isAuthorized: false
  }),

  getters: {},

  actions: {
    setLoginDetails(_login: Login) {
      this.username = _login.username;
      this.password = _login.password;
    },

    async authorize() {
      if (this.isAuthorized) throw new Error('Already logged in');
      
      const res = await api.login(this.$state);
      this.isAuthorized = res;
    },

    clear() {
      this.$reset();
    }
  }
});
