import { defineStore } from 'pinia';

export const useAccountStore = defineStore('account', {
  state: () => ({
    accountAddr: '0x35ea02C6b01e792982A61D1C78C72B9b823eAC1c',
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
