import { formatDistanceToNow } from 'date-fns'
import { ja } from 'date-fns/locale'

export default function getDaysLeft (date) {
  console.log(date)
  return formatDistanceToNow(new Date(date + ' 23:59'), { locale: ja })
}
