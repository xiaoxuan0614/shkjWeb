import { inject } from 'vue'

export const PAGE_DATA_KEY = Symbol.for('shouhui-page-data')

export function usePageData() {
  return inject(PAGE_DATA_KEY, {})
}
