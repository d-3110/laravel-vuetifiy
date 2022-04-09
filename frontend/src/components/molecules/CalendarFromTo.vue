<template>
  <v-row align="center">
    <v-col cols="2" v-if="hasLabel">
      <v-subheader>{{ label }}</v-subheader>
    </v-col>
    <v-col :cols="hasLabel ? 4 : 6">
      <v-menu v-model="fromMenu" offset-y :close-on-content-click="false">
        <template #activator="{ on, attrs }">
          <ValidationProvider rules="" :name="fromLabel">
            <v-text-field
              v-model="from"
              :label="fromLabel"
              readonly
              v-bind="attrs"
              v-on="on"
              clearable
              outlined
              :dense="dense"
              :hide-details="hideDetails"
              :single-line="hasLabel"
              prepend-inner-icon="mdi-calendar"
              append-outer-icon="mdi-tilde"
            />
          </ValidationProvider>
        </template>
        <v-date-picker v-model="from" @click="fromMenu = false" />
      </v-menu>
    </v-col>
    <v-col :cols="hasLabel ? 4 : 6">
      <v-menu v-model="toMenu" offset-y :close-on-content-click="false">
        <template #activator="{ on, attrs }">
          <ValidationProvider
            v-slot="{ errors }"
            :rules="{ not_before_from: [from, 'fromより前の日付は入力できません。'] }"
            :name="toLabel"
          >
            <v-text-field
              v-model="to"
              :label="toLabel"
              readonly
              v-bind="attrs"
              v-on="on"
              :error-messages="errors"
              clearable
              outlined
              :dense="dense"
              :hide-details="hideDetails"
              :single-line="hasLabel"
              prepend-inner-icon="mdi-calendar"
            />
          </ValidationProvider>
        </template>
        <v-date-picker v-model="to" @click="toMenu = false" />
      </v-menu>
    </v-col>
  </v-row>
</template>
<script>
export default {
  name: 'CalendarFromTo',
  props: {
    fromValue: {
      type: String,
      validator: prop => typeof prop === 'string' || prop === null, // リセットの時のエラー回避のため(null許可)
      // default: new Date().toISOString().substr(0, 10),
      default: '',
      required: false,
    },
    toValue: {
      type: String,
      validator: prop => typeof prop === 'string' || prop === null, // リセットの時のエラー回避のため(null許可)
      // default: new Date().toISOString().substr(0, 10),
      default: '',
      required: false,
    },
    label: {
      type: String,
      default: '',
      required: true,
    },
    fromLabel: {
      type: String,
      default: '',
      required: true,
    },
    toLabel: {
      type: String,
      default: '',
      required: true,
    },
    fromId: {
      type: String,
      default: 'startAt',
      required: false,
    },
    toId: {
      type: String,
      default: 'endAt',
      required: false,
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
      fromMenu: false,
      toMenu: false,
    }
  },
  computed: {
    from: {
      get() {
        return this.fromValue
      },
      set(value) {
        this.fromMenu = false
        this.handleInput({ [this.fromId]: value })
      },
    },
    to: {
      get() {
        return this.toValue
      },
      set(value) {
        this.toMenu = false
        this.handleInput({ [this.toId]: value })
      },
    },
  },
}
</script>
<style scoped>
>>> .v-text-field .v-input__slot {
  max-width: 200px;
}
</style>
