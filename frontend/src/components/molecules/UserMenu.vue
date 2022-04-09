<template>
  <v-menu open-on-hover top offset-y>
    <template #activator="{ on, attrs }">
      <v-btn class="d-none d-md-flex d-lg-flex d-xl-flex" icon color="primary" dark v-bind="attrs" v-on="on">
        <v-icon large>mdi-account-circle</v-icon>
      </v-btn>
    </template>
    <v-list>
      <v-list-item link :to="`/user/${user.userId}`">
        <v-list-item-title>ユーザー詳細</v-list-item-title>
      </v-list-item>
      <v-list-item link @click="handleLogout">
        <v-list-item-title>ログアウト</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  name: 'UserMenu',
  props: {
    user: {
      type: Object,
      default: () => {},
      required: true,
    },
    handleLogout: {
      type: Function,
      default: () => {},
      required: true,
    },
  },
}
</script>
