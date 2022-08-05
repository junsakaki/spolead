<template>
  <div v-if="!['/login', '/signup'].includes($route.path)">
    <div v-if="$vuetify.breakpoint.smAndDown" class="header SP">
      <router-link to="/organizer" class="logo">
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
      <router-link to="/organizer" class="top d-flex align-center">
        <img
          src="~/assets/images/SpoLeader-logo.png"
          :width="150"
          :aspect-ratio="16/6"
          class="logo"
        >
        <div class="caption font-weight-bold">
          管理者ページ
        </div>
      </router-link>
      <div class="links">
        <router-link to="/organizer/salons" class="link icon-button align-center">
          <v-icon>
            mdi-home-outline
          </v-icon>
          <p class="icon-button-link">
            オンラインサロン
          </p>
        </router-link>
        <router-link to="/organizer/funds" class="link icon-button align-center">
          <v-icon>
            mdi-cash-multiple
          </v-icon>
          <p class="icon-button-link">
            クラウドファンディング
          </p>
        </router-link>
        <router-link to="/organizer/lessons" class="link icon-button align-center">
          <v-icon>
            mdi-handshake-outline
          </v-icon>
          <p class="icon-button-link">
            指導者マッチング
          </p>
        </router-link>
        <router-link to="/organizer/manage" class="link icon-button align-center">
          <v-icon>
            mdi-account-cog-outline
          </v-icon>
          <p class="icon-button-link">
            管理
          </p>
        </router-link>
        <router-link to="/organizer/help" class="link icon-button align-center">
          <v-icon>
            mdi-help-circle-outline
          </v-icon>
          <p class="icon-button-link">
            ヘルプ・Q&A
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
      mobileLinks: [
        { title: 'オンラインサロン', to: '/organizer/salons' },
        { title: 'クラウドファンディング', to: '/organizer/funds' },
        { title: '指導者マッチング', to: '/organizer/lessons' },
        { title: '管理', to: '/organizer/manage' },
        { title: 'ヘルプ・Q&A', to: '/organizer/help' }
      ]
    }
  },
  created () {
  },
  methods: {
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
.top {
  text-decoration: none;
  &:hover, &:link, &:visited {
    color: #0000008A;
  }
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
