<template>
  <ValidationProvider v-slot="{ errors }" :rules="rules" :name="label" :immediate="immediate">
    <v-row align="center">
      <v-col cols="2" v-if="hasLabel">
        <v-subheader>{{ label }}</v-subheader>
      </v-col>
      <v-col :cols="hasLabel ? 10 : 12">
        <component
          :is="component"
          :items="items"
          :item-text="itemText"
          :item-value="itemValue"
          no-data-text=""
          :label="isAutoComplete ? 'テキストを入力して絞り込み' : hasLabel ? label : ''"
          :placeholder="placeholder"
          :disabled="isDisabled"
          :error-messages="errors"
          v-model="onInput"
          :dense="dense"
          :hide-details="hideDetails"
          :single-line="hasLabel"
          outlined
        />
      </v-col>
    </v-row>
  </ValidationProvider>
</template>

<script>
export default {
  name: 'InputSelectBox',
  props: {
    label: {
      type: String,
      default: '',
      required: true,
    },
    id: {
      type: String,
      default: '',
      required: true,
    },
    items: {
      type: Array,
      default: () => [],
      required: true,
    },
    itemText: {
      type: String,
      default: 'label',
      required: false,
    },
    itemValue: {
      type: String,
      default: 'value',
      required: false,
    },
    rules: {
      type: [String, Object],
      default: '',
      required: false,
    },
    isDisabled: {
      type: Boolean,
      required: true,
    },
    isAutoComplete: {
      type: Boolean,
      default: false,
      required: false,
    },
    handleInput: {
      type: Function,
      required: true,
    },
    selected: {
      validator: prop => typeof prop === 'number' || typeof prop === 'string' || prop === null, // null許可
      default: null,
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
    placeholder: {
      type: String,
      default: '',
      required: false,
    },
    immediate: {
      type: Boolean,
      default: true,
      required: false,
    },
  },
  computed: {
    component: function () {
      return this.isAutoComplete ? 'v-autocomplete' : 'v-select'
    },
    onInput: {
      get: function () {
        return this.selected
      },
      set: function (value) {
        this.handleInput({ [this.id]: value })
      },
    },
  },
}
</script>
