
var $path_base = "..";
var scripts = [ null, "../assets/js/date-time/bootstrap-datepicker.js",
	"../assets/js/jqGrid/jquery.jqGrid.js",
	"../assets/js/jqGrid/i18n/grid.locale-en.js", null ];

$('.page-content-area').ace_ajax('loadScripts', scripts, function() {
});

jQuery(function($) {
	var grid_selector = "#grid-table";
	var pager_selector = "#grid-pager";
	var dgSearchList;
	var parent_column = $(grid_selector).closest('[class*="col-"]');
	// resize to fit page size
	$(window).on('resize.jqGrid', function() {
		$(grid_selector).jqGrid('setGridWidth', parent_column.width());
	});

	var dgSearchList = jQuery(grid_selector)
		.jqGrid(
			{
				subGrid : false,
				// datatype: "local",

				// url: 'http://localhost:8081/chelenet.admin-vc/',
				url : getUrl('order/queryOrderList.do'),
				type : 'post',
				datatype : "json",
				height : 250,
				// data: grid_data,
				colNames : [ '订单编号', '订单创建时间', '订单金额','订单状态','出单信息','支付状态','操作' ],
				colModel : [ {
					"display" : "订单编号",
					"width" : 42,
					"align" : "center",
					"sortable" : false,
					"name" : "NUM_ORDERID",
					editable : true,
					sorttype : "date",
					unformat : "pickDate",
					hidden : true
				},  {
					"display" : "订单创建时间",
					"width" : 50,
					"align" : "center",
					"sorttype" : "date",
					"name" : "DAT_CREATETIME",
					editable : true,
					sorttype : "date",
					unformat : "pickDate",
					formatter : function(v) {
						return dateTimeToString(new Date(v))
					}
				}, {
					"display" : "订单金额",
					"width" : 42,
					"align" : "center",
					"sorttype" : "date",
					"name" : "VC2_LASTYEAR_FORCEDATE",
					editable : true,
					sorttype : "date",
					unformat : "pickDate",
					formatter : function(v) {
						return 100;
					}
				}, {
					"display" : "订单状态",
					"width" : 42,
					"align" : "center",
					"sorttype" : "date",
					"name" : "VC2_LASTYEAR_BUSINESSDATE",
					editable : true,
					sorttype : "date",
					unformat : "pickDate",
					formatter : function(v) {
						return "已邮寄";
					}
				},
					{
						"display" : "出单信息",
						"width" : 32,
						"align" : "left",
						"sortable" : true,
						"name" : "GUIDENAME",
						editable : true,
						sorttype : "date",
						unformat : "pickDate",
						formatter : function(v) {
							return "已出单";
						}
					},
					{
						"display" : "支付状态",
						"width" : 32,
						"align" : "left",
						"sortable" : true,
						"name" : "NUM_ORDERSTATUS",
						editable : true,
						sorttype : "date",
						formatter : function(cellvalue, options, rowObject) {
							//VC2_COMPANYNAME
							var strFormat="";
							if(cellvalue==0){
								strFormat+="未支付<br/>";
							}else{
								strFormat+="已支付<br/>";
							}
							return strFormat;
						}
					},
					{
						"display" : "操作",
						"width" : 33,
						"align" : "center",
						"sortable" : false,
						"name" : "OPERATIONIDENTIFIER",
						editable : true
					}
				],
				jsonReader : {
					root : "rows",
					page : "current",
					total : "totalPage", // 很重要 定义了 后台分页参数的名字。
					records : "count",
					repeatitems : false,
					id : "id"
				},
				viewrecords : true,
				rowNum : 10, // 必须10条如改条需改jquery.jqGrid.js中2539行
				rowList : [ 10, 20, 30, 40, 50, 60, 70, 80, 90 ],
				pager : pager_selector,
				altRows : true,
				loadMsg : '数据加载中',
				singleSelect : true,// 设置为单选行
				selectOnCheck : true,// 允许单行点击CheckBox取消选择(设置此属性为false，不能获得选择行信息)
				checkOnSelect : false,// 允许行选择复选框
				collapsible : true,
				sortName : "numOrderId",
				sortOrder : "desc",
				idField : 'numOrderId',
				border : false,// 是否显示边框
				fitColumns : false,
				showFooter : true,// 显示底部信息
				fit : true,
				rownumbers : true,// 行号
				remoteSort : true,// 设置为true会访问远程数据
				// toppager: true,

				multiselect : false,
				// multikey: "ctrlKey",
				multiboxonly : false,

				loadComplete : function(data) {
					var ids = jQuery("#grid-table")
						.jqGrid('getDataIDs');
					for (var i = 0; i < ids.length; i++) {
						var id = ids[i];
						var model = jQuery("#grid-table").jqGrid(
							'getRowData', id);
						var orderId = model.NUM_ORDERID;
						;
						var editBtn = '<a href="?orderId='+orderId+'#page/order/orderInfo">详情</a>&nbsp';


						jQuery("#grid-table").jqGrid('setRowData',
							ids[i], {
								OPERATIONIDENTIFIER : editBtn
							});
					}
					if (data.length == 0) {
						var str = '<tr><td width="100%" style="text-align:center;font-size:20px;color:red;">暂无数据</td></tr>';
						$('#grid-table tbody').html(str);
					}
					var table = this;
					setTimeout(function() {
						// styleCheckbox(table);trigger

						updateActionIcons(table);
						updatePagerIcons(table);
						enableTooltips(table);
					}, 0);
					/*
					 * if(data.records==0){ //如果没有记录返回，追加提示信息，删除按钮不可用
					 * alert('sdfsd');
					 * $("p").appendTo($("#list")).addClass("nodata").html('找不到相关数据！');
					 * $("#del_btn").attr("disabled",true); }else{
					 * //否则，删除提示，删除按钮可用 $("p.nodata").remove();
					 * $("#del_btn").removeAttr("disabled"); }
					 */
				},

				editurl : "",// nothing is saved
				caption : "待处理订单列表"

				// ,autowidth: true,

				/**
				 * , grouping:true, groupingView : { groupField : ['name'],
					 * groupDataSorted : true, plusicon : 'fa fa-chevron-down
					 * bigger-110', minusicon : 'fa fa-chevron-up bigger-110' },
				 * caption: "Grouping"
				 */

			});




	// 时间转换
	function dateToString(date) {
		var y = date.getFullYear();
		var m = date.getMonth() + 1;
		var d = date.getDate();
		return y + '-' + (m < 10 ? ('0' + m) : m) + '-'
			+ (d < 10 ? ('0' + d) : d);
	}
	;
	function dateTimeToString(date) {
		var y = date.getFullYear();
		var m = date.getMonth() + 1;
		var d = date.getDate();
		var h = date.getHours();
		var mi = date.getMinutes();
		var s = date.getSeconds();
		return y + '-' + (m < 10 ? ('0' + m) : m) + '-'
			+ (d < 10 ? ('0' + d) : d) + ' ' + (h < 10 ? ('0' + h) : h)
			+ ':' + (mi < 10 ? ('0' + mi) : mi) + ':'
			+ (s < 10 ? ('0' + s) : s);
	}
	;
	function StringToDate(DateStr) {
		var converted = Date.parse(DateStr);
		var myDate = new Date(converted);
		if (isNaN(myDate)) {
			var arys = DateStr.split('-');
			myDate = new Date(arys[0], --arys[1], arys[2]);
		}
		return dateToString(myDate);
	}
	// 搜索查询
	// $(function(){
	$("#find_btn").click(function() {


		var datordercreatetimebegin = $("#datordercreatetimebegin").val();
		var datordercreatetimeend = $("#datordercreatetimeend").val();
		var numorderstatus = $("#numorderstatus").val();
		$("#grid-table").jqGrid('setGridParam', {
			// url:"http://localhost:8081/chelenet.admin-vc/",
			url : getUrl('order/queryOrderList.do'),
			contentType : 'application/json;charset=utf-8',
			postData : eval({

				datordercreatetimebegin:datordercreatetimebegin,
				datordercreatetimeend:datordercreatetimeend,
				numorderstatus:numorderstatus

			})
			// 发送数据

		}).trigger("reloadGrid"); // 重新载入
	});
	// });

	$(window).triggerHandler('resize.jqGrid');// trigger window resize to make
	// the grid get the correct size

	// enable search/filter toolbar
	// jQuery(grid_selector).jqGrid('filterToolbar',{defaultSearch:true,stringResult:true})
	// jQuery(grid_selector).filterToolbar({});

	// switch element when editing inline
	function aceSwitch(cellvalue, options, cell) {
		setTimeout(function() {
			$(cell).find('input[type=checkbox]').addClass(
				'ace ace-switch ace-switch-5').after(
				'<span class="lbl"></span>');
		}, 0);
	}
	// enable datepicker
	function pickDate(cellvalue, options, cell) {
		setTimeout(function() {
			$(cell).find('input[type=text]').datepicker({
				format : 'yyyy-mm-dd',
				autoclose : true
			});
		}, 0);
	}

	function style_edit_form(form) {
		// enable datepicker on "sdate" field and switches for "stock" field
		form.find('input[name=sdate]').datepicker({
			format : 'yyyy-mm-dd',
			autoclose : true
		})

		form.find('input[name=stock]').addClass('ace ace-switch ace-switch-5')
			.after('<span class="lbl"></span>');
		// don't wrap inside a label element, the checkbox value won't be
		// submitted (POST'ed)
		// .addClass('ace ace-switch ace-switch-5').wrap('<label class="inline"
		// />').after('<span class="lbl"></span>');

		// update buttons classes
		var buttons = form.next().find('.EditButton .fm-button');
		buttons.addClass('btn btn-sm').find('[class*="-icon"]').hide();// ui-icon,
		// s-icon
		buttons.eq(0).addClass('btn-primary').prepend(
			'<i class="ace-icon fa fa-check"></i>');
		buttons.eq(1).prepend('<i class="ace-icon fa fa-times"></i>')

		buttons = form.next().find('.navButton a');
		buttons.find('.ui-icon').hide();
		buttons.eq(0).append('<i class="ace-icon fa fa-chevron-left"></i>');
		buttons.eq(1).append('<i class="ace-icon fa fa-chevron-right"></i>');
	}

	function style_delete_form(form) {
		var buttons = form.next().find('.EditButton .fm-button');
		buttons.addClass('btn btn-sm btn-white btn-round').find(
			'[class*="-icon"]').hide();// ui-icon, s-icon
		buttons.eq(0).addClass('btn-danger').prepend(
			'<i class="ace-icon fa fa-trash-o"></i>');
		buttons.eq(1).addClass('btn-default').prepend(
			'<i class="ace-icon fa fa-times"></i>')
	}

	function style_search_filters(form) {
		form.find('.delete-rule').val('X');
		form.find('.add-rule').addClass('btn btn-xs btn-primary');
		form.find('.add-group').addClass('btn btn-xs btn-success');
		form.find('.delete-group').addClass('btn btn-xs btn-danger');
	}
	function style_search_form(form) {
		var dialog = form.closest('.ui-jqdialog');
		var buttons = dialog.find('.EditTable')
		buttons.find('.EditButton a[id*="_reset"]').addClass(
			'btn btn-sm btn-info').find('.ui-icon').attr('class',
			'ace-icon fa fa-retweet');
		buttons.find('.EditButton a[id*="_query"]').addClass(
			'btn btn-sm btn-inverse').find('.ui-icon').attr('class',
			'ace-icon fa fa-comment-o');
		buttons.find('.EditButton a[id*="_search"]').addClass(
			'btn btn-sm btn-purple').find('.ui-icon').attr('class',
			'ace-icon fa fa-search');
	}

	function beforeDeleteCallback(e) {
		var form = $(e[0]);
		if (form.data('styled'))
			return false;

		form.closest('.ui-jqdialog').find('.ui-jqdialog-titlebar').wrapInner(
			'<div class="widget-header" />')
		style_delete_form(form);

		form.data('styled', true);
	}

	function beforeEditCallback(e) {
		var form = $(e[0]);
		form.closest('.ui-jqdialog').find('.ui-jqdialog-titlebar').wrapInner(
			'<div class="widget-header" />')
		style_edit_form(form);
	}

	// it causes some flicker when reloading or navigating grid
	// it may be possible to have some custom formatter to do this as the grid
	// is being created to prevent this
	// or go back to default browser checkbox styles for the grid
	/*
	 * function styleCheckbox(table) {
	 *//**
	 * $(table).find('input:checkbox').addClass('ace') .wrap('<label />')
	 * .after('<span class="lbl align-top" />')
	 *
	 *
	 * $('.ui-jqgrid-labels th[id*="_cb"]:first-child')
	 * .find('input.cbox[type=checkbox]').addClass('ace') .wrap('<label
	 * />').after('<span class="lbl align-top" />');
	 */
	/*
	 * }
	 */
	function updateActionIcons(table) {

		var replacement = {
			'ui-ace-icon fa fa-pencil' : 'ace-icon fa fa-pencil blue',
			'ui-ace-icon fa fa-trash-o' : 'ace-icon fa fa-trash-o red',
			'ui-icon-disk' : 'ace-icon fa fa-check green',
			'ui-icon-cancel' : 'ace-icon fa fa-times red'
		};
		$(table).find('.ui-pg-div span.ui-icon').each(function() {
			var icon = $(this);
			var $class = $.trim(icon.attr('class').replace('ui-icon', ''));
			if ($class in replacement)
				icon.attr('class', 'ui-icon ' + replacement[$class]);
		})
	}

	// replace icons with FontAwesome icons like above
	function updatePagerIcons(table) {
		var replacement = {
			'ui-icon-seek-first' : 'ace-icon fa fa-angle-double-left bigger-140',
			'ui-icon-seek-prev' : 'ace-icon fa fa-angle-left bigger-140',
			'ui-icon-seek-next' : 'ace-icon fa fa-angle-right bigger-140',
			'ui-icon-seek-end' : 'ace-icon fa fa-angle-double-right bigger-140'
		};
		$('.ui-pg-table:not(.navtable) > tbody > tr > .ui-pg-button > .ui-icon')
			.each(
				function() {
					var icon = $(this);
					var $class = $.trim(icon.attr('class').replace(
						'ui-icon', ''));

					if ($class in replacement)
						icon.attr('class', 'ui-icon '
							+ replacement[$class]);
				})
	}

	function enableTooltips(table) {
		$('.navtable .ui-pg-button').tooltip({
			container : 'body'
		});
		$(table).find('.ui-pg-div').tooltip({
			container : 'body'
		});
	}

	// var selr = jQuery(grid_selector).jqGrid('getGridParam','selrow');

	$(document).one('ajaxloadstart.page', function(e) {
		$.jgrid.gridDestroy(grid_selector);
		$('.ui-jqdialog').remove();
	});

	$('.pop h3.poptit a').click(function() {
		$('.pop').hide();
	});
	$('.closePop').click(function() {
		$('.pop').hide();
	});
	$('#postMethod').change(function(){
		//$("#postMethod option:selected").text();
		var postMethod = $("#postMethod").val();
		if(postMethod==1){
			$(".selfPick").hide();
			$(".expressDiv").show();
		}else{
			$(".selfPick").show();
			$(".expressDiv").hide();
		}

	});


	$("#updateOrderOneSubmit").click(function(){
		var orderId = $("#orderId").val();
		var VC2_UNDERWRITINGMSG = $("#VC2_UNDERWRITINGMSG").val();
		var NUM_UNDERWRITINGSTATUS = "2";
		var updateOrderNUM = "1";
		var params = "?orderId="+orderId+"&NUM_UNDERWRITINGSTATUS="+NUM_UNDERWRITINGSTATUS+"&VC2_UNDERWRITINGMSG="+VC2_UNDERWRITINGMSG+"&updateOrderNUM="+updateOrderNUM;
		//window.location.href=getUrl('order/updateOrder.do'+params);
		$.ajax({
			url: getUrl('order/updateOrderCon.do'+params),
			async: false,
			type: "get",
			dataType: "json",
			contentType: "application/json",
			data: {},
			success: function (data) {
				$('.pop').hide();
				if(data.success){
					if(data.body=='1'){
						alert("操作成功！");
						$("#grid-table").trigger("reloadGrid");
					}
				}
				console.log(JSON.stringify(data));
			},
			error: function () {
				$('.pop').hide();
				alert("订单更新失败");
			}
		});
	});
	$("#updateOrderOneClose").click(function(){
		var orderId = $("#orderId").val();
		var VC2_UNDERWRITINGMSG = $("#VC2_UNDERWRITINGMSG").val();
		var NUM_UNDERWRITINGSTATUS = "3";
		var updateOrderNUM = "1";
		var params = "?orderId="+orderId+"&NUM_UNDERWRITINGSTATUS="+NUM_UNDERWRITINGSTATUS+"&VC2_UNDERWRITINGMSG="+VC2_UNDERWRITINGMSG+"&updateOrderNUM="+updateOrderNUM;
		//window.location.href=getUrl('order/updateOrder.do'+params);
		$.ajax({
			url: getUrl('order/updateOrderCon.do'+params),
			async: false,
			type: "get",
			dataType: "json",
			contentType: "application/json",
			data: {},
			success: function (data) {
				$('.pop').hide();
				if(data.success){
					if(data.body=='1'){
						alert("操作成功！");
						$("#grid-table").trigger("reloadGrid");
					}
				}
				console.log(JSON.stringify(data));
			},
			error: function () {
				$('.pop').hide();
				alert("订单更新失败");
			}
		});
	});

	$("#updateOrderTwoSubmit").click(function(){
		var orderId = $("#orderId").val();
		var paymentAmount = $("input[name='paymentAmount']:checked").val();
		var numPayType = $("#numPayType").val();
		var updateOrderNUM = "2";
		var params = "?orderId="+orderId+"&paymentAmount="+paymentAmount+"&numPayType="+numPayType+"&updateOrderNUM="+updateOrderNUM;
		//window.location.href=getUrl('order/updateOrder.do'+params);
		$.ajax({
			url: getUrl('order/updateOrderCon.do'+params),
			async: false,
			type: "get",
			dataType: "json",
			contentType: "application/json",
			data: {},
			success: function (data) {
				$('.pop').hide();
				if(data.success){
					if(data.body=='1'){
						alert("操作成功！");
						$("#grid-table").trigger("reloadGrid");
					}
				}
				console.log(JSON.stringify(data));
			},
			error: function () {
				$('.pop').hide();
				alert("订单更新失败");
			}
		});
	});
	//updateOrderThreeSubmit
	$("#updateOrderThreeSubmit").click(function(){
		var orderId = $("#orderId").val();
		var updateOrderNUM = "3";
		var VC2_FORCE_NO = $("#VC2_FORCE_NO").val();
		var VC2_BIZ_NO = $("#VC2_BIZ_NO").val();
		var VC2_INVOICE_INFO = $("#VC2_INVOICE_INFO").val();
		var NUM_INVOICE_NO = $("#NUM_INVOICE_NO").val();
		var params = "?orderId="+orderId+"&updateOrderNUM="+updateOrderNUM+"&VC2_FORCE_NO="+VC2_FORCE_NO+"&VC2_BIZ_NO="+VC2_BIZ_NO+"&VC2_INVOICE_INFO="+VC2_INVOICE_INFO+"&NUM_INVOICE_NO="+NUM_INVOICE_NO;
		//window.location.href=getUrl('order/updateOrder.do'+params);
		$.ajax({
			url: getUrl('order/updateOrderCon.do'+params),
			async: false,
			type: "get",
			dataType: "json",
			contentType: "application/json",
			data: {},
			success: function (data) {
				$('.pop').hide();
				if(data.success){
					if(data.body=='1'){
						alert("操作成功！");
						$("#grid-table").trigger("reloadGrid");
					}
				}
				console.log(JSON.stringify(data));
			},
			error: function () {
				$('.pop').hide();
				alert("订单更新失败");
			}
		});
	});
	$("#updateOrderFourSubmit").click(function(){
		var orderId = $("#orderId").val();
		var updateOrderNUM = "4";


		var postMethod = $("#postMethod").val();
		var param = "";
		if(postMethod==1){
			var VC2_ADDRESS = $("#VC2_ADDRESS").val();
			var VC2_PHONE = $("#VC2_PHONE").val();
			var VC2_TRACKING_NO = $("#VC2_TRACKING_NO").val();
			param += "&VC2_ADDRESS="+VC2_ADDRESS + "&VC2_PHONE="+VC2_PHONE + "&VC2_TRACKING_NO="+VC2_TRACKING_NO

		}else{
			var VC2_ADDRESSSelf = $("#VC2_ADDRESSSelf option:selected").text();
			param += "&VC2_ADDRESS="+VC2_ADDRESSSelf
		}

		var params = "?orderId="+orderId+"&updateOrderNUM="+updateOrderNUM+param;
		//window.location.href=getUrl('order/updateOrder.do'+params);
		$.ajax({
			url: getUrl('order/updateOrderCon.do'+params),
			async: false,
			type: "get",
			dataType: "json",
			contentType: "application/json",
			data: {},
			success: function (data) {
				$('.pop').hide();
				if(data.success){
					if(data.body=='1'){
						alert("操作成功！");
						$("#grid-table").trigger("reloadGrid");
					}
				}
				console.log(JSON.stringify(data));
			},
			error: function () {
				$('.pop').hide();
				alert("订单更新失败");
			}
		});
	});
});
function updateOrderOne(orderId,VC2_COMPANYNAME,NUM_UNDERWRITINGSTATUS) {
	$("#orderId").val(orderId);
	$("#VC2_COMPANYNAMELabel").html(VC2_COMPANYNAME);
	$("#NUM_UNDERWRITINGSTATUSLabel").html("核保中");
	$('.updateOrderOne').show();
}
function updateOrderTwo(orderId) {
	$("#orderId").val(orderId);
	$('.updateOrderTwo').show();
}
function updateOrderThree(orderId,VC2_INVOICE_INFO) {
	$("#orderId").val(orderId);
	$("#VC2_INVOICE_INFO").val(VC2_INVOICE_INFO);
	$('.updateOrderThree').show();
}
function updateOrderFour(orderId,VC2_ADDRESS,VC2_PHONE) {
	$("#orderId").val(orderId);
	if(VC2_ADDRESS&&VC2_ADDRESS.length<=8){
		$("#postMethod").val(2);
		$("#postMethod option[text="+VC2_ADDRESS+"]").attr("selected", true);
	}else{
		$("#postMethod").val(1);
		$("#VC2_ADDRESS").val(VC2_ADDRESS);
		$("#VC2_PHONE").val(VC2_PHONE);
	}
	$('.updateOrderFour').show();
}
function orderDetail() {
	alert("尚未开发！！！");
}



$('.select2').css('width', '200px').select2({
	allowClear : true
})
$('#select2-multiple-style .btn').on('click', function(e) {
	var target = $(this).find('input[type=radio]');
	var which = parseInt(target.val());
	if (which == 2)
		$('.select2').addClass('tag-input-style');
	else
		$('.select2').removeClass('tag-input-style');
});
//创建日期
$('.input-daterange').datepicker({
	autoclose : true
});
