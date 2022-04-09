<template>
  <v-row justify="end">
    <v-col cols="1">
      <v-select :items="display" label="表示件数" v-model="onInput" dense />
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'DisplayLimit',
  props: {
    limit: {
      type: Number,
      default: 50,
      required: true,
    },
    handleChange: {
      type: Function,
      required: true,
    },
  },
  data: () => {
    return {
      display: [50, 100, 200],
    }
  },
  computed: {
    onInput: {
      get: function () {
        return this.limit
      },
      set: function (value) {
        this.handleChange(value)
      },
    },
  },
}
</script>
