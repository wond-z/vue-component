var zTreeObj = {};
//单选
function zTreeOnCheck(e) {
    var checkItem = zTreeObj.getCheckedNodes()
    $(e.currentTarget).prev().find('.selectNodes').html(files_Obj.length)
    if(tkyObject.files){
        files_Obj=[]
        checkItem.forEach(function (v, i) {
            if (v.filetype==2) {
                files_Obj.push({
                    id: v.id,
                    name: v.filename
                })
            }
        })
    }
    function hasObjById(arr,id) {
        var status=false
        arr.forEach(function (v,i) {
            if(v.id==id){
                status= true
            }
        })
        return status
    }
    if(tkyObject.create){
        create_Obj=[]
        checkItem.forEach(function (v, i) {
            if (v.favicon!= undefined && !hasObjById(create_Obj,v.id)) {
                create_Obj.push({
                    id: v.id,
                    name: v.name
                })
            }
        })
        $(e.currentTarget).prev().find('.selectNodes').html(create_Obj.length)
    }
    if(tkyObject.join){
        join_Obj=[]
        checkItem.forEach(function (v, i) {
            if (v.favicon!=undefined && !hasObjById(join_Obj,v.id)) {
                join_Obj.push({
                    id: v.id,
                    name: v.name
                })
            }
        })
        $(e.currentTarget).prev().find('.selectNodes').html(join_Obj.length)
    }
    if(tkyObject.reminds){
        reminds_Obj = []
        checkItem.forEach(function (v, i) {
            if (v.favicon!=undefined && !hasObjById(reminds_Obj,v.id)) {
                reminds_Obj.push({
                    id: v.id,
                    name: v.name
                })
            }
        })
        $(e.currentTarget).prev().find('.selectNodes').html(reminds_Obj.length)
    }
    var allLastNodes = [];
    var allNodes = zTreeObj.transformToArray(zTreeObj.getNodes());
    allNodes.forEach(function (v, i) {
        if (v.icon) {
            allLastNodes.push(v.id)
        }
    })
    if(create_Obj.length==allLastNodes.length||join_Obj.length==allLastNodes.length||reminds_Obj.length==allLastNodes.length){
        $('.checkAll').prop('checked',true)
    }else{
        $('.checkAll').prop('checked',false)
    }
}

/*
* 绑定显示结果的绑定事件
* */

function bindTextCLick(treeId, listJson, isSearch, setting) {
    var btns = `
            <div class="layui-layer-btn" style="text-align: center;position: absolute;bottom: 0;width: 730px;">
            <a href="javascript:void 0" class="layui-layer-btn0">确定</a>
            <a href="javascript:void 0" class="layui-layer-btn1">返回</a>
            </div>
            `
    var searchHtml = isSearch ? `<div style="display: inline-block;position: relative;"><input style="padding-right:28px" id="key" type="text"  autocomplete="off" class="layui-input"><i class="layui-icon layui-icon-search" style="position: absolute;top:10px;right: 8px;"></i></input></div>` : ''
    var selectAll = `<span  style="margin: 0 10px 0 10px;width: 180px;display: none"><input class="checkAll" type="checkbox" style="vertical-align: middle;margin: auto;"><span style="margin-left:5px;">全选</span></span>`;
    var selectNum = `<span  style="margin: 0 10px 0 10px;width: 180px;display: none">已选<span style="color: #0E7CEC;margin-left:5px;" class="selectNodes">0</span>/<span class="nodes">0</span></span>`;
    var boxHtml = `<div class="search-bar" style="margin: 10px 10px 0 10px">
        ${searchHtml + selectAll + selectNum}
        </div>`
    var html = `${isSearch ? boxHtml : ''}
                     <ul style="overflow: auto ;height:380px;padding-bottom: 50px" id=${treeId} class="ztree"></ul>
                     ${btns}
                    `
    $('#part3').append(html)
    //绑定全选取消全选
    $('.checkAll').on('click', function () {
        var obj=[]
        if ($(this).is(':checked')) {
            zTreeObj.checkAllNodes(true)
            let checkItem = zTreeObj.getCheckedNodes()
            checkItem.forEach(function (v, i) {
                if (v.icon) {
                    obj.push(
                        {
                            id: v.id,
                            name: v.name
                        }
                    )
                }
            })
            if (obj.length > 0) {
                $(".errorMsg").addClass('hide')
            }
            $("#" + treeId).prev().find('.selectNodes').html(obj.length)
            if(tkyObject.create){
                create_Obj=obj
            }
            if(tkyObject.join){
                join_Obj=obj
            }
            if(tkyObject.reminds){
                reminds_Obj=obj
            }
        } else {
            zTreeObj.checkAllNodes(false)
            obj=[]
            if(tkyObject.create){
                create_Obj=obj
            }
            if(tkyObject.join){
                join_Obj=obj
            }
            if(tkyObject.reminds){
                reminds_Obj=obj
            }
            $("#" + treeId).prev().find('.selectNodes').html(obj.length)
        }


    })


    zTreeObj = $.fn.zTree.init($("#" + treeId), setting, listJson);
    var allLastNodes = [];
    var allNodes = zTreeObj.transformToArray(zTreeObj.getNodes());
    allNodes.forEach(function (v, i) {
        if (v.icon) {
            allLastNodes.push(v.id)
        }
    })
    if (tkyObject.files) {
        files_Obj.forEach(function (v, i) {
            ztree_ready(v.id)
        })
    }
    if (tkyObject.create) {
        create_Obj.forEach(function (v, i) {
            ztree_ready(v.id)
        })
        $("#" + treeId).prev().find('.selectNodes').html(create_Obj.length)
        $("#" + treeId).prev().find('.nodes').html(allLastNodes.length)
        if(create_Obj.length==allLastNodes.length){
            $("#" + treeId).prev().find('.checkAll').prop('checked',true)
        }
    }
    if (tkyObject.join) {
        join_Obj.forEach(function (v, i) {
            ztree_ready(v.id)
        })
        $("#" + treeId).prev().find('.selectNodes').html(join_Obj.length)
        $("#" + treeId).prev().find('.nodes').html(allLastNodes.length)
        if(join_Obj.length==allLastNodes.length){
            $("#" + treeId).prev().find('.checkAll').prop('checked',true)
        }
    }
    if (tkyObject.reminds) {
        reminds_Obj.forEach(function (v, i) {
            ztree_ready(v.id)
        })
        $("#" + treeId).prev().find('.selectNodes').html(reminds_Obj.length)
        $("#" + treeId).prev().find('.nodes').html(allLastNodes.length)
        if(reminds_Obj.length==allLastNodes.length){
            $("#" + treeId).prev().find('.checkAll').prop('checked',true)
        }
    }
    //  //初始化模糊搜索方法
    isSearch ? fuzzySearch(treeId, '#key', null, false) : true
    $(".layui-layer-btn0").click(function () {
        // callback(idList);处理选中的数据
        $("#part3").html('')
        $("#part3").addClass('hide')
        $("#part2").removeClass('hide')
        if (tkyObject.files) {
            var trs = ''
            files_Obj.forEach(function (v, i) {
                trs += ` <tr id=${v.id}><td> ${ICON(v.name)} ${v.name}</td>
                                          <td>上传成功</td>
                                          <td style="width: 150px;">
                                          <a data-id=${v.id} class="layui-btn layui-btn-xs layui-btn-danger file-delete">删除</a>
                                          </td>
                                          </tr>`
            })
            $("#flist").html(trs)
        }
        if (tkyObject.create) {
            var str = ''
            if (create_Obj.length == 0) {
                $("#npr0").addClass('hide')
            } else if (create_Obj.length > 3) {
                str = create_Obj[0].name + '、' + create_Obj[1].name + '、' + create_Obj[2].name + '......'
                $("#npr0").text(str)
                $("#npr0").removeClass('hide')
            } else {
                create_Obj.forEach(function (v, i) {
                    if (create_Obj.length - 1 == i) {
                        str += v.name
                    } else {
                        str += v.name + '、'
                    }

                })
                $("#npr0").text(str)
                $("#npr0").removeClass('hide')
            }
        }
        if (tkyObject.join) {
            var str = ''
            if (join_Obj.length == 0) {
                $("#npr1").addClass('hide')
            } else if (join_Obj.length > 3) {
                str = join_Obj[0].name + '、' + join_Obj[1].name + '、' + join_Obj[2].name + '......'
                $("#npr1").text(str)
                $("#npr1").removeClass('hide')
            } else {
                join_Obj.forEach(function (v, i) {
                    if (join_Obj.length - 1 == i) {
                        str += v.name
                    } else {
                        str += v.name + '、'
                    }
                    $("#npr1").removeClass('hide')
                    $("#npr1").text(str)
                })
            }
        }
        if (tkyObject.reminds) {
            var str = ''
            if (reminds_Obj.length == 0) {
                $("#npr2").addClass('hide')
            } else if (reminds_Obj.length > 3) {
                str = reminds_Obj[0].name + '、' + reminds_Obj[1].name + '、' + reminds_Obj[2].name + '......'
                $(".show-peoples").last().text(str)
                $(".show-peoples").last().removeClass('hide')
            } else {
                reminds_Obj.forEach(function (v, i) {
                    if (reminds_Obj.length - 1 == i) {
                        str += v.name
                    } else {
                        str += v.name + '、'
                    }
                    $(".show-peoples").last().removeClass('hide')
                    $(".show-peoples").last().text(str)
                })
            }
        }
    })
    $(".layui-layer-btn1").click(function () {
        //返回表单页
        $("#part3").html('')
        $("#part3").addClass('hide')
        $("#part2").removeClass('hide')
    })
    $(".file-delete").click(function () {
        var id = $(this).data('id')
        files_Obj = files_Obj.filter(function (v) {
            return v.id != id
        })
        $(this.parent('tr')).remove()
    })
}

/*
* 处理json数据方法
* */
function ztree_ready(id) {
    var node = zTreeObj.getNodeByParam("id", id);
    if (node != null) {
        zTreeObj.selectNode(node, true);//指定选中ID的节点，自带打开效果
        zTreeObj.cancelSelectedNode(node);//取消选中样式
        zTreeObj.checkNode(node, true, true);//选中样式前的checkbox
        zTreeObj.expandNode(node, true, false);//将指定ID节点展开
        return true
    } else {
        return false
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