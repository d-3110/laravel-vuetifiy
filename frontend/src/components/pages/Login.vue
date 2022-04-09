<template>
  <v-row>
    <v-col cols="12" align="center">
      <h1>Lara-vuetify</h1>
      <v-alert v-model="alert" dismissible dense outlined type="error" max-width="500px">{{ error }}</v-alert>
      <Form :form="form" :handle-input="inputForm" :handle-login="login" :is-loading="isLoading" />
    </v-col>
  </v-row>
</template>

<script>
import Form from '@/components/organisms/app/form/Login'
export default {
  name: 'LoginPage',
  components: {
    Form,
  },
  data() {
    return {
      form: {},
      error: '',
      alert: false,
      isLoading: false,
    }
  },
  computed: {
    isAuth: function () {
      return this.$store.getters['auth/isAuth']
    },
  },
  methods: {
    inputForm: function (item) {
      const key = Object.keys(item)[0]
      const value = Object.values(item)[0]
      this.form[key] = value
    },
    login: async function (item) {
      this.isLoading = true
      await this.$store.dispatch('auth/login', this.form)
      if (this.isAuth) {
        this.$router.push('/')
      } else {
        this.error = this.$store.getters['auth/error']
        this.alert = true
        this.isLoading = false
      }
    },
  },
}
</script>

<style scoped></style>
