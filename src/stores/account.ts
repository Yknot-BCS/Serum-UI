import { defineStore } from 'pinia';

export const useAccountStore = defineStore('account', {
  state: () => ({
    accountAddr: '',
    tokenIds: [] as string[]
  }),

  getters: {
    getAccount(state) {
      return state.accountAddr;
    },
    isAuthorized(state) {
      return !!state.accountAddr;
    }
  },

  actions: {
    setAccountAddr(addr: string) {
      this.accountAddr = addr;
    }
  }
});
