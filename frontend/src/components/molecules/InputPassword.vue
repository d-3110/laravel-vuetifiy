<template>
  <ValidationProvider v-slot="{ errors }" :rules="rules" name="パスワード">
    <v-row align="center">
      <v-col cols="2" v-if="hasLabel">
        <v-subheader>{{ label }}</v-subheader>
      </v-col>
      <v-col :cols="hasLabel ? 10 : 12">
        <v-text-field
          v-model="onInput"
          :append-icon="isShow ? 'mdi-eye' : 'mdi-eye-off'"
          :type="isShow ? 'text' : 'password'"
          :label="!hasLabel ? label : ''"
          name="パスワード"
          :error-messages="errors"
          @click:append="isShow = !isShow"
          outlined
          :hide-details="hideDetails"
          :readonly="readOnly"
          :dense="dense"
          :single-line="hasLabel"
        />
      </v-col>
    </v-row>
  </ValidationProvider>
</template>

<script>
export default {
  name: 'InputPassword',
  props: {
    handleInput: {
      type: Function,
      default: () => {},
      required: false,
    },
    value: {
      type: [String, Number],
      default: '',
      required: false,
    },
    readOnly: {
      type: Boolean,
      default: false,
      required: false,
    },
    dense: {
      type: Boolean,
      default: false,
      required: false,
    },
    rules: {
      type: [String, Object],
      default: 'required',
      required: false,
    },
    hasLabel: {
      type: Boolean,
      default: false,
      required: false,
    },
    id: {
      type: String,
      default: 'password',
      required: false,
    },
    label: {
      type: String,
      default: 'パスワード',
      required: false,
    },
    hideDetails: {
      type: Boolean,
      default: true,
      required: false,
    },
  },
  data: () => {
    return {
      isShow: false,
    }
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
