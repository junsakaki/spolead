export default function transformTextToHtml (text) {
  return '<span>' + text.replace(/\n/g, ' <br/>').replace(/(https?:\/\/[^\s]*)/g, "<a href='$1'>$1</a>") + '</span>'
}
