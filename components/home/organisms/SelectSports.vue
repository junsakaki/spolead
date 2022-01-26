<template>
  <div class="page-content">
    <div v-if="$vuetify.breakpoint.smAndDown">
      <div class="h2 text-left page-content-title  SP">
        スポーツからチームやスクールを探す
      </div>
      <v-flex
        xs12
        sm8
        md6
        d-flex
        flex-wrap
        class="sports-area SP"
      >
        <v-col
          v-for="card in cards"
          :key="`sports-${card.id}`"
          :cols="4"
          class="cards"
          @click="goTeamsPage(card.id)"
        >
          <v-card class="card">
            <v-img
              :src="card.src"
              class="white--text align-center"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="calc((100vw - 72px) / 3)"
            >
              <p class="sports-title">
                {{ card.title }}
              </p>
            </v-img>
          </v-card>
        </v-col>
      </v-flex>
      <div d-flex class="text-center mt-4">
        <button class="other-sports-button" @click="goTeamsPage(999)">
          <div>その他のスポーツ</div>
        </button>
      </div>
    </div>
    <div v-else>
      <div class="h2 text-left page-content-title">
        スポーツからチームやスクールを探す
      </div>
      <v-flex
        xs12
        sm8
        md6
        d-flex
        flex-wrap
        class="sports-area"
      >
        <v-col
          v-for="card in cards"
          :key="card.title"
          :cols="3"
          class="cards"
          @click="goTeamsPage(card.id)"
        >
          <v-card class="card">
            <v-img
              :src="card.src"
              class="white--text align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="200px"
            >
              <v-card-title v-text="card.title" />
            </v-img>
          </v-card>
        </v-col>
      </v-flex>
      <div d-flex class="text-center mt-4">
        <button class="other-sports-button" @click="goTeamsPage(999)">
          <div>その他のスポーツ</div>
        </button>
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
  display: flex;
  flex-direction: row;
  max-width: 100%;
}
.sports-area.SP {
  display: block;
  .cards {
    padding: 8px;
  }
  .card {
    .v-responsive__content {
      height: 100%;
      .sports-title {
        width: 100%;
        margin: 0;
        padding: 0;
        font-size: 12px;
        line-height: 12px;
        text-align: center;
      }
    }
  }
}
.other-sports-button {
  color: #1976D2;
}
</style>
