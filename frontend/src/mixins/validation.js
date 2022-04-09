import axios from '@/api/api'
import utils from '@/mixins/utils'

const not_before_from = {
  params: ['from', 'message'],
  message: '{message}',
  validate: (val, { from }) => {
    if (val >= from) {
      return true
    } else {
      return false
    }
  },
}
const not_in_array = {
  params: ['array', 'message'],
  message: '{message}',
  validate: (val, { array }) => {
    let valid = true
    val.forEach(v => {
      if (array.includes(v)) {
        valid = false
      }
    })
    return valid
  },
}
const match = {
  params: ['target', 'name'],
  message: '{name}が一致しません',
  validate: (val, { target }) => {
    if (val === target) {
      return true
    } else {
      return false
    }
  },
}
export { not_before_from, not_in_array, match }
