$(function(){
	$("input#date").datepicker();
	$("input#time").timelist();
	$("input#time2").timelist({time:"11:33"});
	$("input#time").timelist();
});