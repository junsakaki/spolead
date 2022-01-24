<template>
  <v-layout
    column
    justify-center
    align-center
  >
    <v-breadcrumbs :items="breadcrumbs" class="breadcrumbs">
      <template #divider>
        <v-icon>mdi-chevron-right</v-icon>
      </template>
    </v-breadcrumbs>
    <div class="container">
      <div class="validation-message">
        <span class="text">*は必須項目です</span>
      </div>
      <v-card>
        <v-card-text>
          <v-container>
            <v-col cols="12">
              <v-text-field v-model="name" label="チーム名*" required />
            </v-col>
            <v-col cols="12">
              <v-text-field v-model="mail_address" label="メールアドレス*" required />
            </v-col>
            <v-col cols="12">
              <v-text-field v-model="url" label="ホームページ" />
            </v-col>
            <v-col cols="12">
              <!-- NOTE once simple select  -->
              <!-- <v-autocomplete
                :items="['野球', 'バスケ', 'サッカー', 'ダンス', 'バレー', 'ラグビー']"
                v-model="sports_id"
                label="sportsジャンル"
                multiple
              /> -->
              <v-select
                v-model="sports_id"
                :items="sportsList"
                label="sportsジャンル*"
                item-text="title"
                item-value="id"
                required
              />
            </v-col>
            <v-col cols="12">
              <v-file-input
                label="イメージ画像"
                prepend-icon="mdi-camera"
                @change="upload"
              />
            </v-col>
            <v-col cols="12" sm="6">
              <!-- get Pref from API -->
              <v-select
                v-model="prefecture_code"
                :items="prefectureList"
                item-text="prefName"
                item-value="prefCode"
                label="都道府県"
                required
                @change="selectPref(prefecture_code)"
              />
            </v-col>
            <v-col cols="12" sm="6">
              <!-- get City from API -->
              <v-select
                v-model="city_code"
                :items="cityList"
                item-text="cityName"
                item-value="cityCode"
                label="区市町村"
                required
                @change="selectCity(city_code)"
              />
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="street_number"
                label="番地・所在地"
                required
              />
            </v-col>
            <v-col cols="12" sm="6">
              <div>運営形式</div>
              <v-flex d-flex flex-wrap>
                <v-checkbox
                  v-for="item in $TEAM_TYPE"
                  :key="item.typeId"
                  v-model="team_type"
                  :label="item.teamType"
                  :value="item.typeId"
                  class="ma-0"
                />
              </v-flex>
            </v-col>
            <v-col cols="12" sm="6">
              <div>対象層</div>
              <v-flex d-flex flex-wrap>
                <v-checkbox
                  v-for="item in $TARGET_AGE"
                  :key="item.id"
                  v-model="target_age_type"
                  :label="item.targetAgeType"
                  :value="item.ageId"
                  class="ma-0"
                />
              </v-flex>
            </v-col>
            <v-col cols="12">
              <v-textarea
                v-model="team_information"
                autocomplete="チーム情報"
                label="チーム情報"
                dense
              />
            </v-col>
          </v-container>
        </v-card-text>
        <v-card-actions class="submit-button-area">
          <common-button class="submit-button" button-color="primary" @click="regTeam">
            チームを登録する
          </common-button>
        </v-card-actions>
      </v-card>
    </div>
  </v-layout>
</template>

<script>
import CommonButton from '~/components/shared/atoms/CommonButton.vue'
export default {
  components: {
    CommonButton
  },
  props: {
    dialog: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      prefectureList: [],
      cityList: ['都道府県を選択してください'],
      name: '',
      mail_address: '',
      url: '',
      zipcode: '',
      prefecture_code: '',
      prefecture: '',
      city_code: '',
      city: '',
      street_number: '',
      team_image: '',
      sports_id: '',
      team_type: [],
      target_age_type: [],
      team_information: '',
      teamTypeList: this.$TEAM_TYPE,
      sportsList: this.$SPORTS,
      targetAgeList: this.$TARGET_AGE,
      breadcrumbs: [
        ...this.$BREADCRUMBS,
        {
          text: 'チーム・スクールの登録',
          disabled: true
        }
      ],
      latitude: 0,
      longitude: 0
    }
  },
  // watch: {
  //   zipcode (zipcode) {
  //     const _this = this
  //     new YubinBango.Core(zipcode, function (addr) {
  //       _this.prefecture = addr.region_id // 都道府県ID
  //       _this.city = addr.locality // 市区町村
  //       _this.street_number = addr.street // 町域
  //     })
  //   }
  // },
  created () {
    this.getPrefApi()
  },
  methods: {
    getPrefApi () {
      this.$store
        .dispatch('api/apiRequest', {
          api: 'getPrefApi'
        })
        .then((response) => {
          if (response.status === 200) {
            this.prefectureList = response.data.result
          }
        })
    },
    getCityApi (prefCode) {
      this.$store
        .dispatch('api/apiRequest', {
          api: 'getCityApi',
          params: {
            prefCode
          }
        })
        .then((response) => {
          if (response.status === 200) {
            this.cityList = response.data.result
          }
        })
    },
    getAddressXY (callback) {
      this.$store
        .dispatch('api/apiRequest', {
          api: 'getAddressXYApi',
          params: {
            q: this.prefecture + this.city + this.street_number
          }
        })
        .then((response) => {
          if (response.status === 200) {
            if (response.data[0].geometry.coordinates) {
              this.longitude = response.data[0].geometry.coordinates[0]
              this.latitude = response.data[0].geometry.coordinates[1]
              callback()
            }
          }
        })
    },
    regTeam () {
      if (!this.name || !this.mail_address || !this.sports_id) {
        return
      }
      this.getAddressXY(
        () => {
          this.$store
            .dispatch('api/apiRequest', {
              api: 'teamCreate',
              data: {
                name: this.name,
                mail_address: this.mail_address,
                url: this.url,
                prefecture_code: this.prefecture_code,
                prefecture: this.prefecture,
                city_code: this.city_code,
                city: this.city,
                street_number: this.street_number,
                team_image: this.team_image,
                sports_id: this.sports_id,
                team_type: this.team_type.toString(),
                target_age_type: this.target_age_type.toString(),
                team_information: this.team_information,
                user_id: localStorage.getItem('userId'),
                latitude: this.latitude,
                longitude: this.longitude
              }
            })
            .then((response) => {
              if (response.status === 200) {
                this.$router.push(`/teams?sportsId=${this.sports_id}`)
              }
            })
        }
      )
    },
    upload (file) {
      if (file !== undefined && file !== null) {
        if (file.name.lastIndexOf('.') <= 0) {
          return
        }
        const fr = new FileReader()
        fr.readAsDataURL(file)
        fr.addEventListener('load', () => {
          this.team_image = fr.result
        })
      } else {
        this.team_image = ''
      }
    },
    getBase64 (file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result)
        reader.onerror = error => reject(error)
      })
    },
    closeModal () {
      this.$emit('registTeam')
    },
    selectPref (prefCode) {
      this.getCityApi(prefCode)

      const prefecture = this.prefectureList.filter(function (pref) {
        return pref.prefCode === prefCode
      })
      this.prefecture = prefecture[0].prefName
    },
    selectCity (cityCode) {
      const cityName = this.cityList.filter(function (city) {
        return city.cityCode === cityCode
      })
      this.city = cityName[0].cityName
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/page.scss';
.container {
  width: 100%;
  max-width: 600px;
}
.page-header {
  @include default-page-header;
}
.page-header-sub {
  text-align: right;
}
.page-content {
  @include default-page-content;
  &-item {
    &-footer {
      justify-content: flex-start;
    }
    &-list {
      margin: 0px 12px;
    }
  }
  .tabs {
    margin: 24px 0px;
  }
}
.page-content-item-main.SP {
  flex-direction: column;
}
.page-content-item-list.SP {
  display: flex;
  justify-content: center;
}
.v-input {
  width: 100%;
}
.validation-message {
  display: flex;
  justify-content: end;
  width: 100%;
  padding-bottom: 16px;
  .text {
    color: red;
    font-size: 12px;
  }
}
.submit-button-area {
  display: flex;
  justify-content: center;
  .submit-button{
    margin-bottom: 16px;
  }
}
</style>
