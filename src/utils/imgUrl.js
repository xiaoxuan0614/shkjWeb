const OSS_PREFIX = 'https://sh-website.obs.cn-north-4.myhuaweicloud.com/'
export function getOssImg(path) {
  if (!path) return ''
  if (path.startsWith('http')) return path
  // 简单安全过滤，防路径跳转
  let safePath = path.replace(/\.\.\//g, '')
  if (!safePath.startsWith('/')) safePath = '/' + safePath
  return OSS_PREFIX + safePath
}