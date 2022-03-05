function HoriFormClick() {
	if(interval != null ) {
		clearInterval(interval);
		interval = null;
	}
	var form = document.getElementById('horizontal_div');
	var html = "";
	html += "<div class='form_div' id='hori_from_div' >";
	html += "		<button onclick='ClearHori()'> zamknij </button>";
	html += "		<button onclick='HoriAnimStart()' > wyświetl animacje </button> <br/> <br/>";
	html += "		<div class='znacznik_div'>";
	html += "			Odstęp między znacznikami <br/>";
	html += "			<input type='text' class='znacznik' name='znacznik' id='id_h_znacznik' value='0.3' onchange='ChangeHoriCanv()' /> <br/> ";
	html += "			(w sekundach) <br/> <br/> <br/>";
	html += "		</div>";
	html += "		<label for='grawitacja' > g = </label>";
	html += "		<input type='text' name='grawitacja' id='id_h_grawitacja' value='9.81' onchange='ChangeHoriCanv()' /> m/s<sup>2</sup> <br/><br/>";
	html += "		<label for='wysokosc' > h<sub>0</sub> =  </label>";
	html += "		<input type='text' name='wysokosc' id='id_h_wysokosc' value='100' onchange='ChangeHoriCanv()' /> m <br/><br/>";
	html += "		<label for='odleglosc' > x<sub>0</sub> =  </label>";
	html += "		<input type='text' name='odleglosc' id='id_h_odleglosc' value='2' onchange='ChangeHoriCanv()' /> m <br/><br/>";
	html += "		<label for='predkosc' > v<sub>0</sub> = </label>";
	html += "		<input type='text' name='predkosc' id='id_h_predkosc' value='20' onchange='ChangeHoriCanv()' /> m/s <br/><br/>";
	html += "</div>";
	html += "<div class='canv_div' id='hori_canv_div_id' >";
	html += "	<canvas id='hori_canv_id'>";
	html += "	</canvas>";
	html += "</div>";
	html += "<div class='clear_div'></div>";

	form.innerHTML = html;
	ChangeHoriCanv();
}



function ChangeHoriCanv() {

	var hori_canv_div = document.getElementById('hori_canv_div_id');
	height = parseInt( hori_canv_div.clientHeight );
	width = parseInt( hori_canv_div.clientWidth );

	canvas = document.getElementById('hori_canv_id');
	canvas.height = height;
	canvas.width = width;

	context = canvas.getContext('2d');
	CreateBackground( context, width, height, space, h_maxX_value, h_maxY_value );

	maxY_value = h_maxY_value;
	maxX_value = h_maxX_value;
	g = parseInt( document.getElementById('id_h_grawitacja').value );
	v0 = parseInt( document.getElementById('id_h_predkosc').value );
	y0 = parseInt( document.getElementById('id_h_wysokosc').value );
	x0 = parseInt( document.getElementById('id_h_odleglosc').value );
	mark = parseFloat( document.getElementById('id_h_znacznik').value );
	alpha = 0;

	if( !Number.isNaN(y0) && !Number.isNaN(x0) ) {

		cor_y = findCordynateY(height, space, maxY_value, y0);
		cor_x = findCordynateX(width, space, maxX_value, x0);
		context.beginPath();
		context.arc( cor_x, cor_y, 10, 0, 2*Math.PI );
		context.fillStyle = '#700000';
		context.strokeStyle = 'black';
		context.fill();
		context.stroke();
		context.closePath();
	}
}



function HoriAnimStart() {

	if( interval != null ) {
		clearInterval(interval);
		interval = null;
	}
	canvas = document.getElementById('hori_canv_id');
	context = canvas.getContext('2d');

	context.clearRect(0, 0, width, height);
	points = [];
	time_left = 0;
	
	ChangeHoriCanv();
	
	x = x0;
	y = y0;
	vy = 0;
	vx = v0;

	if( y > h_maxY_value )
		alert("Za duża wartość h");
	else if( y < 0 )
		alert("Za mała wartość h");
	else if ( x < 2 )
		alert("Za mała wartość x");
	else if ( x > h_maxX_value )
		alert("Za duża wartość x");
	else if( !Number.isNaN(x) && !Number.isNaN(y) && !Number.isNaN(vx) && !Number.isNaN(g) )
		interval = setInterval(UpdateCanv, 10);			
	else 
		alert("Nie wsszystkie wartości zostały podane poprawnie");
}



function ClearHori() {
	div = document.getElementById('horizontal_div');
	div.innerHTML = "<button onclick='HoriFormClick()'> Przeprowadź animacje ruchu </button>";
}
