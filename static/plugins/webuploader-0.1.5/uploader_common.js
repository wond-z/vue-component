ratio = window.devicePixelRatio || 1,
    // 缩略图大小
    thumbnailWidth = 90 * ratio,
    thumbnailHeight = 90 * ratio;
var uploader = WebUploader.create({

    auto: true,
    // swf文件路径
    swf: '/static/plugins/webuploader-0.1.5/Uploader.swf',

    // 文件接收服务端。
    server: server,
    timeout: 0,
    // 选择文件的按钮。可选。
    // 内部根据当前运行是创建，可能是input元素，也可能是flash.
    pick: '#picker',
    accept : accept,
    // 不压缩image, 默认如果是jpeg，文件上传前会压缩一把再上传！
    resize: false,
    duplicate: true,
    formData:formdata,
    withCredentials: withCredentials,

});

uploader.on( 'beforeFileQueued', function( file ) {
    if (file.size==0){
        layer.msg('不能上传空文件');
    }
    if(accept.extensions=='video/mp4'&&accept.extensions!=file.type){
        layer.msg('不支持此文件类型');
    }

});
// 当有文件被添加进队列的时候
uploader.on( 'fileQueued', function( file ) {
    $list.append( '<div id="' + file.id + '" class="item">' +
        '</div>' );
});
//仅适用于app轮播图上传和文件上传
uploader.on( 'uploadBeforeSend', function( block, data ) {
    data.type=sendtype;
},2);

// 文件上传过程中创建进度条实时显示。
uploader.on( 'uploadProgress', function( file, percentage ) {
    var $li = $( '#'+file.id ),
        $percent = $li.find('.progress .progress-bar');

    // 避免重复创建
    if ( !$percent.length ) {
        $percent = $('<div class="progress progress-striped active">' +
            '<div class="progress-bar" role="progressbar" style="width: 0%">' +
            '</div>' +
            '</div>').appendTo( $li ).find('.progress-bar');
    }

//                                            $li.find('p.state').text('上传中');

    $percent.css( 'width', percentage * 100 + '%' );
});
uploader.on( 'uploadSuccess', function( file,response ) {
    uploadSuccess(file,response);
//                                            $( '#'+file.id ).find('p.state').text('已上传');
});

uploader.on( 'uploadError', function( file ) {
    layer.msg('上传出错');
    // $( '#'+file.id ).find('p.state').text('上传出错');
});

uploader.on( 'uploadComplete', function( file ) {
    $( '#'+file.id ).find('.progress').fadeOut();
});