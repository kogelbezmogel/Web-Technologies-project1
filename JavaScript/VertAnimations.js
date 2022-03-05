function VertFormClick() {
	if(interval != null ) {
		clearInterval(interval);
		interval = null;
	}
	var form = document.getElementById('vertical_div');
	var html = "";
	html += "<div class='form_div' id='vert_from_div' >";
	html += "		<button onclick='ClearVert()'> zamknij </button>";
	html += "		<button onclick='VertAnimStart()' > wyświetl animacje </button> <br/> <br/>";
	html += "		<div class='znacznik_div'>";
	html += "			Odstęp między znacznikami <br/>";
	html += "			<input type='text' class='znacznik' name='znacznik' id='id_v_znacznik' value='1' onchange='ChangeVertCanv()' /> <br/> ";
	html += "			(w sekundach) <br/> <br/> <br/>";
	html += "		</div>";
	html += "		<label for='grawitacja' > g = </label>";
	html += "		<input type='text' name='grawitacja' id='id_v_grawitacja' value='9.81' onchange='ChangeVertCanv()' /> m/s<sup>2</sup> <br/><br/>";
	html += "		<label for='wysokosc' > h<sub>0</sub> =  </label>";
	html += "		<input type='text' name='wysokosc' id='id_v_wysokosc' value='100' onchange='ChangeVertCanv()' /> m <br/><br/>";
	html += "		<label for='predkosc' > v<sub>0</sub> = </label>";
	html += "		<input type='text' name='predkosc' id='id_v_predkosc' value='0.0' onchange='ChangeVertCanv()' /> m/s";
	html += "</div>";
	html += "<div class='canv_div' id='vert_canv_div_id' >";
	html += "	<canvas id='vert_canv_id'>";
	html += "	</canvas>";
	html += "</div>";
	html += "<div class='clear_div'></div>";

	form.innerHTML = html;
	ChangeVertCanv();
}



function VertAnimStart() {

	if( interval != null ) {
		clearInterval(interval);
		interval = null;
	}
	canvas = document.getElementById('vert_canv_id');
	context = canvas.getContext('2d');

	context.clearRect(0, 0, width, height);
	points = [];
	time_left = 0;

	ChangeVertCanv();

	x = x0;
	y = y0;
	vy = v0;
	vx = 0;
	
	if( y > v_maxY_value )
		alert("Za duża wartość h");
	else if( y < 0 )
		alert("Za mała wartość h");
	else if ( x < 3 )
		alert("Za mała wartość x");
	else if ( x > v_maxX_value )
		alert("Za duża wartość x");
	else if( !Number.isNaN(x) && !Number.isNaN(y) && !Number.isNaN(vy) && !Number.isNaN(g) )
		interval = setInterval(UpdateCanv, 10);			
	else 
		alert("Nie wsszystkie wartości zostały podane poprawnie");
}


function ChangeVertCanv() {

	var vert_canv_div = document.getElementById('vert_canv_div_id');
	height = parseInt( vert_canv_div.clientHeight );
	width = parseInt( vert_canv_div.clientWidth );

	canvas = document.getElementById('vert_canv_id');
	canvas.height = height;
	canvas.width = width;

	context = canvas.getContext('2d');
	CreateBackground( context, width, height, space, v_maxX_value, v_maxY_value );

	maxY_value = v_maxY_value;
	maxX_value = v_maxX_value;
	g = parseInt( document.getElementById('id_v_grawitacja').value );
	v0 = parseInt( document.getElementById('id_v_predkosc').value );
	y0 = parseInt( document.getElementById('id_v_wysokosc').value );
	mark = parseFloat( document.getElementById('id_v_znacznik').value );
	x0 = v_maxX_value / 2;
	alpha = 90;

	
	if( !Number.isNaN(y0) ) {

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



function ClearVert() {
	div = document.getElementById('vertical_div');
	div.innerHTML = "<button onclick='VertFormClick()'> Przeprowadź animacje ruchu </button>";
}
