<template>
  <v-row align="center" :class="!hasLabel ? 'ml-1' : ''">
    <v-col cols="2" v-if="hasLabel">
      <v-subheader>{{ label }}</v-subheader>
    </v-col>
    <v-col :cols="hasLabel ? 10 : 12">
      <v-row>
        <v-switch
          v-model="input"
          inset
          :label="switchLabel"
          :disabled="isDisabled"
          :true-value="trueValue"
          :false-value="falseValue"
        ></v-switch>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'InputSwitch',
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
    handleInput: {
      type: Function,
      required: true,
    },
    isDisabled: {
      type: Boolean,
      default: false,
      required: true,
    },
    hasLabel: {
      type: Boolean,
      default: true,
      required: false,
    },
    selected: {
      type: [Boolean, Number],
      required: true,
    },
    trueValue: {
      type: [String, Number, Boolean],
      default: 1,
      required: false,
    },
    falseValue: {
      type: [String, Number, Boolean],
      default: 0,
      required: false,
    },
    trueLabel: {
      type: String,
      required: true,
    },
    falseLabel: {
      type: String,
      required: true,
    },
  },
  computed: {
    input: {
      get() {
        return this.selected
      },
      set(value) {
        this.handleInput({ [this.id]: value })
      },
    },
    switchLabel: function () {
      return this.selected ? this.trueLabel : this.falseLabel
    },
  },
}
</script>
