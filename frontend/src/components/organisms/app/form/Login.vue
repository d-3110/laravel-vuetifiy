<template>
  <ValidationObserver ref="obs" v-slot="{ handleSubmit, invalid }">
    <v-form @submit.prevent="handleSubmit(onLogin)">
      <v-card flat class="mt-6" max-width="500px">
        <InputText
          label="メールアドレス"
          id="email"
          rules="required"
          :value="form.email"
          :handle-input="handleInput"
          :has-label="false"
          :is-disabled="false"
          :hide-details="true"
          :immediate="false"
        />
        <InputPassword :handle-input="handleInput" :value="form.password" />
        <v-card-actions class="d-flex justify-center mb-6">
          <v-btn color="primary" type="submit" width="120px" :loading="isLoading" :disabled="invalid">ログイン</v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </ValidationObserver>
</template>

<script>
import InputText from '@/components/molecules/InputText'
import InputPassword from '@/components/molecules/InputPassword'
export default {
  name: 'LoginForm',
  components: {
    InputText,
    InputPassword,
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
    handleLogin: {
      type: Function,
      default: () => {},
      required: true,
    },
    isLoading: {
      type: Boolean,
      default: () => false,
      required: true,
    },
  },
  methods: {
    onLogin: function () {
      this.handleLogin()
    },
  },
}
</script>

<style scoped></style>
