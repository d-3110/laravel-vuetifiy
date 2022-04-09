<template>
  <ValidationProvider v-slot="{ errors }" :rules="rules" :name="label" :immediate="immediate">
    <v-row align="center">
      <v-col cols="2" v-if="hasLabel">
        <v-subheader>
          {{ label }}
        </v-subheader>
      </v-col>
      <v-col :cols="hasLabel ? 10 : 12">
        <v-text-field
          v-model="onInput"
          :label="!hasLabel ? label : ''"
          :name="label"
          :placeholder="placeholder"
          :counter="counter === 0 ? false : counter"
          :type="textType"
          :disabled="isDisabled"
          :hint="hint"
          :error-messages="errors"
          :suffix="suffix"
          persistent-hint
          outlined
          :hide-details="hideDetails"
          :dense="dense"
          :single-line="hasLabel"
        />
      </v-col>
    </v-row>
  </ValidationProvider>
</template>

<script>
export default {
  name: 'InputText',
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
      type: [String, Number],
      // null許容
      default: null,
      required: false,
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
    textType: {
      type: String,
      default: 'text',
      requied: false,
    },
    suffix: {
      type: String,
      default: '',
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
    hideDetails: {
      type: Boolean,
      default: false,
      required: false,
    },
    immediate: {
      type: Boolean,
      default: true,
      required: false,
    },
    dense: {
      type: Boolean,
      default: false,
      required: false,
    },
    placeholder: {
      type: String,
      default: '',
      required: false,
    },
  },
  computed: {
    onInput: {
      get: function () {
        return this.value
      },
      set: function (value) {
        this.handleInput({ [this.id]: value })
      },
    },
  },
}
</script>
