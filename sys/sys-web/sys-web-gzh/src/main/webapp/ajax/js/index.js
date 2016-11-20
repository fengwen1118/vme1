/**
 * Created by zhujiajia on 16/9/27.
 */
$(function() {
    $('.indlady').css('z-index','10000000000000000')
    userJsonStr = sessionStorage.getItem('user');
    userEntity = JSON.parse(userJsonStr);
    $("#username").text(userEntity.name);
    rightJsonStr = sessionStorage.getItem('right');
    rightEntity = JSON.parse(rightJsonStr);
    initRight();

});

//初始化权限菜单
function initRight(){

    //菜单顶部固定内容
    var top = new Array();
    top.push("<li class=\"active\">");
    top.push("<a data-url=\"page/main\" href=\"#page/main\">");
    top.push("<i class=\"menu-icon fa fa-home\"></i>");
    top.push("<span class=\"menu-text\">首页</span>");
    top.push("</a><b class=\"arrow\"></b>");
    top.push("</li>");
    $("#rightlist").prepend(top.join(""));

    //权限菜单
    var args = new Array();



    args.push("<li>");
    args.push("<a href=\"#\" class=\"dropdown-toggle\">");
    args.push("<i class=\"menu-icon glyphicon glyphicon-align-justify\"></i>");
    args.push("<span class=\"menu-text\">订单管理</span>");
    args.push("<b class=\"arrow fa fa-angle-down\"></b>");
    args.push("</a>");
    args.push("<b class=\"arrow\"></b>");
    args.push("<ul class=\"submenu\">");

    args.push("<li>");
    args.push("<a data-url=\"page/order/orderlist1\" href=\"#page/order/orderlist1\">");
    args.push("<i class=\"menu-icon fa fa-caret-right\"></i>");
    args.push("订单查询");
    args.push("</a>");
    args.push("<b class=\"arrow\"></b>");
    args.push("</li>");


    args.push("<li>");
    args.push("<a >");
    args.push("<i class=\"menu-icon fa fa-caret-right\"></i>");
    args.push("待处理订单");
    args.push("</a>");
    args.push("<b class=\"arrow\"></b>");
    args.push("</li>");

    args.push("<li>");
    args.push("<a >");
    args.push("<i class=\"menu-icon fa fa-caret-right\"></i>");
    args.push("订单编辑");
    args.push("</a>");
    args.push("<b class=\"arrow\"></b>");
    args.push("</li>");

    args.push("</ul>");
    args.push("</li>");

    args.push("<li>");
    args.push("<a href=\"#\" class=\"dropdown-toggle\">");
    args.push("<i class=\"menu-icon fa fa-pencil-square-o\"></i>");
    args.push("<span class=\"menu-text\">产品管理</span>");
    args.push("<b class=\"arrow fa fa-angle-down\"></b>");
    args.push("</a>");
    args.push("<b class=\"arrow\"></b>");
    args.push("<ul class=\"submenu\">");

    args.push("<li>");
    args.push("<a >");
    args.push("<i class=\"menu-icon fa fa-caret-right\"></i>");
    args.push("产品查询");
    args.push("</a>");
    args.push("<b class=\"arrow\"></b>");
    args.push("</li>");
    args.push("<li>");
    args.push("<a >");
    args.push("<i class=\"menu-icon fa fa-caret-right\"></i>");
    args.push("产品新建");
    args.push("</a>");
    args.push("<b class=\"arrow\"></b>");
    args.push("</li>");
    args.push("<li>");
    args.push("<a >");
    args.push("<i class=\"menu-icon fa fa-caret-right\"></i>");
    args.push("产品编辑");
    args.push("</a>");
    args.push("<b class=\"arrow\"></b>");
    args.push("</li>");
    args.push("</ul>");
    args.push("</li>");



    args.push("<li>");
    args.push("<a href=\"#\" class=\"dropdown-toggle\">");
    args.push("<i class=\"menu-icon fa fa-share-square-o\"></i>");
    args.push("<span class=\"menu-text\">用户管理</span>");
    args.push("<b class=\"arrow fa fa-angle-down\"></b>");
    args.push("</a>");
    args.push("<b class=\"arrow\"></b>");
    args.push("<ul class=\"submenu\">");
    args.push("<li>");
    args.push("<a >");
    args.push("<i class=\"menu-icon fa fa-caret-right\"></i>");
    args.push("用户查询");
    args.push("</a>");
    args.push("<b class=\"arrow\"></b>");
    args.push("</li>");
    args.push("<li>");
    args.push("<a >");
    args.push("<i class=\"menu-icon fa fa-caret-right\"></i>");
    args.push("用户新建");
    args.push("</a>");
    args.push("<b class=\"arrow\"></b>");
    args.push("</li>");
    args.push("<li>");
    args.push("<a >");
    args.push("<i class=\"menu-icon fa fa-caret-right\"></i>");
    args.push("用户编辑");
    args.push("</a>");
    args.push("<b class=\"arrow\"></b>");
    args.push("</li>");
    args.push("</ul>");
    args.push("</li>");




    args.push("<li>");
    args.push("<a href=\"#\" class=\"dropdown-toggle\">");
    args.push("<i class=\"menu-icon fa fa-cog\"></i>");
    args.push("<span class=\"menu-text\">系统管理</span>");
    args.push("<b class=\"arrow fa fa-angle-down\"></b>");
    args.push("</a>");
    args.push("<b class=\"arrow\"></b>");
    args.push("<ul class=\"submenu\">");

    args.push("<li>");
    args.push("<a >");
    args.push("<i class=\"menu-icon fa fa-caret-right\"></i>");
    args.push("界面设置");
    args.push("</a>");
    args.push("<b class=\"arrow\"></b>");
    args.push("</li>");

    args.push("<li>");
    args.push("<a >");
    args.push("<i class=\"menu-icon fa fa-caret-right\"></i>");
    args.push("客服设置");
    args.push("</a>");
    args.push("<b class=\"arrow\"></b>");
    args.push("</li>");


    args.push("<li>");
    args.push("<a >");
    args.push("<i class=\"menu-icon fa fa-caret-right\"></i>");
    args.push("菜单设置");
    args.push("</a>");
    args.push("<b class=\"arrow\"></b>");
    args.push("</li>");

    args.push("</ul>");
    args.push("</li>");


    $("#rightlist").append(args.join(""));

}