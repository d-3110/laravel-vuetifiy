export default {
  methods: {
    // objectコピー
    copyObject(obj) {
      return JSON.parse(JSON.stringify(obj))
    },
    removeArray(deleteIndex, array) {
      return array.filter((v, i) => !deleteIndex.includes(i))
    },
    // スネークケース=>キャメルケース変換
    toCamelCase(str) {
      return str.replace(/_./g, s => {
        return s.charAt(1).toUpperCase()
      })
    },
    // オブジェクトをFormDataに変換する(ファイル以外)
    convertFormData: function (obj, fileKeys = ['files']) {
      const formData = new FormData()
      for (const [key, value] of Object.entries(obj)) {
        if (fileKeys.includes(key)) {
          continue
        }
        if (Array.isArray(value)) {
          value.forEach(v => {
            if (v !== null && typeof v === 'object') {
              // objectの場合jsonにする
              formData.append(key + '[]', JSON.stringify(v))
            } else {
              formData.append(key + '[]', v)
            }
          })
        } else {
          // nullは項目を作成しない
          if (value !== null) {
            // objectの場合jsonにする
            formData.append(key, typeof value === 'object' ? JSON.stringify(value) : value)
          }
        }
      }
      return formData
    },
    appendFileFormData: function (obj, formData, fileKeys = ['files']) {
      for (const [key, value] of Object.entries(obj)) {
        if (!fileKeys.includes(key)) {
          continue
        }
        // 二次元配列まで対応(questionFiles)
        value.forEach((files, i) => {
          if (Array.isArray(files)) {
            files.forEach(file => {
              formData.append(key + `[${i}][]`, file)
            })
          } else {
            formData.append(key + '[]', files)
          }
        })
      }
      return formData
    },
    // 小ウィンドウで開く
    openWindow(url) {
      window.open(url, '_blank', 'width=800, height=800,')
    },
  },
}
