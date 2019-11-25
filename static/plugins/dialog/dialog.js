$.dislog=function(opts){
  var dislog=$('<div class="dialog-fixed">'+
    '<div class="img-dialog">'+
    '<h2>'+opts.tips+'</h2>'+
    '<div class="img-vaildate phone-vaildate">'+
    '<p>'+opts.content+'</p>'+
    '</div>'+
    '<div class="bottom-btns">'+
    '	<button class="cancel">取消</button>'+
    '	<button class="sure">确认</button>'+
    '</div>'+
    '</div>'+
    '</div>');
  dislog.show();
  $("body").append(dislog);
  cancel(dislog);
  sure(dislog,opts)
}

function cancel(dislog){
  dislog.find(".cancel").on("click",function(){
    dislog.hide();
  })
}
function sure(dislog,opts){
  dislog.find(".sure").on("click",function(){
    if(opts.callback) opts.callback();
    dislog.hide();

  })
}
