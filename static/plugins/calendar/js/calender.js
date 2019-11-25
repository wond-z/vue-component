/**
 * Author : 一只鹿
 * Date   : 2017.9.29
 * Email  : 1005526074@qq.com
 * Blog   : https://ideer.me/
 * More   : http://www.jq22.com/mem310935
 * PS     : 请在转载时保留作者信息！
 **/
;(function (window, undefined) {
  var calendar = document.querySelector('#calendar')
  var simpleMonth_area = calendar.querySelector('.sidebar')
  var simpleMonth_title = simpleMonth_area.querySelector('.date')
  var fullMonth_area = calendar.querySelector('#renderFullYear')
  var fullMonth_title = fullMonth_area.querySelector('h2')
  var fullMonth_lunar = fullMonth_area.querySelector('.lunar-year')
  var detailMonth = calendar.querySelector('#renderMonth')
  var detailMonth_title = detailMonth.querySelector('.title')
  var detailMonth_day = detailMonth.querySelector('.day')
  // var detailMonth_day_data=detailMonth_day.querySelectorAll('li')

  var tab_num = 0 // tab切换记录值

  // 后台传入过来的带有待办的日期时间
  var dayList = ['2017-05-01','2019-08-06','2019-06-24','2018-06-24','2019-07-24','2018-01-24','2019-05-01','2020-08-06','2020-06-24','2018-12-24','2020-07-24','2020-01-24']
  var today = new Date()
  var year = today.getFullYear()
  var month = today.getMonth()
  var calendarObj = ChineseCalendar

  renderTab()
  initalToday(new Date().getFullYear(),new Date().getMonth())

  // 年月tab切换
  function renderTab() {
   
    var aTab = calendar.querySelector('.header').querySelectorAll('li')
    var aRender = calendar.querySelectorAll('.render')

    for (var i = 0; i < aTab.length; i++) {
      aTab[i].index = i
      aTab[i].onclick = function () {
        // alert('tab切换')
        for (var j = 0; j < aTab.length; j ++) {
          aTab[j].className = ''
          aRender[j].className = 'render'
        }
        aTab[this.index].className = 'cur'
        aRender[this.index].className = 'render render-show'

        tab_num = this.index      
        calendarFn.changeYearOrMonth()
      }
    }
  }

  // 初始化渲染日期
  function initalToday(year,month) { 
    simpleMonth_title.innerHTML = year + '年' + (month + 1) + '月'
    fullMonth_title.innerHTML = year + '年'
    fullMonth_lunar.innerHTML = '<i></i>' + calendarObj.year2GanZhe(year) + calendarObj.getAnimal(year) + '年'
    detailMonth_title.innerHTML = year + '年' + (month + 1) + '月'
    
    renderFullMonth()
    tools.renderDetailMonth(detailMonth_day, year, month)
    dateEvent()
  }
  // 渲染侧边栏&全年月份
  function renderFullMonth() {
    var sidebar_day = simpleMonth_area.querySelector('.day')
    var fullYear_month = fullMonth_area.querySelector('.month')
    var fullMonth_hmtl = ``
    var monthArr = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']

    for (var i = 0; i < 12; i ++) {
        fullMonth_hmtl += `<li class="item">
                          <div class="title">${monthArr[i]}</div>
                          <ul class="week">
                            <li>日</li>
                            <li>一</li>
                            <li>二</li>
                            <li>三</li>
                            <li>四</li>
                            <li>五</li>
                            <li>六</li>
                          </ul>
                          <ul class="day">${tools.renderDay(year, i)}</ul>
                        </li>`
    }   
    // 按年查询
    fullYear_month.innerHTML = fullMonth_hmtl
    dayList.forEach((j,k)=>{
       // 获取标记日期的  年份   月份
       let current_year = new Date(j).getFullYear()
       let current_month = new Date(j).getMonth()
       let index=new Date(j).getDate()
      // 判断年份是否相同
      if(parseInt(fullMonth_title.innerText) ==  current_year){ 
        // 筛选月份  节点
        fullYear_month.querySelectorAll('.item').forEach((e,f)=>{
         
          
          // console.log(e); //年历中的月份
          if(f == current_month){
            // console.log(f,'当前月份渲染');
            // 遍历   日   节点
            e.querySelectorAll('.day').forEach((a,c)=>{
              a.querySelectorAll('li').forEach((b,d)=>{
                let text = b.innerText 
                if(index == text){
                  //b.classList.add('cur-day')
                }
              }) 
            })
          }
        })
      }
    })


    
    // 侧边栏
      // sidebar_day.innerHTML = tools.renderDay(year, month)
  }
  function dateEvent() {
    var sidebar_prevBtn = simpleMonth_area.querySelector('.btn-prev')
    var sidebar_nextBtn = simpleMonth_area.querySelector('.btn-next')
    var control = calendar.querySelector('#control')
    var control_btnPrev = control.querySelector('.btn-prev')
    var control_today = control.querySelector('.today')
    var control_btnNext = control.querySelector('.btn-next')
    var sidebar_date = simpleMonth_area.querySelectorAll('.day li')
    var detail_festival = detailMonth_day.querySelectorAll('.show')
    var popup = calendar.querySelector('#popup')
    var container = calendar.querySelector('.container').querySelector('.day').querySelectorAll('li')
    var confrim_btn=document.querySelector('.confrim_btn')
    let tip_box=document.querySelector('#tip_box')
    let cancle_btn=document.querySelector('.cancle_btn')
    let content_input=document.querySelector('.content_input')
    var fullYear_month = fullMonth_area.querySelector('.month')
    var aTab = calendar.querySelector('.header').querySelectorAll('li')
    var dataTime = null
    let content_input_val=''
    let add_index=null
    var popupPos = {lx: 0, lr: 0, y: 0, w: detail_festival[0].offsetWidth, h: detail_festival[0].offsetHeight}
    container.forEach((v,i)=>{
      container[i].onclick=function(){
        // 清空选中色
        container.forEach((v)=>{
          v.classList.remove('active')
        })

        // 被选中项显示选中颜色
        container[i].classList.add('active')
 
        //弹出创建待办
        //operationFn.creat(event)
              
        // 修改代办栏时间状态
        operationFn.changeTime(event)

        //获取选择当天待办
        operationFn.requestDayListData()

        //tip_box.classList.remove("hidden") 
        add_index=i
       
      }
    })

    // 年度里的月份点击跳转对应月度数据显示
    fullYear_month.querySelectorAll('.item').forEach((v,i)=>{
      v.onclick=function(){
        detailMonth.classList.add('render-show')
        fullMonth_area.classList.remove('render-show')
        aTab[0].classList.add('cur')
        aTab[1].classList.remove('cur')
        let year=parseInt(fullMonth_title.innerText)
        let month=i
        detailMonth_title.innerHTML = year + '年' + (i + 1) + '月'
        initalToday(year,month)
        // tools.renderDetailMonth(detailMonth_day, year, month)
        
        //年月状态切换
        calendarFn.changeYearOrMonth('按月')
      }
    })

    // 对话框确定按钮事件
    confrim_btn.onclick=function(){
        // 获取输入框内
        content_input_val=content_input.value
        tip_box.classList.add('hidden')
        // console.log(content_input_val);      
        // let _html = `<p class="festival show">huijiaba</p>`      
        let xin_html=container[add_index].innerHTML+`<p class="festival show">${content_input_val}</p>`  
        container[add_index].innerHTML = xin_html
    }
    
    // 对话框取消按钮事件
    cancle_btn.onclick=function(){
      tip_box.classList.add("hidden")
    }
    sidebar_prevBtn.onclick = function () {
      if (month == 0) {
        year --
        month = 11
      } else {
        month --
      }

      initalToday(year,month)
    }
    sidebar_nextBtn.onclick = function () {
      if (month == 11) {
        year ++
        month = 0
      } else {
        month ++
      }

      initalToday(year,month)
    }

    control_today.onclick = function () {
      year = today.getFullYear()
      month = today.getMonth()

      initalToday(year,month)

      //左侧待办栏初始化
      operationFn.init()
      
       //日历待办初始化
       calendarFn.init()
    }
    control_btnPrev.onclick = function () {
      if (tab_num == 0) {
        if (month == 0) {
          year --
          month = 11
        } else {
          month --
        }
        
        tools.renderDetailMonth(detailMonth_day, year, month)
      } else {
        year --
      }

      initalToday(year,month)
      calendarFn.changeYearOrMonth()
    }
    control_btnNext.onclick = function () {
      if (tab_num == 0) {
        if (month == 11) {
          year ++
          month = 0
        } else {
          month ++
        }
      } else {
        year ++
      }

      initalToday(year,month)
      calendarFn.changeYearOrMonth()
    }

    for (var i = 0; i < sidebar_date.length; i++) {
      sidebar_date[i].onclick = function () {
        // alert('添加时间')
        dataTime = this.dataset.time
        year = parseInt(dataTime.substr(0, 4))
        month = parseInt(dataTime.substr(4, 2))

        initalToday(year,month)
      }
    }

    for (var i = 0; i < detail_festival.length; i++) {
      detail_festival[i].onclick = function (ev) {
        var dateStr = this.parentNode.dataset.time

        popupPos.lx = this.offsetLeft + popupPos.w + 20
        popupPos.lr = this.offsetLeft - 280
        popupPos.y = this.offsetTop - 52 + popupPos.h/2

        popup.style.display = 'block'
        popup.style.top = popupPos.y + 'px'

        if (container.offsetWidth - this.offsetLeft - this.offsetWidth >= popup.offsetWidth) {
          popup.style.left = popupPos.lx + 'px'
          popup.className = 'popup-left'
        } else {
          popup.style.left = popupPos.lr + 'px'
          popup.className = 'popup-right'
        }

        tools.renderPopup(this, popup, dateStr)

        ev.stopPropagation()
      }
    }
    
    document.onclick = function () {
      popup.style.display = 'none'
    }
  }
 
})(window)