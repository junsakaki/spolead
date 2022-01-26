<template>
  <v-app dark>
    <Header :token="token" />
    <v-content>
      <v-container :class="$vuetify.breakpoint.smAndDown && 'SP'">
        <nuxt />
      </v-container>
    </v-content>
    <ScrollTopButton />
    <v-footer padless>
      <div class="a8">
        <a href="https://px.a8.net/svt/ejp?a8mat=3HP98U+2FIQPE+4ABU+6EMGX" rel="nofollow">
        <img border="0" width="300" height="250" alt="" src="https://www27.a8.net/svt/bgt?aid=211130382147&wid=001&eno=01&mid=s00000020001001076000&mc=1"></a>
        <img border="0" width="1" height="1" src="https://www19.a8.net/0.gif?a8mat=3HP98U+2FIQPE+4ABU+6EMGX" alt="">
        <a href="https://px.a8.net/svt/ejp?a8mat=3N202Z+11IBW2+2DDC+7XTCO1" rel="nofollow">
        <img border="0" width="300" height="250" alt="" src="https://www24.a8.net/svt/bgt?aid=220123115063&wid=001&eno=01&mid=s00000011064048006000&mc=1"></a>
        <img border="0" width="1" height="1" src="https://www10.a8.net/0.gif?a8mat=3N202Z+11IBW2+2DDC+7XTCO1" alt="">
        <a href="https://px.a8.net/svt/ejp?a8mat=3N202Z+19UECY+2S1O+1ZHAW1" rel="nofollow">
        <img border="0" width="300" height="250" alt="" src="https://www23.a8.net/svt/bgt?aid=220123115077&wid=001&eno=01&mid=s00000012966012006000&mc=1"></a>
        <img border="0" width="1" height="1" src="https://www12.a8.net/0.gif?a8mat=3N202Z+19UECY+2S1O+1ZHAW1" alt="">
        <a href="https://px.a8.net/svt/ejp?a8mat=3N202Z+1VVFQQ+2SIW+6EER5" rel="nofollow">
        <img border="0" width="300" height="250" alt="" src="https://www25.a8.net/svt/bgt?aid=220123115114&wid=001&eno=01&mid=s00000013028001075000&mc=1"></a>
        <img border="0" width="1" height="1" src="https://www12.a8.net/0.gif?a8mat=3N202Z+1VVFQQ+2SIW+6EER5" alt="">
        <a href="https://px.a8.net/svt/ejp?a8mat=3N1YIG+68GFUA+4J66+BYT9D" rel="nofollow">
        <img border="0" width="300" height="250" alt="" src="https://www26.a8.net/svt/bgt?aid=220121080377&wid=001&eno=01&mid=s00000021147002010000&mc=1"></a>
        <img border="0" width="1" height="1" src="https://www19.a8.net/0.gif?a8mat=3N1YIG+68GFUA+4J66+BYT9D" alt="">
      </div>
      <div class="footer-links">
        <div v-for="link in filteredFooterLinks()" :key="link.title" class="link white--text">
          <router-link :to="link.to">
            {{ link.title }}
          </router-link>
        </div>
      </div>
      <div class="footer-copyright">
        <span class="grey--text">&copy; SpoLeadeR.All rights reserved 2020 {{ nowYear }}</span>
      </div>
    </v-footer>
  </v-app>
</template>

<script>
import Header from '~/components/shared/organisms/Header.vue'
import ScrollTopButton from '~/components/shared/atoms/ScrollTopButton.vue'

export default {
  components: {
    Header,
    ScrollTopButton
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
          to: '/top-prefecture'
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
          to: '/contact-form'
        },
        {
          title: '利用規約',
          to: '/term-of-service'
        },
        {
          title: 'BBS掲示板ガイドライン',
          to: '/guideline/forums'
        },
        {
          title: '運営管理',
          to: '/master-information'
        },
        {
          title: 'サイトマップ',
          to: '/sitemap'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'SpoLeadeR',
      subTitle: 'ALL SPORTS BEGINING SpoLedeR'
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
      // location.replace('http://develop01.spolead-sv.net')
      //   }
      // })
    },
    filteredFooterLinks () {
      if (this.token) {
        return [
          ...this.footerLinks,
          {
            title: 'チームを登録する',
            to: '/teams/new'
          }
        ]
      } else {
        return [
          ...this.footerLinks,
          {
            title: 'チーム登録するにはログインが必要です',
            to: '/login'
          }
        ]
      }
    }
  }
}
</script>
<style lang="scss">
#app{
  font-family: 'spoleader';
}
.v-main {
  padding: 0 !important;
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
.header {
  display: flex;
  justify-content: space-between;
  z-index: 1;
  padding-left: 12px;
  margin: 0 72px;
  background-color: white;
  width: -webkit-fill-available;
  .logo {
    display: flex;
    align-items: center;
  }
  .links {
    display: flex;
  }
  .link {
    font-size: 14px;
    padding: 18px 12px;
    color: white;
    text-decoration: none;
  }
  .link.login, .link.logout {
    background-color: #ef4848;
  }
  .link.signup {
    background-color: #43464a;
  }
}
.header.fixed {
  position: fixed;
  box-shadow: 0px 7.5px 18px 1.2px rgb(0 0 0 / 12%);
}
.breadcrumbs {
  width: 100%;
  padding: 0 0 12px !important;
}
.footer-links {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
  padding: 20px 12px;
  .link {
    font-size: 12px;
    padding: 4px 8px;
    a {
      text-decoration: none;
    }
    &:hover {
      text-decoration: underline;
      opacity: 0.8;
    }
  }
}
.footer-copyright {
  font-size: 10px;
  text-align: center;
  width: 100%;
  padding: 8px 0;
  background-color: white;
}
.a8 {
  text-align: center;
  width: 100%;
}
</style>
