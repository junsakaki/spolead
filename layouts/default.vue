<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <!-- <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
      v-if="token"
    > -->
      <v-list>
        <v-list-item
          v-for="(item, i) in !!token ? [...items, logoutItem] : [...items, ...loginItems]"
          :key="i"
          :to="item.to"
          @click="item.onClick"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
    >
      <!-- <v-app-bar-nav-icon @click.stop="drawer = !drawer" v-if="token" /> -->
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title v-if="isMobile" @click="$router.push('/')" class="toolbar SP">{{title}}<font class="sub-title SP">{{subTitle}}</font></v-toolbar-title>
      <v-toolbar-title v-else @click="$router.push('/')" style="cursor: pointer">{{subTitle + ' - ' + title}}</v-toolbar-title>
      <v-spacer />
      <common-button @click="logOut" v-if="!!token && !isMobile" button-color="warning">
        ログアウト
      </common-button>
      <common-button @click="$router.push('/login')" v-else-if="!isMobile" button-color="primary">
        チームを登録するにはログインが必要です
      </common-button>
    </v-app-bar>
    <v-content>
      <v-container  v-resize="onResize" :class="isMobile && 'SP'">
        <nuxt />
      </v-container>
    </v-content>
    <v-footer
      color="primary lighten-1"
      padless
      app
    >
      <v-row
        justify="center"
        no-gutters
      >
        <v-btn
          v-for="(link,i) in footerLinks"
          :key="i"
          :to="link.to"
          color="white"
          text
          rounded
          class="my-2"
        >
          {{ link.title }}
        </v-btn>
        <v-col
          class="primary lighten-2 py-4 text-center white--text copyright"
          cols="12"
        >
          <span>&copy; SpoLead.All rights reserved 2020 {{ nowYear }}</span>
        </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>

<script>
import CommonButton from '~/components/atoms/CommonButton.vue'
export default {
  components: {
    CommonButton
  },
  data () {
    return {
      token: '',
      clipped: false,
      drawer: false,
      fixed: false,
      isLogin: localStorage,
      items: [
        {
          icon: 'mdi-apps',
          title: 'スポーツ一覧',
          to: '/'
        },
        {
          icon: 'mdi-apps',
          title: 'エリアから探す',
          to: '/topPrefecture'
        }
      ],
      loginItems: [
        {
          icon: 'mdi-chart-bubble',
          title: 'ログイン',
          to: '/login'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'アカウント登録',
          to: '/signup'
        }
      ],
      logoutItem: {
        icon: 'mdi-chart-bubble',
        title: 'ログアウト',
        onClick: () => this.logOut()
      },
      footerLinks: [
        {
          title: 'ホーム',
          to: '/'
        },
        {
          title: 'お問い合わせ',
          to: '/ContactForm'
        },
        {
          title: '利用規約',
          to: '/TermOfService'
        },
        {
          title: '運営管理',
          to: '/MasterInformation'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'SpoLead',
      subTitle: '総合スポーツチーム・クラブ口コミ情報ポータル',
      isMobile: this.$vuetify.breakpoint.smAndDown
    }
  },
  computed: {
    nowYear () {
      const year = new Date()
      const nowYear = year.getFullYear()
      if (nowYear > 2020) {
        return `~ ${nowYear}`
      } else {
        return ''
      }
    }
  },
  created () {
    this.token = localStorage.getItem('token')
    // if (!this.token) {
    //   this.$router.push('/login')
    // }
  },
  methods: {
    logOut () {
      // only remove localStorage

      // this.$store
      //   .dispatch('api/apiRequest', {
      //     api: 'login',
      //     data: {
      //       email: this.email,
      //       password: this.password
      //     }
      //   }).then((res) => {
      //     if (res.status === 200) {
      localStorage.removeItem('token')
      localStorage.removeItem('userId')
      localStorage.removeItem('loginDateTime')
      this.$router.push('/')
      // due to local development
      // location.replace('http://localhost:8000/')
      location.replace('https://spolead.com/')
      //location.replace('http://develop01.spolead-sv.net')
      //   }
      // }).catch((err) => {
      //   console.log('ERROR', err)
      // })
    },
    onResize () {
      this.isMobile = this.$vuetify.breakpoint.smAndDown
    }
  }
}
</script>
<style lang="scss">
#app{
  font-family: 'spolead';
}
.v-toolbar__content {
  .common-button {
    margin-right: 20px;
  }
}
.toolbar {
  cursor: pointer;
}
.toolbar.SP {
  padding: 0 !important;
  overflow: unset;
}
.sub-title.SP {
  font-size: 10px;
  margin-left: 4px;
}
.login-buttons {
  background: transparent;
  width: 100%;
}
.v-footer {
  position: unset;
}
.copyright {
  overflow: unset;
  width: 100vw;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 12px;
}
</style>
