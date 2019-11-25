var tools = (function () {
  var toolsObj = {
    // 渲染弹出框
    renderPopup: function (festival, obj, str) {
      alert('jiushiwo')
      var title = obj.querySelector('.title')
      var date = obj.querySelector('.date')
      var lunar = obj.querySelector('.lunar')

      var dateFormat = tools.strFormatDate(str)
      var lunarObj = ChineseCalendar.date2lunar(dateFormat);

      console.log(dateFormat)

      title.innerHTML = festival.innerHTML
      date.innerHTML = dateFormat.getFullYear() + '年' + (dateFormat.getMonth() + 1) + '月' + dateFormat.getDate() + '日'
      lunar.innerHTML = lunarObj.lunarMonthChiness + lunarObj.lunarDayChiness + '  ·  ' + lunarObj.gzY + '年' + lunarObj.gzM + '月' + lunarObj.gzD + '日'
    },

    // 侧边栏及全年月份数据返回
    renderDay: function (year, n , m) {
      var year = year
      var month = n
      var firstDay = new Date(year, n, 1) // 月份列表第一天   
      var _hmtl = ``
      
      for (var i = 0; i < 42; i++) {   //六周共42天
        var allDay = new Date(year, month, i + 1 - firstDay.getDay());
        var allDay_str = tools.returnDateStr(allDay)  //获取 例如 20191014
        var firstDay_str = tools.returnDateStr(firstDay)  //获取月份第一天的  字符串  20191001
        var first_lunarday = ChineseCalendar.date2lunar(allDay).lunarDayChiness
        var lunarJanuary_month = ChineseCalendar.date2lunar(allDay).lunarMonthChiness // 正月

        if (tools.returnDateStr(new Date()) == allDay_str) { // 当天
          // 加红圈
          if (first_lunarday == '初一') { // 区分初一那天
            if (lunarJanuary_month == '正月') { // 区分春节那天
              _hmtl += `<li data-time="${allDay_str}" class="">${allDay.getDate()}</li>`
            } else {
              _hmtl += `<li data-time="${allDay_str}" class="lunar-first">${allDay.getDate()}</li>`
            }
          } else {
            _hmtl += `<li data-time="${allDay_str}" class="cur-date">${allDay.getDate()}</li>`
          }
        }else if (firstDay_str.substr(0, 6) === allDay_str.substr(0, 6)) { // 当前月份

          // 判断  ---如果这一天  是  在当前的月份  深色区域显示下滑线
          if (first_lunarday == '初一' ) {
            if (lunarJanuary_month == '正月') {
              // _hmtl += `<li data-time="${allDay_str}" class="cur-month lunar-january">${allDay.getDate()}</li>`
              _hmtl += `<li data-time="${allDay_str}" class="cur-month ">${allDay.getDate()}</li>`

            } else {
              _hmtl += `<li data-time="${allDay_str}" class=" cur-month">${allDay.getDate()}</li>`
              // _hmtl += `<li data-time="${allDay_str}" class="cur-month ">${allDay.getDate()}</li>`

            }
          } else {
            _hmtl += `<li data-time="${allDay_str}" class="cur-month">${allDay.getDate()}</li>`
          }
        } else {
          // 判断  ---如果不是当前的月份  浅色区域显示下滑线
          if (first_lunarday == '初一') {
            if (lunarJanuary_month == '正月') {
              // _hmtl += `<li data-time="${allDay_str}" class="lunar-january">${allDay.getDate()}</li>`
              _hmtl += `<li data-time="${allDay_str}" class="">${allDay.getDate()}</li>`

            } else {
              // _hmtl += `<li data-time="${allDay_str}" class="lunar-first">${allDay.getDate()}</li>`
              _hmtl += `<li data-time="${allDay_str}" class="">${allDay.getDate()}</li>`
            }
          } else {
            _hmtl += `<li data-time="${allDay_str}">${allDay.getDate()}</li>`
          }
        }



      }
      
      // console.log();
      
      return _hmtl
    },
    getHtml:function(year,i){
      let html = tools.renderDay(year,i)
      // console.log(html);
      html.split('</li>').forEach((j,k)=>{
        let text=j.substr(-2)
        j=j+'</li>'
        // console.log(text);
        
      let arr=  Array.prototype.slice.call(document.getElementsByTagName('li'))
        if(text==18){
          // console.log(arr);
          
          
        }

      })
      return html
      
    },
    // 月份详情
    renderDetailMonth: function (dayWrapper, recivedYear, recivedMonth) {    
      var array = []
      var recivedDate = new Date()
      var _html = ``

      var date = new Date(recivedYear, recivedMonth, 1)
      date.setDate(1)
      var week = date.getDay()
      date.setDate(1 - week)
      var month = date.getMonth()

      for (var i = 0; i < 42; i++) {
        if (month !== recivedMonth) {
          if (date.getDay() === 0 || date.getDay() === 6) {
            array.push({
              day: date.getDate(),
              first_lunarday: ChineseCalendar.lunarTime(date),
              lunar: ChineseCalendar.date2lunar(date).lunarMonthChiness,
              state: 'weekend',
              festival: ChineseCalendar.lunarFestival(date),
              term: ChineseCalendar.lunarTerm(date),
              dateStr: tools.returnDateStr(date)
            })
          } else {
            array.push({
              day: date.getDate(),
              first_lunarday: ChineseCalendar.lunarTime(date),
              lunar: ChineseCalendar.date2lunar(date).lunarMonthChiness,
              state: '',
              festival: ChineseCalendar.lunarFestival(date),
              term: ChineseCalendar.lunarTerm(date),
              dateStr: tools.returnDateStr(date)
            })
          }
        } else if(tools.curDay(date, recivedDate)) {
          if (date.getDay() === 0 || date.getDay() === 6) {
            array.push({
              day: date.getDate(),
              first_lunarday: ChineseCalendar.lunarTime(date),
              lunar: ChineseCalendar.date2lunar(date).lunarMonthChiness,
              state: 'weekend cur-day',
              festival: ChineseCalendar.lunarFestival(date),
              term: ChineseCalendar.lunarTerm(date),
              dateStr: tools.returnDateStr(date)
            })
          } else {
            array.push({
              day: date.getDate(),
              first_lunarday: ChineseCalendar.lunarTime(date),
              lunar: ChineseCalendar.date2lunar(date).lunarMonthChiness,
              state: 'cur-day',
              festival: ChineseCalendar.lunarFestival(date),
              term: ChineseCalendar.lunarTerm(date),
              dateStr: tools.returnDateStr(date)
            })
          }
        } else {
          if (date.getDay() === 0 || date.getDay() === 6) {
            array.push({
              day: date.getDate(),
              first_lunarday: ChineseCalendar.lunarTime(date),
              lunar: ChineseCalendar.date2lunar(date).lunarMonthChiness,
              state: 'weekend cur-month',
              festival: ChineseCalendar.lunarFestival(date),
              term: ChineseCalendar.lunarTerm(date),
              dateStr: tools.returnDateStr(date)
            })
          } else {
            array.push({
              day: date.getDate(),
              first_lunarday: ChineseCalendar.lunarTime(date),
              // lunar: ChineseCalendar.lunarTime(date),
              lunar: ChineseCalendar.date2lunar(date).lunarMonthChiness,
              state: 'cur-month',
              festival: ChineseCalendar.lunarFestival(date),
              term: ChineseCalendar.lunarTerm(date),
              dateStr: tools.returnDateStr(date)
            })
          }
        }


        date.setDate(date.getDate() + 1)
        month = date.getMonth()
      }
      for (var j = 0; j < array.length; j++) {
        var festival_state = array[j].festival ? 'festival show' : 'festival'
        var term_state = array[j].term ? 'term show' : 'term'


        var first_lunarday = array[j].first_lunarday == '初一' ? array[j].lunar + array[j].first_lunarday : array[j].first_lunarday


        if (array[j].first_lunarday == '初一') {
          if (array[j].lunar == '正月' && array[j].state !== '') {
            var lunar_state = 'lunar first-lunarJanuary'
          } else {
            var lunar_state = 'lunar first-lunarday'
          }
        } else {
          var lunar_state = 'lunar'
        }

        _html += `<li data-time="${array[j].dateStr}" class="${array[j].state}">
                    <div class="info">
                      <div class="date"><em>${array[j].day}</em></div>
                      <div class="${lunar_state}">${first_lunarday}</div>
                    </div>
                    <div class="${festival_state}"></div>
                    <div class="${term_state}">${array[j].term}</div>
                  </li>`
      }

      dayWrapper.innerHTML = _html
    },

    nowDate: function () {
      return new Date()
    },

    returnDateStr: function (date) {
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var day = date.getDate();

      month = month <= 9 ? ('0' + month) : ('' + month);
      day = day <= 9 ? ('0' + day) : ('' + day);

      return year + month + day;
    },

    // 是否是当天
    curDay: function (oldTime, nowTime) {
      return oldTime.getFullYear() === nowTime.getFullYear() &&
             oldTime.getMonth() === nowTime.getMonth() &&
             oldTime.getDate() === nowTime.getDate()
    },

    // 格式化日期 (如果这里传入的是字符串，那么得到的值不会按照下标去算)
    strFormatDate: function (str) {
      var date = new Date(parseInt(str.substr(0, 4)), parseInt(str.substr(4, 2)), parseInt(str.substr(6)))

      console.log(str)

      return date
    }
  }

  return toolsObj
}())