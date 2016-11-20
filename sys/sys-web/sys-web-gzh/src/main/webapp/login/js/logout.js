
 $('.logout').click(function(){
   $.ajax({
     url:getUrl('user/logout.do'),
     type: 'post',
     data: {},
     dataType: 'json',
     success : function(data){
       var success = data.success;
       var msg = data.msg;
       if(success != null && success == true){
         location.href = "../../login.html";
       } else {
       }
     },
     error	: function(){
     }
   });
 });
