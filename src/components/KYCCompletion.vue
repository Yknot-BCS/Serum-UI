<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<!-- eslint-disable vue/no-reserved-component-names -->
<!-- eslint-disable vue/multi-word-component-names -->
<script lang="ts">
import api from 'src/boot/api';
import { user } from 'src/pages/IndexPage.vue';
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'KycCompletion',
  data() {
    return {
      msg: '',
      allNotValidated: true,
      usersNotValidated: [] as unknown as user[]
    };
  },
  async beforeMount() {
    this.analyseUsers();
  },
  methods: {
    async analyseUsers() {
      const users = await api.getCollection('users');
      let count = 0;
      users.forEach((user: any) => {
        if (user.verifications.kyc === 'APPROVED') {
          count++;
        } else {
          this.usersNotValidated.push(user);
        }
      });
      if (count === users.length) {
        this.allNotValidated = false;
      }
      this.msg = `${count}/${users.length}`;
    }
  },
});
</script>

<template lang="pug">
q-card.q-pa-sm.q-ma-xs(dark bordered)
  q-card-section.q-pa-md
    div.text-h6.row
      |  KYC Completion rate
      q-space
      |{{msg}}
  q-separator(dark inset)
  div(v-if="allNotValidated")
      div.q-pa-md People who are not approved
      q-separator(dark inset)
      q-list.q-pl-md(dark)
        q-item.column.q-pl-sm(v-for="user in usersNotValidated")
          q-item-section {{user.name}}
</template>

<style scoped lang="sass">
.q-card
  background: linear-gradient(to right bottom, $primary, $secondary)
  width: 100%
  width: 400px
</style>
