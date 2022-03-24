// localVer
// const foundation = 'http://localhost:3000/v1'
const foundation = 'https://develop.spoleader.com/api/v1'

// productionVer
// const foundation = process.env.FOUNDATION

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
  },
  /**
   * サロン一覧
   * @see https://jpkeylink.backlog.jp/alias/wiki/1011884
   */
  salonIndex: {
    url: foundation + '/salons',
    method: 'get'
  },
  /**
   * サロン詳細
   * @see https://jpkeylink.backlog.jp/alias/wiki/1011891
   */
  salonDetail: {
    url: foundation + '/salons/:id',
    method: 'get'
  },
  /**
   * サロン作成
   * @see https://jpkeylink.backlog.jp/alias/wiki/1011818
   */
  salonCreate: {
    url: foundation + '/salons',
    method: 'post'
  },
  /**
   * サロン編集
   * @see https://jpkeylink.backlog.jp/alias/wiki/1011879
   */
  salonEdit: {
    url: foundation + '/salons/:id',
    method: 'patch'
  },
  /**
   * サロン参加
   * @see https://jpkeylink.backlog.jp/alias/wiki/1011918
   */
  salonParticipate: {
    url: foundation + '/salons/participate',
    method: 'post'
  },
  /**
   * サロン参加解除
   * @see https://jpkeylink.backlog.jp/alias/wiki/1011897
   */
  salonWithdrawal: {
    url: foundation + '/salons/participate',
    method: 'patch'
  },
  /**
   * ファンド一覧
   * @see https://jpkeylink.backlog.jp/alias/wiki/1017261
   */
  fundIndex: {
    url: foundation + '/funds',
    method: 'get'
  },
  /**
   * ファンド詳細
   * @see https://jpkeylink.backlog.jp/alias/wiki/1017263
   */
  fundDetail: {
    url: foundation + '/funds/:id',
    method: 'get'
  },
  /**
   * ファンド作成
   * @see https://jpkeylink.backlog.jp/alias/wiki/1017284
   */
  fundCreate: {
    url: foundation + '/funds',
    method: 'post'
  },
  /**
   * ファンド編集
   * @see https://jpkeylink.backlog.jp/alias/wiki/1017266
   */
  fundEdit: {
    url: foundation + '/funds/:id',
    method: 'patch'
  },
  /**
   * ファンド - リターン購入
   * @see https://jpkeylink.backlog.jp/alias/wiki/1017281
   */
  fundPurchase: {
    url: foundation + '/funds/purchase',
    method: 'post'
  },
  // ファンド - リターン購入キャンセル
  fundPurchaseCancel: {
    url: foundation + '/funds/purchase',
    method: 'patch'
  },
  /**
   * マッチング一覧
   * @see https://jpkeylink.backlog.jp/alias/wiki/1017332
   */
  lessonIndex: {
    url: foundation + '/lessons',
    method: 'get'
  },
  /**
   * マッチング詳細
   * @see https://jpkeylink.backlog.jp/alias/wiki/1017420
   */
  lessonDetail: {
    url: foundation + '/lessons/:id',
    method: 'get'
  },
  /**
   * マッチング作成
   * @see https://jpkeylink.backlog.jp/alias/wiki/1017430
   */
  lessonCreate: {
    url: foundation + '/lessons',
    method: 'post'
  },
  /**
   * マッチング編集
   * @see https://jpkeylink.backlog.jp/alias/wiki/1017424
   */
  lessonEdit: {
    url: foundation + '/lessons/:id',
    method: 'patch'
  },
  /**
   * トークルーム一覧
   * @see https://jpkeylink.backlog.jp/alias/wiki/1017438
   */
  talkIndex: {
    url: foundation + '/talks',
    method: 'get'
  },
  /**
   * トークルーム詳細
   * @see https://jpkeylink.backlog.jp/alias/wiki/1017440
   */
  talkDetail: {
    url: foundation + '/talks/:id',
    method: 'get'
  },
  /**
   * トークルーム作成
   * @see https://jpkeylink.backlog.jp/alias/wiki/1017434
   */
  talkCreate: {
    url: foundation + '/talks',
    method: 'post'
  },
  /**
   * コメント投稿
   * @see https://jpkeylink.backlog.jp/alias/wiki/1018863
   */
  talkCommentCreate: {
    url: foundation + '/talks/:id/comment',
    method: 'post'
  },
  /**
   * コメント内支払いステータスの更新
   * @see https://jpkeylink.backlog.jp/alias/wiki/1022936
   */
  talkCommentPayment: {
    url: foundation + '/talks/:id/comment/payment',
    method: 'patch'
  },
  /**
   * コメント内支払いのキャンセル
   */
  talkCommentPaymentCancel: {
    url: foundation + '/talks/:id/comment/payment/cancel',
    method: 'patch'
  },
  /**
   * サービス管理 - サロン一覧
   * @see https://jpkeylink.backlog.jp/alias/wiki/1017208
   */
  manageSalonIndex: {
    url: foundation + '/manage/salons',
    method: 'get'
  },
  /**
   * サービス管理 - サロン承認,承認解除
   * @see https://jpkeylink.backlog.jp/alias/wiki/1017211
   */
  manageSalonApproval: {
    url: foundation + '/manage/salons/approval',
    method: 'post'
  },
  /**
   * サービス管理 - ファンド一覧
   * @see https://jpkeylink.backlog.jp/alias/wiki/1017286
   */
  manageFundIndex: {
    url: foundation + '/manage/funds',
    method: 'get'
  },
  /**
   * サービス管理 - ファンド承認,承認解除
   * @see https://jpkeylink.backlog.jp/alias/wiki/1017287
   */
  manageFundApproval: {
    url: foundation + '/manage/funds/approval',
    method: 'post'
  },
  /**
   * サービス管理 - マッチング一覧
   * @see https://jpkeylink.backlog.jp/alias/wiki/1017449
   */
  manageLessonIndex: {
    url: foundation + '/manage/lessons',
    method: 'get'
  },
  /**
   * サービス管理 - マッチング承認,承認解除
   * @see https://jpkeylink.backlog.jp/alias/wiki/1017450
   */
  manageLessonApproval: {
    url: foundation + '/manage/lessons/approval',
    method: 'post'
  },
  // 支払い（単発 or サブスク）
  payment: {
    url: foundation + '/payment',
    method: 'post'
  },
  // 支払いキャンセル
  paymentCancel: {
    url: foundation + '/payment/cancel',
    method: 'post'
  },
  // サブスク - プラン作成
  paymentPlan: {
    url: foundation + '/payment/plan',
    method: 'post'
  },
  // サブスク - 顧客作成
  paymentCustomer: {
    url: foundation + '/payment/customer',
    method: 'post'
  }
}
