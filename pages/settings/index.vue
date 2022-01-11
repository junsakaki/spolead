<template>
  <div>
    <v-breadcrumbs :items="breadcrumbs" class="breadcrumbs">
      <template #divider>
        <v-icon>mdi-chevron-right</v-icon>
      </template>
    </v-breadcrumbs>
    <div>
      <div>
        <div class="subtitle-1 font-weight-bold">
          アカウント設定
        </div>
        <div class="ml-4">
          <div class="subtitle-2 font-weight-bold">
            パスワードをリセットする
          </div>
          <v-form
            ref="form"
            v-model="valid"
            :class="`${!$vuetify.breakpoint.smAndDown && 'reset-form'} ml-4 mt-2`"
            lazy-validation
          >
            <div :class="`d-flex align-center caption ${!$vuetify.breakpoint.smAndDown && 'pb-4'}`">
              現在のパスワード
            </div>
            <v-text-field
              v-model="password.current"
              required
              placeholder="現在のパスワードを入力"
              class="ma-0 pa-0"
              :append-icon="passwordDisplay.current ? 'mdi-eye' : 'mdi-eye-off'"
              :type="passwordDisplay.current ? 'text' : 'password'"
              @click:append="passwordDisplay.current = !passwordDisplay.current"
            />
            <div :class="`d-flex align-center caption ${!$vuetify.breakpoint.smAndDown && 'pb-4'}`">
              新しいパスワード
            </div>
            <v-text-field
              v-model="password.new"
              :rules="passwordRules"
              required
              placeholder="新しいパスワードを入力"
              class="ma-0 pa-0"
              :append-icon="passwordDisplay.new ? 'mdi-eye' : 'mdi-eye-off'"
              :type="passwordDisplay.new ? 'text' : 'password'"
              @click:append="passwordDisplay.new = !passwordDisplay.new"
            />
            <div :class="`d-flex align-center caption ${!$vuetify.breakpoint.smAndDown && 'pb-4'}`">
              新しいパスワード（確認用）
            </div>
            <v-text-field
              v-model="password.confirm"
              :rules="passwordConfirmRules"
              required
              placeholder="新しいパスワードを入力（確認用）"
              class="ma-0 pa-0"
              :append-icon="passwordDisplay.confirm ? 'mdi-eye' : 'mdi-eye-off'"
              :type="passwordDisplay.confirm ? 'text' : 'password'"
              @click:append="passwordDisplay.confirm = !passwordDisplay.confirm"
            />
          </v-form>
          <div class="text-center">
            <v-btn color="primary" text class="mt-2" @click="updatePassword">
              更新
            </v-btn>
          </div>
        </div>
      </div>
      <v-divider class="mt-4" />
      <div class="text-center">
        <v-btn color="error" text class="mt-4" @click="logOut">
          ログアウト
        </v-btn>
      </div>
    </div>
    <v-snackbar v-model="snackbar.display" top min-height="40" height="40" :color="snackbar.color">
      {{ snackbar.text }}
    </v-snackbar>
  </div>
</template>

<script>
export default {
  data () {
    return {
      breadcrumbs: [
        ...this.$BREADCRUMBS,
        {
          text: '各種設定',
          disabled: true
        }
      ],
      valid: true,
      password: {
        current: '',
        new: '',
        confirm: ''
      },
      passwordDisplay: {
        current: false,
        new: false,
        confirm: false
      },
      passwordRules: [
        v => (v && v.length >= 5) || 'パスワードは6文字以上に設定してください。'
      ],
      passwordConfirmRules: [
        v => (v === this.password.new) || 'パスワードが一致しません。'
      ],
      snackbar: {
        display: false,
        text: '',
        color: 'primary'
      }
    }
  },
  head () {
    return {
      title: '各種設定 | '
    }
  },
  created () {
    // 未ログインの場合はトップ画面へリダイレクトする
    if (!localStorage.getItem('token')) {
      this.$router.replace('/')
    }
  },
  methods: {
    validate () {
      return this.$refs.form.validate()
    },
    updatePassword () {
      if (this.validate()) {
        this.password = {
          current: '',
          new: '',
          confirm: ''
        }
        this.$store
          .dispatch('api/apiRequest', {
            api: 'passwordUpdate',
            data: {
              current: this.password.current,
              new: this.new
            }
          }).then((res) => {
            if (res.status === 200) {
              this.snackbar = true
              this.snackbarText = 'パスワードを更新しました'
              this.snackbar = {
                display: true,
                text: 'パスワードを更新しました',
                color: 'primary'
              }
            }
          }).catch(() => {
            this.snackbar = {
              display: true,
              text: 'パスワードの更新に失敗しました',
              color: 'error'
            }
          })
      }
    },
    logOut () {
      localStorage.removeItem('token')
      localStorage.removeItem('userId')
      localStorage.removeItem('loginDateTime')
      location.replace('/')
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
.reset-form {
  display: grid;
  grid-template-columns: 200px 1fr;
  grid-gap: 8px 0;
}
</style>
