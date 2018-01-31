function main(){
	var robotics =document.getElementById("robotics").checked;
    var weather=document.getElementById("weather").checked;
    var inputString = document.getElementById("textbox").value;
    if(inputString == "")
    {
	document.getElementById("alert").style.display="block";
    }

     if(robotics){
		     	if(inputString == "")
		    	{
		    	document.getElementById("alert").style.display="block";
		    	document.getElementById("output").style.display="none";
		    	}
			    else
			    {
				 appRobo();
				 document.getElementById("myTable").style.display="none";
				 document.getElementById("output").style.display="block";
				 document.getElementById("demo").style.display="block";
				 document.getElementById("alert").style.display="none";
				 document.getElementById("textbox").value="";
			    }
	}
    else if(weather)
    {
		    	if(inputString == "")
		    	{
		    	document.getElementById("alert").style.display="block";
		    	document.getElementById("output").style.display="none";
		    	}
			    else
			    {
				appWeather();
				document.getElementById("textbox").value="";
				document.getElementById("demo").style.display="none";
				document.getElementById("myTable").style.display="block";
				
				document.getElementById("alert").style.display="none";
			    }
	}
   
   
}


function appRobo(){
	 var robo = "https://robohash.org/";
	 var string = document.getElementById("textbox").value;
	 var urlRequest = robo+string
	 $.ajax({
	    method: "GET",
	    url: urlRequest,
	    success: function(){
	  	var img = new Image();
	    img.src= urlRequest;
	  	document.getElementById("output").style.display = "block";
	  	document.getElementById("demo").src= img.src;
	    }
    });
}

function appWeather(){

	var urlWea = "https://www.metaweather.com/api/location/search/?query=";
	var input = $("#textbox").val();
	 $.ajax({
	 	url: urlWea+input,
	    method: 'GET',
	    dataType: 'json',
	    success:function(data){
	   	weatherInfo(data[0].woeid);
	    }
	});
}

function weatherInfo(id)
{
	var weaUrl = "https://www.metaweather.com/api/location/" + id;
	$.ajax({
	 	url: weaUrl,
	    method: 'GET',
	    dataType: 'json',
	    success:function(data){
	    	var weatherShowers = data.consolidated_weather;
	    	document.getElementById("output").style.display = "block"
	    	$("#myTable").find('p').empty()
	    	$("#myTable").prepend("<p>" + data["title"]  + " Weather" + "</p>")
	     	
	     	$("#myTable").find('tbody').empty()
	    	for(var i=0; i<weatherShowers.length; i++)
	    	{
	    		$("#myTable").append("<tr><td>" + weatherShowers[i].applicable_date+ "</td><td>" + weatherShowers[i].max_temp.toFixed()+
	    		 "</td><td>" + weatherShowers[i].min_temp.toFixed()+ "</td><td>" + weatherShowers[i].weather_state_name+ "</td></tr>")
	    		
	    	}     
	    }
	});

}


