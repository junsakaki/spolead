<template>
  <v-layout
    column
    justify-center
    align-center
  >
    <div class="page-header">
      <div class="page-header-title">
        <common-button @click="goLoginPage" button-color="primary" button-size="large">
          既にアカウントをお持ちですか？
        </common-button>
      </div>
    </div>
    <div class="page-title">
      アカウント登録
    </div>
    <v-flex
      xs12
      sm8
      md6
      d-flex
      flex-wrap
      class="page-content"
    >
      <v-form
        ref="form"
        v-model="valid"
        lazy-validation
      >
        <v-text-field
          v-model="nickname"
          :counter="30"
          :rules="nameRules"
          label="ニックネーム"
          required
        />
        <v-text-field
          v-model="email"
          :rules="emailRules"
          label="メールアドレス"
          required
        />
        <v-text-field
          v-model="password"
          :rules="passwordRules"
          label="パスワード"
          required
        />
        <v-text-field
          v-model="passwordConfirm"
          :rules="passwordConfirmRules"
          label="パスワード（確認）"
          required
        />
      </v-form>
    </v-flex>
    <common-button @click="signUp" button-size="large" button-color="primary" class="signup-button">
      アカウント登録
    </common-button>
  </v-layout>
</template>

<script>
import { colors } from '~/assets/js/Colors.js'
import CommonButton from '~/components/atoms/CommonButton.vue'

export default {
  components: {
    CommonButton
  },
  data () {
    return {
      colors,
      valid: true,
      nickname: '',
      email: '',
      password: '',
      passwordConfirm: '',
      nameRules: [
        v => !!v || 'ニックネームは必須項目です。',
        v => (v && v.length <= 30) || 'ニックネームは30文字が上限です。'
      ],
      emailRules: [
        v => !!v || 'Emailは必須項目です。',
        v => /.+@.+\..+/.test(v) || 'Emailの形式が正しくありません。'
      ],
      passwordRules: [
        v => (v && v.length >= 5) || 'パスワードは6文字以上に設定してください。'
      ],
      passwordConfirmRules: [
        v => (v === this.password) || 'パスワードが一致しません。'
      ]
    }
  },
  methods: {
    goLoginPage () {
      this.$router.push('/login')
    },
    validate () {
      return this.$refs.form.validate()
    },
    reset () {
      this.$refs.form.reset()
    },
    resetValidation () {
      this.$refs.form.resetValidation()
    },
    signUp () {
      if (this.validate()) {
        this.$store
          .dispatch('api/apiRequest', {
            api: 'signup',
            data: {
              nickname: this.nickname,
              email: this.email,
              password: this.password
            }
          }).then((res) => {
            if (res.status === 200) {
              localStorage.setItem('token', res.data.access_token)
              localStorage.setItem('userId', res.data.user_id)
              localStorage.setItem('loginDateTime', new Date())
              // location.replace('http://localhost:8000/')
              //location.replace('https://spolead.com/')
              location.replace('http://develop01.spolead-sv.net/')
              console.log('token →', res.data.access_token)
            }
          })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/page.scss';
.page-header {
  @include default-page-header;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.page-title {
  width: 100%;
  height: 13vh;
  font-size: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.SP .page-title {
  font-size: 32px;
}
.page-content {
  margin: 32px;
}
.v-input {
  width: 25vw;
}
.SP .v-input {
  width: 75vw;
}
.signup-button {
  width: 25vw;
}
.SP .signup-button {
  width: 75vw;
}
</style>
