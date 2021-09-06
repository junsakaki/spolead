  plugins: [
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "process.env.GOOGLE_ANALYTICS_ID",//デフォルト値
        head: true, //これ追加
      },
    },
  ],

<template>
  <v-layout
    column
    justify-center
    align-center
  >
    <div class="page-header">
      <div class="page-header-title">
        <common-button @click="topPrefecture" button-size="large" button-color="primary">
          エリアから探す
        </common-button>
        <common-button @click="registUserPage" v-if="token === ''" button-size="large">
          ユーザー登録する
        </common-button>
      </div>
    </div>
    <div class="page-title">
         総合スポーツチーム・クラブ口コミ情報ポータル
    </div>
    <v-img
      :src="require('~/assets/images/spolead-logo4.png')"
      :width="350"
      :aspect-ratio="16/6"
      class="logo"
    />
    <v-flex
      xs12
      sm8
      md6
      d-flex
      flex-wrap
      class="page-content"
    >
      <v-col
        v-for="card in cards"
        :key="card.title"
        :cols="3"
        @click="goTeamsPage(card.id)"
        class="sports"
      >
        <v-card>
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
    <!-- <common-button @click="registUserPage" button-size="large" >
      ユーザー登録
    </common-button> -->
  </v-layout>
</template>

<script>

import CommonButton from '~/components/atoms/CommonButton.vue'

export default {
  components: {
    CommonButton
  },
  data () {
    return {
      token: '',
      cards: [
        { id: 1, title: 'Soccer', src: require('~/assets/images/soccer.jpg') },
        { id: 2, title: 'Baseball', src: require('~/assets/images/baseball.jpg') },
        { id: 3, title: 'Basketball', src: require('~/assets/images/basketball.jpeg') },
        { id: 4, title: 'Volleyball', src: require('~/assets/images/volleyball.jpeg') },
        { id: 5, title: 'Dance', src: require('~/assets/images/dance.jpeg') },
        { id: 6, title: 'Rugby', src: require('~/assets/images/rugby.jpeg') },
        { id: 7, title: 'Swimming', src: require('~/assets/images/swimming.jpeg') }
      ]
    }
  },
  created () {
    this.token = localStorage.getItem('token')
    // if (!this.token) {
    //   this.$router.push('/login')
    // }
  },
  methods: {
    registUserPage () {
      this.$router.push('/signup')
    },
    loginPage () {
      this.$router.push('/login')
    },
    goTeamsPage (sportsId) {
      this.$router.push({ name: 'Teams', params: { sportsId } })
      localStorage.setItem('sportsId', sportsId)
      localStorage.setItem('cityCode', '')
    },
    topPrefecture () {
      this.$router.push('/topPrefecture')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/page.scss';

.page-header {
  @include default-page-header;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.page-title {
  width: 100%;
  font-size: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.page-content {
  margin: 32px;
  .sports {
    cursor: pointer;
  }
}
.SP .page-content .sports {
  flex: 0 0 100%;
  max-width: 100%;
}
.logo {
  margin-top: 20px;
}
</style>
