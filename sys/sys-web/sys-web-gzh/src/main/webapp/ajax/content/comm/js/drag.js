// JavaScript Document
    // 拖动窗口
    $(document).ready(function(){
        //初始化位置
        initPosition();
        //拖拽
        dragAndDrop();
    });

    //拖拽
    function dragAndDrop(){
        var _move = false;//移动标记
        var _x,_y;//鼠标离控件左上角的相对位置
        $(".wTop").mousedown(function(e){
            _move = true;
            _x = e.pageX - parseInt($(".pop").css("left"));
            _y = e.pageY - parseInt($(".pop").css("top"));
        });
        $(document).mousemove(function(e){
            if(_move){
                var x = e.pageX - _x;//移动时鼠标位置计算控件左上角的绝对位置
                var y = e.pageY - _y;
                $(".pop").css({top:y,left:x});//控件新位置
            }
        }).mouseup(function(){
            _move=false;
        });
    }
    //初始化拖拽div的位置
    function initPosition(){
        //计算初始化位置
        var itop = ($(document).height()-$(".pop").height())/2+200;
        var ileft = ($(document).width()-$(".pop").width())/1.8+200;
        //设置被拖拽div的位置
        $(".pop").css({top:itop,left:ileft});
    }