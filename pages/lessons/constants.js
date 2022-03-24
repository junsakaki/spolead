export default {
  lessons: [
    {
      id: 101,
      recruitment_target: 'student',
      name: 'サッカー、フットサルの為の身体作りサポートしますサッカー、フットサルの為の身体作りサポートします',
      caption: 'フィジカルに悩む方向け！元プロフットサル選手がサポート。',
      contactType: '1'.split(',').map(Number),
      paymentType: '1,2'.split(',').map(Number),
      content: 'サッカー、フットサルをプレーする皆さん。食べてるのに身体が大きくならない、フィジカル不足で試合で活躍出来ない、そういった悩みがある方多いことでしょう。かつては私もそうでした。ですが、様々な知識を蓄え、試行錯誤をし身体を鍛え上げ日本のフットサルトップリーグ、『Fリーグ』でフィジカルを武器に闘えるまでになった経験をお伝えします。トレーニングメニュー、食事指導、プレー分析等、何でも遠慮なくご相談ください。',
      imageTop: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSa3404Eb2IpfFK6JPahYOKqTnG02RnISWSWA&usqp=CAU',
      background: '背景はこんな感じです',
      selfIntroduction: '私はこんな人です',
      precautions: '注意事項はこんな感じです',
      owner: {
        name: 'オーナー名',
        address: '住所',
        mail_address: 'メールアドレス',
        birthday: '生年月日',
        tel: '電話番号',
        identification1: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSa3404Eb2IpfFK6JPahYOKqTnG02RnISWSWA&usqp=CAU',
        identification2: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSa3404Eb2IpfFK6JPahYOKqTnG02RnISWSWA&usqp=CAU',
        transferAccount: '振り込み口座の情報'
      },
      talks: [
        { id: 2011, comments: [{ content: '依頼内容を送ります。依頼内容を送ります。依頼内容を送ります。依頼内容を送ります。依頼内容を送ります。依頼内容を送ります。依頼内容を送ります。', user: { id: 1, name: 'しょうた' } }], users: [{ id: 1, name: 'しょうた' }, { id: 2, name: 'ゆうた' }] },
        { id: 2012, comments: [], users: [{ id: 1, name: 'しょうた' }, { id: 2, name: 'ゆうた' }] },
        { id: 2013, comments: [], users: [{ id: 1, name: 'しょうた' }, { id: 2, name: 'ゆうた' }] }
      ],
      approval: true
    },
    {
      id: 201,
      recruitment_target: 'coach',
      name: 'サッカーを教えてほしいです！小学生です！',
      caption: '将来の夢はJリーガーです！',
      contactType: '1,2'.split(',').map(Number),
      paymentType: '1'.split(',').map(Number),
      owner: {
        name: 'オーナー名',
        address: '住所',
        mail_address: 'メールアドレス',
        birthday: '生年月日',
        tel: '電話番号',
        identification1: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSa3404Eb2IpfFK6JPahYOKqTnG02RnISWSWA&usqp=CAU',
        identification2: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSa3404Eb2IpfFK6JPahYOKqTnG02RnISWSWA&usqp=CAU'
      },
      talks: [],
      approval: false
    }
  ]
}
