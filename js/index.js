var nbx=0;
var alive=true;
var stats={
	"nbx":{
		"value": 0,
		"id": "#nbx_count_value"
	},
	"hunger":{
		"value": 0.5,
		"time": 1000,
		"id": "#hunger_value"
	},
	"tendies":{
		"value": 2,
		"id": "#tendies_stuff_count"
	}
}
var prices={
	"tendies": 1
}
var stuff={
	"tendies": 0
};

function changeStat(stat_name, change){
	if(alive && stats[stat_name]["value"] + change >= 0){
		console.log("changing "+stat_name+" by "+change.toString());
		stats[stat_name]["value"] += change;
		$(stats[stat_name]["id"]).html(stats[stat_name]["value"].toString());
		return true;
	}else{
		return false;
	}
}

function eat(){
	var timeout = stats["hunger"]["time"];
	alive=changeStat("tendies", -stats["hunger"]["value"]);
	if(alive){
		setTimeout(eat, stats["hunger"]["time"]);
	}else{
		$("#me_status").html("YOU ARE DEAD");
		$("#me_status").css({"color":"red"});
	}
}

$(function(){
	setTimeout(eat, stats["hunger"]["time"]);
	$("#click_coin").click(function(){changeStat("nbx", 1);});

	$("input[type='button'].buy").click(function(event){
		var button = event.target;
		var form = $(button).parent();
		var item_name = $(form).children("[name='item_name']").val();

		if(changeStat("nbx", -prices[item_name])){
			changeStat(item_name, 1);
			stuff[item_name]++;
		}else{
			console.log("Warning: not enough NeetBux for that purchase");
		}
	});
})