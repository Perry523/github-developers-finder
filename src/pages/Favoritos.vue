<template>
  <q-layout class="q-pa-lg">
    <div
      class="row relative-position bb"
      v-for="user in favorites"
      :key="user.id"
    >
      <q-avatar size="100px" font-size="52px" color="teal" text-color="white">
        <img :src="user.avatar_url" />
      </q-avatar>
      <div class="column col q-ml-md ellipsis">
        <div class="text-h6 text-md-h4">{{ user.login }}</div>
        <div class="text-md-h6 q-pb-sm text-grey-14 ellipsis full-width">
          {{ user.name }}
        </div>
        <div class="ellipsis text-bold full-width">
          {{ user.public_repos }} repositórios publicos
        </div>
      </div>
      <q-btn
        @click="confirmDelete(user)"
        class="absolute right"
        flat
        color="grey"
      >
        <template>
          <q-tooltip>
            Remover dos favoritos
          </q-tooltip>
          <q-icon size="40px" color="yellow-7" name="grade"></q-icon>
        </template>
      </q-btn>
    </div>
    <q-dialog v-model="confirm">
      <q-card>
        <q-card-section class="row items-center">
          <h5 class="q-ml-sm">Tem certeza que quer remover dos favoritos?</h5>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancelar" color="primary" v-close-popup />
          <q-btn flat label="Remover" color="primary" @click="removeFavorite" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-layout>
</template>

<script>
export default {
  data() {
    return {
      confirm: false,
      user: {}
    };
  },
  computed: {
    favorites() {
      return this.$store.getters["favorites/getAll"];
    }
  },
  methods: {
    removeFavorite() {
      this.$store.commit("favorites/removeFromList", this.user);
      this.favorite = false;
      this.confirm = false;
      this.$q.notify({
        timeout: 1500,
        position: "top",
        message: "Usuário removido dos favorítos"
      });
    },
    confirmDelete(user) {
      this.confirm = true;
      this.user = user;
    }
  }
};
</script>

<style>
.right {
  right: 0px;
  top: -10px;
}
.bb {
  border-bottom: 1px solid #bbb;
  padding-bottom: 12px;
  margin-bottom: 12px;
}
</style>
