var json = []
var zTreeObj = {}

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
        chkboxType : { "Y" : "ps", "N" : "ps" }
    }
};
/*
* 绑定显示结果的绑定事件
* */
function bindTextCLick(bindClass = '.reaptShowText',treeId = 'tree',listJson = json,readyJson = dataList){
    $(bindClass).on("click", function () {
        console.log(listJson)
        var _this = $(this)
        var tarra = _this.attr('data-id').split(',');
        var html = `
                     <ul style="overflow: auto" id=${treeId} class="ztree"></ul>
                    `
        //初始化树节点时，添加同步获取的数据
        layer.open({
            type: 1,
            title: "关联文件",
            id: 'tf-form',
            content: html,
            area: ['600px', '500px'],
            scrollbar: true,
            btn: ['确定', '取消'],
            success: function (layero) {
                var btn = layero.find('.layui-layer-btn');
                btn.css('text-align', 'center');
                zTreeObj = $.fn.zTree.init($("#"+treeId), settings, listJson);
                console.log(tarra[0] !== '')
                console.log(zTreeObj)
                for (let i = 0; i < tarra.length; i++) {
                    ztree_ready(tarra[i]) ? ztree_ready(tarra[i],'tree') : true
                }
            },
            yes: function (index) {
                var checkItem = zTreeObj.getCheckedNodes()
                var filesHtml = '';
                var idList = [];
                checkItem.forEach(function (v, i) {
                    if (!v.list) {
                        filesHtml += `${v.name},`
                        idList.push(v.id)
                    }
                })
                console.log(idList.join(','))
                _this.attr('data-id',idList.join(',')).find('.textSpan').html(filesHtml)
                layer.close(index);
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
function changeJson (obj){
    for(let i = 0;i<obj.length;i++){
        if (Object.prototype.toString.call(obj[i]) === "[object Array]") {
            obj.list = obj[i];
            changeJson(obj[i])
        }else if(Object.prototype.toString.call(obj[i])==='[object Object]'){
            console.log('value是对象');
            Object.keys(obj[i]).forEach(function(key){
                if (Object.prototype.toString.call(obj[i][key]) === "[object Array]") {
                    obj[i].list = obj[i][key];
                    changeJson(obj[i][key])
                }else{
                    if(key.indexOf("Name") != -1){
                        obj[i]['name'] = obj[i][key]
                    }else if(key.indexOf("ID") != -1){
                        obj[i]['id'] = obj[i][key]
                    }else if(key.indexOf("favicon") != -1){
                        obj[i]['icon'] = `<?=FILE_HOST ?>webview/view?id=${obj[i][key]}&type=img&width=40&height=40`
                    }
                }
            });
        }else{
        }
    }
}
/*
* 处理json数据方法
* */
function ztree_ready(id,treeID = 'tree'){
    var node = zTreeObj.getNodeByParam("id",id);
    if(node!=null) {
        zTreeObj.selectNode(node, true);//指定选中ID的节点，自带打开效果
        zTreeObj.cancelSelectedNode(node);//取消选中样式
        zTreeObj.checkNode(node, true, true);//选中样式前的checkbox
        zTreeObj.expandNode(node, true, false);//将指定ID节点展开
        return true
    }else{
        return false
    }
}
/*
* 展开收起人员显示
* */
$(".toogleShow").click(function () {
    $(this).parent().find(".toogleHide").show();
    $(this).hide();
    $(this).parent().parent().find(".layui-colla-content").removeClass('imHide').addClass('imShow')
})
$(".toogleHide").click(function () {
    $(this).hide();
    $(this).parent().find(".toogleShow").show();
    $(this).parent().parent().find(".layui-colla-content").removeClass('imShow').addClass('imHide')
})