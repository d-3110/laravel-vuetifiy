<template>
  <ValidationProvider v-slot="{ errors }" :rules="rules" :name="label">
    <v-row align="center">
      <v-col :cols="labelCols" class="check-label">
        <v-subheader>
          {{ label }}
        </v-subheader>
      </v-col>
      <v-col :cols="12 - labelCols">
        <v-row align="center">
          <v-checkbox
            v-for="(item, i) in lists"
            :key="i"
            :value="item.value"
            :label="item.label"
            :name="label"
            :disabled="disabledIndex === i ? true : isDisabled"
            :error-messages="errors"
            :hide-details="!hideDetails ? (i === 0 ? false : true) : true"
            :style="!hideDetails && i === 0 ? 'margin-top: 21px' : ''"
            v-model="onInput"
            class="mr-2"
            :dense="dense"
          />
        </v-row>
      </v-col>
    </v-row>
  </ValidationProvider>
</template>

<script>
export default {
  name: 'InputCheckBox',
  props: {
    label: {
      type: String,
      default: '',
      required: true,
    },
    lists: {
      type: Array,
      default: () => [],
      required: true,
    },
    checked: {
      type: Array,
      default: () => [],
      required: true,
    },
    id: {
      type: String,
      default: '',
      required: true,
    },
    rules: {
      type: String,
      default: '',
      required: true,
    },
    disabledIndex: {
      type: Number,
      default: 99,
      required: false,
    },
    isDisabled: {
      type: Boolean,
      default: false,
      required: true,
    },
    isRequired: {
      type: Boolean,
      default: false,
      required: false,
    },
    labelCols: {
      type: Number,
      default: 2,
      required: false,
    },
    handleInput: {
      type: Function,
      required: true,
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
  computed: {
    onInput: {
      get: function () {
        return this.checked
      },
      set: function (value) {
        this.handleInput({ [this.id]: value })
      },
    },
  },
}
</script>
<style scoped>
>>> .v-input--checkbox {
  max-width: 115px;
}
</style>
