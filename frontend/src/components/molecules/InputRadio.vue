<template>
  <ValidationProvider v-slot="{ errors }" :rules="rules" :name="label" :immediate="immediate">
    <v-row align="center" class="mb-5" :class="!hasLabel ? 'ml-1' : ''">
      <v-col cols="2" v-if="hasLabel">
        <v-subheader>{{ label }}</v-subheader>
      </v-col>
      <v-col :cols="hasLabel ? 10 : 12">
        <v-row class="pa-3">
          <v-radio-group
            v-model="input"
            :error-messages="errors"
            row
            :dense="isDense"
            :hint="hint"
            :persistent-hint="hint === '' ? false : true"
            :disabled="isDisabled"
          >
            <v-radio v-for="(item, i) in lists" :key="i" :label="item.label" :value="item.value" />
          </v-radio-group>
        </v-row>
      </v-col>
    </v-row>
  </ValidationProvider>
</template>

<script>
export default {
  name: 'InputRadio',
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
    id: {
      type: String,
      default: '',
      required: true,
    },
    rules: {
      type: [String, Object],
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
    isDense: {
      type: Boolean,
      default: false,
      required: false,
    },
    selected: {
      validator: prop => typeof prop === 'number' || typeof prop === 'string' || prop === null, // null許可
      default: 0,
      required: true,
    },
    hint: {
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
    input: {
      get() {
        return this.selected
      },
      set(value) {
        this.handleInput({ [this.id]: value })
      },
    },
  },
}
</script>
