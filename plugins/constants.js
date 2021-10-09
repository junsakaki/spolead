const SPORTS = [
  { id: 1, title: 'サッカー', src: require('~/assets/images/soccer.jpg') },
  { id: 2, title: '野球', src: require('~/assets/images/baseball.jpg') },
  { id: 3, title: 'バスケットボール', src: require('~/assets/images/basketball.jpeg') },
  { id: 4, title: 'バレーボール', src: require('~/assets/images/volleyball.jpeg') },
  { id: 5, title: 'ダンス', src: require('~/assets/images/dance.jpeg') },
  { id: 6, title: 'ラグビー', src: require('~/assets/images/rugby.jpeg') },
  { id: 7, title: '水泳', src: require('~/assets/images/swimming.jpeg') }
]

const AREA = [
  {
    id: 2,
    title: '北海道・東北',
    prefectures: [
      { id: 1, title: '北海道' },
      { id: 2, title: '青森県' },
      { id: 3, title: '岩手県' },
      { id: 4, title: '宮城県' },
      { id: 5, title: '秋田県' },
      { id: 6, title: '山形県' },
      { id: 7, title: '福島県' }
    ]
  },
  {
    id: 3,
    title: '関東',
    prefectures: [
      { id: 8, title: '茨城県' },
      { id: 9, title: '栃木県' },
      { id: 10, title: '群馬県' },
      { id: 11, title: '埼玉県' },
      { id: 12, title: '千葉県' },
      { id: 13, title: '東京都' },
      { id: 14, title: '神奈川県' }
    ]
  },
  {
    id: 5,
    title: '中部',
    prefectures: [
      { id: 15, title: '新潟県' },
      { id: 16, title: '富山県' },
      { id: 17, title: '石川県' },
      { id: 18, title: '福井県' },
      { id: 19, title: '山梨県' },
      { id: 20, title: '長野県' },
      { id: 21, title: '岐阜県' },
      { id: 22, title: '静岡県' },
      { id: 23, title: '愛知県' }
    ]
  },
  {
    id: 7,
    title: '近畿',
    prefectures: [
      { id: 24, title: '三重県' },
      { id: 25, title: '滋賀県' },
      { id: 26, title: '京都府' },
      { id: 27, title: '大阪府' },
      { id: 28, title: '兵庫県' },
      { id: 29, title: '奈良県' },
      { id: 30, title: '和歌山県' }
    ]
  },
  {
    id: 8,
    title: '中国',
    prefectures: [
      { id: 31, title: '鳥取県' },
      { id: 32, title: '島根県' },
      { id: 33, title: '岡山県' },
      { id: 34, title: '広島県' },
      { id: 35, title: '山口県' }
    ]
  },
  {
    id: 9,
    title: '四国',
    prefectures: [
      { id: 36, title: '徳島県' },
      { id: 37, title: '香川県' },
      { id: 38, title: '愛媛県' },
      { id: 39, title: '高知県' }
    ]
  },
  {
    id: 10,
    title: '九州・沖縄',
    prefectures: [
      { id: 40, title: '福岡県' },
      { id: 41, title: '佐賀県' },
      { id: 42, title: '長崎県' },
      { id: 43, title: '熊本県' },
      { id: 44, title: '大分県' },
      { id: 45, title: '宮崎県' },
      { id: 46, title: '鹿児島県' },
      { id: 47, title: '沖縄県' }
    ]
  }
]

const TOP_PREFECTURE = [
  { id: 13, title: '東京都', src: require('~/assets/images/tokyo.jpg') },
  { id: 14, title: '神奈川県', src: require('~/assets/images/kanagawa.jpeg') },
  { id: 23, title: '愛知県', src: require('~/assets/images/aichi.jpeg') },
  { id: 26, title: '京都府', src: require('~/assets/images/kyoto.jpeg') },
  { id: 27, title: '大阪府', src: require('~/assets/images/osaka.jpeg') },
  { id: 40, title: '福岡県', src: require('~/assets/images/fukuoka.jpeg') }
]

const AREA = [
  {
    id: 2,
    title: '北海道・東北',
    prefectures: [
      { id: 1, title: '北海道' },
      { id: 2, title: '青森県' },
      { id: 3, title: '岩手県' },
      { id: 4, title: '宮城県' },
      { id: 5, title: '秋田県' },
      { id: 6, title: '山形県' },
      { id: 7, title: '福島県' }
    ]
  },
  {
    id: 3,
    title: '関東',
    prefectures: [
      { id: 8, title: '茨城県' },
      { id: 9, title: '栃木県' },
      { id: 10, title: '群馬県' },
      { id: 11, title: '埼玉県' },
      { id: 12, title: '千葉県' },
      { id: 13, title: '東京都' },
      { id: 14, title: '神奈川県' }
    ]
  },
  {
    id: 5,
    title: '中部',
    prefectures: [
      { id: 15, title: '新潟県' },
      { id: 16, title: '富山県' },
      { id: 17, title: '石川県' },
      { id: 18, title: '福井県' },
      { id: 19, title: '山梨県' },
      { id: 20, title: '長野県' },
      { id: 21, title: '岐阜県' },
      { id: 22, title: '静岡県' },
      { id: 23, title: '愛知県' }
    ]
  },
  {
    id: 7,
    title: '近畿',
    prefectures: [
      { id: 24, title: '三重県' },
      { id: 25, title: '滋賀県' },
      { id: 26, title: '京都府' },
      { id: 27, title: '大阪府' },
      { id: 28, title: '兵庫県' },
      { id: 29, title: '奈良県' },
      { id: 30, title: '和歌山県' }
    ]
  },
  {
    id: 8,
    title: '中国',
    prefectures: [
      { id: 31, title: '鳥取県' },
      { id: 32, title: '島根県' },
      { id: 33, title: '岡山県' },
      { id: 34, title: '広島県' },
      { id: 35, title: '山口県' }
    ]
  },
  {
    id: 9,
    title: '四国',
    prefectures: [
      { id: 36, title: '徳島県' },
      { id: 37, title: '香川県' },
      { id: 38, title: '愛媛県' },
      { id: 39, title: '高知県' }
    ]
  },
  {
    id: 10,
    title: '九州・沖縄',
    prefectures: [
      { id: 40, title: '福岡県' },
      { id: 41, title: '佐賀県' },
      { id: 42, title: '長崎県' },
      { id: 43, title: '熊本県' },
      { id: 44, title: '大分県' },
      { id: 45, title: '宮崎県' },
      { id: 46, title: '鹿児島県' },
      { id: 47, title: '沖縄県' }
    ]
  }
]

const TOP_PREFECTURE = [
  { id: 13, title: '東京都', src: require('~/assets/images/tokyo.jpg') },
  { id: 14, title: '神奈川県', src: require('~/assets/images/kanagawa.jpeg') },
  { id: 23, title: '愛知県', src: require('~/assets/images/aichi.jpeg') },
  { id: 26, title: '京都府', src: require('~/assets/images/kyoto.jpeg') },
  { id: 27, title: '大阪府', src: require('~/assets/images/osaka.jpeg') },
  { id: 40, title: '福岡県', src: require('~/assets/images/fukuoka.jpeg') }
]

export default (context, inject) => {
  inject('SPORTS', SPORTS)
  inject('AREA', AREA)
  inject('TOP_PREFECTURE', TOP_PREFECTURE)
}