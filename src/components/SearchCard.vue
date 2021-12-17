<template>
  <div :class="$style.searchContainer">
    <input
      :value="value"
      :class="$style.inputSearch"
      type="text"
      placeholder="Search or Add..."
      @input="(event) => $emit('update:value', event.target.value)"
      @keyup.esc="onClear"
      @keyup.enter="onAdd(value)" />

    <div class="">
      <input
        v-if="displayClear"
        :src="require('../assets/cancel.svg')"
        type="image"
        @click="onClear" />
      <input
        v-if="displayAdd"
        :src="require('../assets/add.svg')"
        type="image"
        @click="onAdd(value)" />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';

export default defineComponent({
  name: 'SearchCard',
  components: {},
  props: {
    canAdd: {
      type: Boolean,
    },
    value: {
      default: '',
      type: String,
    },
  },
  emits: ['update:value', 'clearSearch', 'addsearch'],
  setup(props) {
    const displayClear = computed(() => {
      return props.value.length > 0;
    });

    const displayAdd = computed(() => {
      return props.value.length > 0 && props.canAdd;
    });

    return {
      displayClear,
      displayAdd,
    };
  },
  methods: {
    onClear() {
      this.$emit('update:value', '');
    },
    onAdd(value: string) {
      this.$emit('addsearch', value);
    },
  },
});
</script>

<style lang="scss" module>
@use '../sass/color';

.searchContainer {
  width: 100%;
  height: 100%;
  display: flex;
}

.inputSearch {
  width: 100%;
  height: 60px;
  font-size: 14px;
  padding: 20px 30px;
  border: none;
  background-color: color.$lightGrey;
  border-radius: 6px;
}
</style>
