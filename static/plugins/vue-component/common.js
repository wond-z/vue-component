//检查验收数据转成element数据
function changeCascader(data) {
    var that = this;
    let jsonObj = data
    jsonObj.forEach(function (item) {
        item.type_name && (item.label = item.type_name);
        item.item_name && (item.label = item.item_name);
        item.item_id && (item.value = item.item_id + "," + item.item_name);
        delete item.item_id;
        delete item.item_name;
        delete item.type_name;
        if (item.item && Array.isArray(item.item)) {
            item.children = that.changeCascader(item.item)
            delete item.item
        }
    })

    return jsonObj

}

// 地址栏获取参数
function getUrlParam(key) {

    var url = window.location.search;
    // 正则筛选地址栏
    var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
    // 匹配目标参数
    var result = url.substr(1).match(reg);
    //返回参数值
    return result ? decodeURIComponent(result[2]) : null;
}

//获取接收范围
function jsonAjax(host, proId, userID) {
    $.ajax({
        url: '/admis/task/log/getroleuserlist.rest',
        data: {
            projectOID: proId,
            userOID: userID
        },
        type: 'post',
        success: function (res) {
            var testJson = res.data
            changeJson(testJson, `<?=FILE_HOST ?>`)
            if (res.code == 200) {
                json = res.data;
                bindTextCLick('.reaptShowText', 'tree', json, '接收人不可为空', true)
            } else {
                layer.msg(res.msg);
            }
        },
        error: function (res) {

        }
    });
}

//将base64转换为文件
function dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {type: mime});
}

//发布页老引擎没有发布按钮
function isOldRngine(projectid) {
    if ([924, 925, 926, 927, 928, 929, 930, 1104, 1500, 1593, 1695, 1696, 1697, 1698, 1700, 1699, 1701, 1702, 1881, 1884, 1885, 1890, 1887].indexOf(parseInt(projectid)) == -1) {
        return false;
    } else {
        return true;
    }
}

//是否显示发布

if (_projec_id) {
    if (isOldRngine(_projec_id)) {

        $(".addNotice").show();
        console.log($(".addNotice"))
    } else {
        $(".addNotice").hide();
    }

}


//视频处理全部逻辑~~~~~~~~~~~~~~~~~~
//打开视频弹窗
function Video(url) {
    // 创建一个div
    let divd = document.createElement('div');
    document.body.appendChild(divd)
    divd.className = "figure_box"
    divd.innerHTML = `<span class="close" id="close" title="关闭">-</span>
    <figure>
        <div class="player" id="player">
            <video controls autoplay id="video_box" height="360" src="${url}">
            </video>
        </div>
    </figure>`;
    divd.style = `position: fixed;
    top: 50%;
    left: 50%;
    width: 760px;
    height: 523px;
    margin-top: -260px;
    margin-left: -380px;
    z-index: 3147483647!important`;
    let player = document.getElementById('player');
    player.style = `width: 760px;
    height:530px;
    margin:-10px auto;
    background-color: pink;
    background-size: auto 100%;
    position: relative;
    border-radius: 10px;
    overflow: hidden;`;
    let pvideo = document.getElementById('video_box');
    pvideo.style = `height: 100%;
    width: 100%;
    margin: 0px auto;
    background: #eee;`;
    let close = document.getElementById("close");
    close.style = `
    position: absolute;
    right: 35px;
    top: 25px;
    font-size: 34px;
    color: #000;
    cursor: pointer;
    border:0;
    display: block;
    opacity: 1;
    z-index: 3147483647!important;
    background: rgba(0,0,0,0);
}
`
    close.onclick = function () {
        // 删除 divd
        divd.parentNode.removeChild(divd);
    }
}

//查看视频列表处理数据
function changeVideoList(obj, sx, title) {
    var result = "";
    if (obj[sx].indexOf("video") != -1) {
        var videoId = obj[sx].split("video_")[1];
        if (obj[sx].indexOf("img") != -1) {
            var imgId = obj[sx].split("_img_")[1];
            result = `<div class="videoBox"><img id=${imgId}  data-videoId=${videoId}  style="margin-right:7px;margin-bottom:7px;width:170px;height:175px" src=${title}/webview/view?id=${imgId}&type=img&width=110&height=120><div class="mask"><i class="glyphicon glyphicon-play-circle"></i></div></div>`
        }
    } else {
        result = `<img id=${obj[sx]} style="margin-right:7px;margin-bottom:7px;width:170px;height:175px" src=${title}/webview/view?id=${obj[sx]}&type=img&width=110&height=120>`
    }
    return result;
}

//视频逻辑
//图片弹窗放大
$(document).on('click', '.picClick', function (e) {

    var el = e.target
    if ($(el).attr("class") != 'picClick') {
        layer.open({
            title: '查看全部图片',
            area: ['800px', '650px'],
            content: `<div id="myCarousel" class="carousel slide">
                                <div class="carousel-inner videoBox " style="width: 100%;height: 100%">

                                </div>
                                <a class="left carousel-control" href="#myCarousel" role="button" data-slide="prev">
                                <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
                                <span class="sr-only">Previous</span>
                                </a>
                                <a class="right carousel-control" href="#myCarousel" role="button" data-slide="next">
                                <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
                                <span class="sr-only">Next</span>
                                </a>
                            </div>`,
            success: function (layero, index) {
                var imgitem = [], imgitemSrc = []
                var tagName = $(el).attr("class");
                var imgsrciltm = [];
                var arr = [];
                if (tagName) {
                    if (tagName == "mask") {
                        var other = $(el).parent().parent().children()
                        var imgId = $(el).prev('img').attr("id");
                        arr = objSortT(other, imgId, imgsrciltm);
                    } else if (tagName.indexOf("glyphicon") != -1) {
                        var other = $(el).parent().parent().parent().children()
                        var imgId = $(el).parent().prev('img').attr("id");
                        arr = objSortT(other, imgId, imgsrciltm);
                    } else {
                        arr.push(0)
                        imgsrciltm.push($(el)[0])
                    }
                } else {
                    var other = $(el).parent().children()
                    var imgId = $(el).attr("id");
                    arr = objSortT(other, imgId, imgsrciltm);
                }
                for (var i = 0; i < arr.length; i++) {
                    imgitem.push(imgsrciltm[arr[i]])
                    imgitemSrc.push(imgsrciltm[arr[i]].src)
                }
                var img_html = ''
                imgitemSrc.forEach(function (item, index) {
                    var id = $(imgitem[index]).data("videoid");
                    if (item) {
                        var str = item.split("&");
                        var url = str[0] + "&" + str[1];
                        if (imgitem[index].src == item) {
                            var sp = $(imgitem[index]).data("sp");
                            img_html += `<div class="openVideo  item ${index == 0 ? 'active' : ''}"  style="background-image:url(${url})" data-videoid=${id} ><div class="mask" style="${id ? '' : 'display:none'}"><i class="glyphicon glyphicon-play-circle"></i></div></div> `

                        } else {
                            img_html += ` <div class="item ${index == 0 ? 'active' : ''}"  style="background-image:url(${url})"></div>`
                        }
                    }
                    $('.carousel-inner').html(img_html)
                })
            }, cancel: function (index, layero) {
                $(".figure_box").remove();
                layer.close(index);
            }, yes: function (index, layero) {
                $(".figure_box").remove();
                layer.close(index);
            }

        })
    }
})

//按指定规则排序
function sortT(x, arr) {
    var newArr = [];
    newArr.push(x);
    for (var i = 0; i < arr.length; i++) {
        if (i > x) {
            newArr.push(i);
        }
    }
    for (var i = 0; i < arr.length; i++) {
        if (i < x) {
            newArr.push(i);
        }
    }
    return newArr;

}

//  元素需要按顺序排列
function objSortT(other, imgId, imgsrciltm) {
    var arr = []
    for (var i = 0; i < other.length; i++) {
        arr.push(i);
        if ($(other[i]).attr("class") == "videoBox") {
            imgsrciltm.push($(other[i]).children('img')[0]);
        } else {
            imgsrciltm.push(other[i]);
        }
    }
    for (var i = 0; i < other.length; i++) {
        if (imgId == $(other[i]).attr("id")) {
            arr = sortT(i, arr);
        }
    }
    return arr;
}

//打开视频弹窗
$(document).on('click', '.openVideo', function (e) {
    let id = $(this).data("videoid").split("_img_")[0];
    $.ajax({
        url: "/project/publish/getaffix",
        data: {
            id
        },
        type: 'get',
        success: function (res) {
            Video(res.data.link);
        },
        error: function (res) {
            layer.msg(res.msg)
        }
    })


})
