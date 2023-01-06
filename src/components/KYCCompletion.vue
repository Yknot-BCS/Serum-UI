<script lang="ts">
import api from 'src/boot/api';
import { useLoginStore } from 'src/stores/login';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'KycCompletion',
  data() {
    return {
      msg: 'None',
      allNotValidated: true,
      usersNotValidated: [] as string[]
    };
  },
  async beforeMount() {
    await this.analyseUsers();
  },
  methods: {
    async analyseUsers() {
      await api.getUsersNotValidated().then((data) => {
        this.msg = data.msg;
        this.usersNotValidated = Object.assign([], data.usersNotValidated);
        const loginStore = useLoginStore();
        loginStore.isLoaded = true;
        if (this.usersNotValidated.length == 0) {
          this.allNotValidated = false;
        }
      });
    }
  },
});
</script>

<template lang="pug">
q-card.q-pa-sm.q-ma-sm(dark bordered)
  q-card-section.q-pa-md
    div.text-h6.row
      |  KYC Completion rate
      q-space
      |{{msg}}
  q-separator(dark inset)
  div(v-if="allNotValidated")
      div.q-pa-md Users who are not approved
      q-separator(dark inset)
      q-list.q-pl-md(dark)
        q-item.column.q-pl-sm(v-for="user in usersNotValidated" )
          q-item-section {{user }}
</template>

<style scoped lang="sass"></style>
