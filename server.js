'use strict';

var express = require('express');

var app = express();

app.use('/', function (req, res) {
	var monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
	var url=req.url;
	url=url.slice(1,url.length);
	
	if(url=="")return;
	
	if(isNaN(url)==true){
		
		
		var split=url.split("%");
		
		if(split.length>0){
		split[1]=split[1].slice(0,-1);
		if(monthNames.indexOf(split[0])<0){
			var finalObj={
			"unix":null,
			"natural":null
		};
		console.log(finalObj);
		res.send(finalObj);
		return;
		}
		var month = monthNames.indexOf(split[0]);
		month+=1;
		month=parseInt(month,10);
		
		split[1]=split[1].slice(2,split[1].length);
		var day=parseInt(split[1],10);
		split[2]=split[2].slice(2,split[2].length);
		var year=parseInt(split[2],10);
		
		if(isNaN(day) || isNaN(month) || isNaN(year)){
			var finalObj={
			"unix":null,
			"natural":null
		};
		console.log(finalObj);
		res.send(finalObj);
		return;
		}
		
		var timeStamp=new Date(month+"/"+day+"/"+year);
		timeStamp=Math.round(timeStamp.getTime()/1000);
		
		var finalObj={
			"unix":timeStamp,
			"natural":split[0]+" "+split[1]+", "+split[2]
		};
		
		console.log(finalObj);
		res.send(finalObj);
		}
			
		}
		
	else{
	var monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];	
	var date = new Date(url*1000);
	
	var month=monthNames[date.getMonth()];
	
	var day=date.getDate();
	
	var year=date.getFullYear();
	
	var stringDate=month+" "+day+", "+year;
	
	var finalObj={
		
		"unix":url,
		"natural":stringDate
	};
	
	res.send(finalObj);
	
	};
	
	
	
	
    
});

app.listen(8080, function () {
    console.log('Listening on port 8080...');
});