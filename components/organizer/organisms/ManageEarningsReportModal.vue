<template>
  <v-row justify="space-around">
    <v-dialog
      v-if="dialog"
      :value="dialog"
      fullscreen
      max-width="600px"
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card class="d-flex align-start flex-column">
        <v-card-title class="justify-space-between">
          <span>売上報告</span>
        </v-card-title>
        <v-card-text>
          <v-dialog
            ref="selectYearMonthModal"
            v-model="modal"
            :return-value.sync="selectedYearMonth"
            persistent
            width="290px"
          >
            <template #activator="{ on, attrs }">
              <v-text-field
                v-model="selectedYearMonth"
                class="datepicker ml-auto"
                label="期間を選択"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              />
            </template>
            <v-date-picker
              v-model="selectedYearMonth"
              type="month"
              scrollable
              locale="ja"
            >
              <v-spacer />
              <v-btn
                text
                color="primary"
                @click="modal = false"
              >
                キャンセル
              </v-btn>
              <v-btn
                text
                color="primary"
                @click="selectYearMonth"
              >
                選択
              </v-btn>
            </v-date-picker>
          </v-dialog>
          <div class="d-flex flex-column">
            <span>オンラインサロン</span>
            <div class="earning-row pt-2">
              <div class="head text-center grey--text" />
              <div class="head text-center grey--text">
                累計売上
              </div>
              <div class="head text-center grey--text">
                期間売上({{ modal ? '--' : format(new Date(`${selectedYearMonth}-01`), 'yyyy年MM月') }})
              </div>
            </div>
            <div v-for="salon in salons" :key="salon.id" class="earning-row pt-2">
              <div class="head text-center grey--text">
                {{ salon.name }}
              </div>
              <div class="text-center ml-2">
                {{ `${(salon.total.total_amount).toLocaleString()}円` }}
              </div>
              <div class="text-center ml-2">
                {{ modal || !salon.term ? '--' : `${(salon.term.total_amount).toLocaleString()}円` }}
              </div>
            </div>
          </div>
          <div class="d-flex flex-column mt-4">
            <span>クラウドファンディング</span>
            <div class="earning-row pt-2">
              <div class="head text-center grey--text" />
              <div class="head text-center grey--text">
                累計売上
              </div>
              <div class="head text-center grey--text">
                期間売上({{ modal ? '--' : format(new Date(`${selectedYearMonth}-01`), 'yyyy年MM月') }})
              </div>
            </div>
            <div v-for="fund in funds" :key="fund.id" class="earning-row pt-2">
              <div class="head text-center grey--text">
                {{ fund.name }}
              </div>
              <div class="text-center ml-2">
                {{ `${(fund.total.total_amount).toLocaleString()}円` }}
              </div>
              <div class="text-center ml-2">
                {{ modal || !fund.term ? '--' : `${(fund.term.total_amount).toLocaleString()}円` }}
              </div>
            </div>
          </div>
          <div class="d-flex flex-column mt-4">
            <span>指導者マッチング</span>
            <div class="earning-row pt-2">
              <div class="head text-center grey--text" />
              <div class="head text-center grey--text">
                累計売上
              </div>
              <div class="head text-center grey--text">
                期間売上({{ modal ? '--' : format(new Date(`${selectedYearMonth}-01`), 'yyyy年MM月') }})
              </div>
            </div>
            <div v-for="lesson in lessons" :key="lesson.id" class="earning-row pt-2">
              <div class="head text-center grey--text">
                {{ lesson.name }}
              </div>
              <div class="text-center ml-2">
                {{ `${(lesson.total.total_amount).toLocaleString()}円` }}
              </div>
              <div class="text-center ml-2">
                {{ modal || !lesson.term ? '--' : `${(lesson.term.total_amount).toLocaleString()}円` }}
              </div>
            </div>
          </div>
        </v-card-text>
        <v-card-actions class="mt-auto ml-auto justify-end">
          <v-btn color="blue darken-1" text @click="closeModal(false)">
            閉じる
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { format } from 'date-fns'

export default {
  props: {
    dialog: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      selectedYearMonth: format(new Date(), 'yyyy-MM'),
      format,
      modal: false,
      salons: [],
      funds: [],
      lessons: []
    }
  },
  created () {
    this.load()
  },
  methods: {
    closeModal () {
      this.$emit('closeModal')
    },
    load () {
      this.$store
        .dispatch('api/apiRequest', {
          api: 'getOrganizerManageReports',
          params: {
            userId: Number(localStorage.getItem('organizer_user_id')),
            term: null
            // term: { year: 2023, month: 3 }
          }
        }).then((res) => {
          this.salons = []
          res.data.total.salons.forEach((salon, i) => {
            this.salons.push({ ...salon.salon, total: salon, term: res.data.term ? res.data.term.salons[i] : null })
          })
          // this.funds = []
          // res.data.total.funds.forEach((fund, i) => {
          //   this.funds.push({ ...fund.fund, total: fund, term: res.data.term ? res.data.term.funds[i] : null })
          // })
          // this.lessons = []
          // res.data.total.lessons.forEach((salon, i) => {
          //   this.lessons.push({ ...fund.fund, total: lesson, term: res.data.term ? res.data.term.lessons[i] : null })
          // })
        })
    },
    selectYearMonth () {
      this.$refs.selectYearMonthModal.save(this.selectedYearMonth)
      this.load()
    }
  }
}
</script>
<style lang="scss" scoped>
.datepicker {
  max-width: 180px;
}
.earning-row {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  .head {
    border-right: solid 1px;
  }
}
</style>
