<template>
  <v-row justify="center">
    <v-dialog :value="dialog" persistent max-width="600px" class="search-form">
      <v-card class="pa-4">
        <v-card-text>
          <div class="mb-5">
            <div>キーワード</div>
            <input v-model="search.searchWord" placeholder="検索(チーム名、都道府県、市区町村)" class="px-2 form-input">
          </div>
          <v-divider class="mb-5" />
          <div>
            <div>スポーツカテゴリ</div>
            <v-radio-group
              v-model="search.sportsId"
              row
              class="ma-0"
            >
              <v-radio
                v-for="item in $SPORTS"
                :key="item.id"
                :label="item.title"
                :value="item.id"
                class="pb-5"
              />
            </v-radio-group>
          </div>
          <v-divider class="mb-5" />
          <div class="mb-5">
            <div>エリア</div>
            <v-radio-group
              v-model="areaSelectionsType"
              row
              class="ma-0"
            >
              <v-radio
                v-for="areaSelection in areaSelections"
                :key="areaSelection.id"
                :label="areaSelection.name"
                :value="areaSelection.type"
                @click="onSelectAreaSelectionsType(areaSelection.type)"
              />
            </v-radio-group>
            <div v-if="areaSelectionsType === 'specify'" class="body-1 ml-2">
              <div @click="resetSelectedArea()">
                選択しない
              </div>
              <div v-for="area in $AREA" :key="area.id">
                <input
                  :id="`selectedAreaCode-${area.id}`"
                  v-model="selectedAreaCode"
                  name="selectedAreaCode"
                  type="radio"
                  :value="area.id"
                  style="display: none;"
                >
                <label :for="`selectedAreaCode-${area.id}`">{{ area.title }}</label>
                <div v-if="area.id === selectedAreaCode" class="ml-4">
                  <div v-for="prefecture in area.prefectures" :key="prefecture.id" class="mr-2">
                    <input
                      :id="`selectedPrefectureCode-${prefecture.id}`"
                      v-model="selectedPrefectureCode"
                      name="selectedPrefectureCode"
                      type="radio"
                      :value="prefecture.id"
                      style="display: none;"
                    >
                    <label :for="`selectedPrefectureCode-${prefecture.id}`">{{ prefecture.title }}</label>
                    <div v-if="prefecture.id === selectedPrefectureCode" class="ml-4">
                      <div :class="selectedCityCode === null && 'font-weight-bold'" @click="() => selectedCityCode = null">
                        <input
                          id="selectedCityCode-all"
                          v-model="selectedCityCode"
                          name="selectedCityCode"
                          type="radio"
                          :value="null"
                          style="display: none;"
                        >
                        <label for="selectedCityCode-all">{{ prefecture.title }}全域</label>
                      </div>
                      <div v-for="city in cities" :key="city.id" :class="selectedCityCode === city.cityCode && 'font-weight-bold'">
                        <input
                          :id="`selectedCityCode-${city.cityCode}`"
                          v-model="selectedCityCode"
                          name="selectedCityCode"
                          type="radio"
                          :value="city.cityCode"
                          style="display: none;"
                        >
                        <label :for="`selectedCityCode-${city.cityCode}`">{{ city.cityName }}</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="areaSelectionsType === 'current'" class="body-1 ml-2">
              <div v-if="isFetchingCurrentPosition">
                位置情報を取得中です...
              </div>
              <div v-else>
                現在地(緯度: {{ search.latitude }}, 経度: {{ search.longitude }})に近いエリアから検索します。
              </div>
            </div>
          </div>
          <v-divider class="mb-5" />
          <div>
            <div>運営団体</div>
            <v-flex d-flex flex-wrap>
              <v-checkbox
                v-for="item in $TEAM_TYPE"
                :key="item.typeId"
                v-model="search.teamType"
                :label="item.teamType"
                :value="item.typeId"
                class="ma-0"
              />
            </v-flex>
          </div>
          <v-divider class="mb-5" />
          <div>
            <div>対象層</div>
            <v-flex d-flex flex-wrap>
              <v-checkbox
                v-for="item in $TARGET_AGE"
                :key="item.id"
                v-model="search.targetAgeType"
                :label="item.targetAgeType"
                :value="item.ageId"
                class="ma-0"
              />
            </v-flex>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="blue darken-1" text @click="closeModal">
            やめる
          </v-btn>
          <v-btn color="blue darken-1" text :disabled="isFetchingCurrentPosition" @click="execSearch">
            検索する
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  props: {
    dialog: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      search: {
        searchWord: '',
        targetAgeType: [],
        teamType: [],
        sportsId: 1,
        latitude: null,
        longitude: null,
        cityCodes: []
      },
      areaSelectionsType: 'specify',
      areaSelections: [{ id: 1, type: 'specify', name: '都道府県から選択する' }, { id: 2, type: 'current', name: '現在地から検索する' }],
      isFetchingCurrentPosition: false,
      selectedAreaCode: null,
      selectedPrefectureCode: null,
      cities: [],
      selectedCityCode: null
    }
  },
  watch: {
    selectedPrefectureCode () {
      this.cities = []
      this.getCitySelect()
    },
    areaSelectionsType () {
      this.resetSelectedArea()
    }
  },
  created () {
    this.fetchFormValues()
  },
  methods: {
    fetchFormValues () {
      if (this.$route.query.prefCode) {
        const targetArea = this.$AREA.find(area => area.prefectures.find(pref => pref.id === Number(this.$route.query.prefCode)))
        this.selectedAreaCode = this.$route.query.prefCode ? targetArea.id : null
      }
      this.selectedPrefectureCode = Number(this.$route.query.prefCode)
      this.selectedCityCode = this.$route.query.cityCodes && this.$route.query.cityCodes.split(',').length === 1 ? this.$route.query.cityCodes : null
      this.search = {
        searchWord: this.$route.query.searchWord ?? '',
        targetAgeType: this.$route.query.targetAgeType ? this.$route.query.targetAgeType.split(',').map(Number) : [],
        teamType: this.$route.query.teamType ? this.$route.query.teamType.split(',').map(Number) : [],
        sportsId: Number(this.$route.query.sportsId) ?? 999,
        latitude: this.$route.query.latitude ?? null,
        longitude: this.$route.query.longitude ?? null,
        prefCode: this.$route.query.prefCode,
        cityCodes: this.$route.query.cityCodes
      }
    },
    execSearch () {
      if (this.areaSelectionsType === 'specify') {
        const cityCodes = this.selectedCityCode ? [this.selectedCityCode] : this.selectedPrefectureCode ? this.cities.map(city => Number(city.cityCode)) : null
        this.search = {
          ...this.search,
          latitude: null,
          longitude: null,
          prefCode: cityCodes === null ? null : this.selectedPrefectureCode,
          cityCodes
        }
      }
      this.closeModal()
      this.$emit('execSearch', this.search)
    },
    closeModal () {
      this.$emit('closeModal')
    },
    onSelectAreaSelectionsType (type) {
      if (type === 'current') {
        this.isFetchingCurrentPosition = true
        navigator.geolocation.getCurrentPosition((position) => {
          this.search = {
            ...this.search,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            cityCodes: null
          }
          this.isFetchingCurrentPosition = false
        }, () => {
          this.isFetchingCurrentPosition = false
          this.areaSelectionsType = 'specify'
        })
      }
      if (type === 'specify') {
        this.search = {
          ...this.search,
          latitude: null,
          longitude: null,
          cityCodes: []
        }
      }
    },
    getCitySelect () {
      this.$store
        .dispatch('api/apiRequest', {
          api: 'getCityApi',
          params: {
            prefCode: this.selectedPrefectureCode
          }
        })
        .then((response) => {
          if (response.status === 200) {
            this.cities = response.data.result
          }
        })
    },
    resetSelectedArea () {
      this.selectedAreaCode = null
      this.selectedPrefectureCode = null
      this.cities = []
      this.selectedCityCode = null
    }
  }
}
</script>
<style lang="scss" scoped>
.form-input {
  border: solid 1px rgba(156, 156, 156, 0.37);
  border-radius: 4px;
  font-size: 14px;
  width: 100%;
}
</style>
