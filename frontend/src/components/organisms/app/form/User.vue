<template>
  <ValidationObserver ref="obs" v-slot="{ handleSubmit, invalid }">
    <v-form @submit.prevent="handleSubmit(onSubmit)">
      <v-card flat class="mt-6">
        <div>
          <InputText
            label="メールアドレス"
            id="email"
            rules="required"
            :value="form.email"
            :has-label="true"
            :handle-input="handleInput"
            :is-disabled="isLoading"
            :dense="true"
          />
          <InputText
            label="氏名"
            id="name"
            rules="required"
            :value="form.name"
            :has-label="true"
            :handle-input="handleInput"
            :is-disabled="isLoading"
            :dense="true"
          />
        </div>
        <v-card-actions class="d-flex justify-center mb-6">
          <v-btn color="primary" type="submit" width="120px" :loading="isLoading" :disabled="invalid">
            {{ isEdit ? '更新' : '登録' }}
          </v-btn>
          <v-btn
            v-if="isEdit"
            color="error"
            width="120px"
            :loading="isLoading"
            @click="handleDelete"
            :disabled="isDelete"
            class="ml-3"
          >
            削除
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </ValidationObserver>
</template>

<script>
import InputText from '@/components/molecules/InputText'
export default {
  name: 'UserForm',
  components: {
    InputText,
  },
  props: {
    form: {
      type: Object,
      default: () => {},
      required: true,
    },
    handleInput: {
      type: Function,
      default: () => {},
      required: true,
    },
    handleSave: {
      type: Function,
      default: () => {},
      required: true,
    },
    handleDelete: {
      type: Function,
      default: () => {},
      required: true,
    },
    isLoading: {
      type: Boolean,
      default: () => false,
      required: true,
    },
    exitstEmails: {
      type: Array,
      default: () => [],
      required: false,
    },
  },
  computed: {
    isEdit: function () {
      return this.$route.params.id
    },
    isDelete: function () {
      // ログイン中のユーザは削除できない
      return this.$route.params.id === this.loginUser.userId
    },
    loginUser: function () {
      return this.$store.getters['auth/user']
    },
    emailRules: function () {
      return {
        required: true,
        email: true,
        not_in_array: [this.exitstEmails, '登録済みメールアドレスです'],
      }
    },
  },
  methods: {
    onSubmit: function () {
      this.handleSave()
    },
  },
}
</script>

<style scoped></style>
