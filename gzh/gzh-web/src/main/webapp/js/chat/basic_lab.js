var XMLNS = {
  CHATSTATUS: 'chatstatus',
  COMMANDS: 'commands',
  DISCO_INFO: 'disco#info',
  DISCO_ITEMS: 'disco#items',

  /*
   activity
   address
   amp
   bookmarks
   bytestreams
   caps
   chatstates
   commands
   compress
   disco
   feature-neg
   file-transfer
   geoloc
   http-auth
   httpbind
   ibb
   jabber_client
   jabber_iq_last
   jabber_iq_oob
   jabber_iq_privacy
   jabber_iq_register
   jabber_iq_roster
   jabber_iq_rpc
   jabber_iq_version
   jabber_server
   jabber_server_dialback
   jabber_x_conference
   jabber_x_data
   jabber_x_oob
   jidescaping
   linklocal
   mood
   muc
   nick
   offline
   pep
   pubsub
   rc
   rosterx
   rsm
   shim
   si
   sipub
   soap
   streams
   tune
   urn_ietf_params_xml_ns_xmpp-bind
   urn_ietf_params_xml_ns_xmpp-e2e
   urn_ietf_params_xml_ns_xmpp-sasl
   urn_ietf_params_xml_ns_xmpp-session
   urn_ietf_params_xml_ns_xmpp-stanzas
   urn_ietf_params_xml_ns_xmpp-streams
   urn_ietf_params_xml_ns_xmpp-tls
   urn_xmpp_archive
   urn_xmpp_attention
   urn_xmpp_avatar
   urn_xmpp_blocking
   urn_xmpp_bob
   urn_xmpp_captcha
   urn_xmpp_delay
   urn_xmpp_features_rosterver
   urn_xmpp_jingle
   urn_xmpp_jingle_apps_rtp
   urn_xmpp_jingle_transports_ibb
   urn_xmpp_jingle_transports_ice-udp
   urn_xmpp_jingle_transports_raw-udp
   urn_xmpp_jingle_transports_s5b
   urn_xmpp_langtrans
   urn_xmpp_media-element
   urn_xmpp_pie
   urn_xmpp_ping
   urn_xmpp_receipts
   urn_xmpp_sec-label
   urn_xmpp_sm
   urn_xmpp_ssn
   urn_xmpp_time
   urn_xmpp_xbosh
   waitinglist
   xdata-layout
   xdata-validate
   xhtml-im
   */
};
function getId() {
  var t = new Date().getTime();
  return 'id-' + t;
}
var session = {
  user: 'fw',
  domain: 'localhost'
};
var jid = session.user + '@' + session.domain;
/**
 * Execute a Disco query
 */
var query = function query(connection, type, to, node) {
  var stanza = $iq({
    type: 'get',
    id: getId(),
    to: to || session.domain,
    from: jid
  });
  var query_attributes = {
    xmlns: 'http://jabber.org/protocol/disco#' + type
  };
  if (node) {
    query_attributes.node = node;
  }
  stanza.c('query', query_attributes);
  connection.send(stanza.tree());
};

var query_info = function () {
  var stanza = $iq({
    type: 'get',
    id: getId(),
    to: session.domain,
    from: jid
  }).c('query', {xmlns: 'http://jabber.org/protocol/disco#info'});
  connection.send(stanza.tree());
};
var query_items = function () {
  var stanza = $iq({
    type: 'get',
    id: getId(),
    to: session.domain,
    from: jid
  }).c('query', {xmlns: 'http://jabber.org/protocol/disco#items'});
  connection.send(stanza.tree());
};

var get_cputime = function(){
  var stanza = $iq({
    type: 'get',
    id: getId(),
    to: session.domain,
    from: jid
  }).c('query', {xmlns: 'ejabberd:cputime'});
  connection.send(stanza.tree());
};

var query_protocal = function (name) {
  var stanza = $iq({
    from: jid,
    to: 'dp@localhost',
    id: connect.getUniqueId(),
    type: 'set'
  }).c('query', {xmlns: 'http://jabber.org/protocal/bytestreams', sid: 'dv917fb4', mode: 'tcp'})
    .c('streamhost', {jid: jid, host: '192.168.8.104', port: ''});
  connection.send(stanza.tree());
};

var get_room_members = function () {
  var stanza = $iq({
    type: 'get',
    from: jid,
    to: session.domain
  }).c('query', {xmlns: 'http://jabber.org/protocol/muc#member-list'});
  connection.send(stanza.tree());
};

var get_commands = function (connection) {
  var stanza = $iq({
    type: 'get',
    to: session.domain,
    from: jid,
    id: getId()
  }).c('query', {xmlns: 'http://jabber.org/protocol/disco#info', node: 'http://jabber.org/protocol/commands'});
  connection.send(stanza.tree());
};

// 获取好友列表
var get_roster = function () {
  var iq = $iq({
    type: 'get',
    id: getId()
  }).c('query', {xmlns: 'jabber:iq:roster'});
  connection.send(iq.tree());
};
// 删除好友
var remove_contact = function (name) {
  var iq = $iq({
    type: 'set',
    id: getId()
  }).c('query', {xmlns: 'jabber:iq:roster'}).c('item', {jid: name + '@' + session.domain, subscription: 'remove'});
  connection.send(iq.tree());
};
// 添加好友
var add_contact = function (name) {
  var iq = $iq({
    type: 'set',
    id: getId()
  }).c('query', {xmlns: 'jabber:iq:roster'}).c('item', {jid: name + '@' + session.domain, name: '名字' + name});
  connection.send(iq.tree());
};
// 更新好友信息
var update_contact1 = function (name) {
  var iq = $iq({
    type: 'set',
    id: getId()
  }).c('query', {xmlns: 'jabber:iq:roster'}).c('item', {jid: name + '@' + session.domain, name: '名字' + name});
  connection.send(iq.tree());
};
// 更新好友分组
var update_contact2 = function (name) {
  var iq = $iq({
    type: 'set',
    id: getId()
  }).c('query', {xmlns: 'jabber:iq:roster'}).c('item', {jid: name + '@' + session.domain, name: '名字' + name}).c('group').t('myFriends');
  connection.send(iq.tree());
};

// 更新联系人信息,如果传递了组,同时更新组信息
var set_contact = function (name, group) {
  var iq = $iq({
    type: 'set',
    id: getId()
  }).c('query', {xmlns: 'jabber:iq:roster'}).c('item', {jid: name + '@' + session.domain, name: '名字' + name});
  if (group !== undefined) {
    iq.c('group').t(group);
  }
  connection.send(iq.tree());
};

var get_version = function () {
  var iq = $iq({
    type: 'get',
//    id: getId(),
    to: session.domain
//    from: session.user + '@' + session.domain
  }).c('query', {xmlns: 'jabber:iq:version'});
  connection.send(iq.tree());
};

var exec_command = function (node, action) {
  var iq = $iq({
    type: 'set',
    id: getId(),
    to: session.domain,
    from: jid
  }).c('command', {xmlns: 'http://jabber.org/protocol/commands', node: node, action: action});
  connection.send(iq.tree());
};

var get_last = function () {
  var iq = $iq({
    type: 'get',
    id: getId()
  }).c('query', {xmlns: 'jabber:iq:last'});
  connection.send(iq.tree());
};

var get_server_command_list = function () {
  var iq = $iq({
    type: 'get',
    from: jid,
    to: session.domain
  }).c('query', {xmlns: 'http://jabber.org/protocol/disco#items', node: 'http://jabber.org/protocol/commands'});
  connection.send(iq.tree());
};

var get_node = function (node) {
  var iq = $iq({
    type: 'get',
    from: jid,
    to: session.domain
  }).c('query', {xmlns: 'http://jabber.org/protocol/disco#items', node: node});
  connection.send(iq.tree());
};

var admin_get_user_statistics = function () {
  var iq = $iq({
    type: 'get',
    id: getId(),
    to: session.domain,
    from: jid
  }).c('command', {xmlns: 'http://jabber.org/protocol/commands', action: 'execute', node: 'http://jabber.org/protocol/admin#user-stats'});
  connection.send(iq.tree());
};

var subscribe = function (type, to) {
  connection.send($pres({type: type, from: jid, to: to, xmlns: 'jabber:client', 'xmlns:stream': 'http://etherx.jabber.org/streams'}).tree());
};


// 在线状态
var online = function () {
  var elementShow = Strophe.xmlElement('show', {}, 'chat');
  var elementStatus = Strophe.xmlElement('status', {}, '我在线,来戳我嘛');
  var presence = $pres({from: jid, xmlns: 'jabber:client', 'xmlns:stream': 'http://etherx.jabber.org/streams', version: '1.0'})
    .cnode(elementShow).up()
    .cnode(elementStatus);
  connection.send(presence.tree());
};
var offline = function () {
  connection.send($pres({from: jid, type: 'unavailable'}).tree());
};
var away = function () {
  var elementShow = Strophe.xmlElement('show', {}, 'away');
  var elementStatus = Strophe.xmlElement('status', {}, 'away');
  var presense = $pres({from: jid})
    .cnode(elementShow).up()
    .cnode(elementStatus);
  connection.send(presense.tree());
};
var xa = function () {
  var elementShow = Strophe.xmlElement('show', {}, 'xa');
  var elementStatus = Strophe.xmlElement('status', {}, '我不在电脑旁了,稍后回来...');
  var presense = $pres({from: jid})
    .cnode(elementShow).up()
    .cnode(elementStatus);
  connection.send(presense.tree());
};
var busy = function () {
  var elementShow = Strophe.xmlElement('show', {}, 'dnd');
  var elementStatus = Strophe.xmlElement('status', {}, 'do not disturb');
  var presense = $pres({from: jid})
    .cnode(elementShow).up()
    .cnode(elementStatus);
  connection.send(presense.tree());
};

var changeOnlineStatus = function (show, status) {
  switch (show) {
    case 'chat':
      online();
      break;
    case 'away':
      away();
      break;
    case 'xa':
      xa();
      break;
    case 'dnd':
      busy();
      break;
  }
}
/*
 <!--对方正在键入-->
 <message from="hezhiqiang@xmpp.hezhiqiang.info/hezhiqiang-2"
 to="root@xmpp.hezhiqiang.info" type="chat" id="purple8185477c" xmlns="jabber:client" xmlns:stream="http://etherx.jabber.org/streams"
 version="1.0">
 <composing xmlns="http://jabber.org/protocol/chatstates"/>
 </message>
 <!--暂停键入-->
 <message from="hezhiqiang@xmpp.hezhiqiang.info/hezhiqiang-2"
 to="root@xmpp.hezhiqiang.info" type="chat" id="purple81854775" xmlns="jabber:client" xmlns:stream="http://etherx.jabber.org/streams"
 version="1.0">
 <paused xmlns="http://jabber.org/protocol/chatstates"/>
 </message>
 */

var CHAT_STATUS = {
  ACTIVE: 'active',
  COMPOSING: 'composing',
  GONE: 'gone',
  INACTIVE: 'inactive',
  PAUSED: 'paused'
};
var Chat = {
  changeStatus: function (status) {
    var msg = $msg({from: jid, to: 'fw@localhost', type: 'chat', xmlns: 'jabber:client', 'xmlns:stream': 'http://etherx.jabber.org/streams', version: '1.0'})
      .c(status, {xmlns: 'http://jabber.org/protocol/chatstates'});
    connection.send(msg.tree());
  }
};