<template>
  <v-row align="center" justify="space-between" :class="!hasLabel ? 'ml-1' : ''">
    <v-col cols="2" v-if="hasLabel">
      <v-subheader>{{ label }}</v-subheader>
    </v-col>
    <v-col :cols="hasLabel ? 10 : 12">
      <v-row align="center" justify="start">
        <v-btn
          v-for="(btn, i) in buttons"
          :key="i"
          color="primary"
          :disabled="btn.isDisabled"
          @click="handleClick(btn.value)"
          class="mr-2"
        >
          {{ btn.label }}
        </v-btn>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'ButtonList',
  props: {
    buttons: {
      type: Array,
      required: true,
    },
    label: {
      type: String,
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
  },
}
</script>
