<template>
  <div class="text-center">
    <v-dialog v-model="confirm" width="500">
      <v-card>
        <v-card-title>
          <span class="headline">{{ confirmArgs.isError ? 'エラー' : '確認' }}</span>
        </v-card-title>
        <v-card-text>{{ confirmArgs.message }}</v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn v-if="!confirmArgs.isError" color="primary" text @click="handleAction">OK</v-btn>
          <v-btn color="primary" text @click="handleClose">閉じる</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'ConfirmDialog',
  props: {
    handleAction: {
      type: Function,
      required: true,
    },
    isConfirm: {
      type: Boolean,
      default: false,
      required: true,
    },
    handleClose: {
      type: Function,
      required: true,
    },
    confirmArgs: {
      type: Object,
      default: () => {},
      required: true,
    },
  },
  computed: {
    confirm: {
      get: function () {
        return this.isConfirm
      },
      set: function () {
        this.handleClose()
      },
    },
  },
}
</script>
