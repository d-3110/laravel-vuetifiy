<template>
  <ValidationProvider v-slot="{ errors }" :rules="rules" :name="label" :immediate="immediate">
    <v-row>
      <v-col cols="2" v-if="hasLabel">
        <v-subheader :class="isRequired ? 'required' : ''">
          {{ label }}
        </v-subheader>
      </v-col>
      <v-col :cols="hasLabel ? 6 : 10">
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
        />
      </v-col>
      <v-col cols="2" justify="center">
        <v-btn @click="onClick" :loading="isLoading" :disabled="btnDisabled">
          {{ button }}
        </v-btn>
      </v-col>
    </v-row>
  </ValidationProvider>
</template>

<script>
export default {
  name: 'InputTextWithButton',
  props: {
    label: {
      type: String,
      default: '',
      required: true,
    },
    id: {
      type: [String, Number],
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
      default: '',
      required: true,
    },
    isDisabled: {
      type: Boolean,
      default: false,
      required: true,
    },
    isLoading: {
      type: Boolean,
      default: false,
      required: true,
    },
    isMultiple: {
      type: Boolean,
      default: false,
      required: false,
    },
    hint: {
      type: String,
      default: '',
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
    isRequired: {
      type: Boolean,
      default: false,
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
    button: {
      type: String,
      default: '検索',
      required: false,
    },
    handleInput: {
      type: Function,
      required: true,
    },
    handleClick: {
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
    btnDisabled: {
      type: Boolean,
      default: false,
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
      get: function () {
        return this.value
      },
      set: function (value) {
        this.handleInput({ [this.id]: value })
      },
    },
  },
  methods: {
    onClick: function () {
      if (this.isMultiple) {
        this.handleClick(this.id)
      } else {
        this.handleClick()
      }
    },
  },
}
</script>
