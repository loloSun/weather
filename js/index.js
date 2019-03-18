	$(function(){
		for(var i = 0;i < provinceList.length;i++){
			var Option = $("<option value=''></option>");
			Option.html(provinceList[i].name).appendTo($('#sheng'))
		}
		// change() 失去焦点并且内容发生改变时，触发的
		$('#sheng').change(function(){
			$('#city').children().not(':first').remove();
			$('#qu').children().not(':first').remove();
			var num = $('#sheng>option:selected').index()-1;
			for(var i = 0;i < provinceList[num].cityList.length;i++){
				var Option = $("<option value=''></option>");
				Option.html(provinceList[num].cityList[i].name).appendTo($('#city'))
			} 
		})
		$('#city').change(function(){
			// $('#qu').html('')
			$('#qu').children().not(':first').remove();
			var num = $('#sheng>option:selected').index()-1;
			var num1 = $('#city>option:selected').index()-1;
			for(var i = 0;i < provinceList[num].cityList[num1].areaList.length;i++){
				var Option = $("<option value=''></option>");
				Option.html(provinceList[num].cityList[num1].areaList[i]).appendTo($('#qu'))
			}
			$('.ipt-btn').on('click',function(){
				$('.p-btn,.location').css({display:'block'});
				obj.Weather($('#qu option:selected').html())
				$('.ipt').css({display:'none'});
			})

		})
		
	})
$('.btn').on('click',function(){
	$('.p-btn,.location').css({display:'none'});
	$('.ipt').css({display:'block'})
})

var latitude=40.1348;
var longitude=116.0932;
var city
var obj={
	Position:function(latitude,longitude){
		var _this=this;
		var url = "http://api.map.baidu.com/geocoder/v2/?ak=lOXhCHjbYceKzTAVdLVApbcYQdlVq7DB&location=" + latitude + "," + longitude+"&output=json";  
		$.ajax({
			type:"get",
			url:url,
			async:true,
			dataType:"JSONP",
			success:function(res){
				var provice=res.result.formatted_address;
				var city=res.result.addressComponent.district;
				$(".location").html(city);
				_this.Weather(city);
				
			}
		})
	},

	Weather:function(city){
		$(".location").html(city);
		var city=city.slice(0,-1);
		console.log(city)
		$.ajax({
			type:"get",
			url:"http://wthrcdn.etouch.cn/weather_mini?city="+city,
			async:true,
			dataType:"JSON",
			success:function(res){
				console.log(res)
				$('.date').html(res.data.forecast[0].date.slice(0,-3) + ' ' + res.data.forecast[0].date.slice(-3));
				$('.now').html(res.data.wendu + '℃')
				$('.feng').html(res.data.forecast[0].fengxiang + ' ' + res.data.forecast[0].fengli.slice(-5,-3))
				$('.tishi').html(res.data.ganmao)
				$('.wendu').html(res.data.forecast[0].type + '</br>' + res.data.forecast[0].low.slice(-3,-1) + ' ~ ' + res.data.forecast[0].high.slice(-3))
				
				for(var i in res.data.forecast){
					if(i!=0){
						var Day = res.data.forecast[i].date;
						var fengli = res.data.forecast[i].fengli.slice(-5,-3);
						var fengxiang = res.data.forecast[i].fengxiang;
						var tianqi = res.data.forecast[i].type;
						var High = res.data.forecast[i].high.slice(-3);
						var Low = res.data.forecast[i].low.slice(-3,-1);
						$('.rightbox li').eq(i-1).children().eq(0).html('4月' + Day.slice(0,-3) + ' ' + Day.slice(-3))
						$('.rightbox li').eq(i-1).children().eq(1).children().attr('src','img/' + tianqi + '.png');
						$('.rightbox li').eq(i-1).children().eq(2).html(tianqi + '</br>' + Low + ' ~ ' + High)
						$('.rightbox li').eq(i-1).children().eq(3).html(fengxiang + ' ' + fengli)
					}	
				}		
			}
		})
	}
}
obj.Position(latitude,longitude);

		
		
		