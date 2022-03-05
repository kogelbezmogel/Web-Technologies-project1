let width = 0;
let height = 0;
let space = 35;

let dt = 0.01; 
let time_left = 0;
let interval_time = 10;

let h_maxY_value = 120;
let h_maxX_value = 100;

let v_maxY_value = 120;
let v_maxX_value = 100;

let o_maxY_value = 120;
let o_maxX_value = 200;

var maxY_value;
var maxX_value;

var interval;
var canvas;
var context;

var x;
var y;
var vx;
var vy;

var y0;
var x0;
var v0;
var alpha;

var g;

var points = [];
var mark;



function CreateBackground( cont, width, height, space, max_value_x, max_value_y ) {

	var d_x_px = (width - 2 * space) / 10; 
	var d_y_px = (height - 2 * space) / 6;
	var d_x = max_value_x / 10;
	var d_y = max_value_y / 6;
	cont.strokeStyle = '#000000';
	cont.fillStyle = '#000000';

	cont.beginPath();

	cont.moveTo(space, space);
	cont.lineTo(space, height - space);
	cont.lineTo(width - space, height - space);

	cont.moveTo(width - space, height - space);
	cont.lineTo(width - space - 5, height - space + 5);

	cont.moveTo(width - space, height - space);
	cont.lineTo(width - space - 5, height - space - 5);
	
	cont.moveTo(space, space);
	cont.lineTo(space + 5, space + 5);

	cont.moveTo(space, space);
	cont.lineTo(space - 5, space + 5);
	
	for(var i = 0; i < 10; ++i) {
		cont.moveTo(space + d_x_px * i, height - space - 4);
		cont.lineTo(space + d_x_px * i, height - space + 4);
		cont.fillText( parseInt(d_x*i) + " m", space + d_x_px * i, height - space + 20 );
	}

	for(var j = 0; j < 6; ++j) {
		cont.moveTo(space - 4, height - space - j * d_y_px);
		cont.lineTo(space + 4, height - space - j * d_y_px);
		cont.fillText( parseInt(d_y*j) + " m", space - 30 , height - space - j * d_y_px );
	}

	cont.rect(width - space - 100, space, 100, 40);

	cont.stroke();
	cont.closePath();
}



function UpdateCanv() {

	var cor_y = findCordynateY(height, space, maxY_value, y);
	var cor_x = findCordynateX(width, space, maxX_value, x);

	if( time_left % parseInt(100 * mark) == 0 ) {
		points.push([cor_x, cor_y, vx, -vy]);
	}

	y = y + vy*dt;
	x = x + vx*dt;
	vy = vy - g*dt;
	time_left++;

	var window_width = 100; //czysczenie okna w prawym gornym rogu
	context.beginPath();
	context.clearRect(cor_x - 11, cor_y - 11, 22 , 22); //zacieranie sladu po kuli
	context.clearRect(width - space - window_width + 1, space + 1, window_width - 2, 40 - 2); 
	context.closePath();
	
	cor_x = findCordynateX(width, space, maxX_value, x);
	cor_y = findCordynateY(height, space, maxY_value, y);

	context.fillStyle = '#700000';
	context.strokeStyle = 'black';
	context.arc(cor_x, cor_y, 10, 0, 2*Math.PI); //rysowanie kuli
	context.fill();
	context.stroke();
	
	context.fillStyle = 'white'; //update okienka w prawym gornym rogu
	var velocity_vector = "V(" + Number.parseFloat(vx).toFixed(1) + ", " + Number.parseFloat(vy).toFixed(1) + ") [m/s]";
	var time = "czas: " + Number.parseFloat(time_left * dt).toFixed(2) + " [s]";
	context.fillText( velocity_vector , width - space - 95, space + 15 );
	context.fillText( time, width - space - 95, space + 30);

	for(let i = 0; i < points.length; i++) { //rysowanie znacznikow
		drawPoint(context, points[i]);
	}

	if( cor_y > height - space - 10 || cor_y < 0 ||cor_x > width - space - 10 || cor_x < space + 5) {
		clearInterval(interval);
		interval = null;
		CreateBackground( context, width, height, space, maxX_value, maxY_value );
	}
}



function drawArrow(cont, x_0, y_0, x_1, y_1) {

	let shift_x = parseInt( Math.sqrt(Math.pow(x_0 - x_1, 2) + Math.pow(y_1 - y_0, 2)) * 0.1 );
	let shift_y = shift_x;
	cont.beginPath();

	if( x_0 == x_1 ) {
		if( y_0 < y_1 ) shift_y *= -1;
		cont.moveTo(x_0, y_1);
		cont.lineTo(x_0 - shift_x, y_1 + shift_y);
		cont.moveTo(x_0, y_1);
		cont.lineTo(x_0 + shift_x, y_1 + shift_y);
	}

	if( y_0 == y_1 ) {
		if( x_0 < x_1) shift_x *= -1;
		cont.moveTo(x_1, y_0);
		cont.lineTo(x_1 + shift_x, y_0 - shift_y);
		cont.moveTo(x_1, y_0);
		cont.lineTo(x_1 + shift_x, y_0 + shift_y);
	}

	cont.moveTo(x_0, y_0); 
	cont.lineTo(x_1, y_1);
	
	cont.stroke();
	cont.closePath();
}

function drawPoint(cont, point) {

	let x_end = point[0] + point[2] * 1.5;
	let y_end = point[1] + point[3] * 1.5;
	let x_start = point[0];
	let y_start = point[1];

	cont.beginPath();
	cont.arc(point[0], point[1], 4, 0, 2 * Math.PI);
	cont.strokeStyle = 'yellow';
	cont.fillStyle = 'yellow';
	cont.fill();
	cont.stroke();
	cont.closePath();

	cont.strokeStyle = 'red';
	cont.fillStyle = 'red';
	drawArrow(cont, x_start, y_start, x_start, y_end);
	
	cont.strokeStyle = 'blue';
	cont.fillStyle = 'blue';
	drawArrow(cont, x_start, y_start, x_end, y_start);	
}

function findCordynateY( len, space, max_value, value ) {
	var axis_len = len - 2 * space;
	var cor = axis_len * value / max_value;
	cor += space;
	cor = len - cor; 

	return cor;
}


function findCordynateX( len, space, max_value, value ) {
	var axis_len = len - 2 * space;
	var cor = axis_len * value / max_value;
	cor += space;

	return cor;
}
