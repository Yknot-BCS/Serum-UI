<script lang="ts">
import api from 'src/boot/api';
import { useLoginStore } from 'src/stores/login';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'KycCompletion',
  data() {
    return {
      store: useLoginStore(),
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
        if (this.usersNotValidated.length == 0) {
          this.allNotValidated = false;
        }
      });
    }
  }
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
    q-expansion-item(
      switch-toggle-side
      expand-separator
      label="Users who are not approved"
      v-model="store.expanded"
      @show="store.expanded = true"
      @hide="store.expanded = false"
    )
      q-list.q-pl-md(dark)
        q-separator(dark)
        q-item.column.q-pl-md(v-for="user in usersNotValidated" )
          q-item-section {{user }}
</template>

<style scoped lang="sass"></style>
