<template>
  <q-page class="column items-center">
    <q-page-sticky
      style="z-index: 1"
      position="bottom-right"
      :offset="[18, 18]"
    >
      <q-btn fab @click="configDialog = true" icon="settings" color="primary" />
    </q-page-sticky>
    <q-page-sticky
      v-if="usersFound.length && userFound.id"
      style="z-index: 1"
      position="bottom-left"
      :offset="[18, 18]"
    >
      <q-btn
        fab
        @click="userFound = {}"
        icon="keyboard_backspace"
        color="primary"
      />
    </q-page-sticky>
    <div
      v-if="configs.nickname"
      class="col-4 full-width d-flex row flex-center content-start"
    >
      <q-input
        v-model="userToFind"
        @keyup.enter="searchUser"
        class="w-50"
        type="text"
        label="Nick do usuário"
      />
      <q-btn
        :disable="userToFind ? userToFind.length < 1 : true"
        color="primary"
        icon="search"
        @click="searchUser"
      />
    </div>
    <div
      v-else
      style="max-width: 1000px"
      class="row full-width q-col-gutter-sm"
    >
      <div v-if="configs.locale" class="col-12 col-sm-6">
        <q-input :label="filter.locale.label" v-model="filter.locale.value" />
      </div>
      <div v-if="configs.language" class="col-12 col-sm-6">
        <q-input
          :label="filter.language.label"
          v-model="filter.language.value"
        />
      </div>
      <div v-if="configs.repos" class="col-12 col-sm-6">
        <q-input :label="filter.repos.label" v-model="filter.repos.value" />
      </div>
      <div></div>
      <q-btn
        @click="searchUsers"
        class="col-12 q-mt-md q-mx-auto self-center"
        color="primary"
        style="max-width: 500px"
        label="pesquisar"
      />
    </div>
    <div
      v-if="userFound.id"
      class="d-flex full-width column q-mt-md items-center"
    >
      <div class="relative-position">
        <q-avatar size="200px" font-size="52px" color="teal" text-color="white">
          <img :src="userFound.avatar_url" />
        </q-avatar>
        <q-btn
          @click="toggleFavorites"
          class="absolute star-button"
          label=""
          color="yellow-1"
          flat
        >
          <template v-if="favorite">
            <q-tooltip>
              Remover dos favoritos
            </q-tooltip>
            <q-icon size="60px" color="yellow-7" name="grade"></q-icon>
          </template>
          <template v-else>
            <q-tooltip>
              Adicionar aos favoritos
            </q-tooltip>
            <q-icon size="60px" color="yellow-7" name="o_grade"></q-icon>
          </template>
        </q-btn>
      </div>
      <div class="q-mx-md">
        <p v-if="userFound.name" class="q-mt-md text-h4 text-center">
          {{ userFound.name }}
        </p>
        <p class="q-mt-lg" v-if="userFound.bio">{{ userFound.bio }}</p>
      </div>
      <p class="text-h6 q-mb-none">
        Repositorios publicos: {{ userFound.public_repos }}
      </p>
      <div
        class="full-width col-4 q-mb-lg q-mt-md d-flex row flex-center content-start"
      >
        <q-input
          @input="filterRepository"
          class="repository-filter full-width q-px-lg"
          outlined
          type="text"
          label="Filtrar Repositório"
        />
      </div>
      <div
        class="q-mb-lg text-h6"
        v-if="repositoriesToShow.length !== repositories.length"
      >
        {{ repositoriesToShow.length }} Resultados
      </div>
      <div class="full-width q-pr-md row q-col-gutter-md">
        <div
          v-for="(repository, i) in repositoriesToShow"
          :key="i"
          class="col-12 col-sm-6 col-md-4 col-lg-3 my-card"
        >
          <q-card v-ripple @click="goToRepository(i)">
            <q-badge
              v-if="repository.language"
              color="cyan-11"
              text-color="black"
              floating
            >
              {{ repository.language }}
            </q-badge>
            <div class="q-pa-sm d-flex column full-height">
              <a class="text-h6 justify-center full-width row bb"
                ><div class="ellipsis">{{ repository.name }}</div></a
              >
              <div class="row justify-center" style="height:15px">
                <q-icon class="q-mt-xs text-orange" name="stars" />
                <p class="text-h8">{{ repository.stargazers_count }}</p>
                <q-icon class="q-mt-xs q-ml-auto" name="remove_red_eye" />
                <p class="text-h8 q-mr-auto">
                  {{ repository.watchers_count }}
                </p>
                <q-icon class="q-mt-xs text-red" name="account_tree" />
                <p class="text-h8">{{ repository.forks }}</p>
              </div>
            </div>
          </q-card>
        </div>
      </div>
    </div>
    <div
      class="full-width q-col-gutter-sm row q-mt-sm"
      v-if="usersFound.length && !userFound.id"
    >
      <div
        class="row col-12 col-sm-6 relative-position bb"
        v-for="user in usersFound"
        :key="user.id"
      >
        <q-avatar
          class="cursor-pointer"
          @click="goToUser(user)"
          size="100px"
          font-size="52px"
          color="teal"
          text-color="white"
        >
          <img :src="user.avatar_url" />
        </q-avatar>
        <div class="column col q-ml-md ellipsis">
          <div class="text-h6 text-md-h4">{{ user.login }}</div>
          <div class="text-md-h6 q-pb-sm text-grey-14 ellipsis full-width">
            {{ user.name }}
          </div>
        </div>
      </div>
    </div>
    <q-dialog v-model="configDialog">
      <q-card class="column" style="height: 500px; width: 300px">
        <div class="text-center text-h6">Configurações</div>
        <q-card-section class="column">
          <div class="text-bold">Filtrar por:</div>
          <q-checkbox
            label="Nickname"
            @input="test"
            v-model="configs.nickname"
          ></q-checkbox>
          <q-checkbox
            label="Localização"
            @input="configs.nickname = false"
            v-model="configs.locale"
          ></q-checkbox>
          <q-checkbox
            label="Linguagem"
            @input="configs.nickname = false"
            v-model="configs.language"
          ></q-checkbox>
          <q-checkbox
            label="Nº Repositórios"
            @input="configs.nickname = false"
            v-model="configs.repos"
          ></q-checkbox>
        </q-card-section>
        <q-card-actions class="q-mt-auto">
          <q-btn
            color="primary"
            class="full-width"
            @click="configDialog = false"
            >Confirmar</q-btn
          >
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="confirm">
      <q-card>
        <q-card-section class="row items-center">
          <h5 class="q-ml-sm">Tem certeza que quer remover dos favoritos</h5>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancelar" color="primary" v-close-popup />
          <q-btn flat label="Remover" color="primary" @click="removeFavorite" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
export default {
  name: "PageIndex",
  data() {
    return {
      configs: {},
      initialConfigState: {
        nickname: true,
        locale: false,
        language: false,
        repos: false
      },
      initialFilterState: {
        locale: {
          label: "Escolha o lugar",
          filter: "location",
          value: null
        },
        language: {
          label: "Escolha a linguagem",
          filter: "language",
          value: null
        },
        repos: {
          label: "Quantidade de repositórios",
          filter: "repos",
          value: null
        }
      },
      filter: {},
      configDialog: false,
      userToFind: null,
      repositories: [],
      userFound: {},
      usersFound: [],
      favorite: false,
      confirm: false,
      repositoryToFilter: null,
      repositoriesToShow: []
    };
  },
  mounted() {
    this.configs = Object.assign({}, this.initialConfigState);
    this.filter = Object.assign({}, this.initialFilterState);
  },
  methods: {
    async searchUsers() {
      this.userFound = {}
      this.$q.loading.show();
      const locale = this.getQuery("locale");
      const language = this.getQuery("language");
      const repos = this.getQuery("repos");
      const { data } = await this.$http(
        "https://api.github.com/search/users?q=type:user" + locale + language + repos
      );
      this.usersFound = data.items;
      this.$q.loading.hide();
    },
    getQuery(value) {
      if (this.filter[value].value && this.filter[value].value.length)
        if (value === "repos") {
          return `${this.filter[value].filter}:>${this.filter[value].value}`;
        } else
          return `${this.filter[value].filter}:${this.filter[value].value}+`;
      return "";
    },
    test(value) {
      if (value) this.configs = Object.assign({}, this.initialConfigState);
    },
    goToRepository(i) {
      const win = window.open(this.repositories[i].html_url, "_blank");
      win.focus();
    },
    goToUser(user) {
      this.loadRepositories(user);
    },
    async loadRepositories(user) {
      this.$q.loading.show();
      this.userFound = user;
      this.repositories = await this.$http(this.userFound.repos_url).then(
        response => response.data
      );
      this.repositoriesToShow = this.repositories;
      this.$q.loading.hide();
    },
    async searchUser() {
      this.$q.loading.show();
      this.userFound = await this.$http(`/${this.userToFind}`)
        .then(response => response.data)
        .catch(() => {
          this.userToFind = "";
          this.$q.loading.hide();
          this.$q.notify({
            timeout: 1500,
            position: "top",
            message: "Usuário não encontrado"
          });
          return {};
        });
      this.isFavorite();
      this.$q.loading.hide();
      this.loadRepositories(this.userFound);
    },
    toggleFavorites() {
      if (this.favorite) {
        this.confirm = true;
      } else {
        this.$store.commit("favorites/addToList", this.userFound);
        this.$q.notify({
          timeout: 1500,
          position: "top",
          message: "Usuário adicionado aos favorítos"
        });
        this.favorite = !this.favorite;
      }
    },
    removeFavorite() {
      this.$store.commit("favorites/removeFromList", this.userFound);
      this.favorite = false;
      this.confirm = false;
      this.$q.notify({
        timeout: 1500,
        position: "top",
        message: "Usuário removido dos favorítos"
      });
    },
    isFavorite() {
      const favorites = this.$store.getters["favorites/getAll"];
      let favorite = false;
      favorites.forEach((favoriteUser, i) => {
        if (favoriteUser.id === this.userFound.id) {
          favorite = true;
          return;
        }
      });
      this.favorite = favorite;
    },
    filterRepository(value) {
      this.repositoriesToShow = this.repositories.filter(repository =>
        repository.name.includes(value)
      );
    }
  }
};
</script>
<style scoped>
.w-50 {
  width: 50%;
}
.repository-filter {
  max-width: 500px;
}
.my-card {
  cursor: pointer;
}
.bb {
  border-bottom: 1px solid #eee;
  padding-bottom: 3px;
  margin-bottom: 3px;
}
.ellipsis2 {
  text-overflow: ellipsis ellipsis;
}
.star-button {
  right: -60px;
}
</style>
