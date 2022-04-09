<template>
  <v-navigation-drawer
    app
    permanent
    v-model="drawer"
    dark
    expand-on-hover
    disable-resize-watcher
    bottom
    :mini-variant.sync="mini"
    color="primary"
  >
    <v-list nav dense class="py-0">
      <v-list-item link dark v-for="item in $const.NAVI_MENUS" :key="item.title" :to="item.url" :exact="true">
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'NaviMenu',
  data() {
    return {
      drawer: false,
      clickable: false,
      mini: true,
    }
  },
}
</script>
<style lang="scss" scoped>
.v-application a {
  color: #fff;
}
</style>
