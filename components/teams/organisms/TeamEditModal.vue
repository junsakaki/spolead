<script src="https://yubinbango.github.io/yubinbango/yubinbango.js" charset="UTF-8"></script>
<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" max-width="600px" persistent>
      <v-card>
        <v-card-title class="justify-end">
          <small><span style="color: red;">*</span>は必須項目です</small>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field v-model="name" label="チーム名*" required />
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="mail_address" label="メールアドレス" />
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="url" label="ホームページ" />
              </v-col>
              <v-col cols="12">
                <v-select
                  v-model="sports_id"
                  :items="sportsList"
                  label="sportsジャンル"
                  item-text="sportsType"
                  item-value="sportsId"
                />
                <v-col cols="12">
                  <v-file-input
                    label="イメージ画像"
                    prepend-icon="mdi-camera"
                    @change="upload"
                  />
                </v-col>
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
              <v-col cols="12" sm="12">
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
              <v-col cols="12" sm="12">
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
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions class="d-flex justify-center">
          <v-btn color="primary" dark @click="updateTeam">
            保存
          </v-btn>
          <v-btn color="grey" dark @click="closeModal">
            キャンセル
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
    },
    team: {
      type: Object,
      default: () => {}
    }
  },
  created () {
    this.getPrefApi()
    this.getCityApi(this.team.prefecture_code)
  },
  mounted() {
    this.id = this.team.id
    this.name = this.team.name
    this.mail_address = this.team.mail_address
    this.url = this.team.url
    this.prefecture = this.team.prefecture
    this.prefecture_code = this.team.prefecture_code
    // set initial value
    this.prefectureList = [{ prefName: this.team.prefecture, prefCode: this.prefecture_code}]
    this.city = this.team.city
    this.city_code = this.team.city_codes
    // set initial value
    this.cityList = [{ cityName: this.team.city, cityCode: this.team.city_codes}]
    this.street_number = this.team.street_number
    this.team_image = this.team.team_image
    this.sports_id = this.team.sports_id
    this.team_type = this.team.team_type ? this.team.team_type.split(',').map(Number) : []
    this.target_age_type = this.team.target_age_type ? this.team.target_age_type.split(',').map(Number) : []
    this.team_information = this.team.team_information
  },
  data () {
    return {
      prefectureList: [],
      cityList: ['都道府県を選択してください'],
      id: '',
      name: '',
      mail_address: '',
      url: '',
      zipcode: '',
      initial_prefecutre: '',
      prefecture_code: '',
      prefecture: '',
      initial_city: '',
      city_code: '',
      city: '',
      street_number: '',
      team_image: '',
      sports_id: '',
      team_type: [],
      target_age_type: [],
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
          { sportsType: 'スイミング', sportsId: 7 },
      ],
      targetAgeList: [
          { targetAgeType: 'キッズ', ageId: 1 },
          { targetAgeType: '小学生', ageId: 2 },
          { targetAgeType: '中学生', ageId: 3 },
          { targetAgeType: '高校生', ageId: 4 },
          { targetAgeType: '大学・専門学生', ageId: 5 },
          { targetAgeType: '社会人', ageId: 6 },
      ],
      latitude: 0,
      longitude: 0
    }
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
            this.city_code = this.cityList.find(city => city.cityName === this.city).cityCode
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
    updateTeam () {
      if (!this.name || !this.sports_id) {
        return
      }
      this.getAddressXY(
        () => {
          this.$store
            .dispatch('api/apiRequest', {
              api: 'teamEdit',
              query: { id: this.id},
              data: {
                id: this.id,
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
                latitude: this.latitude,
                longitude: this.longitude
              }
            })
            .then((response) => {
              if (response.status === 200) {
                this.closeModal()
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
      this.$emit('teamEdit')
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
</style>
