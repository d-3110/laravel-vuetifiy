<template>
  <v-row align="center" justify="center">
    <v-col cols="2" v-if="hasLabel">
      <v-subheader>
        {{ label }}
      </v-subheader>
    </v-col>
    <v-col :cols="hasLabel ? 10 : 12">
      <v-text-field
        v-if="isInput"
        :label="label"
        :name="label"
        :value="value"
        :suffix="suffix"
        type="text"
        disabled
        dense
        hide-details
        :single-line="hasLabel"
        :class="appendClass"
      />
      <p v-else class="ma-0 value">{{ value }}</p>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'DisabledText',
  props: {
    label: {
      type: String,
      default: () => '',
      required: true,
    },
    value: {
      type: [String, Number],
      default: '',
      required: false,
    },
    suffix: {
      type: String,
      default: '',
      required: false,
    },
    hasLabel: {
      type: Boolean,
      default: true,
      required: false,
    },
    appendClass: {
      type: String,
      default: '',
      required: false,
    },
    isInput: {
      type: Boolean,
      default: true,
      required: false,
    },
  },
}
</script>
<style scoped>
>>> .theme--light.v-text-field > .v-input__control > .v-input__slot:before {
  border: none;
}
>>> .theme--light.v-input--is-disabled input {
  color: rgba(0, 0, 0, 0.87) !important;
}
>>> .theme--light.v-input--is-disabled.color-red input {
  color: #ff5252 !important;
}
>>> p.value {
  color: rgba(0, 0, 0, 0.87) !important;
  text-align: left;
}
</style>
