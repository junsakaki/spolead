export default {
  talks: [
    {
      id: 1,
      users: [{ id: 1, name: 'かずや' }, { id: 2, name: 'じん' }],
      lesson: {
        name: '全力でサッカー教えます！',
        caption: 'このレッスンでは小学生を対象にサッカーを教えています。これから地域のサッカーチームに所属しようと考えている方におすすめです！',
        contactType: '1,2'.split(','),
        paymentType: '1,2'.split(',')
      },
      comments: [
        { id: 14, content: 'ありがとうございます!当日もよろしくお願いします!', user_id: 2, created_date: '2020-01-01 12:00' },
        { id: 13, content: '承知しました。それでは開始10分前頃にgoogle meetのURLをお送りしますね!', user_id: 1, created_date: '2020-01-01 12:00' },
        { id: 12, content: '大丈夫です!', user_id: 2, created_date: '2020-01-01 12:00' },
        { id: 11, content: '分かりました、それでは15:30-17:00にしましょう。とりあえず、今週の土曜日はいかがでしょうか？', user_id: 1, created_date: '2020-01-01 12:00' },
        { id: 10, content: 'ありがとうございます!土日の10:00-18:00であればいつでも大丈夫です!90分間お願いしたいです!', user_id: 2, created_date: '2020-01-01 12:00' },
        { id: 9, content: '了解です、そしたらURL送りますね!日時の希望はありますか？', user_id: 1, created_date: '2020-01-01 12:00' },
        { id: 8, content: '承知しました!google meetでお願いします!', user_id: 2, created_date: '2020-01-01 12:00' },
        { id: 7, content: '問題ないです!skypeかgoogle meetでお願いしたいです!', user_id: 1, created_date: '2020-01-01 12:00' },
        { id: 6, content: '最初はオンラインでも良いでしょうか。', user_id: 2, created_date: '2020-01-01 12:00' },
        { id: 5, content: 'オンラインでも直接でも良いとのことですが、直接が良いかと思っています。いかがでしょうか。', user_id: 1, created_date: '2020-01-01 12:00' },
        { id: 4, content: 'そうですね、よろしくお願いします!', user_id: 2, created_date: '2020-01-01 12:00' },
        { id: 3, content: '返信ありがとうございます!詳細を決めていきましょう!', user_id: 1, created_date: '2020-01-01 12:00' },
        { id: 2, content: 'こちらこそよろしくお願いします!', user_id: 2, created_date: '2020-01-01 12:00' },
        { id: 1, content: 'よろしくお願いします!', user_id: 1, created_date: '2020-01-01 12:00' }
      ]
    },
    {
      id: 2,
      users: [{ id: 1, name: 'かずや' }, { id: 3, name: 'りょうすけ' }],
      lesson: {
        name: '全力でサッカー教えます！',
        caption: 'このレッスンでは小学生を対象にサッカーを教えています。これから地域のサッカーチームに所属しようと考えている方におすすめです！',
        contactType: '1,2'.split(','),
        paymentType: '1,2'.split(',')
      },
      comments: [
        { id: 3, content: '返信ありがとうございます!詳細を決めていきましょう!', user_id: 1, created_date: '2020-01-01 12:00' },
        { id: 2, content: 'こちらこそよろしくお願いします!', user_id: 2, created_date: '2020-01-01 12:00' },
        { id: 1, content: 'よろしくお願いします!', user_id: 1, created_date: '2020-01-01 12:00' }
      ]
    },
    {
      id: 3,
      users: [{ id: 1, name: 'かずや' }, { id: 4, name: 'つよし' }],
      lesson: {
        name: '全力でサッカー教えます！',
        caption: 'このレッスンでは小学生を対象にサッカーを教えています。これから地域のサッカーチームに所属しようと考えている方におすすめです！',
        contactType: '1,2'.split(','),
        paymentType: '1,2'.split(',')
      },
      comments: []
    },
    {
      id: 4,
      users: [{ id: 1, name: 'かずや' }, { id: 5, name: 'じゅん' }],
      lesson: {
        name: '全力でサッカー教えます！',
        caption: 'このレッスンでは小学生を対象にサッカーを教えています。これから地域のサッカーチームに所属しようと考えている方におすすめです！',
        contactType: '1,2'.split(','),
        paymentType: '1,2'.split(',')
      },
      comments: []
    }
  ],
  talk: {
    id: 1,
    users: [{ id: 1, name: 'かずや' }, { id: 2, name: 'じん' }],
    lesson: {
      id: 1000,
      name: '全力でサッカー教えます！',
      caption: 'このレッスンでは小学生を対象にサッカーを教えています。これから地域のサッカーチームに所属しようと考えている方におすすめです！',
      contactType: '1,2'.split(','),
      paymentType: '1,2'.split(',')
    },
    comments: [
      { id: 15, content: 'すみません、先に支払いフォーム貼ります!', user_id: 1, payment: { price: 1000 }, created_date: '2020-01-01 12:00' },
      { id: 14, content: 'ありがとうございます!当日もよろしくお願いします!', user_id: 2, created_date: '2020-01-01 12:00' },
      { id: 13, content: '承知しました。<br>それでは開始10分前頃にgoogle meetのURLをお送りしますね!', user_id: 1, created_date: '2020-01-01 12:00' },
      { id: 12, content: '大丈夫です!', user_id: 2, created_date: '2020-01-01 12:00' },
      { id: 11, content: '分かりました、それでは15:30-17:00にしましょう。<br>とりあえず、今週の土曜日はいかがでしょうか？', user_id: 1, created_date: '2020-01-01 12:00' },
      { id: 10, content: 'ありがとうございます!土日の10:00-18:00であればいつでも大丈夫です!90分間お願いしたいです!', user_id: 2, created_date: '2020-01-01 12:00' },
      { id: 9, content: '了解です、そしたらURL送りますね!<br>日時の希望はありますか？', user_id: 1, created_date: '2020-01-01 12:00' },
      { id: 8, content: '承知しました!<br>google meetでお願いします!', user_id: 2, created_date: '2020-01-01 12:00' },
      { id: 7, content: '問題ないです!skypeかgoogle meetでお願いしたいです!', user_id: 1, created_date: '2020-01-01 12:00' },
      { id: 6, content: '最初はオンラインでも良いでしょうか。', user_id: 2, created_date: '2020-01-01 12:00' },
      { id: 5, content: 'オンラインでも直接でも良いとのことですが、直接が良いかと思っています。いかがでしょうか。', user_id: 1, created_date: '2020-01-01 12:00' },
      { id: 4, content: 'そうですね、よろしくお願いします!', user_id: 2, created_date: '2020-01-01 12:00' },
      { id: 3, content: '返信ありがとうございます!詳細を決めていきましょう!', user_id: 1, created_date: '2020-01-01 12:00' },
      { id: 2, content: 'こちらこそよろしくお願いします!', user_id: 2, created_date: '2020-01-01 12:00' },
      { id: 1, content: 'よろしくお願いします!', user_id: 1, created_date: '2020-01-01 12:00' }
    ]
  }
}
