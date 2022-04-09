<template>
  <v-toolbar-title v-if="isHome">
    <v-row class="ml-2" align="center">
      <v-col class="text-h4 font-weight-black header-title" max-width="100px">Lara-vuetify</v-col>
    </v-row>
  </v-toolbar-title>
  <v-toolbar-title v-else>
    <v-row class="ml-2" align="center">
      <v-col class="text-h5 font-weight-black" max-width="100px">{{ $route.meta.title }}</v-col>
    </v-row>
  </v-toolbar-title>
</template>

<script>
export default {
  name: 'AppTitle',
  computed: {
    isHome: function () {
      return this.$route.name === 'Home'
    },
  },
}
</script>
<style lang="scss" scoped>
.header-note {
  width: 70%;
  white-space: pre-wrap;
}
</style>
