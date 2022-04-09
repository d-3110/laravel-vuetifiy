<template>
  <section>
    <v-btn
      v-if="showSelect"
      color="primary"
      class="my-4"
      @click="handleSelectedAction"
      :disabled="selected.length === 0"
    >
      {{ buttonName }}
    </v-btn>
    <v-data-table
      :headers="headers"
      :items="items"
      hide-default-footer
      :loading="isLoading"
      loading-text="データ取得中です"
      :page.sync="page"
      :items-per-page="displayLimit"
      :show-select="showSelect"
      :item-key="`${model}Id`"
      v-model="onSelected"
    >
      <!-- 件数切り替え -->
      <template #top>
        <DisplayLimit v-if="items.length !== 0" :limit="displayLimit" :handle-change="onChangeLimit" />
      </template>
      <template #[`item.action`]="{ item }">
        <router-link :to="`${model}/${item[`${model}Id`]}`">
          <v-icon small class="mr-2">mdi-pencil</v-icon>
        </router-link>
      </template>
    </v-data-table>
    <Pagination
      v-if="items.length !== 0"
      :page="page"
      :limit="limit"
      :display-limit="displayLimit"
      :total="items.length"
      :handle-change="onChangePage"
    />
  </section>
</template>

<script>
import Pagination from '@/components/molecules/Pagination'
import DisplayLimit from '@/components/molecules/DisplayLimit'
export default {
  name: 'CommonList',
  props: {
    model: {
      type: String,
      required: true,
    },
    headers: {
      type: Array,
      required: true,
    },
    items: {
      type: Array,
      required: true,
    },
    isLoading: {
      type: Boolean,
      required: true,
    },
    showSelect: {
      type: Boolean,
      default: false,
      required: false,
    },
    selected: {
      type: Array,
      default: () => [],
      required: false,
    },
    buttonName: {
      type: String,
      default: '',
      required: false,
    },
    handleSelected: {
      type: Function,
      default: () => {},
      required: false,
    },
    handleSelectedAction: {
      type: Function,
      default: () => {},
      required: false,
    },
  },
  components: {
    Pagination,
    DisplayLimit,
  },
  data: () => {
    return {
      page: 1,
      displayLimit: 50,
      limit: 100,
    }
  },
  computed: {
    onSelected: {
      get: function () {
        return this.selected
      },
      set: function (value) {
        this.handleSelected(value)
      },
    },
  },
  methods: {
    onChangePage: function (value) {
      this.page = value
    },
    onChangeLimit: function (value) {
      this.displayLimit = value
    },
  },
}
</script>

<style></style>
