<template>
  <div v-if="!['/login', '/signup'].includes($route.path)">
    <div v-if="$vuetify.breakpoint.smAndDown" class="header SP">
      <router-link to="/" class="logo">
        <img
          src="~/assets/images/SpoLeader-logo.png"
          :width="120"
          :aspect-ratio="16/6"
          class="logo"
        >
      </router-link>
      <div class="d-flex align-center justify-center">
        <v-menu
          open-on-hover
          bottom
          offset-y
        >
          <template #activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              v-bind="attrs"
              text
              class="menu-button"
              icon
              v-on="on"
            >
              <div class="d-flex flex-column button-text">
                <v-icon>mdi-menu</v-icon>
              </div>
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              v-for="(item, index) in mobileLinks"
              :key="`menu-item-${index}`"
              class="menu-item"
            >
              <div v-if="item.params">
                <div class="link">
                  {{ item.title }}
                </div>
                <div v-for="param in item.params" :key="`${item.title}-param-${param.id}`">
                  <router-link :to="`${item.to}?sportsId=${param.id}`" class="link">
                    <div class="ml-2">
                      {{ param.title }}
                    </div>
                  </router-link>
                </div>
              </div>
              <div v-else>
                <router-link :to="item.to" class="link">
                  {{ item.title }}
                </router-link>
              </div>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </div>
    <div v-else :class="`header ${$route.path === '/' ? 'fixed' : ''}`">
      <router-link to="/" class="logo">
        <img
          src="~/assets/images/SpoLeader-logo.png"
          :width="150"
          :aspect-ratio="16/6"
          class="logo"
        >
      </router-link>
      <div class="links">
        <div class="d-flex align-center justify-center">
          <v-menu
            open-on-hover
            bottom
            offset-y
          >
            <template #activator="{ on, attrs }">
              <v-btn
                color="primary"
                dark
                v-bind="attrs"
                text
                class="menu-button"
                v-on="on"
              >
                <div class="d-flex flex-column button-text">
                  <v-icon>mdi-account-group</v-icon>
                  <p class="icon-button-link">
                    チーム・スクール
                  </p>
                </div>
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                v-for="(item, index) in $SPORTS"
                :key="`sports-menu-item-${index}`"
                class="menu-item"
              >
                <router-link :to="`/teams?sportsId=${item.id}`" class="link">
                  {{ item.title }}
                </router-link>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
        <div class="d-flex align-center justify-center">
          <v-menu
            open-on-hover
            bottom
            offset-y
          >
            <template #activator="{ on, attrs }">
              <v-btn
                color="primary"
                dark
                v-bind="attrs"
                text
                class="menu-button"
                v-on="on"
              >
                <div class="d-flex flex-column button-text">
                  <v-icon>
                    mdi-clipboard-text
                  </v-icon>
                  <p class="icon-button-link">
                    掲示板
                  </p>
                </div>
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                v-for="(item, index) in $SPORTS"
                :key="`forums-menu-item-${index}`"
                class="menu-item"
              >
                <router-link :to="`/forums?sportsId=${item.id}`" class="link">
                  {{ item.title }}
                </router-link>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
        <router-link to="/salons" class="link icon-button align-center">
          <v-icon>
            mdi-home
          </v-icon>
          <p class="icon-button-link">
            オンラインサロン
          </p>
        </router-link>
        <router-link to="/funds" class="link icon-button align-center">
          <v-icon>
            mdi-cash-multiple
          </v-icon>
          <p class="icon-button-link">
            クラウドファンディング
          </p>
        </router-link>
        <router-link to="/lessons" class="link icon-button align-center">
          <v-icon>
            mdi-handshake-outline
          </v-icon>
          <p class="icon-button-link">
            指導者マッチング
          </p>
        </router-link>
        <div v-if="$auth && $auth.user" class="d-flex align-center justify-center">
          <v-menu
            open-on-hover
            bottom
            offset-y
          >
            <template #activator="{ on, attrs }">
              <v-btn
                color="primary"
                dark
                v-bind="attrs"
                text
                class="menu-button"
                v-on="on"
              >
                <div class="d-flex flex-column button-text">
                  <v-icon>mdi-account</v-icon>
                  <p>アカウント</p>
                </div>
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                v-for="(item, index) in accountMenu"
                :key="`account-menu-item-${index}`"
                class="menu-item"
              >
                <router-link :to="item.to" class="link">
                  {{ item.title }}
                </router-link>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
        <router-link v-else to="/login" class="link icon-button align-center">
          <v-icon>
            mdi-account
          </v-icon>
          <p class="icon-button-link">
            ログイン
          </p>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isMobile: this.$vuetify.breakpoint.smAndDown,
      accountMenu: [{ to: '/settings', title: '各種設定' }, { to: '/talks', title: 'トークルーム' }],
      mobileLinks: [
        { title: 'チーム・スクール', to: '/teams', params: this.$SPORTS },
        { title: '掲示板', to: '/forums', params: this.$SPORTS },
        { title: 'オンラインサロン', to: '/salons' },
        { title: 'クラウドファンディング', to: '/funds' },
        { title: '指導者マッチング', to: '/lessons' },
        { title: 'アカウント', to: '/settings' },
        { title: 'トークルーム', to: '/talks' }
      ],
      userRole: 'member'
    }
  },
  created () {
    this.checkRole()
  },
  methods: {
    checkRole () {
      if (this.$auth && this.$auth.user) {
        this.$store
          .dispatch('api/apiRequest', {
            api: 'userIndex',
            query: {
              id: this.$auth.user.sub
            }
          }).then((res) => {
            if (res.status === 200) {
              if (res.data.user.role === 'admin') {
                this.accountMenu = [...this.accountMenu, { to: '/manage', title: 'サービス管理' }]
                this.mobileLinks = [...this.mobileLinks, { to: '/manage', title: 'サービス管理' }]
              }
            }
          })
      }
    }
  }
}
</script>
<style lang="scss">
.header {
  z-index: 1;
  padding-left: 12px;
  margin: 0 72px;
  background-color: white;
  &.SP {
    margin: 0;
    padding-right: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
.fixed {
  position: fixed;
  box-shadow: 0px 7.5px 18px 1.2px rgb(0 0 0 / 12%);
}
.logo {
  display: flex;
  align-items: center;
}
.links {
  display: flex;
}
.link {
  position: relative;
  font-size: 14px;
  padding: 18px 12px;
  color: white;
  text-decoration: none;
}
.icon-button-wrapper.SP {
  padding-right: 14px;
}
.icon-button {
  display: flex;
  flex-direction: column;
  text-decoration: none;
  color: #0000008A  !important;
  .icon-button-link {
    display: block;
    margin: 0 !important; //.v-application p の定義に上書きされる可能性があるため!important
    font-size: 10px;
    text-align: center;
  }
}
.menu-button {
  display: flex;
  justify-content: center;
  align-items: center;
  .button-text {
    color: #0000008A  !important;
    font-size: 10px;
    p {
      margin: 0;
    }
  }
}
.menu-button::before{
  background-color: transparent;
}
.menu-item {
  min-height: 28px !important;
  .link {
    color: #0000008A  !important;
    padding: 0;
    font-size: 12px;
    width: 100%;
  }
  :hover {
    opacity: 0.6;
  }
}
.link:hover .selection-card {
  display: grid;
  grid-template-columns: 1fr;
}
</style>
