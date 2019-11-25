var atrenList = [];

function comment(commentUrl, attr, name2, src, host) {
    console.log(name2, src)

    var boxs = $(attr).find('.box')

    /**
     * 发评论
     * @param box 每个分享的div容器
     * @param el 点击的元素
     */
    function reply(box, el) {
        var arr = []
        var textarea = box.getElementsByClassName('comment')[0];
        var val = textarea.value
        if (val.length === 0) {
            layer.msg("请输入内容");
            return
        }
        var commentList = box.getElementsByClassName('comment-list')[0];
        var atrenArr = atrenStr($(textarea).val())
        atrenArr.forEach(function (i) {
            atrenList.forEach(function (j) {
                if (j.name === i) {
                    arr.push(j.arid)
                }
            })
        });
        atrenList = arr

        var imgID = []
        var fileID = []

        filesObj.repeatList.forEach(function (v) {
            if (v.name) {
                if (fileHz(v.name) === 'jpeg' || fileHz(v.name) === 'jpg' || fileHz(v.name) === 'png') {
                    imgID.push(v.value)
                } else {
                    fileID.push(v.value)
                }
            } else if (v.filename) {
                if (fileHz(v.filename) === 'jpeg' || fileHz(v.filename) === 'jpg' || fileHz(v.filename) === 'png') {
                    imgID.push(v.id)
                } else {
                    fileID.push(v.id)
                }
            }
        })

        $.ajax({
            url: commentUrl,
            data: {
                taskOID: getQueryString("taskOID"),
                dynamicContent: val,
                appointUsers: atrenList + '',
                fileID: fileID + '',
                imgID: imgID + '',
                userOID: _user_id
            },
            type: 'post',
            success: function (res) {
                if (res.code === 200) {
                    filesObj.repeatList = []
                    var data = res.data
                    var arr = data.fileID + ',' + data.imgID;
                    var filesHtml = ''
                    $.ajax({
                        url: '/project/project/affixinfo',
                        async: false,
                        data: {
                            projectOID: _project_id,
                            affixid: arr
                        },
                        type: 'post',
                        success: function (res) {
                            if (res.code === 200) {
                                res.data.forEach(function (item) {
                                    filesHtml += `<tr>
                                                <td>${ICON(item.name)} ${item.name}</td>
                                                <td>
                                                <a href=${host}${item.original}  target="_blank">下载</a>
                                                </td>
                                                </tr>
                                                `
                                })
                            }
                        },
                        error: function (res) {
                        }
                    })
                    atrenList = []
                    var commentBox = `
                     <div class="comment-box clearfix" id=${res.data.OID} data-ver=${res.data.version} data-pid=${res.data.OID} data-atid=${res.data.addUserOID} data-name= ${name2}>
                            <img class="myhead" style="width: 30px; height: 30px" src=${src}>
                            <div class="comment-content">
                            <div class="comment-text">
                                <p class="user"> ${name2} </p>
                                <p class="comment-time"> ${formateDate(new Date())} </p>
                            </div>

                            <div class="tool pull-right" style="margin-right: 20px">
                                <a href="javascript:;" class="pull-left hf">回复</a>
                                <span class="pull-left">|</span>
                                <a href="javascript:;" class="pull-left sc">删除</a>
                            </div>
                            <p style="margin:5px 0px;font-size: 13px;color: #555">
                              ${val}
                            </p>
                             <table class="comment-files">
                             <tbody>
                                            ${filesHtml}
                             </tbody> 
                             </table>
                            <hr>
                            </div>
                            <div class="comment-commnet"></div>
                    </div>`
                    $(commentList).append(commentBox);
                    textarea.value = '';
                    $("#demoList").html(null)
                    // textarea.onblur();
                } else {
                    layer.msg(res.msg)
                }
            },
            error: function (res) {
                layer.msg(res.msg)
            }
        })
    }

    /**
     * 回复
     * @param box 每个分享的div容器
     * @param el 点击的元素
     */
    function hf(el, id, arid, name, pid) {
        var box = document.getElementsByClassName('box')[0]
        var textarea = box.getElementsByClassName('comment')[0];

        textarea.value = `@${name} `;
        var fb_action = box.getElementsByClassName('fb-action')[0];
        $(fb_action).addClass('hide')
        var hf_action = box.getElementsByClassName('hf-action')[0];
        $(hf_action).removeClass('hide')
        $(hf_action).data("id", id)
        $(hf_action).data("arid", arid)
        $(hf_action).data("name", name)
        $(hf_action).data("pid", pid)
        atrenList.push({arid: arid, name: name})
        console.log($(hf_action).data("id"), $(hf_action).data("name"))
        var hf_cancel = box.getElementsByClassName('hf-cancel')[0];
        $(hf_cancel).removeClass('hide')

    }

    function sc(id, ver) {
        console.log(id, ver)
        layer.confirm('您确定要删除吗?', {
            icon: 3,
            title: '提示'
        }, function (index) {


            $.ajax({
                url: "/admis/projectCollaboration/deleteTaskComment.rest",
                data: {
                    OID: id,
                    userOID: _user_id
                },
                type: 'post',
                success: function (res) {
                    if (res.code === 200) {
                        layer.close(index);
                        $("#" + id).remove();
                        layer.msg(res.msg)
                    } else {
                        layer.close(index);
                        layer.msg(res.msg)
                    }
                },
                error: function (res) {
                    layer.msg(res.msg)
                }
            })

        });
    }

    function hf_action(el, box) {
        var arr = [];
        var pid = $(el).data("pid")
        var id = $(el).data("id")
        var arid = $(el).data("arid")
        var name = $(el).data("name")
        var comment_box = document.getElementById(pid)
        var comment_comment = comment_box.getElementsByClassName('comment-commnet')[0]
        var textarea = box.getElementsByClassName('comment')[0];
        var val = textarea.value
        if (val.length === 0) {
            layer.msg("请输入内容");
            return
        }
        var atrenArr = atrenStr($(textarea).val())
        atrenArr.forEach(function (i) {
            atrenList.forEach(function (j) {
                if (j.name === i) {
                    arr.push(j.arid)
                }
            })
        });
        atrenList = arr
        var imgID = []
        var fileID = []

        filesObj.repeatList.forEach(function (v) {
            if (v.name) {
                if (fileHz(v.name) === 'jpeg' || fileHz(v.name) === 'jpg' || fileHz(v.name) === 'png') {
                    imgID.push(v.value)
                } else {
                    fileID.push(v.value)
                }
            } else if (v.filename) {
                if (fileHz(v.filename) === 'jpeg' || fileHz(v.filename) === 'jpg' || fileHz(v.filename) === 'png') {
                    imgID.push(v.id)
                } else {
                    fileID.push(v.id)
                }
            }
        })
        console.log(imgID,fileID)
        $.ajax({
            url: commentUrl,
            data: {
                taskOID: getQueryString("taskOID"),
                commentOID: pid,
                dynamicContent: val,
                appointUsers: atrenList + '',
                fileID: fileID + '',
                imgID: imgID + '',
                userOID: _user_id,
                replyUid: arid,
                replyName: name
            },
            type: 'post',
            success: function (res) {
                if (res.code === 200) {
                    filesObj.repeatList = []
                    var data = res.data
                    var arr = data.fileID + ',' + data.imgID;
                    var filesHtml = ''
                    $.ajax({
                        url: '/project/project/affixinfo',
                        async: false,
                        data: {
                            projectOID: _project_id,
                            affixid: arr
                        },
                        type: 'post',
                        success: function (res) {
                            if (res.code === 200) {
                                res.data.forEach(function (item) {
                                    filesHtml += `<tr>
                                                <td>${ICON(item.name)} ${item.name}</td>
                                                <td>
                                                <a href=${host}${item.original}  target="_blank">下载</a>
                                                </td>
                                                </tr>
                                                `
                                })
                            }
                        },
                        error: function (res) {
                        }
                    })
                    atrenList = []
                    var commentBox = `
                            <div class="comment-box clearfix" id=${res.data.OID} data-ver=${res.data.version} data-pid="${res.data.parentOID}" data-atid="${res.data.addUserOID}" data-name= ${name2}>
                            <img class="myhead" style="width: 30px; height: 30px" src= ${src}>
                            <div class="comment-content">
                            <div class="comment-text">
                                <p class="user">  ${name2}</p>
                                <p class="comment-time"> ${formateDate(new Date())} </p>
                            </div>

                            <div class="tool pull-right" style="margin-right: 20px">
                                <a href="javascript:;" class="pull-left hf">回复</a>
                                <span class="pull-left">|</span>
                                <a href="javascript:;" class="pull-left sc">删除</a>
                            </div>
                            <p style="margin:5px 0px;font-size: 13px;color: #555">
                              ${val}
                            </p>
                             <table class="comment-files">
                             <tbody>
                                ${filesHtml}
                              </tbody> 
                              </table>
                            <hr>
                            </div>
                            </div>                            
                            `
                    $(comment_comment).append(commentBox);
                    textarea.value = '';
                    $("#demoList").html(null)
                    var hf_action = box.getElementsByClassName('hf-action')[0];
                    var hf_cancel = box.getElementsByClassName('hf-cancel')[0];
                    var fb_action = box.getElementsByClassName('fb-action')[0];
                    $(hf_action).addClass("hide")
                    $(hf_cancel).addClass("hide")
                    $(fb_action).removeClass("hide")
                }
            },
            error: function (res) {
                layer.msg(res.msg)
            }
        })
    }

    function hf_cancel(box) {
        var textarea = box.getElementsByClassName('comment')[0];
        textarea.value = '';
        var hf_action = box.getElementsByClassName('hf-action')[0];
        var hf_cancel = box.getElementsByClassName('hf-cancel')[0];
        var fb_action = box.getElementsByClassName('fb-action')[0];
        $(hf_action).addClass("hide")
        $(hf_cancel).addClass("hide")
        $(fb_action).removeClass("hide")
        atrenList = [];
    }

//把事件代理到每条分享div容器
    for (var i = 0; i < boxs.length; i++) {
        //点击
        boxs[i].onclick = function (e) {
            e = e || window.event;
            var el = e.srcElement;
            switch (el.className) {
                //评论
                case 'fb-action layui-btn-normal layui-btn layui-btn-sm':
                    reply(el.parentNode.parentNode.parentNode, el);
                    break
                case 'hf-action layui-btn layui-btn-sm layui-btn-normal':
                    hf_action(el, el.parentNode.parentNode.parentNode);
                    break
                case 'hf-cancel layui-btn layui-btn-sm layui-btn-danger':
                    hf_cancel(el.parentNode.parentNode.parentNode);
                    break
                case 'pull-left hf':
                    hf(el,
                        el.parentNode.parentNode.parentNode.id,
                        el.parentNode.parentNode.parentNode.dataset.atid,
                        el.parentNode.parentNode.parentNode.dataset.name,
                        el.parentNode.parentNode.parentNode.dataset.pid);
                    break
                case 'pull-left sc':
                    sc(el.parentNode.parentNode.parentNode.id, el.parentNode.parentNode.parentNode.dataset.ver);
                    break
            }
        }
    }
}

function ICON(fileName) {
    var strFileName = fileName.split(".")
    strFileName = strFileName[1]
    if (strFileName === 'jpg' || strFileName === 'png' || strFileName === 'jpeg') {
        return `<i class="layui-icon layui-icon-picture"> </i>`
    } else if (strFileName === 'xls' || strFileName === 'xlsx') {
        return `<i class="layui-icon layui-icon-table"> </i>`
    } else if (strFileName === 'doc' || strFileName === 'docx') {
        return `<i class="layui-icon layui-icon-list"> </i>`
    } else if (strFileName === 'ppt' || strFileName === 'pptx') {
        return `<i class="layui-icon layui-icon-templeate-1"> </i>`
    } else if (strFileName === 'pdf') {
        return `<i class="layui-icon layui-icon-read"> </i>`
    } else if (strFileName === 'zip' || strFileName === 'rar') {
        return `<i class="layui-icon layui-icon-template-1"> </i>`
    } else if (strFileName === 'txt') {
        return `<i class="layui-icon  layui-icon-file"> </i>`
    } else {
        return `<i class="layui-icon  layui-icon-help"> </i>`
    }
}

function fileHz(fileName) {
    var strFileName = fileName.split(".")
    strFileName = strFileName[1]
    return strFileName
}

function atrenStr(str) {
    let re = /@(.+?)\s{1}/g
    let arr = []
    while ((match = re.exec(str)) != null) {
        arr.push(match[1])
    }
    return arr
}

function formateDate(date) {
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    var d = date.getDate();
    var h = date.getHours();
    var mi = date.getMinutes();
    d = d > 9 ? d : '0' + d;
    h = h > 9 ? h : '0' + h;
    m = m > 9 ? m : '0' + m;
    mi = mi > 9 ? mi : '0' + mi;
    return y + '-' + m + '-' + d + ' ' + h + ':' + mi;
}

/*
* 初始化查询下拉组件
* */
function renderSearchSelect() {
    $('.search-select').selectpicker({
        noneSelectedText: '-请选择-',
        noneResultsText: "没有查询结果"
    })
}

/*
* 刷新查询下拉组件
* */
function refreshSearchSelect() {
    $('.search-select').selectpicker('refresh')
}

/*
* 异步请求
* */

function asyncFetch(url, params) {
    return new Promise((r, j) => {
        $.ajax({
            url: url,
            data: params,
            type: 'post',
            success: function (res) {
                console.log(url, "success")
                r(res)
            }
        })
    })
}