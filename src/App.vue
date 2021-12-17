<template>
  <div :class="$style.container">
    <div :class="$style.left">
      <div :class="$style.searchWrap">
        <SearchCard
          v-model:value="searchQuery"
          :can-add="displayAdd"
          @addsearch="addSearch" />
      </div>
      <div :class="$style.listWrap">
        <ul :class="$style.ul">
          <li v-for="item in sortedItemsList" :key="item.id" :class="$style.li">
            <ListItem
              :item="item"
              :total-match="
                item.name.toLowerCase() === searchQuery.toLowerCase()
              "
              @delete-item="deleteItem" />
          </li>
        </ul>
      </div>
    </div>
    <div :class="$style.right">
      <div :class="$style.sortContainer">
        <SortBar v-model:value="sortBy" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import SearchCard from 'components/SearchCard.vue';
import ListItem from 'components/ListItem.vue';
import { ListItem as Item } from 'types/ListItem';
import SortBar from 'components/SortBar.vue';
import { format } from 'date-fns';

export default defineComponent({
  name: 'App',
  components: {
    SearchCard,
    ListItem,
    SortBar,
  },
  setup() {
    const searchQuery = ref('');
    const sortBy = ref(false);
    const items = ref<Item[]>([]);

    const itemsList = computed(() => {
      return items.value.filter((item) => {
        return item.name
          .toLowerCase()
          .startsWith(searchQuery.value.toLowerCase());
      });
    });

    const sortedItemsList = computed(() => {
      return [...itemsList.value].sort((a, b) => {
        if (sortBy.value === true) {
          return a.id < b.id ? -1 : 1;
        } else {
          return a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1;
        }
      }) as Item[];
    });

    const displayAdd = computed(() => {
      var data = items.value.filter((item) => {
        return item.name.toLowerCase() === searchQuery.value.toLowerCase();
      });

      return searchQuery.value.length > 0 && data.length === 0;
    });

    return {
      searchQuery,
      items,
      itemsList,
      displayAdd,
      sortedItemsList,
      sortBy,
    };
  },
  created() {
    this.loadfromLocal();
  },
  methods: {
    deleteItem(id: number) {
      this.items = (this.items as Item[]).filter((item) => item.id !== id);
      this.savetoLocal();
    },
    clearSearch() {
      this.searchQuery = '';
    },
    addSearch(value: string) {
      var newId =
        this.items.length === 0 ? 1 : this.items[this.items.length - 1].id + 1;

      let o = {
        id: newId,
        name: value,
        date: format(new Date(), 'MM/dd/yyyy hh:mm:ss'),
      } as Item;

      (this.items as Item[]).push(o);
      this.searchQuery = '';
      this.savetoLocal();
    },
    loadfromLocal() {
      var listJson = localStorage.getItem('listData');
      if (listJson) {
        this.items = JSON.parse(listJson) as Item[];
      } else {
        this.items = [] as Item[];
      }
    },
    savetoLocal() {
      localStorage.setItem('listData', JSON.stringify(this.items));
    },
  },
});
</script>

<style lang="scss" module>
@use 'sass/color';

.container {
  width: 1080px;
  margin: 100px auto;
  display: flex;
  flex-direction: row;
}

.left {
  width: 75%;
}

.right {
  width: 25%;
}

.sortContainer {
  margin-top: 100px;
}

.searchWrap {
  display: flex;
  flex-direction: row;
  margin: 20px 50px;
}

.listWrap {
  margin: 20px 50px;
}

.ul {
  margin: 0px;
  padding: 0px;
}

.li {
  list-style-type: none;
  border-bottom: 1px solid color.$grey;
}
</style>
