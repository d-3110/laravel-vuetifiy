<template>
  <v-container class="mb-10">
    <ValidationObserver ref="obs" v-slot="{ invalid }">
      <v-form ref="form" @submit.prevent="handleSubmit(handleSubmit)">
        <v-row>
          <!-- 検索項目エリア srart -->
          <v-col>
            <!-- 1行目 -->
            <v-row class="search-row">
              <v-col cols="3" class="py-0">
                <InputText
                  label="ユーザ名"
                  id="name"
                  :value="form.name"
                  :is-disabled="isDisabled"
                  :handle-input="handleInput"
                  :has-label="false"
                  :hide-details="true"
                  :dense="true"
                />
              </v-col>
              <v-col cols="3" class="py-0">
                <InputText
                  label="メールアドレス"
                  id="email"
                  :value="form.email"
                  :is-disabled="isDisabled"
                  :handle-input="handleInput"
                  :has-label="false"
                  :hide-details="true"
                  :dense="true"
                />
              </v-col>
            </v-row>
          </v-col>
          <!-- 検索項目エリア end -->
          <!-- ボタンエリア start-->
          <v-col cols="1">
            <v-btn color="primary" type="submit" width="120px" :loading="isLoading" :disabled="invalid" class="mb-2">
              検索
            </v-btn>
            <v-btn color="primary" outlined @click="handleReset" width="120px" :loading="isLoading">クリア</v-btn>
          </v-col>
        </v-row>
      </v-form>
    </ValidationObserver>
  </v-container>
</template>

<script>
import InputText from '@/components/molecules/InputText'
export default {
  name: 'SearchUserForm',
  components: {
    InputText,
  },
  props: {
    form: {
      type: Object,
      required: true,
    },
    handleInput: {
      type: Function,
      required: true,
    },
    handleSubmit: {
      type: Function,
      required: true,
    },
    handleReset: {
      type: Function,
      required: true,
    },
    isDisabled: {
      type: Boolean,
      required: true,
    },
    isLoading: {
      type: Boolean,
      required: true,
    },
  },
  computed: {},
}
</script>
<style scoped>
/*>>> .search-row {
  max-height: 40px;
}
>>> .check-label {
  max-width: 90px;
}
>>> .check-label .v-subheader {
  font-size: 12px;
  padding: 0;
}

>>> .v-input__control .v-label {
  font-size: 12px;
}
>>> .v-input input {
  font-size: 12px;
}
>>> .v-input--checkbox .v-label {
  width: 100px;
}*/
</style>
