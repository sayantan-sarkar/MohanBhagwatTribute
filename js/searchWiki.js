$(document).ready(function(){
	var isOpen = false;

	$('.searchIcon').click(function(){
		if(isOpen == false){
			$('.searchbox').css('width','100%');
			$('.searchHere').css('z-index','100');
			$('.searchbox-submit').css('z-index','100');
			$('.searchIcon').css('z-index','-1');
			isOpen = true;
		}else{
			$('.searchbox').css('width','0%');
			$('.searchHere').css('z-index','-1');
			$('.searchbox-submit').css('z-index','-1');
			$('.searchIcon').css('z-index','100');
			isOpen = false;
		}
	})
});