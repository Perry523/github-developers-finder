<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>
          Github Finder
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      bordered
      content-class="bg-grey-1"
      :breakpoint="1300"
    >
      <q-list>
        <!-- <q-item-label
          header
          class="text-grey-8"
        >
          Essential Links
        </q-item-label> -->
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from "components/EssentialLink.vue";

export default {
  name: "MainLayout",

  components: {
    EssentialLink
  },

  data() {
    return {
      leftDrawerOpen: false,
      essentialLinks: [
        {
          title: "Home",
          icon: "house",
          link: "#/"
        },
        {
          title: "Favoritos",
          icon: "star",
          link: "#/favoritos"
        },
        // {
        //   title: "Conheça o desenvolvedor",
        //   icon: "person",
        //   name: "desenvolvedor",
        //   link: "https://github.com/Perry523"
        // }
      ]
    };
  }
};
</script>
