<template>
  <v-layout
    column
    justify-center
    align-center
  >
    <div class="page-header">
      <div class="page-header-title">
        <common-button @click="topSports" button-size="large" button-color="primary">
          スポーツから探す
        </common-button>
        <common-button @click="registUserPage" button-size="large" v-if="token === ''">
          ユーザー登録する
        </common-button>
      </div>
    </div>
    <div class="page-title">
      総合スポーツチーム口コミ情報サイト
    </div>
    <v-img
      :src="require('~/assets/images/spolead-logo4.png')"
      :width="250"
      :aspect-ratio="16/6"
    ></v-img>

    <!-- select AREA component -->
    <v-flex
      v-if="mode == 'area'"
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
        cols="3"
        @click="goPrefectureMode(card.id)"
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

    <!-- select PREFECTURE component -->
    <v-flex
      v-else-if="mode === 'prefecture'"
      xs12
      sm8
      md6
      d-flex
      flex-wrap
      class="page-content"
    >
      <v-col
        v-for="card in areaCards"
        :key="card.title"
        :cols="card.flex"
        @click="goCitySelect(card.id)"
        class="sports"
      >
        <v-card>
          <v-card-title v-text="card.title" />
        </v-card>
      </v-col>
    </v-flex>

    <!-- select CITY component -->
    <v-flex
      v-else-if="mode === 'city'"
      xs12
      sm8
      md6
      d-flex
      flex-wrap
      class="page-content"
    >
      <v-col
        v-for="city in cityCards"
        :key="city.cityCode"
        :cols="2"
        @click="showTeamsRelatedToCity(city.cityCode)"
        class="sports"
      >
        <v-card>
          <v-card-title v-text="city.cityName" />
        </v-card>
      </v-col>
    </v-flex>
    <common-button @click="backMode" v-if="mode == 'prefecture' || mode == 'city'" button-size="large">
      戻る
    </common-button>
    <!-- <common-button @click="registUserPage" v-else button-size="large">
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
  created () {
    this.token = localStorage.getItem('token')
    // if (!this.token) {
    //   this.$router.push('/login')
    // }
  },
  data () {
    return {
      token: '',
      mode: 'area',
      cards: [
        // { id: 1, title: '北海道', src: require('~/assets/images/prefecture/hokkaidou.gif'), flex: 3 },
        { id: 2, title: '東北地方', src: require('~/assets/images/prefecture/touhoku.gif'), flex: 3 },
        { id: 3, title: '関東地方', src: require('~/assets/images/prefecture/kanto.gif'), flex: 3 },
        // { id: 4, title: '北陸地方', src: require('~/assets/images/prefecture/hokuriku.gif'), flex: 3 },
        { id: 5, title: '中部地方', src: require('~/assets/images/prefecture/tyubu.gif'), flex: 3 },
        // { id: 6, title: '東海地方', src: require('~/assets/images/prefecture/toukai.gif'), flex: 3 },
        { id: 7, title: '近畿地方', src: require('~/assets/images/prefecture/kinki.gif'), flex: 3 },
        { id: 8, title: '中国地方', src: require('~/assets/images/prefecture/tyugoku.gif'), flex: 3 },
        { id: 9, title: '四国地方', src: require('~/assets/images/prefecture/shikoku.gif'), flex: 3 },
        { id: 10, title: '九州地方', src: require('~/assets/images/prefecture/kyusyu.gif'), flex: 3 }
        // { id: 11, title: '沖縄県', src: require('~/assets/images/prefecture/okinawa.png'), flex: 3 }
      ],
      areaCards: [],
      cityCards: [],
      touhokuCards: [
        { id: 1, title: '北海道', flex: 3 },
        { id: 2, title: '青森県', flex: 3 },
        { id: 3, title: '岩手県', flex: 3 },
        { id: 4, title: '宮城県', flex: 3 },
        { id: 5, title: '秋田県', flex: 3 },
        { id: 6, title: '山形県', flex: 3 },
        { id: 7, title: '福島県', flex: 3 }
      ],
      kantoCards: [
        { id: 8, title: '茨城県', flex: 3 },
        { id: 9, title: '栃木県', flex: 3 },
        { id: 10, title: '群馬県', flex: 3 },
        { id: 11, title: '埼玉県', flex: 3 },
        { id: 12, title: '千葉県', flex: 3 },
        { id: 13, title: '東京都', flex: 3 },
        { id: 14, title: '神奈川県', flex: 3 }
      ],
      tyubuCards: [
        { id: 15, title: '新潟県', flex: 3 },
        { id: 16, title: '富山県', flex: 3 },
        { id: 17, title: '石川県', flex: 3 },
        { id: 18, title: '福井県', flex: 3 },
        { id: 19, title: '山梨県', flex: 3 },
        { id: 20, title: '長野県', flex: 3 },
        { id: 21, title: '岐阜県', flex: 3 },
        { id: 22, title: '静岡県', flex: 3 },
        { id: 23, title: '愛知県', flex: 3 }
      ],
      kinkiCards: [
        { id: 24, title: '三重県', flex: 3 },
        { id: 25, title: '滋賀県', flex: 3 },
        { id: 26, title: '京都府', flex: 3 },
        { id: 27, title: '大阪府', flex: 3 },
        { id: 28, title: '兵庫県', flex: 3 },
        { id: 29, title: '奈良県', flex: 3 },
        { id: 30, title: '和歌山県', flex: 3 }
      ],
      tyugokuCards: [
        { id: 31, title: '鳥取県', flex: 3 },
        { id: 32, title: '島根県', flex: 3 },
        { id: 33, title: '岡山県', flex: 3 },
        { id: 34, title: '広島県', flex: 3 },
        { id: 35, title: '山口県', flex: 3 }
      ],
      shikokuCards: [
        { id: 36, title: '徳島県', flex: 3 },
        { id: 37, title: '香川県', flex: 3 },
        { id: 38, title: '愛媛県', flex: 3 },
        { id: 39, title: '高知県', flex: 3 }
      ],
      kyusyuCards: [
        { id: 40, title: '福岡県', flex: 3 },
        { id: 41, title: '佐賀県', flex: 3 },
        { id: 42, title: '長崎県', flex: 3 },
        { id: 43, title: '熊本県', flex: 3 },
        { id: 44, title: '大分県', flex: 3 },
        { id: 45, title: '宮崎県', flex: 3 },
        { id: 46, title: '鹿児島県', flex: 3 },
        { id: 47, title: '沖縄県', flex: 3 }
      ]
    }
  },
  methods: {
    registUserPage () {
      this.$router.push('/signup')
    },
    loginPage () {
      this.$router.push('/login')
    },
    topSports () {
      this.$router.push('/')
    },
    showTeamsRelatedToCity (cityCode) {
      this.$router.push({ name: 'Teams', params: { cityCode } })
      localStorage.setItem('sportsId', '')
      localStorage.setItem('cityCode', cityCode)
    },
    goPrefectureMode (areaId) {
      console.log('areaId', areaId)
      this.mode = 'prefecture'
      switch (areaId) {
        // case 1:
        //   this.areaCards = this.hokkaidouCards
        //   break
        case 2:
          this.areaCards = this.touhokuCards
          break
        case 3:
          this.areaCards = this.kantoCards
          break
        // case 4:
        //   this.areaCards = this.hokurikuCards
        //   break
        case 5:
          this.areaCards = this.tyubuCards
          break
        // case 6:
        //   this.areaCards = this.toukaiCards
        //   break
        case 7:
          this.areaCards = this.kinkiCards
          break
        case 8:
          this.areaCards = this.tyugokuCards
          break
        case 9:
          this.areaCards = this.shikokuCards
          break
        case 10:
          this.areaCards = this.kyusyuCards
          break
        // case 11:
        //   this.areaCards = this.okinawaCards
        //   break
      }
    },
    goCitySelect (prefId) {
      console.log('prefId', prefId)
      this.mode = 'city'
      console.log('mode', this.mode)
      this.$store
        .dispatch('api/apiRequest', {
          api: 'getCityApi',
          params: {
            prefCode: prefId
          }
        })
        .then((response) => {
          if (response.status === 200) {
            console.log(response.data.result)
            this.cityCards = response.data.result
          }
        })
    },
    backMode () {
      if (this.mode === 'prefecture') {
        this.mode = 'area'
      } else if (this.mode === 'city') {
        this.cityCards = []
        this.mode = 'prefecture'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/page.scss';

.page-header {
  @include top-page-header;
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
  @include top-page-content
}
.SP .page-content {
  margin: 0;
  .sports {
    flex: 0 0 100%;
    max-width: 100%;
  }
}
.logo {
  margin-top: 20px;
}
</style>
