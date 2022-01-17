<template>
  <div class="page-content">
    <div v-if="$vuetify.breakpoint.smAndDown">
      <div class="h2 text-left page-content-title  SP">
        BBS掲示板
      </div>
      <v-flex
        class="sports-area SP"
      >
        <router-link
          v-for="sports in $SPORTS"
          :key="sports.title"
          :to="`/forums?sportsId=${sports.id}`"
          class="sports"
        >
          <v-card class="card">
            <v-img
              :src="sports.icon_src"
              class="icon"
              width="60"
            />
            <p class="sports-title">
              {{ sports.title }}
            </p>
          </v-card>
        </router-link>
      </v-flex>
    </div>
    <div v-else>
      <div class="h2 text-left page-content-title">
        掲示板
      </div>
      <v-flex
        class="sports-area"
      >
        <router-link
          v-for="sports in cards"
          :key="sports.title"
          :to="`/forums?sportsId=${sports.id}`"
          class="sports"
        >
          <v-card class="card">
            <v-img
              :src="sports.icon_src"
              class="icon"
              width="60"
            />
            <p class="sports-title">
              {{ sports.title }}
            </p>
          </v-card>
        </router-link>
      </v-flex>
      <div d-flex class="text-center mt-4">
        <router-link class="other-sports-link" to="/forums?sportsId=999">
          その他のスポーツ
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      cards: this.$SPORTS.slice(0, -1), // 最後尾の[その他]カテゴリは除外する
      isShowMore: false
    }
  },
  methods: {
    goTeamsPage (sportsId) {
      this.$router.push({ name: 'teams', params: { sportsId }, query: { sportsId } })
      localStorage.setItem('sportsId', sportsId)
      localStorage.setItem('cityCode', '')
    },
    showMore (act) {
      this.isShowMore = act
    }
  }
}
</script>

<style lang="scss" scoped>
.page-content {
  width: 100%;
  margin: 32px;
  .page-content-title {
    font-size: 20px;
  }
}
.page-content .page-content-title.SP {
  font-size: 14px;
}
.sports-area {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  max-width: 100%;
}
.sports-area.SP {
  grid-template-columns: 1fr 1fr 1fr;
}
.card {
  margin: 12px;
}
.card:hover {
  opacity: 0.6;
}
.sports {
  text-decoration: none;
}
.icon {
  margin: 0 auto;
}
.sports-title {
  font-size: 12px;
  text-align: center;
}
.other-sports-link {
  text-decoration: none;
}
</style>
