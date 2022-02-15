const foundation = 'https://spoleader.com/api/v1'

export default {
  // 都道府県取得外部API
  getPrefApi: {
    url: 'https://opendata.resas-portal.go.jp/api/v1/prefectures',
    method: 'get'
  },
  // 市町村取得外部API
  getCityApi: {
    url: 'https://opendata.resas-portal.go.jp/api/v1/cities',
    method: 'get'
  },
  // 緯度経度取得外部API
  getAddressXYApi: {
    url: 'https://msearch.gsi.go.jp/address-search/AddressSearch',
    method: 'get'
  },
  // ユーザー取得
  userIndex: {
    url: foundation + '/users/:id',
    method: 'get'
  },
  // チーム一覧
  teamIndex: {
    url: foundation + '/teams',
    method: 'get'
  },
  // チーム詳細
  teamShow: {
    url: foundation + '/teams/:id',
    method: 'get'
  },
  // チーム作成
  teamCreate: {
    url: foundation + '/teams',
    method: 'post'
  },
  // チーム作成
  teamEdit: {
    url: foundation + '/teams/:id',
    method: 'patch'
  },
  // 口コミ作成（投稿）
  reviewCreate: {
    url: foundation + '/reviews',
    method: 'post'
  },
  // 口コミ一覧
  reviewIndex: {
    url: foundation + '/reviews',
    method: 'get'
  },
  /**
   * フォーラム一覧
   * @see https://jpkeylink.backlog.jp/alias/wiki/996424
   */
  forumIndex: {
    url: foundation + '/bbs/forums',
    method: 'get'
  },
  /**
   * フォーラム詳細
   * @see https://jpkeylink.backlog.jp/alias/wiki/996425
   */
  forumDetail: {
    url: foundation + '/bbs/forums/:id',
    method: 'get'
  },
  /**
   * スレッド詳細
   * @see https://jpkeylink.backlog.jp/alias/wiki/996426
   */
  threadIndex: {
    url: foundation + '/bbs/threads/:id',
    method: 'get'
  },
  /**
   * スレッド投稿
   * @see https://jpkeylink.backlog.jp/alias/wiki/996588
   */
  threadCreate: {
    url: foundation + '/bbs/threads',
    method: 'post'
  },
  /**
   * コメント詳細
   * @see https://jpkeylink.backlog.jp/alias/wiki/996427
   */
  commentIndex: {
    url: foundation + '/bbs/comments/:id',
    method: 'get'
  },
  /**
   * コメント投稿
   * @see https://jpkeylink.backlog.jp/alias/wiki/996589
   */
  commentCreate: {
    url: foundation + '/bbs/comments',
    method: 'post'
  },
  /**
   * 通報
   * @see https://jpkeylink.backlog.jp/alias/wiki/996590
   */
  reportCreate: {
    url: foundation + '/bbs/reports',
    method: 'post'
  },
  // 進路実績作成（投稿）
  careerCreate: {
    url: foundation + '/careers',
    method: 'post'
  },
  // 進路実績一覧
  careerIndex: {
    url: foundation + '/careers',
    method: 'get'
  },
  // 有名人作成（投稿）
  celebrityCreate: {
    url: foundation + '/celebrities',
    method: 'post'
  },
  // 有名人一覧
  celebrityIndex: {
    url: foundation + '/celebrities',
    method: 'get'
  },
  // チームのお気に入り登録
  favoriteTeamsCreate: {
    url: foundation + '/teams/favorite',
    method: 'post'
  }
}
