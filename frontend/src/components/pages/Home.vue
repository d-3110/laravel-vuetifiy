<template>
  <v-row>
    <v-col>
      <Menu />
    </v-col>
  </v-row>
</template>

<script>
import axios from '@/api/api'
import Menu from '@/components/organisms/app/list/HomeMenu'
export default {
  name: 'Home',
  components: {
    Menu,
  },
  data() {
    return {
      isLoading: false,
    }
  },
}
</script>

<style scoped></style>
