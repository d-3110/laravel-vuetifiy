<template>
  <div class="text-center">
    <v-dialog v-model="open" width="500">
      <v-card>
        <v-card-title>
          <span class="headline">パスワード変更</span>
        </v-card-title>
        <v-card-text>
          <InputPassword
            label="パスワード"
            id="password"
            rules="required"
            :value="form.password"
            :has-label="false"
            :handle-input="handleInput"
            :is-disabled="isLoading"
            :dense="true"
          />
          <InputPassword
            label="確認パスワード"
            id="passwordConfirm"
            :rules="{ required: true, match: [form.password, 'パスワード'] }"
            :value="form.passwordConfirm"
            :has-label="false"
            :handle-input="handleInput"
            :is-disabled="isLoading"
            :dense="true"
            :hide-details="false"
          />
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="handleAction">更新</v-btn>
          <v-btn color="primary" text @click="handleClose">閉じる</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import InputPassword from '@/components/molecules/InputPassword'
export default {
  name: 'PasswordDialog',
  components: {
    InputPassword,
  },
  props: {
    form: {
      type: Object,
      required: true,
    },
    isLoading: {
      type: Boolean,
      required: true,
    },
    isOpen: {
      type: Boolean,
      required: true,
    },
    handleAction: {
      type: Function,
      required: true,
    },
    handleInput: {
      type: Function,
      required: true,
    },
    handleClose: {
      type: Function,
      required: true,
    },
  },
  computed: {
    open: {
      get: function () {
        return this.isOpen
      },
      set: function () {
        this.handleClose()
      },
    },
  },
}
</script>
