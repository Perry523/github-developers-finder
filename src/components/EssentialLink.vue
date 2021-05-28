<template>
  <q-item
    clickable
    tag="a"
    :target="name === 'desenvolvedor' ? '_blank' : ''"
    :href="link"
  >
    <q-item-section v-if="icon" avatar>
      <q-icon :name="icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
    </q-item-section>
    <q-item-section v-if="title === 'Favoritos'">
      <q-item-label class="text-right">
        <q-badge color="red"> {{ $store.getters["favorites/getAll"].length }} </q-badge>
      </q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
export default {
  name: "EssentialLink",
  props: {
    title: {
      type: String,
      required: true
    },

    name: {
      type: String,
      default: ""
    },

    link: {
      type: String,
      default: "#"
    },

    icon: {
      type: String,
      default: ""
    }
  }
};
</script>
