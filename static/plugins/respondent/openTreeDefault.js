document.write("<script type='text/javascript' src='/static/plugins/respondent/jquery.ztree.core.js'></script>");
document.write("<script type='text/javascript' src='/static/plugins/respondent/jquery.ztree.excheck.js'></script>");
document.write("<script type='text/javascript' src='/static/plugins/respondent/jquery.ztree.exedit.js'></script>");
document.write("<script type='text/javascript' src='/static/plugins/respondent/jquery.ztree.exhide.js'></script>");
document.write("<script type='text/javascript' src='/static/plugins/respondent/fuzzysearch.js'></script>");

var zTreeObj = {};
var idList = [];
var filesHtml ='';

function zTreeOnCheck(e) {
    filesHtml = '';
    idList = [];
    var checkItem = zTreeObj.getCheckedNodes()
    checkItem.forEach(function (v, i) {
        if (v.icon) {
            filesHtml += `${v.name},`
            idList.push(v.id)
        }
    })
    $(e.currentTarget).prev().find('.selectNodes').html(idList.length)
}
/*
* 配置seetings
* */
    seeting = {
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
/*
* 绑定显示结果的绑定事件
* */
function bindTextCLick(bindClass, treeId, listJson ,NoEmptyMsg = '选项不可为空',isSearch,callback,treeSeeting = seeting) {
    layui.use(['layer','element'], function () {})
    $(bindClass).on("click", function () {
        var _this = this;
        var searchHtml = isSearch?`<div style="display: inline-block;position: relative;"><input style="padding-right:28px" id="key" type="text"  autocomplete="off" class="layui-input"><i class="layui-icon layui-icon-search" style="position: absolute;top:10px;right: 8px;"></i></input></div>`:''
        var selectAll = `<span  style="margin: 0 10px 0 10px;width: 180px;"><input class="checkAll" type="checkbox" style="vertical-align: middle;margin: auto;"><span style="margin-left:5px;">全选</span></span>`;
        var selectNum = `<span  style="margin: 0 10px 0 10px;width: 180px;">已选<span style="color: #0E7CEC;margin-left:5px;" class="selectNodes">0</span>/<span class="nodes">0</span></span>`;
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
                idList = [];
                //绑定全选取消全选
                $('.checkAll').on('click',function () {
                    if($(this).is(':checked')){
                        zTreeObj.checkAllNodes(true)
                    }else{
                        zTreeObj.checkAllNodes(false)
                    }
                    filesHtml = '';
                    idList = [];
                    let checkItem = zTreeObj.getCheckedNodes()
                    checkItem.forEach(function (v, i) {
                        console.log(v)
                        if (v.icon) {
                            console.log(v.id)
                            filesHtml += `${v.name},`
                            idList.push(v.id)
                        }
                    })
                    $("#" + treeId).prev().find('.selectNodes').html(idList.length)
                })


                var btn = layero.find('.layui-layer-btn');
                btn.css('text-align', 'center');
                zTreeObj = $.fn.zTree.init($("#" + treeId), treeSeeting, listJson);
                var allLastNodes = [];
                var allNodes = zTreeObj.transformToArray(zTreeObj.getNodes());
                allNodes.forEach(function (v, i) {
                    if (v.icon) {
                        allLastNodes.push(v.id)
                    }
                })
                $("#" + treeId).prev().find('.nodes').html(allLastNodes.length)
                //  //初始化模糊搜索方法
                isSearch?fuzzySearch(treeId,'#key',null,false):true
            },
            yes: function (index) {
                if (idList.length < 1) {
                    layer.msg(NoEmptyMsg,{time:1000})
                } else {
                    callback(idList);
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
