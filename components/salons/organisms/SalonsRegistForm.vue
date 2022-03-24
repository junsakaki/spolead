<template>
  <v-card>
    <v-card-title v-if="salon" class="justify-space-between">
      <span class="headline">オンラインサロンの編集フォーム</span>
    </v-card-title>
    <v-card-text>
      <v-container>
        <div class="subtitle-1 font-weight-bold">
          概要
        </div>
        <v-col cols="12">
          <v-text-field v-model="form.name" label="タイトル" required />
        </v-col>
        <v-col cols="12">
          <v-text-field v-model="form.caption" label="概要" required />
        </v-col>
        <v-col cols="12">
          <v-file-input
            label="トップ画像"
            prepend-icon="mdi-camera"
            required
            @change="f => upload(f, 'image_top')"
          />
          <v-img
            v-if="form.image_top"
            :src="form.image_top"
            max-height="150"
            max-width="250"
            contain
          />
        </v-col>
        <v-col cols="12">
          <v-file-input
            label="サブ画像"
            prepend-icon="mdi-camera"
            required
            @change="f => upload(f, 'image_sub')"
          />
          <v-img
            v-if="form.image_sub"
            :src="form.image_sub"
            max-height="150"
            max-width="250"
            contain
          />
        </v-col>
        <v-col cols="12">
          <v-textarea
            v-model="form.content"
            autocomplete="コミュニティ内容"
            label="コミュニティ内容"
            dense
            required
          />
        </v-col>
        <v-col cols="12">
          <v-textarea
            v-model="form.background"
            autocomplete="背景・経緯"
            label="背景・経緯"
            dense
            required
          />
        </v-col>
        <v-col cols="12">
          <v-textarea
            v-model="form.self_introduction"
            autocomplete="自己紹介"
            label="自己紹介"
            dense
            required
          />
        </v-col>
        <v-col cols="12">
          <v-textarea
            v-model="form.precautions"
            autocomplete="注意事項等"
            label="注意事項等"
            dense
            required
          />
        </v-col>
        <div class="subtitle-1 font-weight-bold">
          料金プラン
        </div>
        <v-card v-for="(plan, i) in form.plans" :key="plan.id" outlined tile class="mb-4">
          <div v-if="i !== 0" class="text-right">
            <v-btn class="submit-button" color="error" icon @click="reducePlan(i)">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </div>
          <v-col cols="12">
            <v-text-field v-model="plan.name" label="プランの名前" required />
          </v-col>
          <v-col cols="12">
            <v-text-field v-model="plan.caption" label="プランの説明" required />
          </v-col>
          <v-col cols="12">
            <v-text-field v-model.number="plan.amount" label="月額料金" type="number" required />
          </v-col>
        </v-card>
        <v-btn color="primary" outlined block @click="addPlan">
          プランを追加
        </v-btn>
        <div class="subtitle-1 font-weight-bold mt-8">
          主催者情報
        </div>
        <v-col cols="12">
          <v-text-field v-model="form.owner.name" label="氏名" required />
        </v-col>
        <v-col cols="12">
          <v-text-field v-model="form.owner.address" label="住所" required />
        </v-col>
        <v-col cols="12">
          <v-text-field v-model="form.owner.birthday" label="生年月日" required />
        </v-col>
        <v-col cols="12">
          <v-text-field v-model="form.owner.tel" label="電話番号" required />
        </v-col>
        <v-col cols="12">
          <v-file-input
            label="本人確認書類①"
            prepend-icon="mdi-camera"
            required
            @change="f => upload(f, 'owner', 'identification_1')"
          />
          <v-img
            v-if="form.owner.identification_1"
            :src="form.owner.identification_1"
            max-height="150"
            max-width="250"
            contain
          />
        </v-col>
        <v-col cols="12">
          <v-file-input
            label="本人確認書類②"
            prepend-icon="mdi-camera"
            required
            @change="f => upload(f, 'owner', 'identification_2')"
          />
          <v-img
            v-if="form.owner.identification_2"
            :src="form.owner.identification_2"
            max-height="150"
            max-width="250"
            contain
          />
        </v-col>
        <v-col cols="12">
          <v-text-field v-model="form.owner.transfer_account" label="振り込み口座情報" required />
        </v-col>
      </v-container>
    </v-card-text>
    <v-card-actions class="submit-button-area">
      <v-btn class="submit-button" color="primary" @click="submit">
        申請
      </v-btn>
      <v-btn v-if="salon" class="submit-button" color="grey" dark @click="closeModal(false)">
        やめる
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    salon: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      breadcrumbs: [
        ...this.$BREADCRUMBS,
        {
          text: 'オンラインサロンの登録申請',
          disabled: true
        }
      ],
      form: {
        name: '',
        caption: '',
        image_top: '',
        image_sub: '',
        content: '',
        background: '',
        self_introduction: '',
        precautions: '',
        plans: [
          { id: 1, name: '', caption: '', amount: 0 }
        ],
        owner: {
          name: '',
          address: '',
          mail_address: '',
          birthday: '',
          tel: '',
          identification_1: '',
          identification_2: '',
          transfer_account: ''
        }
      }
    }
  },
  created () {
    if (this.salon) {
      console.log(this.salon)
      this.form = { ...this.salon }
    }
  },
  methods: {
    submit () {
      this.$emit('submit', this.form)
      this.closeModal(true)
    },
    upload (file, p, c) {
      if (file !== undefined && file !== null) {
        if (file.name.lastIndexOf('.') <= 0) {
          return
        }
        const fr = new FileReader()
        fr.readAsDataURL(file)
        fr.addEventListener('load', () => {
          if (c) {
            this.form[p][c] = fr.result
          } else {
            this.form[p] = fr.result
          }
        })
      } else if (c) {
        this.form[p][c] = ''
      } else {
        this.form[p] = ''
      }
    },
    addPlan () {
      const lastValue = this.form.plans[this.form.plans.length - 1]
      if (lastValue.name === '' || lastValue.caption === '') {
        return
      }
      this.form.plans.push({ id: this.form.plans.length + 1, name: '', caption: '', amount: 0 })
    },
    reducePlan (index) {
      this.form.plans.splice(index, 1)
    },
    closeModal (shouldUpdateUser) {
      this.$emit('closeModal', shouldUpdateUser)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/page.scss';
.container {
  width: 100%;
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
