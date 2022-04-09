<template>
  <ValidationProvider v-slot="{ errors }" :rules="rules" :name="label" :immediate="immediate">
    <v-row align="center">
      <v-col cols="2" v-if="hasLabel">
        <v-subheader>{{ label }}</v-subheader>
      </v-col>
      <v-col :cols="hasLabel ? 10 : 12">
        <v-textarea
          auto-grow
          v-model="onInput"
          :label="!hasLabel ? label : ''"
          :placeholder="placeholder"
          :name="label"
          :counter="counter"
          :disabled="isDisabled"
          :error-messages="errors"
          :hint="hint"
          :persistent-hint="persistentHint"
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
  name: 'InputTextArea',
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
    counter: {
      type: Number,
      default: 0,
      required: false,
    },
    value: {
      type: String,
      default: '',
      required: false,
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
    hint: {
      type: String,
      default: '',
      required: false,
    },
    persistentHint: {
      type: Boolean,
      default: true,
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
    immediate: {
      type: Boolean,
      default: true,
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
