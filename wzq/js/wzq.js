var wzq_show = function(){
	var flag = 0;
	var $wzq = $('.wzq');
	function init(row,col){
		for(var i=0;i<row;i++){
			var $row = $wzq.append("<div class='row'></div>").find('.row').last();
			for(var j=0;j<col;j++){
				buildBlock($row,i,j);
			}
		}
		var $table = $wzq.append("<table></table>").find("table");
		for(var i=0;i<row-1;i++){
			var $row = $table.append("<tr></tr>").find('tr').last();
			for(var j=0;j<col-1;j++){
				$row.append("<td><div></div></td>");
			}
		}
	}
	function buildBlock($row,i,j){
		var $block = $row.append("<div class='block' id='wzq_"+i+"_"+j+"'></div>").find(".block");
		$block.click(function(){
			if($(this).hasClass("black")||$(this).hasClass("white")) return ;
			$(this).unbind( "click" );
			flag = 1-flag;
			$(this).removeClass("block");
			$(this).removeClass("black");
			$(this).removeClass("white");
			if(flag){
				$(this).addClass("black");
			}else{
				$(this).addClass("white");
			}
		});
	}
	function setBlack(i,j){
		$("#wzq_"+i+"_"+j).removeClass("block").removeClass("black").removeClass("white").addClass("black");
	}
	function setWhite(i,j){
		$("#wzq_"+i+"_"+j).removeClass("block").removeClass("black").removeClass("white").addClass("white");
	}
	function setNone(i,j){
		$("#wzq_"+i+"_"+j).removeClass("block").removeClass("black").removeClass("white").addClass("block");
	}
	function get(i,j){
		var $block = $("#"+i+"_"+j);
		if($block.hasClass("block")) return 0;
		if($block.hasClass("black")) return 1;
		if($block.hasClass("white")) return 2;
	}
	return {
		init:init,
		setBlack:setBlack,
		setWhite:setWhite,
		setNone:setNone,
		get:get
	};
}();

wzq_show.init(15,15);