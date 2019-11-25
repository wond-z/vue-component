function f(url) {

    var $list = $('#demoList');
    var fileSingleSizeLimit = 10 * 1024 * 1024;
    var server = url;
    var accept = [];
    var uploader = WebUploader.create({
        auto: true,
        // swf文件路径
        swf: './webuploader-0.1.5/Uploader.swf',

        // 文件接收服务端。
        server: server,

        // 选择文件的按钮。可选。
        // 内部根据当前运行是创建，可能是input元素，也可能是flash.
        pick: '#testList1',
        accept: accept,
        // 不压缩image, 默认如果是jpeg，文件上传前会压缩一把再上传！
        resize: false,
        duplicate: true,
        withCredentials: true,

    });
    uploader.on('beforeFileQueued', function (file) {
        if (file.size == 0) {
            layer.msg('不能上传空文件');
        }
    });
// 当有文件被添加进队列的时候
    uploader.on('fileQueued', function (file) {
        $list.append('<div id="' + file.id + '" class="item">' +
            '</div>');
    });
    uploader.on('uploadBeforeSend', function (block, data) {
    }, 2);

// 文件上传过程中创建进度条实时显示。
    uploader.on('uploadProgress', function (file, percentage) {

    });
    uploader.on('uploadSuccess', function (file, response) {
        uploadSuccess(file, response);
    });

    uploader.on('uploadError', function (file) {
    });

    uploader.on('uploadComplete', function (file) {
    });

    function uploadSuccess(file, response) {
        if (response.code == 200) {
            serverFiles.push(response.data)
            var filesHtml = `<tr id=${response.data.value}>
                                <td> ${ICON(response.data.name)} ${response.data.name}</td>
                                    <td>上传成功</td>
                                    <td style="width: 150px;">
                                       <a data-id=${response.data.value} class="layui-btn layui-btn-xs layui-btn-danger demo-delete">删除</a>
                                    </td>
                              </tr>`
            $list.append(filesHtml);

            $.ajax({
                url: '/project/project/ablum_do',
                data: {
                    projectid: _project_id,
                    affixid: response.data.value
                },
                type: 'post',
                success: function (res) {
                    if (res.code == 200) {
                        console.log('我的文件夹成功')
                        refreshTree()
                    }else{
                        console.log('我的文件夹失败')
                    }
                },
                error: function (res) {
                }
            });

        } else {
            layer.msg(response.msg);
        }
    }
}