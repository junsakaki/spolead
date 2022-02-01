export default function ({ route, redirect }) {
  if (route.path.slice(-1) === '/') {
    // 直リンクでアクセスした場合に末尾に/がつくことがあるため強制的に削除する
    // 同じパスでのリダイレクトはブロックされるので、回避用のクエリ guard を付与する（値自体には意味がないのでbooleanとしている）
    if (route.query.guard) {
      const nextQuery = { ...route.query }
      delete nextQuery.guard
      redirect(301, route.path.slice(0, -1), { ...nextQuery })
    } else {
      redirect(301, route.path.slice(0, -1), { ...route.query, guard: true })
    }
  }
}
