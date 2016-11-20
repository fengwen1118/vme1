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

// BOSH服务端点
var BOSH_SERVICE = 'http://localhost:7070/http-bind/'
// 连接
var connection = null;

function log(msg, sent) {
  if (sent) {
    $('#logchat').prepend("<pre>" + msg + "</pre>");
    $('#logchat').prepend("<span style='color: green;background-color: white;'>SENT</span>:\n");
  } else {
    $('#logchat').prepend("<pre>" + msg + "</pre>");
    $('#logchat').prepend("<span style='color: orangered;background-color: white;'>RECV</span>:\n");
  }
}
function rawInput(data) {
  log(formatXml(data), false);
}
function rawOutput(data) {
  log(formatXml(data), true);
}

// 连接事件处理
function onConnect(status) {
  if (status == Strophe.Status.CONNECTING) {
    log('Strophe is connecting.');
  } else if (status == Strophe.Status.CONNFAIL) {
    log('Strophe failed to connect.');
    $('#connect').get(0).value = 'connect';
  } else if (status == Strophe.Status.DISCONNECTING) {
    log('Strophe is disconnecting.');
  } else if (status == Strophe.Status.DISCONNECTED) {
    log('Strophe is disconnected.');
    $('#connect').get(0).value = 'connect';
  } else if (status == Strophe.Status.CONNECTED) {
    log('Strophe is connected.');
    //connection.disconnect();
  }
}

$(document).ready(function () {
  // 创建连接
  connection = new Strophe.Connection(BOSH_SERVICE);
  // 注册事件处理器
  connection.rawInput = rawInput;
  connection.rawOutput = rawOutput;
  //建立连接
  connection.connect(
      $('#jid').get(0).value, // Jabber 标识 (用户名 Full JID)
      $('#pass').get(0).value,// 密码
      onConnect
  );
  //线上
  online();


  // 按钮事件
  $('#connect').bind('click', function () {
    var button = $('#connect').get(0);
    if (button.value == 'connect') {
      button.value = 'disconnect';
      // 连接:
      connection.connect(
        $('#jid').get(0).value, // Jabber 标识 (用户名 Full JID)
        $('#pass').get(0).value,// 密码
        onConnect
      );
    } else {
      button.value = 'connect';
      connection.disconnect();
    }
  });
  $('#query').bind('click', function () {
    query(connection, 'info', 'localhost', 'config');
  });
  $('#getlast').bind('click', function () {
    get_last();
  });

  $('#online').bind('click', function () {
    var button = $('#online').get(0);
    if (button.value == 'online') {
      button.value = 'offline';
      online();
    } else {
      button.value = 'online';
      offline();
    }
  });

  $('#composing').bind('click', function () {
    Chat.changeStatus(CHAT_STATUS.COMPOSING);
  });
  $('#paused').bind('click', function () {
    Chat.changeStatus(CHAT_STATUS.PAUSED);
  });
  $('#gone').bind('click', function () {
    Chat.changeStatus(CHAT_STATUS.GONE);
  });
  $('#inactive').bind('click', function () {
    Chat.changeStatus(CHAT_STATUS.INACTIVE);
  });
  $('#active').bind('click', function () {
    Chat.changeStatus(CHAT_STATUS.ACTIVE);
  });

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
});