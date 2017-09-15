$(document).ready(function(){
	var isOpen = false;
	var wikiSearchURL = "https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=";
	var callback = "&callback=JSON_CALLBACK";
	$('.jumbo2').hide();
	var wikiArticleUrl = "http://en.wikipedia.org/?curid=";

	$('.searchIcon').click(function(){
		if(isOpen == false){
			$('.searchbox').css('width','100%');
			$('.searchHere').css('z-index','100');
			$('.searchbox-submit').css('z-index','100');
			$('.cancelIcon').css('z-index','100');
			$('.searchIcon').css('z-index','-1');
			$('.searchIcon').css('background-color', 'transparent');
			isOpen = true;
		}
	})

	$('.cancelIcon').click(function(){
		if(isOpen == true){
			$('.searchbox').css('width','0%');
			$('.searchHere').css('z-index','-1');
			$('.searchbox-submit').css('z-index','-1');
			$('.cancelIcon').css('z-index','-1');
			$('.searchIcon').css('z-index','100');
			$('.searchIcon').css('background-color', '#511111');
			$('.jumbo1').css('top','50%');
			$('.jumbo2').css('top','75%');
			$('.jumbo2').hide();
			isOpen = false;
			$('.searchHere').val("");
		}
	})

	$("form").submit(function(e){
		e.preventDefault();
    	$.ajax({dataType: "jsonp", 
    		url: wikiSearchURL+$('.searchHere').val()+callback, 
    		success : function(json){
    			$('.jumbo2').empty();
    			var wikiKeys = Object.keys(json.query.pages);
    			wikiKeys.forEach(function(currValue){
    			$('.jumbo2').append("<div class='well' id='"+currValue+"'><h2>"+json.query.pages[currValue].title+"</h2><h3>"+json.query.pages[currValue].extract+"</h3></div>");    			})
    			$('.jumbo1').css('top','0%');
    			$('.jumbo2').css('top','40%');
    			$('.jumbo2').show();

    		}, 
    		error: function(a,b,c){
    			console.log(a);
    			console.log(b);
    			console.log(c);
    		}
    	});
    });

	$('.jumbo2').on("click",".well",function(e) {
   		var win = window.open(wikiArticleUrl+this.id, '_blank');
  		win.focus();
	});

	$('.jumbo2').on("mouseover",".well",function(e) {
   		$("#"+this.id).css("cssText", "border-left: solid orange 5px !important");
	});

	$('.jumbo2').on("mouseout",".well",function(e) {
   		$("#"+this.id).css("cssText", "border-left: none");
	});

	});