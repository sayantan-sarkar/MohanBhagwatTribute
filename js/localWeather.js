var url = 'https://fcc-weather-api.glitch.me/api/current';
var tempC = 0;
var windKmph = '0';

$(document).ready(function() {
	if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(function(position){
      $.ajax({dataType: "json", url: url+"?lat="+position.coords.latitude+"&lon="+position.coords.longitude, success : function(json) {
          $('.location').html(getLocationHtml(json));
          getWindHtml(json);
          changeBackground(json);
        }});
    });
  }else{
    $(".location").html("<h1>Cannot Access Location Data</h1>");
    $(".wind").html("<h1>Cannot Access Wind Data</h1>");
  }

  $('#tempUnit').click(function(){
    var tempF = 0;
    if($('#tempUnit').text() == 'C'){
      $('#tempUnit').text('F');
      tempF = Math.round((tempC*(9/5))+32);
      $('#temp').text(tempF.toString());
    }else{
      $('#tempUnit').text('C');
      $('#temp').text(tempC.toString());
    }
  });
});



function changeBackground(json){
  var climate =  json.weather[0].main.toLowerCase();
  var fontColor;
  $('body').css('background-image', "url(images/"+climate+".jpg");
  switch(climate){
    case 'rain': fontColor = '#ffffff';
      break;
    case 'thunderstorm': fontColor = '#ffffff';
      break;
    case 'clouds': fontColor = '#ffffff';
      break;
    case 'drizzle': fontColor = '#595959';
      break;
    case 'clear': fontColor = '#ffffff';
      break;
    case 'snow': fontColor = '#000000';
      break;
    default: fontColor = '#000000';
  }

  $('body').css('color', fontColor);

}


function getLocationHtml(loc){
  var html="<div class='row'>";
  html+="<div class='col-xs-12 col-sm-12 col-md-12 col-lg-12'><h3 class='text-center'><i class='material-icons'>my_location</i>"+loc.name+"</h3></div></div>";
  html+="<div class='row'>";
  html+="<div class='col-xs-3 col-sm-3 col-md-3 col-lg-3'></div>";
  html+="<div class='col-xs-2 col-sm-2 col-md-2 col-lg-2'><h3 class='text-right'><i class='material-icons'>arrow_forward</i>"+loc.coord.lat+"</h3></div>";
  html+="<div class='col-xs-2 col-sm-2 col-md-2 col-lg-2'></div>";
  html+="<div class='col-xs-2 col-sm-2 col-md-2 col-lg-2'><h3 class='text-left'><i class='material-icons'>arrow_upwards</i>"+loc.coord.lon+"</h3></div>";
  html+="<div class='col-xs-3 col-sm-3 col-md-3 col-lg-3'></div>";
  html+="</div>";
  return(html)
}



function getWindHtml(loc){
  var dirDegree=parseFloat(loc.wind.deg);
  var whichDir=Math.ceil(dirDegree/90);
  var highWind=1;
  if(parseFloat(loc.wind.speed)>50){
    highWind=10;
  }
  whichDir*=highWind;
  var iconVal;
  switch(whichDir){
    case 1: iconVal = 'fa fa-angle-up';
            break ;
    case 2: iconVal = 'fa fa-angle-right';
            break;
    case 3: iconVal = 'fa fa-angle-down';
            break;
    case 4: iconVal = 'fa fa-angle-left';
            break;
    case 10: iconVal = 'fa fa-angle-double-up';
              break;
    case 20: iconVal = 'fa fa-angle-double-right';
              break;
    case 30: iconVal = 'fa fa-angle-double-down';
              break;
    case 40: iconVal = 'fa fa-angle-double-left';
              break;
    default: iconVal = 'fa fa-angle-up'
  }
  tempC = Math.round(loc.main.temp);
  $('#windIcon').html("<i class='"+iconVal+"'></i>");
  $('#tempIcon').html("<i class='fa fa-thermometer'></i>");
  $('#windSpeed').text(loc.wind.speed+" km/hr");
  $('#temp').text(tempC.toString());
  $('#tempUnit').text('C');
  $('#weatherIcon').html("<img class='h3Icon' src='"+loc.weather[0].icon+"' alt='Weather-Icon' align='middle'>");

}