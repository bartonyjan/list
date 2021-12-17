<template>
  <div :class="$style.itemContainer">
    <span>
      <div>{{ item.name }}</div>
      <div>#{{ item.id }}</div>
    </span>

    <div v-if="totalMatch">
      <input :src="require('../assets/check.svg')" type="image" />
    </div>

    <div :class="$style.dateContainer">
      <span>{{ item.date }} </span>
      <span :class="$style.actions"
        ><input
          type="image"
          alt="Remove"
          :src="require('../assets/trash.svg')"
          @click="onClick(item.id)"
      /></span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { ListItem } from 'types/ListItem';

export default defineComponent({
  name: 'ListItem',
  props: {
    item: ListItem,
    totalMatch: Boolean,
  },
  emits: ['deleteItem'],
  methods: {
    onClick(id: number) {
      this.$emit('deleteItem', id);
    },
  },
});
</script>

<style lang="scss" module>
@use '../sass/color';

.itemContainer {
  display: flex;
  flex-direction: row;
  padding: 20px;
  height: 70px;
  justify-content: space-between;
  width: 100%;
  height: 80px;
  align-items: center;
  transition-duration: 300ms;
}

.itemContainer:hover {
  background-color: color.$lightGrey;

  .actions {
    display: block;
  }
}

.dateContainer {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.actions {
  display: none;
  margin-left: 10px;
}
</style>
