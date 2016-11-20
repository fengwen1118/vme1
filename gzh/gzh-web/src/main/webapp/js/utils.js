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


if(sessionStorage["jid"]==null) {
    connection = null;
    // 创建连接
    connection = new Strophe.Connection(BOSH_SERVICE);
    // 注册事件处理器
    connection.rawInput = rawInput;
    connection.rawOutput = rawOutput;
    //建立连接
    connection.connect(
        jid, // Jabber 标识 (用户名 Full JID)
        jpw,// 密码
        onConnect
    );
}else{
    connection = new Strophe.Connection(BOSH_SERVICE);
    // 注册事件处理器
    //connection.rawInput = rawInput;
    //connection.rawOutput = rawOutput;
    connection.attach(sessionStorage["jid"],sessionStorage["sid"], sessionStorage["rid"],onConnect);
    connection.rawInput = rawInput1;
    connection.rawOutput = rawOutput1;
    // var iq = $iq({type: 'get'}).c('query', {xmlns: 'jabber:iq:roster'});
    // connection.sendIQ(iq, getFriends); // getFriends是回调函数
}
/*
function chatConnect(){
    connection.addHandler(onMessage1, null, 'message', null, null,  null);
    connection.send($pres().tree());
}

function onMessage1(message) {
    var from = message.getAttribute('from');
    var type = message.getAttribute('type');
    var elems = message.getElementsByTagName('body');
    if (type == "chat" && elems.length > 0) {
        var body = elems[0];
        //$("#msg").append(from + ":<br>" + Strophe.getText(body) + "<br>");
        alert(Strophe.getText(body));
       // content.innerHTML += '<li><img style="float:left" src="' + arrIcon[1] + '"><span>' + Strophe.getText(body) + '</span></li>';
    }
    sessionStorage["rid"]=connection.rid;
    sessionStorage["sid"]=connection.sid;
    sessionStorage["jid"]=connection.jid;

}*/

// 连接事件处理
function onConnect(status) {
    if (status == Strophe.Status.CONNECTING) {
        log('Strophe is connecting.');
    } else if (status == Strophe.Status.CONNFAIL) {
        sessionStorage.removeItem("rid");
        sessionStorage.removeItem("sid");
        sessionStorage.removeItem("jid");
        log('Strophe failed to connect.');
    } else if (status == Strophe.Status.DISCONNECTING) {
        sessionStorage.removeItem("rid");
        sessionStorage.removeItem("sid");
        sessionStorage.removeItem("jid");
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

    // get friends
    var iq = $iq({type: 'get'}).c('query', {xmlns: 'jabber:iq:roster'});
    connection.sendIQ(iq, getFriends); // getFriends是回调函数
    connection.addHandler(onMessage, null, 'message', null, null,  null);
    connection.send($pres().tree());

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
}
function rawOutput(data) {
    sessionStorage["rid"]=connection.rid;
    sessionStorage["sid"]=connection.sid;
    sessionStorage["jid"]=connection.jid;
    log(formatXml(data), true);
}

function rawInput1(data) {
   // log1(formatXml(data), false);
}
function rawOutput1(data) {
    sessionStorage["rid"]=connection.rid;
    sessionStorage["sid"]=connection.sid;
    sessionStorage["jid"]=connection.jid;
   // log1(formatXml(data), true);
}
function log(msg, sent) {
    if (sent) {
        $('#logchat').prepend("<pre>" + msg + "</pre>");
        $('#logchat').prepend("<span style='color: green;background-color: white;'>发送</span>:\n");
    } else {
        $('#logchat').prepend("<pre>" + msg + "</pre>");
        $('#logchat').prepend("<span style='color: orangered;background-color: white;'>接收</span>:\n");
    }
}
function log1(msg, sent) {
    if (sent) {
        $('#logchat').prepend("<pre>" + msg + "</pre>");
        $('#logchat').prepend("<span style='color: green;background-color: white;'>新Connection发送</span>:\n");
    } else {
        $('#logchat').prepend("<pre>" + msg + "</pre>");
        $('#logchat').prepend("<span style='color: orangered;background-color: white;'>新Connection接收</span>:\n");
      /*  try{
            if (msg.indexOf("type='chat'") != -1) {
                msg = msg.replace(/&lt;/g, '<');
                msg = msg.replace(/&nbsp;/g, ' ');
                msg = msg.replace(/&gt;/g, '>');
                var xmlDoc = loadXML(msg);
                try{
                    var message = xmlDoc.getElementsByTagName('message');
                    if(message.length!=0){
                        for(var i=0;i<message.length;i++){
                            try{
                                var body = message[i].getElementsByTagName('body')[0].firstChild.nodeValue;
                                alert(body);
                                var content = document.getElementsByTagName('ul')[0];
                                content.innerHTML += '<li><img style="float: right;" src="'+arrIcon[0]+'"><span style="float: right;background: #7cfc00;">'+text.value+'</span></li>';
                                text.value = '';
                                // 内容过多时,将滚动条放置到最底端
                                content.scrollTop=content.scrollHeight;
                            }catch(e){}
                        }
                    }
                }catch(e){}

            }
        }catch(e){}*/

    }
}

function loadXML(xmlString) { //构建xmldoc对象
    var xmlDoc = null;
    if (window.DOMParser)  //IE9+,FF,webkit
    {
        try {
            domParser = new DOMParser();
            xmlDoc = domParser.parseFromString(xmlString, 'text/xml');
        } catch (e) {
        }
    }
    else if (!window.DOMParser && window.ActiveXObject) {   //window.DOMParser 判断是否是非ie浏览器
        var xmlDomVersions = ['MSXML2.DOMDocument', 'Microsoft.XMLDOM'];
        for (var i = 0; i < xmlDomVersions.length; i++) {
            try {
                xmlDoc = new ActiveXObject(xmlDomVersions[i]);
                xmlDoc.async = false;
                xmlDoc.loadXML(xmlString); //loadXML方法载入xml字符串
                break;
            } catch (e) {
                continue;
            }
        }
    }
    else {
        return null;
    }
    return xmlDoc;
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
