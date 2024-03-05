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
    <HomeHeader />
    <SelectSports />
    <SelectArea />
    <ColumnsContents />
    <BulletinBoard />
  </v-layout>
</template>

<script>
import HomeHeader from '~/components/home/organisms/HomeHeader.vue'
import SelectSports from '~/components/home/organisms/SelectSports.vue'
import SelectArea from '~/components/home/organisms/SelectArea.vue'
import BulletinBoard from '~/components/home/organisms/BulletinBoard.vue'
import ColumnsContents from '~/components/home/organisms/ColumnsContents.vue'

export default {
  components: {
    HomeHeader,
    SelectSports,
    SelectArea,
    BulletinBoard,
    ColumnsContents
  },
  data () {
    return {
      cards: this.$SPORTS,
      mode: 'prefecture',
      areas: this.$AREA,
      topPrefecture: this.$TOP_PREFECTURE,
      cityCards: [],
      selectedPrefecture: { title: '' }
    }
  },
  head () {
    return {
      title: 'SpoLeadeR',
      titleTemplate: ''
    }
  },
  created () {
    if (localStorage.getItem('selectedCity')) {
      this.mode = 'city'
      this.cityCards = JSON.parse(localStorage.getItem('selectedCity'))
    }
    if (localStorage.getItem('selectedPrefecture')) {
      this.selectedPrefecture = JSON.parse(localStorage.getItem('selectedPrefecture'))
    }
  },
  methods: {
    registUserPage () {
      this.$router.push('/signup')
    },
    loginPage () {
      this.$router.push('/login')
    },
    goTeamsPage (sportsId) {
      this.$router.push({ name: 'teams', params: { sportsId }, query: { sportsId } })
      localStorage.setItem('sportsId', sportsId)
      localStorage.setItem('cityCode', '')
    },
    showTeamsRelatedToCity (cityCode) {
      this.$router.push({ name: 'teams', params: { cityCode }, query: { cityCode } })
      localStorage.setItem('sportsId', '')
      localStorage.setItem('cityCode', cityCode)
    },
    goCitySelect (pref) {
      this.mode = 'city'
      this.$store
        .dispatch('api/apiRequest', {
          api: 'getCityApi',
          params: {
            prefCode: pref.id
          }
        })
        .then((response) => {
          if (response.status === 200) {
            this.cityCards = response.data.result
            this.selectedPrefecture = pref
            localStorage.setItem('selectedCity', JSON.stringify(response.data.result))
            localStorage.setItem('selectedPrefecture', JSON.stringify(pref))
          }
        })
    },
    backMode () {
      this.cityCards = []
      this.mode = 'prefecture'
      localStorage.removeItem('selectedPrefecture')
      localStorage.removeItem('selectedCity')
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
.page-content {
  width: 100%;
  margin: 32px;
  .link {
    cursor: pointer;
    margin-right: 16px;
  }
  .page-content-title {
    font-size: 20px;
  }
  .back {
    font-size: 14px;
    margin-left: 16px;
  }
  .cards {
    cursor: pointer;
  }
}
.SP .page-content .cards {
  flex: 0 0 100%;
  max-width: 100%;
}
.logo {
  margin-top: 20px;
}
.area-title {
  font-size: 14px;
}
.sports-area {
  max-width: 100%;
}
.city-select-area {
  padding: 12px;
}
.page-header {
  position: relative;
  width: 100vw;
  height: 50vh;
  margin-top: -72px;
  background-color: blue;
  background-image: url('../assets/images/soccer.jpg');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  cursor: default;
  .layer {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #40404075;
  }
  .page-title {
    position: absolute;
    bottom: 16px;
    left: 96px;
    font-size: 32px;
    color: white;
  }
}
</style>
