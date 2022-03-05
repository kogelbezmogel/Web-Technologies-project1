function ObliqFormClick() {
	if(interval != null ) {
		clearInterval(interval);
		interval = null;
	}
	var form = document.getElementById('oblique_div');
	var html = "";
	html += "<div class='form_div' id='vert_from_div' >";
	html += "		<button onclick='ClearObli()'> zamknij </button>";
	html += "		<button onclick='ObliAnimStart()' > wyświetl animacje </button> <br/> <br/> ";
	html += "		<div class='znacznik_div'>";
	html += "			Odstęp między znacznikami <br/>";
	html += "			<input type='text' class='znacznik' name='znacznik' id='id_o_znacznik' value='0.5' onchange='ChangeObliCanv()' /> <br/> ";
	html += "			(w sekundach) <br/> <br/> <br/>";
	html += "		</div>";
	html += "		<label for='grawitacja' > g = </label>";
	html += "		<input type='text' name='grawitacja' id='id_o_grawitacja' value='9.81' onchange='ChangeObliCanv()' /> m/s<sup>2</sup> <br/><br/>";
	html += "		<label for='wysokosc' > h<sub>0</sub> =  </label>";
	html += "		<input type='text' name='wysokosc' id='id_o_wysokosc' value='4' onchange='ChangeObliCanv()' /> m <br/><br/>";
	html += "		<label for='odleglosc' > x<sub>0</sub> =  </label>";
	html += "		<input type='text' name='odleglosc' id='id_o_odleglosc' value='3' onchange='ChangeObliCanv()' /> m <br/><br/>";
	html += "		<label for='predkosc' > v<sub>0</sub> = </label>";
	html += "		<input type='text' name='predkosc' id='id_o_predkosc' value='45' onchange='ChangeObliCanv()' /> m/s <br/><br/>";
	html += "		<label for='kat' > &alpha; = </label>";
	html += "		<input type='text' name='kat' id='id_o_kat' value='65' onchange='ChangeObliCanv()' /> &deg; <br/>";
	html += "</div>";
	html += "<div class='canv_div' id='obli_canv_div_id' >";
	html += "	<canvas id='obli_canv_id'>";
	html += "	</canvas>";
	html += "</div>";
	html += "<div class='clear_div'></div>";

	form.innerHTML = html;
	ChangeObliCanv();
}




function ChangeObliCanv() {
	
	var obli_canv_div = document.getElementById('obli_canv_div_id');
	height = parseInt( obli_canv_div.clientHeight );
	width = parseInt( obli_canv_div.clientWidth );

	canvas = document.getElementById('obli_canv_id');
	canvas.height = height;
	canvas.width = width;

	context = canvas.getContext('2d');
	context.clearRect(0, 0, width, height);
	CreateBackground( context, width, height, space, o_maxX_value, o_maxY_value );

	g = parseInt( document.getElementById('id_o_grawitacja').value );
	v0 = parseInt( document.getElementById('id_o_predkosc').value );
	y0 = parseInt( document.getElementById('id_o_wysokosc').value );
	x0 = parseInt( document.getElementById('id_o_odleglosc').value );
	alpha = parseInt( document.getElementById('id_o_kat').value );
	mark = parseFloat( document.getElementById('id_o_znacznik').value );
	maxX_value = o_maxX_value;
	maxY_value = o_maxY_value;

	if( !Number.isNaN(y0) && !Number.isNaN(x0) && !Number.isNaN(alpha) && !Number.isNaN(v0) ) {

		cor_y = findCordynateY(height, space, o_maxY_value, y0);
		cor_x = findCordynateX(width, space, o_maxX_value, x0);
		context.beginPath();
		context.fillStyle = '#700000';
		context.strokeStyle = 'black';
		context.arc( cor_x, cor_y, 10, 0, 2*Math.PI );
		context.fill();
		context.stroke();
		context.closePath();
	}
}



function ObliAnimStart() {

	if(interval != null ) {
		clearInterval(interval);
		interval = null;
	}
	canvas = document.getElementById('obli_canv_id');
	context = canvas.getContext('2d');

	context.clearRect(0, 0, width, height);
	points = [];
	time_left = 0;

	ChangeObliCanv();
	
	x = x0;
	y = y0;
	vx = v0 * Math.cos(alpha / 180 * Math.PI);
	vy = v0 * Math.sin(alpha / 180 * Math.PI);
	
	if ( y > o_maxY_value )
		alert("Za duża wartość h");
	else if ( y < 0 )
		alert("Za mała wartość h");
	else if ( x < 3 )
		alert("Za mała wartość x");
	else if ( x > o_maxX_value )
		alert("Za duża wartość x");
	else if ( !Number.isNaN(x) && !Number.isNaN(y) && !Number.isNaN(vx) && !Number.isNaN(g) )
		interval = setInterval(UpdateCanv, 10);			
	else 
		alert("Nie wszystkie wartości zostały podane poprawnie");
}



function ClearObli() {
	div = document.getElementById('oblique_div');
	div.innerHTML = "<button onclick='ObliqFormClick()'> Przeprowadź animacje ruchu </button>";
}