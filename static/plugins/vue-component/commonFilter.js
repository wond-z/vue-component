const vFilter={
    timeStamp:function (value) {
        // 截取当前数据到小数点后两位
        let realVal =Math.round(new Date(value) / 1000)
        return realVal
    }
}


