/**
 * 防抖函数：返回一个在 delay 毫秒内不会被重复执行的函数。
 * 适用于按钮点击等需要防止重复操作的场景。
 *
 * @param {Function} fn - 需要防抖的原始函数
 * @param {number} [delay=500] - 防抖延迟（毫秒）
 * @returns {Function} 防抖后的函数
 */
export function debounce(fn, delay = 500) {
  let timer = null
  return function (...args) {
    if (timer) return
    timer = setTimeout(() => {
      fn.apply(this, args)
      timer = null
    }, delay)
  }
}
