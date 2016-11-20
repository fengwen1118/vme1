/**
 * Created by think on 2016/9/15.
 */
//私聊域名
chatDomain="@localhost";
//群组域名
chatGroupDomain = "@conference.localhost";
// BOSH服务端点
BOSH_SERVICE = "http://localhost:7070/http-bind/";
// 连接
jid = sessionStorage["userName"]+chatDomain;
jpw = sessionStorage["passWord"];
connection = null;
// 创建连接
connection = new Strophe.Connection(BOSH_SERVICE);
$(document).ready(function() {
    if(sessionStorage["jid"]==null) {
        // 注册事件处理器
       // connection.rawInput = rawInput;
       // connection.rawOutput = rawOutput;
        //建立连接
        connection.connect(
            jid, // Jabber 标识 (用户名 Full JID)
            jpw,// 密码
            onConnect
        );
    }else{
        // 注册事件处理器
       // connection.rawInput = rawInput;
       // connection.rawOutput = rawOutput;
        connection.attach(sessionStorage["jid"],sessionStorage["sid"], sessionStorage["rid"],onConnect);
    }
});

// 接收到<message>
function onMessage(msg) {
    sessionStorage["rid"]=connection.rid;
    sessionStorage["sid"]=connection.sid;
    sessionStorage["jid"]=connection.jid;
    // 解析出<message>的from、type属性，以及body子元素
    var from = msg.getAttribute('from');
    var type = msg.getAttribute('type');
    var elems = msg.getElementsByTagName('body');
    if (type == "chat" && elems.length > 0) {
        var body = elems[0];
        $("#logchat").append(from + ":<br>" + Strophe.getText(body) + "<br>")
    }
    return true;
}




// 连接事件处理
function onConnect(status) {
    if (status == Strophe.Status.CONNECTING) {
        log('Strophe is connecting.');
    } else if (status == Strophe.Status.CONNFAIL) {
        log('Strophe failed to connect.');
    } else if (status == Strophe.Status.DISCONNECTING) {
        log('Strophe is disconnecting.');
    } else if (status == Strophe.Status.DISCONNECTED) {
        sessionStorage.removeItem("rid");
        sessionStorage.removeItem("sid");
        sessionStorage.removeItem("jid");
        log('Strophe is disconnected.');
    } else if (status == Strophe.Status.CONNECTED) {
        log('Strophe is connected.');
        online();

    }
}
function online() {
    var elementShow = Strophe.xmlElement('show', {}, 'chat');
    var elementStatus = Strophe.xmlElement('status', {}, '在线');
    var presence = $pres({
        from: jid,
        xmlns: 'jabber:client',
        'xmlns:stream': 'http://etherx.jabber.org/streams',
        version: '1.0'
    })
        .cnode(elementShow).up()
        .cnode(elementStatus);
    connection.send(presence.tree());

    // 当接收到<message>节，调用onMessage回调函数
    connection.addHandler(onMessage, null, 'message', null, null, null);
    // 首先要发送一个<presence>给服务器（initial presence）
    connection.send($pres().tree());

    // get friends
    var iq = $iq({type: 'get'}).c('query', {xmlns: 'jabber:iq:roster'});
    connection.sendIQ(iq, getFriends); // getFriends是回调函数
    //connection.addHandler(onMessage, null, 'message', null, null,  null);
    //connection.send($pres().tree());

}

function getFriends(iq){
    $('#friendlist').html('');
    $(iq).find('item').each(function () {
        var jid = $(this).attr('jid');
        var name = $(this).attr('name') || jid;
        $('#friendlist').html('');
        $('#friendlist').append('<li><span>'+ name +'</span> <a href="../page/chatingPage.html?jid='+ jid +'">talk</a></li>');
        console.log(jid + ' - ' + name);
    });

}

function rawInput(data) {
    log(formatXml(data), false);
};
function rawOutput(data) {

    sessionStorage["rid"]=connection.rid;
    sessionStorage["sid"]=connection.sid;
    sessionStorage["jid"]=connection.jid;
    log(formatXml(data), true);
};
function log(msg, sent) {
    if (sent) {
        $('#logchat').prepend("<pre>" + msg + "</pre>");
        $('#logchat').prepend("<span style='color: green;background-color: white;'>发送</span>:\n");
    } else {
        $('#logchat').prepend("<pre>" + msg + "</pre>");
        $('#logchat').prepend("<span style='color: orangered;background-color: white;'>接收</span>:\n");
    }
}
function formatXml(xml) {
    var formatted = '';
    var reg = /(>)(<)(\/*)/g;
    xml = xml.replace(reg, '$1\r\n$2$3');
    var pad = 0;
    jQuery.each(xml.split('\r\n'), function (index, node) {
        var indent = 0;
        if (node.match(/.+<\/\w[^>]*>$/)) {
            indent = 0;
        } else if (node.match(/^<\/\w/)) {
            if (pad != 0) {
                pad -= 1;
            }
        } else if (node.match(/^<\w[^>]*[^\/]>.*$/)) {
            indent = 1;
        } else {
            indent = 0;
        }

        var padding = '';
        for (var i = 0; i < pad; i++) {
            padding += '  ';
        }

        formatted += padding + node + '\r\n';
        pad += indent;
    });

    xml_escaped = formatted.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/ /g, '&nbsp;').replace(/\n/g, '');
    return xml_escaped;
}
