<template>
  <v-pagination v-model="onInput" :length="maxPage" :total-visible="7" />
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    page: {
      type: Number,
      default: 1,
      required: true,
    },
    limit: {
      type: Number,
      default: 100,
      required: true,
    },
    total: {
      type: Number,
      default: 0,
      required: true,
    },
    displayLimit: {
      type: Number,
      default: 10,
      required: false,
    },
    handleChange: {
      type: Function,
      required: true,
    },
  },
  data: () => {
    return {}
  },
  computed: {
    maxPage: function () {
      let max = Math.ceil(this.total / this.displayLimit)
      if (max > this.limit) {
        return this.limit
      }
      return max
    },
    onInput: {
      get: function () {
        return this.page
      },
      set: function (value) {
        this.handleChange(value)
      },
    },
  },
}
</script>
