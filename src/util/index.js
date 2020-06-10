function install(Vue, options) {
  // 全局正则 
  Vue.prototype.$reg = {
    phone: /^1[3-9]\d{9}$/,
    idCard: /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
    psd: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/,
  }

  /**************
   * 全局filter
   **************/
  // 时间过滤器
  Vue.filter('filterTime', (value, formatDefault = 'YYYY/MM/DD hh:mm:ss') => {
    if (!value) return ''
    let date = new Date(value - 0)
    let format = formatDefault
    if (/(Y+)/.test(format)) {
      format = format.replace(RegExp.$1, date.getFullYear() + '').substr(4 - RegExp.$1.length)
    }
    let o = {
      'M+': date.getMonth() + 1,
      'D+': date.getDate(),
      'h+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds()
    }
    for (let key in o) {
      if (new RegExp(`(${key})`).test(format)) {
        let str = o[key] + ''
        format = format.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : ('00' + str).substr(str.length))
      }
    }
    return format
  })

}

export default install