/**
 * Created by agoni on 2017/2/21.
 * mini 简单 前端插件
 * 依赖jquery1.11以上版本，主要设置和参数再dom属性上设置
 */
var TF = window.TF || {cache: {}};
//jquery.datatable 中文语言
var oLanguage = {
    "sProcessing": "处理中...",
    "sLengthMenu": "显示 _MENU_ 项结果",
    "sZeroRecords": "没有匹配结果",
    "sInfo": "显示第 _START_ 至 _END_ 项结果，共 _TOTAL_ 项",
    "sInfoEmpty": "显示第 0 至 0 项结果，共 0 项",
    "sInfoFiltered": "(由 _MAX_ 项结果过滤)",
    "sInfoPostFix": "",
    "sSearch": "搜索:",
    "sUrl": "",
    "sEmptyTable": "表中数据为空",
    "sLoadingRecords": "载入中...",
    "sInfoThousands": ",",
    "oPaginate": {
        "sFirst": "首页",
        "sPrevious": "上页",
        "sNext": "下页",
        "sLast": "末页"
    },
    "oAria": {
        "sSortAscending": ": 以升序排列此列",
        "sSortDescending": ": 以降序排列此列"
    }
};

$.fn.getList = function (_url, callback) {
    var self = this;
    var url = _url || self.attr('data-url');
    if (!url) {
        return false;
    }
    var data_callbank = (self.attr('data-callbank') || '');
    var fromData = self.closest('.box-body').find('form').serialize();
    layui.use(['layer', 'form'], function () {
        var layer = layui.layer;
        var index = layer.load();
        $('#refresh').find('i').addClass('fa-spin');
        $.ajax({
            url: url,
            type: 'GET',
            data: fromData,
            dataType: 'html',
            success: function (data) {
                if (self.selector == '#list') {
                    TF.cache.url = url; //约定主列表页为#list
                }
                self.empty().html(data);
                layui.form().render();
                if (data_callbank != '') {
                    eval(data_callbank + '()');
                }
                if (typeof callback === 'function') {
                    callback();
                }
            },
            complete: function () {
                layer.close(index);
                $('#refresh').find('i').removeClass('fa-spin');
            },
            error: function () {
                layer.msg('加载失败');
            }
        })
    })
};
$(document).on('click', '#refresh', function () {
    var url = TF.cache.url || '';
    $('#list').getList(url);
})
//动态获取表达提交
$(document).on('click', '.ajax-form', function (event) {
    event.preventDefault();
    var self = $(this);
    layui.use(['layer', 'form'], function () {
        var form = layui.form();
        var layer = layui.layer;
        var url = self.attr('href') || self.attr('data-url');
        if (!url) {
            return false;
        }
        var obj = self.attr('data-dom') || '';
        $.get(url, function (html) {
            layer.open({
                type: 1,
                title: self.attr('title'),
                content: html,
                scrollbar: false,
                maxWidth: '50%',
                btn: ['确定', '取消'],
                yes: function (index, layero) {
                    var form = $(layero).find('form');
                    $.post(form.attr('action'), form.serialize(), function (res) {
                        if (res.status == 1) {
                            if (res.url) {
                                if (obj) {
                                    $('#' + obj).getList(res.url);
                                } else {
                                    window.location.href = res.url;
                                }
                            }
                            layer.msg(res.msg, {time: 1500, icon: 6}, function () {
                                layer.close(index);
                            });
                        } else {
                            var str = '';
                            if (typeof res.msg === 'object') {
                                $.each(res.msg, function (i, v) {
                                    str += v.join('<br>');
                                })
                            } else {
                                str = res.msg || '服务器异常';
                            }
                            layer.msg(str, {time: 1000, icon: 5});
                        }
                    }, 'json');
                    return false;
                },
                btn2: function (index) {
                    layer.close(index);
                },
                success: function (layero, index) {
                    form.render();
                }
            }, 'html');
        });
    });
    return false;
})

//动态获取表达提交
$(document).on('click', '.ajax-get', function (event) {
    event.preventDefault();
    var self = $(this);
    layui.use(['layer'], function () {
        var layer = layui.layer;
        var url = self.attr('href') || self.attr('data-url');
        var title = self.attr('data-title') || '执行该操作';
        var obj = self.attr('data-dom') || '';
        if (!url) {
            return false;
        }
        if (self.attr('confirm') == '1') {
            layer.confirm('您确定要' + title + '吗？', function (index) {
                $.get(url, function (res) {
                    layer.msg(res.msg, {anim: 5}, function () {
                        layer.close(index);
                    });
                    if (res.url) {
                        if (obj) {
                            $('#' + obj).getList(res.url);
                        } else {
                            window.location.href = res.url;
                        }
                    }
                });
            });

        } else {
            $.get(url, function (res) {
                layer.msg(res.msg, {anim: 5}, function () {
                    layer.close(index);
                });
                if (res.url) {
                    if (obj) {
                        $('#' + obj).getList(res.url);
                    } else {
                        window.location.href = res.url;
                    }
                }
            });
        }
        return false;
    })
})

$(document).on('click', '.ajax-info', function (event) {
    event.preventDefault();
    var self = $(this);
    var title = self.attr('title');
    var fill = self.attr('data-fill');

    var config = {
        type: 1,
        title: title,
        scrollbar: false,
        area: ['auto', '96%']
    };
    if (fill == 1) {
        config.area = ['auto', '96%'];
    } else {
        config.area = ['auto', 'auto'];
    }
    $.get(self.attr('href'), function (html) {
        config.content = html;
        TF.LAY_LOAD = layer.open(config);

    });
    return false;
});