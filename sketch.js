let vueltas;

const pista = [];
const autos = [];

function setup() {
	createCanvas(windowWidth, windowHeight);
	for (let i = 0; i <=7 ; i++) {
		pista[i]=[];
	}

	pista[1]['img'] = loadImage('img/4Ca6.jpg');
	pista[1]['x'] = 0;
	pista[1]['w'] = width/6;
	pista[1]['h'] = height/3;
	pista[1]['y'] = height-pista[1]['h'];

	pista[0]['img'] = loadImage('img/4Ca1.jpg');
	pista[0]['x'] = pista[1]['w'];
	pista[0]['w'] = width/1.5;
	pista[0]['h'] = height/4;
	pista[0]['y'] = height-pista[0]['h'];

	pista[3]['img'] = loadImage('img/4Ca3.jpg');
	pista[3]['w'] = width/6;
	pista[3]['h'] = height/3;
	pista[3]['x'] = 0;
	pista[3]['y'] = 0;

	pista[2]['img'] = loadImage('img/4Ca2.jpg');
	pista[2]['x'] = 0;
	pista[2]['w'] = width/6;
	pista[2]['h'] = height-pista[3]['h']-pista[1]['h'];
	pista[2]['y'] = pista[3]['h'];

	pista[4]['img'] = loadImage('img/4Ca1.jpg');
	pista[4]['x'] = pista[1]['w'];
	pista[4]['w'] = width/1.5;
	pista[4]['h'] = height/4;
	pista[4]['y'] = 0;

	pista[5]['img'] = loadImage('img/4Ca5.jpg');
	pista[5]['w'] = width/6;
	pista[5]['h'] = height/3;
	pista[5]['x'] = width-pista[5]['w'];
	pista[5]['y'] = height-pista[5]['h'];

	pista[6]['img'] = loadImage('img/4Ca4.jpg')
	pista[6]['w'] = width/6;
	pista[6]['h'] = height/3;
	pista[6]['x'] = width-pista[6]['w'];
	pista[6]['y'] = 0;

	pista[7]['img'] = loadImage('img/4Ca2.jpg');
	pista[7]['w'] = width/6;
	pista[7]['h'] = height-pista[3]['h']-pista[1]['h'];
	pista[7]['x'] = width-pista[7]['w'];
	pista[7]['y'] = pista[3]['h'];

	for (let i = 1; i<=4; i++){
		autos[i]=[];
		for(let j =1; j<=4; j++){
			autos[i][j] = loadImage(`img/auto${i}${j}.png`);
			autos[i]['w']= pista[7]['w']/6;
			autos[i]['h']= pista[7]['h']/4;
		}
	}

	autos[1]['x']=Math.floor(width/2);
	autos[1]['y']=0;
	for(let j =2; j<=4; j++){
		autos[j]['x']=Math.floor(width/2);
		autos[j]['y'] = Math.floor(autos[j-1]['y']+autos[j-1]['w']);
	}

	for(let i=1;i<=4;i++){
		autos[i]['velocidad']= Math.floor(random(10,20));
		autos[i]['comprobarX']=autos[i]['x'];
		autos[i]['comprobarY']=autos[i]['y'];
		autos[i]['vuelta']=0;
	}
}

function draw() {
	background('#fff');
	strokeWeight(4);
	stroke('#de2214');
	pistaD();
	line(autos[1]['comprobarX'],0,autos[1]['comprobarX'],pista[0]['h'] )
	autosMostrar();
	for(let i=1; i<=4; i++){
		stroke('#fff');
		textSize(32);
		text('Vuelta Auto'+i+": "+autos[i]['vuelta']+"/10" , 500, 250+i*50);
	}
	text("Vueltas Totales:"+vueltas,500,200)

}

function pistaD(){
	for(let i=0; i<=7;i++){
		image(pista[i]['img'],pista[i]['x'],pista[i]['y'],pista[i]['w'],pista[i]['h']);
	}
}

function autosMostrar(){
	let max=0;
	for(let i=1; i<=4; i++){
		if (autos[i]['x']-Math.floor(autos[i]['velocidad']/1.5) == autos[i]['comprobarX'] && autos[i]['y'] <= autos[i]['comprobarY']) {
			autos[i]['vuelta']++;
			for(let j=1;j<=4;j++){
				if (autos[j]['vuelta']>max) { max=autos[j]['vuelta'] }
			}
			vueltas=max;
		}
		if (autos[i]['y']-autos[i]['w']*i<=-autos[i]['w'] && autos[i]['x']-autos[i]['w']*i<0) {
			image(autos[i][3],autos[i]['x']+=(i===0 ? autos[i]['velocidad'] : Math.floor(autos[i]['velocidad']/1.5)),autos[i]['y'],autos[i]['h'],autos[i]['w']);
		}else if (autos[i]['x']-autos[i]['w']*i<0) {
			image(autos[i][1],autos[i]['x'],autos[i]['y']-=(i===0 ? autos[i]['velocidad'] : Math.floor(autos[i]['velocidad']/1.5)),autos[i]['w'],autos[i]['h']);
		}else if(autos[i]['y']+autos[i]['w']*i>=height){
			image(autos[i][4],autos[i]['x']-=(i===0 ? autos[i]['velocidad'] : Math.floor(autos[i]['velocidad']/1.5)),autos[i]['y'],autos[i]['h'],autos[i]['w']);
		}else if (autos[i]['x']+autos[i]['w']*i>=width-autos[i]['w']) {
			image(autos[i][2],autos[i]['x'],autos[i]['y']+=(i===0 ? autos[i]['velocidad'] : Math.floor(autos[i]['velocidad']/1.5)),autos[i]['w'],autos[i]['h']);
		}else{
			console.log("ori "+autos[i]['velocidad']+" "+Math.floor(autos[i]['velocidad']/1.5)+" velocidad "+i)
			image(autos[i][3],autos[i]['x']+=(i===0 ? autos[i]['velocidad'] : Math.floor(autos[i]['velocidad']/1.5)),autos[i]['y'],autos[i]['h'],autos[i]['w']);
		}
		if (vueltas===10) {
			let id;
			for(let i=1;i<=4;i++){
				if (autos[i]['vuelta']===10) { id=i }
			}
			text("Gano Auto "+id,500,250);
			noLoop();
		}

	}
}
