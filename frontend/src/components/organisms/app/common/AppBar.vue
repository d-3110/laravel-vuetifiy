<template>
  <v-app-bar app flat :height="barHeight" class="header">
    <AppTitle />
    <v-spacer />
    <UserMenu :user="user" :handle-logout="handleLogout" />
  </v-app-bar>
</template>

<script>
import AppTitle from '@/components/molecules/AppTitle'
import UserMenu from '@/components/molecules/UserMenu'
export default {
  name: 'AppBar',
  components: {
    AppTitle,
    UserMenu,
  },
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
  computed: {
    barHeight: function () {
      return this.$route.name === 'Home' ? '80px' : '64px'
    },
  },
}
</script>
<style lang="scss" scoped>
.header {
  background-color: #fff !important;
  border-bottom: 1px solid #d2d2d2 !important;
}
</style>
