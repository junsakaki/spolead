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
          <span>出金履歴</span>
        </v-card-title>
        <v-card-text>
          <div class="withdrawal main mb-1">
            <div class="text-center grey--text">
              取引日時
            </div>
            <div class="text-center grey--text">
              出金額
            </div>
            <div class="text-center grey--text">
              取引内容
            </div>
          </div>
          <v-divider class="mb-2" />
          <div v-for="withdrawal in withdrawals" :key="`withdrawal-${withdrawal.id}`" class="withdrawal py-1">
            <div class="withdrawal-name text-center ml-2">
              {{ withdrawal.date }}
            </div>
            <div class="text-center">
              {{ withdrawal.amount.toLocaleString() }}円
            </div>
            <div class="">
              {{ withdrawal.token }}
            </div>
            <div class="filter" />
          </div>
          <div class="text-center mt-4">
            <v-pagination
              v-model="page"
              :length="Math.ceil(total_rows / perPage)"
            />
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
export default {
  props: {
    dialog: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      page: 1,
      perPage: 20,
      total_rows: 95,
      withdrawals: [
        { id: 0, date: '2022-01-01 12:00:00', amount: 100000, token: 'aidsd87a6d876a876687a / 四菱UFJ銀行 島根支店 口座番号: 119229600' },
        { id: 1, date: '2022-01-01 12:00:00', amount: 100000, token: 'aidsd87a6d876a876687a / 四菱UFJ銀行 島根支店 口座番号: 119229600' },
        { id: 2, date: '2022-01-01 12:00:00', amount: 100000, token: 'aidsd87a6d876a876687a / 四菱UFJ銀行 島根支店 口座番号: 119229600' },
        { id: 3, date: '2022-01-01 12:00:00', amount: 100000, token: 'aidsd87a6d876a876687a / 四菱UFJ銀行 島根支店 口座番号: 119229600' },
        { id: 4, date: '2022-01-01 12:00:00', amount: 100000, token: 'aidsd87a6d876a876687a / 四菱UFJ銀行 島根支店 口座番号: 119229600' },
        { id: 5, date: '2022-01-01 12:00:00', amount: 100000, token: 'aidsd87a6d876a876687a / 四菱UFJ銀行 島根支店 口座番号: 119229600' },
        { id: 6, date: '2022-01-01 12:00:00', amount: 100000, token: 'aidsd87a6d876a876687a / 四菱UFJ銀行 島根支店 口座番号: 119229600' },
        { id: 7, date: '2022-01-01 12:00:00', amount: 100000, token: 'aidsd87a6d876a876687a / 四菱UFJ銀行 島根支店 口座番号: 119229600' },
        { id: 8, date: '2022-01-01 12:00:00', amount: 100000, token: 'aidsd87a6d876a876687a / 四菱UFJ銀行 島根支店 口座番号: 119229600' },
        { id: 9, date: '2022-01-01 12:00:00', amount: 100000, token: 'aidsd87a6d876a876687a / 四菱UFJ銀行 島根支店 口座番号: 119229600' },
        { id: 10, date: '2022-01-01 12:00:00', amount: 100000, token: 'aidsd87a6d876a876687a / 四菱UFJ銀行 島根支店 口座番号: 119229600' },
        { id: 11, date: '2022-01-01 12:00:00', amount: 100000, token: 'aidsd87a6d876a876687a / 四菱UFJ銀行 島根支店 口座番号: 119229600' },
        { id: 12, date: '2022-01-01 12:00:00', amount: 100000, token: 'aidsd87a6d876a876687a / 四菱UFJ銀行 島根支店 口座番号: 119229600' },
        { id: 13, date: '2022-01-01 12:00:00', amount: 100000, token: 'aidsd87a6d876a876687a / 四菱UFJ銀行 島根支店 口座番号: 119229600' },
        { id: 14, date: '2022-01-01 12:00:00', amount: 100000, token: 'aidsd87a6d876a876687a / 四菱UFJ銀行 島根支店 口座番号: 119229600' },
        { id: 15, date: '2022-01-01 12:00:00', amount: 100000, token: 'aidsd87a6d876a876687a / 四菱UFJ銀行 島根支店 口座番号: 119229600' },
        { id: 16, date: '2022-01-01 12:00:00', amount: 100000, token: 'aidsd87a6d876a876687a / 四菱UFJ銀行 島根支店 口座番号: 119229600' },
        { id: 17, date: '2022-01-01 12:00:00', amount: 100000, token: 'aidsd87a6d876a876687a / 四菱UFJ銀行 島根支店 口座番号: 119229600' },
        { id: 18, date: '2022-01-01 12:00:00', amount: 100000, token: 'aidsd87a6d876a876687a / 四菱UFJ銀行 島根支店 口座番号: 119229600' },
        { id: 19, date: '2022-01-01 12:00:00', amount: 100000, token: 'aidsd87a6d876a876687a / 四菱UFJ銀行 島根支店 口座番号: 119229600' },
        { id: 20, date: '2022-01-01 12:00:00', amount: 100000, token: 'aidsd87a6d876a876687a / 四菱UFJ銀行 島根支店 口座番号: 119229600' }
      ]
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
.withdrawal {
  position: relative;
  display: grid;
  grid-template-columns: 200px 150px 1fr;
  text-decoration: none;
  color: inherit;
}
.withdrawal:visited {
  color: inherit;
}
.withdrawal.main {
  font-size: 12px;
}
.withdrawal-name {
  overflow: hidden;
  width: 100%;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.withdrawal .filter {
  position: absolute;
  width: 100%;
  height: 100%;
  background: #1976d214;
  opacity: 0;
  transition-duration: 0.5s;
  cursor: pointer;
}
.withdrawal:hover .filter {
  opacity: 1;
}
</style>
