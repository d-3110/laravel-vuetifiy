<template>
  <v-snackbar
    v-model="change"
    :color="color"
    :outlined="isOutline"
    :timeout="timeout"
    height="100"
    width="200"
    vertical
    centered
  >
    <v-icon v-show="isIcon" right :color="color">mdi-checkbox-marked-circle</v-icon>
    {{ message }}
    <template #action="{ attrs }">
      <v-btn :color="!isOutline ? 'white' : color" text v-bind="attrs" @click="handleClose">閉じる</v-btn>
    </template>
  </v-snackbar>
</template>
<script>
export default {
  name: 'SnackBar',
  props: {
    isSnackbar: {
      type: Boolean,
      default: false,
      required: true,
    },
    message: {
      type: String,
      default: '',
      required: true,
    },
    color: {
      type: String,
      default: '',
      required: true,
    },
    isOutline: {
      type: Boolean,
      default: true,
      required: false,
    },
    timeout: {
      type: Number,
      default: 5000,
      required: false,
    },
    isIcon: {
      type: Boolean,
      default: true,
      required: false,
    },
    handleClose: {
      type: Function,
      required: true,
    },
  },
  computed: {
    change: {
      get: function () {
        return this.isSnackbar
      },
      set: function () {
        return
      },
    },
  },
}
</script>
