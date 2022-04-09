<template>
  <section>
    <v-row>
      <v-col align="center">
        <Form
          :form="form"
          :is-loading="isLoading"
          :handle-input="inputForm"
          :handle-save="onSave"
          :handle-delete="onDelete"
          :exitst-emails="exitstEmails"
        />
      </v-col>
    </v-row>
    <SnackBar
      :is-snackbar="isSnackbar"
      :message="snackBarMessage"
      :is-outline="false"
      :handle-close="snackBarClose"
      :is-icon="false"
      :color="snackBarColor"
    />
    <ConfirmDialog
      :handle-action="confirmAction"
      :is-confirm="isConfirm"
      :handle-close="confirmClose"
      :confirm-args="confirmArgs"
    />
  </section>
</template>

<script>
import axios from '@/api/api'
import Form from '@/components/organisms/app/form/User'
import SnackBar from '@/components/molecules/SnackBar'
import ConfirmDialog from '@/components/molecules/ConfirmDialog'
export default {
  name: 'UserShow',
  components: {
    Form,
    SnackBar,
    ConfirmDialog,
  },
  data() {
    return {
      form: {
        role: 0,
      },
      isLoading: false,
      isSnackbar: false,
      isConfirm: false,
      confirmArgs: {
        isError: false,
        message: '',
      },
      snackBarMessage: '',
      snackBarColor: '',
      exitstEmails: [],
    }
  },
  computed: {
    loginUser: function () {
      return this.$store.getters['auth/user']
    },
    isEdit: function () {
      if (this.$route.params.id) {
        return true
      } else {
        return false
      }
    },
  },
  created: async function () {
    if (this.isEdit) {
      // 編集画面の場合
      this.isLoading = true
      const response = await axios.get(`user/${this.$route.params.id}`)
      this.setForm(response.data)
      this.isLoading = false
    } else {
      // メールアドレス一覧を取得
      this.isLoading = true
      const params = { pluck: 'email' }
      const response = await axios.get('user', params)
      this.exitstEmails = response.data.users
      this.isLoading = false
    }
  },
  methods: {
    inputForm: function (item) {
      const key = Object.keys(item)[0]
      const value = Object.values(item)[0]
      this.form[key] = value
    },
    setForm: function (user) {
      const name = user.name.split(' ')
      this.inputForm({ userId: user.userId })
      this.inputForm({ email: user.email })
      this.inputForm({ role: Number(user.role) })
      this.inputForm({ name: user.name })
      this.inputForm({ lastName: name[0] })
      this.inputForm({ firstName: name[1] })
    },
    onSave: async function () {
      const url = this.isEdit ? `user/${this.$route.params.id}` : 'user/invitation'
      const method = this.isEdit ? 'put' : 'post'
      const params = this.convertFormData(this.form)
      this.isLoading = true
      await axios[method](url, params)
      if (this.isEdit) {
        this.snackBarOpen('primary', 'ユーザーを更新しました。')
      } else {
        this.snackBarOpen('primary', 'ユーザーを登録しました。')
        this.form = { role: 0 }
      }
      this.isLoading = false
    },
    onDelete: function () {
      this.isConfirm = true
      this.confirmArgs.message = 'このユーザーを削除します。よろしいでしょうか？'
    },
    snackBarOpen: function (color, message) {
      this.isSnackbar = true
      this.snackBarColor = color
      this.snackBarMessage = message
    },
    snackBarClose: function () {
      this.isSnackbar = false
    },
    confirmClose: function () {
      this.isConfirm = false
    },
    confirmAction: async function () {
      this.confirmClose()
      this.isLoading = true
      await axios.del(`user/${this.$route.params.id}`)
      this.isLoading = false
      this.$router.push('/config/user')
    },
  },
}
</script>

<style scoped></style>
