export default {
//   myData (value, type = 0) {
//     var time = new Date(value * 1000)
//     var year = time.getFullYear()
//     var month = time.getMonth() + 1
//     var date = time.getDate()
//     var hour = time.getHours()
//     var minute = time.getMinutes()
//     var second = time.getSeconds()
//     month = month < 10 ? '0' + month : month
//     date = date < 10 ? '0' + date : date
//     hour = hour < 10 ? '0' + hour : hour
//     minute = minute < 10 ? '0' + minute : minute
//     second = second < 10 ? '0' + second : second
//     var arr = [
//       year + '-' + month + date,
//       year + '-' + month + date + '' + hour + ':' + minute + ':' + second,
//       year + '-' + month + date,
//       year + '-' + month + date + '' + hour + ':' + minute + ':' + second,
//       hour + ':' + minute + ':' + second
//     ]
//     return arr[type]
//   }
  getString (str, len) {
    if (str.length > len) {
      str = str.substr(0, len) + '...'
      return str
    } else {
      return str
    }
  },
  myData (value, type = 0) {
    var time = new Date(value * 1000)
    var year = time.getFullYear()
    var month = time.getMonth() + 1
    var date = time.getDate()
    var hour = time.getHours()
    var minute = time.getMinutes()
    var second = time.getSeconds()
    month = month < 10 ? '0' + month : month
    date = date < 10 ? '0' + date : date
    hour = hour < 10 ? '0' + hour : hour
    minute = minute < 10 ? '0' + minute : minute
    second = second < 10 ? '0' + second : second
    var arr = [
      year + '-' + month + date,
      year + '-' + month + date + '' + hour + ':' + minute + ':' + second,
      year + '-' + month + date,
      year + '-' + month + date + '' + hour + ':' + minute + ':' + second,
      hour + ':' + minute + ':' + second
    ]
    return arr[type]
  }
}
