<template>
  <ValidationProvider v-slot="{ errors }" :rules="rules" :name="label">
    <v-row align="center">
      <v-col cols="2" v-if="hasLabel">
        <v-subheader>{{ label }}</v-subheader>
      </v-col>
      <v-col :cols="hasLabel ? 10 : 12">
        <v-row no-gutters align="center">
          <v-col align="left">{{ prefix }}</v-col>
          <v-col cols="1" align="left">
            <v-text-field
              :disabled="isLast"
              :error-messages="errors"
              v-model="onInput"
              :dense="dense"
              :hide-details="hideDetails"
              single-line
              outlined
              :max="max"
              :min="min"
              type="number"
            />
          </v-col>
          <v-col align="left">個お選びください</v-col>
        </v-row>
      </v-col>
    </v-row>
  </ValidationProvider>
</template>

<script>
export default {
  name: '',
  props: {
    id: {
      type: String,
      default: '',
      required: true,
    },
    label: {
      type: String,
      default: '',
      required: false,
    },
    rules: {
      type: [String, Object],
      default: '',
      required: false,
    },
    hasLabel: {
      type: Boolean,
      default: true,
      required: false,
    },
    prefix: {
      type: String,
      default: '',
      required: true,
    },
    value: {
      type: Number,
      default: 1,
      required: true,
    },
    isDisabled: {
      type: Boolean,
      default: false,
      required: true,
    },
    isLast: {
      type: Boolean,
      default: false,
      required: false,
    },
    handleInput: {
      type: Function,
      required: true,
    },
    hideDetails: {
      type: Boolean,
      default: false,
      required: false,
    },
    dense: {
      type: Boolean,
      default: false,
      required: false,
    },
    max: {
      type: Number,
      default: 20,
      required: false,
    },
    min: {
      type: Number,
      default: 1,
      required: false,
    },
  },
  computed: {
    onInput: {
      get: function () {
        return this.value
      },
      set: function (value) {
        if (value === 0) {
          value = 1
        } else if (Number.isNaN(value) || value < this.min) {
          value = this.min
        } else if (value > this.max) {
          value = this.max
        }
        this.handleInput({ [this.id]: parseInt(value) })
      },
    },
  },
}
</script>
