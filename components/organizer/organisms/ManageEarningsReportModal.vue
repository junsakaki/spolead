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
                @click="$refs.selectYearMonthModal.save(selectedYearMonth)"
              >
                選択
              </v-btn>
            </v-date-picker>
          </v-dialog>
          <div class="d-flex flex-column">
            <span>オンラインサロン</span>
            <div class="earning-row pt-2">
              <div class="head text-center grey--text">
                累計売上
              </div>
              <div class="text-center ml-2">
                {{ `${(20000).toLocaleString()}円` }}
              </div>
            </div>
            <div class="earning-row pt-1">
              <div class="head text-center grey--text">
                期間売上({{ modal ? '--' : format(new Date(`${selectedYearMonth}-01`), 'yyyy年MM月') }})
              </div>
              <div class="text-center ml-2">
                {{ modal ? '--' : `${(1000).toLocaleString()}円` }}
              </div>
            </div>
            <div class="earning-row pt-1">
              <div class="head text-center grey--text">
                サロンA
              </div>
              <div class="text-center ml-2">
                {{ `${(1000).toLocaleString()}円` }}
              </div>
            </div>
            <div class="earning-row pt-1">
              <div class="head text-center grey--text">
                サロンB
              </div>
              <div class="text-center ml-2">
                {{ `${(1000).toLocaleString()}円` }}
              </div>
            </div>
          </div>
          <div class="d-flex flex-column mt-8">
            <span>クラウドファンディング</span>
            <div class="earning-row pt-2">
              <div class="head text-center grey--text">
                累計売上
              </div>
              <div class="text-center ml-2">
                {{ `${(20000).toLocaleString()}円` }}
              </div>
            </div>
            <div class="earning-row pt-1">
              <div class="head text-center grey--text">
                期間売上({{ modal ? '--' : format(new Date(`${selectedYearMonth}-01`), 'yyyy年MM月') }})
              </div>
              <div class="text-center ml-2">
                {{ modal ? '--' : `${(1000).toLocaleString()}円` }}
              </div>
            </div>
            <div class="earning-row pt-1">
              <div class="head text-center grey--text">
                ファンドA - プラン1
              </div>
              <div class="text-center ml-2">
                {{ `${(1000).toLocaleString()}円` }}
              </div>
            </div>
            <div class="earning-row pt-1">
              <div class="head text-center grey--text">
                ファンドA - プラン2
              </div>
              <div class="text-center ml-2">
                {{ `${(1000).toLocaleString()}円` }}
              </div>
            </div>
            <div class="earning-row pt-1">
              <div class="head text-center grey--text">
                ファンドB - プラン1
              </div>
              <div class="text-center ml-2">
                {{ `${(1000).toLocaleString()}円` }}
              </div>
            </div>
            <div class="earning-row pt-1">
              <div class="head text-center grey--text">
                ファンドB - プラン2
              </div>
              <div class="text-center ml-2">
                {{ `${(1000).toLocaleString()}円` }}
              </div>
            </div>
          </div>
          <div class="d-flex flex-column mt-4">
            <span>指導者マッチング</span>
            <div class="earning-row pt-2">
              <div class="head text-center grey--text">
                累計売上
              </div>
              <div class="text-center ml-2">
                {{ `${(20000).toLocaleString()}円` }}
              </div>
            </div>
            <div class="earning-row pt-1">
              <div class="head text-center grey--text">
                期間売上({{ modal ? '--' : format(new Date(`${selectedYearMonth}-01`), 'yyyy年MM月') }})
              </div>
              <div class="text-center ml-2">
                {{ modal ? '--' : `${(1000).toLocaleString()}円` }}
              </div>
            </div>
            <div class="earning-row pt-1">
              <div class="head text-center grey--text">
                募集A
              </div>
              <div class="text-center ml-2">
                {{ `${(1000).toLocaleString()}円` }}
              </div>
            </div>
            <div class="earning-row pt-1">
              <div class="head text-center grey--text">
                募集B
              </div>
              <div class="text-center ml-2">
                {{ `${(1000).toLocaleString()}円` }}
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
      modal: false
    }
  },
  created () {
  },
  methods: {
    closeModal () {
      this.$emit('closeModal')
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
  grid-template-columns: 1fr 1fr;
  .head {
    border-right: solid 1px;
  }
}
</style>
