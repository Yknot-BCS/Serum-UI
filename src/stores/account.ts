import { defineStore } from 'pinia';

export const useAccountStore = defineStore('account', {
  state: () => ({
    accountAddr: '0x2A0d9059075a84C280Db8f8542Bf7e7cD75F51f2',
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
