<template>
  <ValidationProvider v-slot="{ errors }" :rules="rules" :name="label">
    <v-row align="center">
      <v-col cols="2" v-if="hasLabel">
        <v-subheader>{{ label }}</v-subheader>
      </v-col>
      <v-col :cols="hasLabel ? 10 : 12">
        <v-combobox
          v-model="onInput"
          :items="items"
          :label="!hasLabel ? label : ''"
          multiple
          :disabled="isDisabled"
          :error-messages="errors"
          :hint="hint"
          :hide-details="hideDetails"
          :single-line="hasLabel"
          :dense="isDense"
          outlined
          chips
          deletable-chips
        />
      </v-col>
    </v-row>
  </ValidationProvider>
</template>

<script>
export default {
  name: 'InputComboBox',
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
    rules: {
      type: [String, Object],
      default: '',
      required: false,
    },
    value: {
      type: Array,
      default: () => [],
      required: true,
    },
    handleInput: {
      type: Function,
      required: true,
    },
    isDisabled: {
      type: Boolean,
      default: false,
      required: true,
    },
    isDense: {
      type: Boolean,
      default: false,
      required: false,
    },
    hint: {
      type: String,
      default: '',
      required: false,
    },
    hasLabel: {
      type: Boolean,
      default: true,
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
    items: {
      type: Object,
      default: () => {},
      required: false,
    },
  },
  computed: {
    onInput: {
      get() {
        return this.value
      },
      set(value) {
        this.handleInput({ [this.id]: value })
      },
    },
  },
}
</script>
