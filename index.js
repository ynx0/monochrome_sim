'use strict';

let panelWidth = 128, // 128 simulated pixel units
	panelHeight = 32;
let pixelScale = 5;

let app = new PIXI.Application({width: panelWidth * pixelScale, height: panelHeight * pixelScale});
let monochrome = new OLED(panelWidth, panelHeight, pixelScale)

app.stage.addChild(new PIXI.Graphics()) // this just gets the rendering process started (need for init)
app.ticker.add(render)
document.body.querySelector('#panel').appendChild(app.view)

let t = 0;


function render() {
	// monochrome.setPixel(true, 50*Math.floor(t) % panelHeight, Math.floor(5+Math.random() * 10)*Math.floor(t) % panelWidth)
	// monochrome.setPixel(true, Math.floor(2.5*t) % panelHeight, Math.floor(.5*t))
	
	// monochrome.setPixel(t % 2 == 0, t % panelWidth, t % panelHeight)		
	
	
	monochrome.render(app);
	t+=1;
}
