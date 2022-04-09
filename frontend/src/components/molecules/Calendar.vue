<template>
  <v-row align="center">
    <v-col cols="2" v-if="hasLabel">
      <v-subheader>{{ label }}</v-subheader>
    </v-col>
    <v-col :cols="hasLabel ? 10 : 12">
      <v-menu v-model="menu" offset-y bottom :close-on-content-click="false" min-width="0">
        <template #activator="{ on, attrs }">
          <ValidationProvider rules="" :name="label">
            <v-text-field
              v-model="date"
              :label="label"
              readonly
              v-bind="attrs"
              v-on="on"
              clearable
              outlined
              :dense="dense"
              :single-line="hasLabel"
              prepend-inner-icon="mdi-calendar"
              :hide-details="hideDetails"
            />
          </ValidationProvider>
        </template>
        <v-date-picker v-model="date" @click="menu = false" />
      </v-menu>
    </v-col>
  </v-row>
</template>
<script>
export default {
  name: 'Calendar',
  props: {
    value: {
      type: String,
      validator: prop => typeof prop === 'string' || prop === null, // リセットの時のエラー回避のため(null許可)
      default: null,
      required: false,
    },
    label: {
      type: String,
      default: '',
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
    handleInput: {
      type: Function,
      required: true,
    },
    hasLabel: {
      type: Boolean,
      default: true,
      required: false,
    },
    dense: {
      type: Boolean,
      default: false,
      required: false,
    },
    hideDetails: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  data() {
    return {
      menu: false,
    }
  },
  computed: {
    date: {
      get() {
        return this.value
      },
      set(value) {
        this.menu = false
        this.handleInput({ [this.id]: value })
      },
    },
  },
}
</script>
