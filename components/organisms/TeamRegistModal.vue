<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title class="justify-space-between">
          <span class="headline">チーム登録フォーム</span>
          <small><span style="color: red;">*</span>は必須項目です</small>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field v-model="name" label="チーム名*" required />
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="mail_address" label="メールアドレス*" required />
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
                  label="sportsジャンル"
                  item-text="sportsType"
                  item-value="sportsId"
                />
              </v-col>
              <v-col cols="12">
                <v-file-input
                  @change="upload"
                  label="イメージ画像"
                  prepend-icon="mdi-camera"
                />
              </v-col>
              <v-col cols="12" sm="6">
                <!-- get Pref from API -->
                <v-select
                  @change="selectPref(prefecture_code)"
                  v-model="prefecture_code"
                  :items="prefectureList"
                  item-text="prefName"
                  item-value="prefCode"
                  label="都道府県"
                  required
                />
              </v-col>
              <v-col cols="12" sm="6">
                <!-- get City from API -->
                <v-select
                  @change="selectCity(city_code)"
                  v-model="city_code"
                  :items="cityList"
                  item-text="cityName"
                  item-value="cityCode"
                  label="区市町村"
                  required
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
                <v-select
                  v-model="team_type"
                  :items="teamTypeList"
                  item-text="teamType"
                  item-value="typeId"
                  label="運営団体"
                />
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  v-model="target_age_type"
                  :items="targetAgeList"
                  item-text="targetAgeType"
                  item-value="ageId"
                  label="対象層"
                />
              </v-col>
              <v-col cols="12">
                <v-textarea
                  v-model="team_information"
                  autocomplete="チーム情報"
                  label="チーム情報"
                  dense
                />
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn @click="closeModal" color="blue darken-1" text>
            Close
          </v-btn>
          <v-btn @click="regTeam" color="blue darken-1" text>
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  components: {
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
      zipcode: '',
      prefecture_code: '',
      prefecture: '',
      city_code: '',
      city: '',
      street_number: '',
      team_image: '',
      sports_id: '',
      team_type: '',
      target_age_type: '',
      team_information: '',
      teamTypeList: [
        { teamType: 'チーム', typeId: 1 },
        { teamType: 'スクール', typeId: 2 }
      ],
      sportsList: [
        { sportsType: 'サッカー', sportsId: 1 },
        { sportsType: '野球', sportsId: 2 },
        { sportsType: 'バスケット', sportsId: 3 },
        { sportsType: 'バレー', sportsId: 4 },
        { sportsType: 'ダンス', sportsId: 5 },
        { sportsType: 'ラグビー', sportsId: 6 },
        { sportsType: 'スイミング', sportsId: 7 }
      ],
      targetAgeList: [
        { targetAgeType: 'キッズ', ageId: 1 },
        { targetAgeType: '小学生', ageId: 2 },
        { targetAgeType: '中学生', ageId: 3 },
        { targetAgeType: '高校生', ageId: 4 },
        { targetAgeType: '大学・専門学生', ageId: 5 },
        { targetAgeType: '社会人', ageId: 6 }
      ]
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
            console.log(response.data.result)
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
            console.log(response.data.result)
            this.cityList = response.data.result
          }
        })
    },
    regTeam () {
      this.$store
        .dispatch('api/apiRequest', {
          api: 'teamCreate',
          data: {
            name: this.name,
            mail_address: this.mail_address,
            prefecture_code: this.prefecture_code,
            prefecture: this.prefecture,
            city_code: this.city_code,
            city: this.city,
            street_number: this.street_number,
            team_image: this.team_image,
            sports_id: this.sports_id,
            team_type: this.team_type,
            target_age_type: this.target_age_type,
            team_information: this.team_information,
            user_id: localStorage.getItem('userId')
          }
        })
        .then((response) => {
          if (response.status === 200) {
            this.closeModal()
          }
        })
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

      console.log('team_image', this.team_image)
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
      console.log('prefCode', prefCode)
      this.getCityApi(prefCode)

      const prefecture = this.prefectureList.filter(function (pref) {
        return pref.prefCode === prefCode
      })
      this.prefecture = prefecture[0].prefName
      console.log('pref Name', this.prefecture)
    },
    selectCity (cityCode) {
      console.log('cityCode', cityCode)

      const cityName = this.cityList.filter(function (city) {
        return city.cityCode === cityCode
      })
      this.city = cityName[0].cityName
      console.log('city Name', this.city)
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
