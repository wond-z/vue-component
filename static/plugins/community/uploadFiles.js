function Files(url, fileDom, btnDom, fileArr) {
    var $list = $(fileDom);
    var server = url;
    var accept = [];
    var uploader = WebUploader.create({
        auto: true,
        swf: './webuploader-0.1.5/Uploader.swf',
        // 文件接收服务端。
        server: server,
        pick: btnDom,
        accept: accept,
        resize: false,
        duplicate: true,
        withCredentials: true,
    });
    uploader.on('beforeFileQueued', function (file) {
        if (file.size == 0) {
            layer.msg('不能上传空文件');
        }
    });
    uploader.on('fileQueued', function (file) {
        $list.append('<div id="' + file.id + '" class="item">' +
            '</div>');
    });
    uploader.on('uploadBeforeSend', function (block, data) {
    }, 2);
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
            fileArr.push(response.data)
            var filesHtml = `<tr id=${response.data.value}>
                                <td> ${ICON(response.data.name)} ${response.data.name}</td>
                                    <td>上传成功</td>
                                    <td>
                                       <a data-id=${response.data.value} class="layui-btn layui-btn-xs layui-btn-danger delete">删除</a>
                                    </td>
                              </tr>`
            $list.append(filesHtml);
        } else {
            layer.msg(response.msg);
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