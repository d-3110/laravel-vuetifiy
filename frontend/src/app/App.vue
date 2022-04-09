<template>
  <!-- 画面ロード -->
  <v-app v-if="isLoading">
    <v-row justify="center" align="center">
      <v-progress-circular :size="100" :width="10" color="primary" indeterminate />
    </v-row>
  </v-app>
  <!-- ログイン中 -->
  <v-app v-else-if="isAuth">
    <NaviMenu />
    <AppBar :user="user" :handle-logout="logout" />
    <v-main>
      <v-container class="py-10 px-2">
        <router-view />
      </v-container>
    </v-main>
    <Footer />
  </v-app>
  <!-- ログイン画面 -->
  <v-app v-else>
    <LoginBar :handle-logout="logout" />
    <v-main>
      <v-container class="py-10 px-2">
        <router-view />
      </v-container>
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import AppBar from '@/components/organisms/app/common/AppBar'
import LoginBar from '@/components/organisms/app/common/LoginAppBar'
import NaviMenu from '@/components/organisms/app/common/NaviMenu'
import Footer from '@/components/organisms/app/common/Footer'
export default {
  name: 'App',
  components: {
    AppBar,
    LoginBar,
    NaviMenu,
    Footer,
  },
  data() {
    return {
      drawer: false,
    }
  },
  computed: {
    user: function () {
      return this.$store.getters['auth/user']
    },
    isAuth: function () {
      return this.$store.getters['auth/isAuth']
    },
    isLoading: function () {
      return this.$store.getters['auth/isLoading']
    },
  },
  watch: {
    $route(routeInstance) {
      this.createMeta(routeInstance)
    },
  },
  mounted: function () {
    this.createMeta(this.$route)
  },
  methods: {
    createMeta: function (router) {
      //タイトル
      if (router.meta.title) {
        document.title = router.meta.title + ' | Lara-vuetify'
      }
    },
    changeDrawer: function (value) {
      this.drawer = value
    },
    logout: async function () {
      await this.$store.dispatch('auth/logout')
      this.$router.push('/login')
    },
  },
}
</script>
<style lang="scss" scoped></style>
