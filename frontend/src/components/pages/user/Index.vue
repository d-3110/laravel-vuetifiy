<template>
  <v-container>
    <Form
      :form="form"
      :is-disabled="isDisabled"
      :is-loading="isLoading"
      :handle-input="inputForm"
      :handle-submit="onSearch"
      :handle-reset="onReset"
    />
    <v-divider></v-divider>
    <v-btn class="mt-3" color="primary" to="/user/create">ユーザー登録</v-btn>
    <List
      :headers="headers"
      model="user"
      :items="users"
      :is-loading="isLoading"
      :show-select="true"
      button-name="選択した項目を削除"
      :handle-selected-action="onBulkDelete"
      :handle-selected="onSelect"
      :selected="selected"
    />
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
  </v-container>
</template>

<script>
import axios from '@/api/api'
import Form from '@/components/organisms/app/form/SearchUser'
import List from '@/components/organisms/common/CommonList'
import SnackBar from '@/components/molecules/SnackBar'
import ConfirmDialog from '@/components/molecules/ConfirmDialog'
export default {
  name: 'UserIndex',
  components: {
    Form,
    List,
    SnackBar,
    ConfirmDialog,
  },
  data() {
    return {
      form: {},
      isLoading: false,
      isDisabled: false,
      isSnackbar: false,
      isConfirm: false,
      confirmArgs: {
        isError: false,
        message: '',
      },
      snackBarMessage: '',
      snackBarColor: '',
      users: [],
      headers: [
        { text: '名前', align: 'center', sortable: false, value: 'name' },
        { text: 'メールアドレス', align: 'center', sortable: true, value: 'email' },
        { text: '登録日', align: 'center', sortable: true, value: 'createdAt' },
        // { text: '', align: 'center', sortable: true, value: 'action' },
      ],
      selected: [],
      storageName: 'app-user-search-',
    }
  },
  computed: {
    loginUser: function () {
      return this.$store.getters['auth/user']
    },
  },
  created: async function () {
    const local = JSON.parse(localStorage.getItem(this.storageName + this.loginUser.userId))
    if (local) {
      this.form = local
    }
    this.onSearch()
  },
  methods: {
    inputForm: function (item) {
      const key = Object.keys(item)[0]
      const value = Object.values(item)[0]
      this.$set(this.form, key, value)
    },
    onSearch: async function () {
      this.isLoading = true
      const response = await axios.get('user', this.form)
      this.isLoading = false
      this.users = response.data
      this.selected = []
      // ローカルストレージに保存
      if (response.status === 200) {
        localStorage.setItem(this.storageName + this.loginUser.userId, JSON.stringify(this.form))
      }
    },
    onReset: function () {
      this.form = {}
      this.onSearch()
    },
    onSelect: function (item) {
      this.selected = item
    },
    onBulkDelete: function () {
      let selectedMe = false
      this.selected.forEach(x => {
        if (x.userId === this.loginUser.userId) {
          selectedMe = true
        }
      })
      if (selectedMe) {
        this.snackBarOpen('error', 'ログイン中のユーザーは削除できません。')
      } else {
        this.isConfirm = true
        this.confirmArgs.message = '選択されているユーザーを削除します。よろしいでしょうか？'
      }
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
      let userIds = []
      this.selected.forEach(x => {
        userIds.push(x.userId)
      })
      const params = this.convertFormData({ userIds: userIds })
      await axios.del('user/bulk-delete', params)
      this.isLoading = false
      await this.onSearch()
      this.snackBarOpen('primary', '削除しました。')
      this.selected = []
    },
  },
}
</script>

<style scoped></style>
