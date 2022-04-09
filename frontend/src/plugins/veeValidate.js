import Vue from 'vue'
import { ValidationProvider, ValidationObserver, extend, localize } from 'vee-validate'
import * as rules from 'vee-validate/dist/rules'
import * as customRules from '@/mixins/validation'
import ja from 'vee-validate/dist/locale/ja.json'

// 全てのルールをインポート
Object.keys(rules).forEach(rule => {
  let messege = rule === 'required' ? '必須' : ja.messages[rule]
  extend(rule, {
    ...rules[rule],
    message: messege,
  })
})
for (const rule in customRules) {
  extend(rule, customRules[rule])
}

localize({
  ja: { messages: { ...ja.messages } },
})
localize('ja')

Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)
