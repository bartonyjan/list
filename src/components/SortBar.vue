<template>
  <div :class="$style.container">
    <ul :class="$style.ul">
      <li :class="$style.li">
        <button
          type="button"
          :class="[$style.button, { 'is-active': value === false }]"
          @click="$emit('update:value', false)">
          <span>Sort by Value</span>
        </button>
      </li>
      <li :class="$style.li">
        <button
          type="button"
          :class="[$style.button, { 'is-active': value === true }]"
          @click="$emit('update:value', true)">
          <span>Sort by Added Date</span>
        </button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'SortBar',
  props: {
    value: {
      type: Boolean,
    },
  },
  emits: ['update:value'],
});
</script>

<style lang="scss" module>
@use '../sass/color';

.container {
  margin-left: 20px;
}

.li {
  list-style-type: none;
  margin-bottom: 5px;
}

.button {
  width: 200px;
  height: 30px;
  border-radius: 10px;
  border: none;
  background: color.$lightGrey;
}

.button:hover {
  cursor: pointer;
}

:global(.is-active) {
  color: color.$white;
  background: color.$green;
}
</style>
