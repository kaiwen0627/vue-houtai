import defaultSettings from '@/settings'

const title = defaultSettings.title || "城市废弃物回收系统总后";

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
