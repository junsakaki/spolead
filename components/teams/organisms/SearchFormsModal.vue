<template>
  <v-row justify="center">
    <v-dialog :value="dialog" persistent max-width="600px">
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
            <div>????</div>
          </div>
          <v-divider class="mb-5" />
          <div>
            <div>運営形式</div>
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
            <div>対象年代</div>
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
          <v-btn color="blue darken-1" text @click="execSearch">
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
        sportsId: 1
      }
    }
  },
  created () {
    this.fetchFormValues()
  },
  methods: {
    fetchFormValues () {
      this.search = {
        searchWord: this.$route.query.searchWord ?? '',
        targetAgeType: this.$route.query.targetAgeType ? this.$route.query.targetAgeType.split(',').map(Number) : [],
        teamType: this.$route.query.teamType ? this.$route.query.teamType.split(',').map(Number) : [],
        sportsId: Number(this.$route.query.sportsId) ?? 999
      }
    },
    execSearch () {
      this.closeModal()
      this.$emit('execSearch', this.search)
    },
    closeModal () {
      this.$emit('closeModal')
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
