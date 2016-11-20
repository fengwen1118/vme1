$(document).keyup(function(event) {
    if (event.keyCode == 13) {
        $('.login').click();
    }
});
$(function() {
    $('#userName').focus();
    initUserName();
    $('.login').click(function () {
        var vc2Username =$('#userName').val();
        var vc2Userpwd = $('#passWord').val();
        if(vc2Username == "") {
            $('.errortip').html('用户名不能为空');
            return false;
        }
        else if (vc2Userpwd== "") {
            $('.errortip').html('密码不能为空');
            return false;
        }else{
           ajaxLogin();
        }
    })
});

//用户登录
function ajaxLogin(){
    $.ajax({
        url:getUrl('user/login.do'),
        type:'post',
        async :false,
        cache:false,
        dataType:'json',
        data : $('form').serialize(),
        success:function(data) {

            if (data.success ==true){
                //设置用户会话
                saveUserSession(data.user);
                //记住用户名 密码
                remember();
               // var currentTime = new Date().getMilliseconds();     //获取当前时间
                location.href = "ajax/index.html#page/main";
            }else{
                $('.errortip').html('用户名或密码错误');
            }
        }
    });
}

//设置用户会话
function saveUserSession(data){

    var userEntity = {
        name: 'fw',
        age: 22
    };
    sessionStorage.setItem('user', JSON.stringify(userEntity));
}



//记住用户名、密码
function remember(){
    if ($('#expires').is(':checked')) {
        $.cookie('userName', $('#userName').val(), {
            expires : 7
        });
    } else {
        $.cookie('userName',null);
    }
}
//加载用户名
function initUserName(){
    if($.cookie('userName')!='null'){
        $('#userName').val($.cookie('userName'));
    }
}