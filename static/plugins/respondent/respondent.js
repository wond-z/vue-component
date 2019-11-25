document.write("<script type='text/javascript' src='/static/plugins/respondent/jquery.ztree.core.js'></script>");
document.write("<script type='text/javascript' src='/static/plugins/respondent/jquery.ztree.excheck.js'></script>");
document.write("<script type='text/javascript' src='/static/plugins/respondent/jquery.ztree.exedit.js'></script>");
document.write("<script type='text/javascript' src='/static/plugins/respondent/jquery.ztree.exhide.js'></script>");
document.write("<script type='text/javascript' src='/static/plugins/respondent/fuzzysearch.js'></script>");

var zTreeObj = {};
var idList = [];
var filesHtml ='';
var isSeleetAll = false;
var jsonData = []
/*
* 配置seetings
* */
var settings = {
    view: {
        selectedMulti: true, //设置是否能够同时选中多个节点
        showIcon: true, //设置是否显示节点图标
        showLine: false, //设置是否显示节点与节点之间的连线
        showTitle: true, //设置是否显示节点的title提示信息
    },
    data: {
        key: {
            children: "list",
        }
    },
    check: {
        enable: true,  //设置是否显示checkbox复选框
        // chkStyle: "radio",//复选框变为单选框
        // radioType: "all",//以整个树为一个分组
        chkboxType: {"Y": "ps", "N": "ps"}
    },
    callback:{
        onCheck:zTreeOnCheck
    }
};
function zTreeOnCheck(e) {
    filesHtml = '';
    idList = [];
    var checkItem = zTreeObj.getCheckedNodes()
    checkItem.forEach(function (v, i) {
        console.log(v)
        if (v.icon) {
            filesHtml += `${v.name},`
            idList.push(v.id)
        }
    })
    $('.selectNodes').html(idList.length)
}
/*
* 绑定显示结果的绑定事件
* */
function bindTextCLick(bindClass, treeId, listJson ,NoEmptyMsg = '选项不可为空',isSearch,treeSeeting = settings,callBack) {


    jsonData = listJson
    //绑定rest事件
    $(bindClass).nextAll('.PersonBtnGroup').find('.restBtn').on("click",function () {
         clearTree(bindClass,'数据被置空')
    })

    /*
* 展开收起人员显示
* */
    $(".toogleShow").click(function () {
        $(this).parent().find(".toogleHide").show();
        $(this).hide();
        $(this).parent().parent().find(".layui-colla-content").removeClass('imHide').addClass('imShow')
        if($('.response-box').length>0){
            let w = document.getElementsByClassName('response-box')[0].getBoundingClientRect().width-document.getElementsByClassName('response-label')[0].getBoundingClientRect().width
            $('.layui-collapse div.textSpan:nth-child(2)').outerWidth(w);
        }
    })
    $(".toogleHide").click(function () {
        $(this).hide();
        $(this).parent().find(".toogleShow").show();
        $(this).parent().parent().find(".layui-colla-content").removeClass('imShow').addClass('imHide')
    })
    layui.use(['layer','element'], function () {})
    $(bindClass+' .textSpan:nth-child(1)').on("click", function () {
        $(".toogleHide").hide();
        $(".toogleShow").show();
        $(".layui-colla-content").removeClass('imShow').addClass('imHide')
        var _this = $(this).parent().parent().parent();
        var tarra = _this.attr('data-id').split(',');
        var searchHtml = isSearch?`<div style="display: inline-block;position: relative;"><input style="padding-right:28px" id="key" type="text"  autocomplete="off" class="layui-input"><i class="layui-icon layui-icon-search" style="position: absolute;top:10px;right: 8px;"></i></input></div>`:''
        var selectAll = isSeleetAll?`<span  style="margin: 0 10px 0 10px;width: 180px;"><input class="checkAll" type="checkbox" style="vertical-align: middle;margin: auto;"><span style="margin-left:5px;">全选</span></span>`:''
        var selectNum = isSeleetAll?`<span  style="margin: 0 10px 0 10px;width: 180px;">已选<span style="color: #0E7CEC;margin-left:5px;" class="selectNodes">0</span>/<span class="nodes">0</span></span>`:''
        var boxHtml = `<div class="search-bar" style="margin: 0 10px 0 10px;position:fixed">
        ${searchHtml+selectAll+selectNum}
        </div>`
        var html = `${boxHtml}
                     <ul style="overflow: auto" id=${treeId} class="ztree"></ul>
                    `



        //初始化树节点时，添加同步获取的数据
        layer.open({
            type: 1,
            title: "请选择",
            id: 'tf-form',
            content: html,
            area: ['600px', '500px'],
            scrollbar: true,
            btn: ['确定', '取消'],
            success: function (layero) {

                //绑定全选取消全选
                $('.checkAll').on('click',function () {
                    if($(this).is(':checked')){
                        zTreeObj.checkAllNodes(true)
                    }else{
                        zTreeObj.checkAllNodes(false)
                    }
                    zTreeOnCheck();
                })

                //treeObj.refresh();

                var btn = layero.find('.layui-layer-btn');
                btn.css('text-align', 'center');

                zTreeObj = $.fn.zTree.init($("#" + treeId), treeSeeting, jsonData);
                var nodes = zTreeObj.transformToArray(zTreeObj.getNodes());
                var numList = [];
                nodes.forEach(function (v, i) {
                    if (v.check_Child_State<0) {
                        numList.push(v.id)
                    }
                })
                $('.nodes').html(numList.length)
                //  //初始化模糊搜索方法
                isSearch?fuzzySearch(treeId,'#key',null,false):true
                for (let i = 0; i < tarra.length; i++) {
                    ztree_ready(tarra[i]) ? ztree_ready(tarra[i], treeId) : true
                }
            },
            yes: function (index) {
                var checkItem = zTreeObj.getCheckedNodes()
                // var filesHtml = '';
                // var idList = [];
                // checkItem.forEach(function (v, i) {
                //     if (v.check_Child_State<0) {
                //         filesHtml += `${v.name},`
                //         idList.push(v.id)
                //     }
                // })
                if (idList.length < 1) {
                    layer.msg(NoEmptyMsg,{time:1000})
                    // filesHtml = '请选择'
                    // _this.next().hide();
                } else {

                    filesHtml = filesHtml.substr(0, filesHtml.length - 1)
                    _this.next().show();
                    _this.attr('data-id', idList.join(',')).find('.textSpan').html(filesHtml)
                    callBack?callBack():true
                    layer.close(index);
                }
            },
            btn2: function (index) {
                layer.close(index);
            },
            cancel: function () {

            }
        });
    });
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
function clearTree(bindClass,msg) {
    $(bindClass).attr('data-id','').find('.textSpan').html("请选择")
    $(bindClass).next().hide();
    $(bindClass).find('.textSpan:nth-child(2)').addClass('imHide');
    msg?layer.msg(msg,{time: 1000}):true
}
