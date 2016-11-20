var BOSH_SERVICE = 'http://localhost:7070/http-bind/';
var connection = null;

function log(msg) 
{
    $('#log').append('<div></div>').append(document.createTextNode(msg));
}

function onConnect(status)
{
    if (status == Strophe.Status.CONNECTING) {
        console.log('Strophe is connecting.');
    } else if (status == Strophe.Status.CONNFAIL) {
		log('Strophe failed to connect.');
    } else if (status == Strophe.Status.DISCONNECTING) {
		log('Strophe is disconnecting.');
    } else if (status == Strophe.Status.DISCONNECTED) {
        sessionStorage.removeItem("rid");
        sessionStorage.removeItem("sid");
		log('Strophe is disconnected.');
    } else if (status == Strophe.Status.CONNECTED) {
		log('连接成功！');
        console.log('Strophe is connected.');
//		log('ECHOBOT: Send a message to ' + connection.jid + ' to talk to me.');

		$.cookie('jid', connection.jid);
		$.cookie('sid', connection.sid);
		$.cookie('rid', connection.rid);
        
        // set jid to hidden field
        $('#fromjid').val(connection.jid);
        
        // get friends
        var iq = $iq({type: 'get'}).c('query', {xmlns: 'jabber:iq:roster'});
        connection.sendIQ(iq, getFriends); // getFriends是回调函数
        
        connection.addHandler(onMessage, null, 'message', null, null,  null); 
        connection.send($pres().tree());
    }
}

function onMessage(msg) {
    var to = msg.getAttribute('to');
    var from = msg.getAttribute('from');
    var type = msg.getAttribute('type');
    var elems = msg.getElementsByTagName('body');

    if (type == "chat" && elems.length > 0) {
        var body = elems[0];
        
        log(new Date().toLocaleTimeString() + ' ' + from + ': ' + Strophe.getText(body));
        
//        var reply = $msg({to: from, from: to, type: 'chat'}).cnode(Strophe.copyElement(body));
//        connection.send(reply.tree());
//        log('ECHOBOT: I sent ' + from + ': ' + Strophe.getText(body));
    }

    // we must return true to keep the handler alive.  
    // returning false would remove it after it finishes.
    return true;
}

function getFriends(iq){	
    $(iq).find('item').each(function () {
        var jid = $(this).attr('jid');
        var name = $(this).attr('name') || jid;
        
        $('#friendlist').html('');
        $('#friendlist').append('<li><span>'+ jid +'</span> <a href="#'+ jid +'">talk</a></li>');
        console.log(jid + ' - ' + name);
    });
}

$(document).ready(function () {
    connection = new Strophe.Connection(BOSH_SERVICE);
    connection.connect(sessionStorage["userName"]+"@localhost", sessionStorage["passWord"], onConnect);

    $('#send').bind('click', function () {

        var msg=$('#msg').val();
        toId = $('#tojid').val();
        fromId = $('#fromjid').val();
        
        console.log(msg);
        console.log(toId);
        
	    var reply = $msg({to: toId, from: fromId , type: 'chat'}).cnode(Strophe.xmlElement('body', '' ,msg));
	    connection.send(reply.tree());
        log(new Date().toLocaleTimeString() + "  "+ fromId +":  "  + msg);
	    $('#msg').val('');
    });
    
    $('#friendlist li').live('click', function () {
        var jid = $(this).find('span').text();
        $('#tojid').val(jid);
    });
});

