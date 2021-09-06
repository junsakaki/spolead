<template>
  <div>
    <v-card>
      <v-container>
        <v-card-title>運営管理</v-card-title>

        <v-simple-table>
          <template v-slot:default>
            <tbody>
              <tr
                v-for="(item, i) in items"
                :key="i"
                :class="item.class"
                :to="item.to"
              >
                <td>{{ item.title }}</td>
                <td>{{ item.content }}<a :href="item.to" :class="item.class">こちら</a></td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-container>
    </v-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      items: [
        {
          title: '運営会社',
          content: '株式会社スポーツジャンクション/SportsJunction Co. ',
          to: '',
          class: 'none'
        },
        {
          title: '代表者',
          content: '榊 純',
          to: '',
          class: 'none'
        },
        {
          title: '事業内容',
          content: '地域スポーツのDX推進 / スポーツプラットフォームの構築',
          to: '',
          class: 'none'
        },
        {
          title: 'お問い合わせ',
          content: 'お問い合わせは',
          to: '/ContactForm',
          class: 'ablelink'
        }
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
h2 {
  text-decoration: underline;
}
p {
  font-size: 16px;
  padding: 4px;
}
.indent {
  text-indent: 1em;
}
.indent-box {
  padding-left: 20px;
}
.container {
  margin-top: 24px
}
.none {
  pointer-events: none;
}
td {
  .none {
    pointer-events: none;
    display: none;
  }
}
.ablelink {
  cursor: pointer;
}
</style>
