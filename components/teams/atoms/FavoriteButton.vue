<template>
  <span>
    <v-btn
      text
      icon
      x-small
      color="pink lighten-2"
      class="favorite-button"
      @click="makeFavoriteTeam()"
    >
      <v-icon v-if="isFavorite">
        mdi-heart
      </v-icon>
      <v-icon v-else>
        mdi-heart-outline
      </v-icon>
    </v-btn>
    <v-snackbar v-model="snackbar.display" top min-height="40" height="40" color="error">
      {{ snackbar.text }}
    </v-snackbar>
  </span>
</template>

<script>
export default {
  props: {
    teamId: {
      type: Number,
      default: null
    }
  },
  data () {
    return {
      isFavorite: false,
      snackbar: {
        display: false,
        text: ''
      }
    }
  },
  methods: {
    makeFavoriteTeam () {
      if (!localStorage.getItem('token')) {
        this.snackbar = {
          display: true,
          text: 'チームをお気に入り登録するにはログインが必要です'
        }
        return
      }
      this.isFavorite = !this.isFavorite
      console.log(`${this.teamId}のチームをお気に入り${this.isFavorite ? '登録' : '解除'}します`)
    }
  }
}
</script>
<style lang="scss" scoped>
.favorite-button {
  z-index: 2;
}
</style>
