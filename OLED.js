class OLED extends Renderable {


	constructor(panelWidth, panelHeight, pixelScale) {
		super();
		this.panel = [[]];
		this.panelGFX = [[]]
		this.initOledState(panelWidth, panelHeight)
		this.pixelScale = pixelScale



		// this.addr = 0x0

		// this.VDD = new Pin(9)
		// this.RST = new Pin(1)
		// this.SCL = new Pin(2)
		// this.SDA = new Pin(3)

	}

	initOledState(panelWidth, panelHeight) {
		// _.fill(new Array(width), _.fill(new Array(height), false))
		for (let i = 0; i < panelHeight; i++) {
			if (!this.panel[i]) {
				this.panel[i] = []
			}
			for (let j = 0; j < panelWidth; j++) {
				// if (Math.floor(Math.cos(i)*10) % 2 == 0 && j % 4 == 0) {
				// this.panel[i][j] = true;
				// } else {
				this.panel[i][j] = false;
				// }
			}
		}
	}

	render(app) {
		let pixelScale = this.pixelScale
		let gfx = new PIXI.Graphics();
		// traverse in row major order
		for (let r = 0; r < this.panel.length; r++) {
			for (let c = 0; c < this.panel[r].length; c++) {
				// determine if pixel is on or off, store state
				// if on, fill = white, else fill = black
				// drawRect at the coordinate, with scaling


				let pixel = this.panel[r][c];
				let color = pixel ? 0xFFFFFF :
									0x000000;

				gfx.beginFill(color)
				gfx.drawRect(c * pixelScale, r * pixelScale, pixelScale, pixelScale)
				gfx.endFill()
			}
		}

		app.stage.getChildAt(0).destroy(); // We must destroy the previous gfx instance to preserve memory as we aren't using it and that causes big bad memory leaks :(((((
		app.stage.addChild(gfx)
	}


	setPixel(value, row, col) {
		this.panel[row][col] = value 
	}
	getPixel(row, col) {
		return this.panel[row][col]		
	}
	togglePixelAt(row, col) {
		this.setPixel(!this.getPixel(row, col), row, col)
	}
	setPanelState(newPanelState) {
		// accepted types: boolean array or uint8array for convienience and fun
		if(Array.isArray(newPanelState)) {
			if(newPanelState.length !== this.panel.length || newPanelState[0].length !== this.panel[0].length) {
				throw new Error(`Incorrect size of array given: [${newPanelState.length}][${newPanelState[0].length}]. Expected [${this.panel.length}][${this.panel[0].length}]`)
			}

			this.panel = newPanelState			
		} else if (newPanelState instanceof Uint8Array) {
			let newPanelConverted = newPanelState.map(panelRow => {
				panelRow.map(val => val === 0 ? true : false)
			})
			this.panel = newPanelConverted
		}
	}
	setPanelSparse(activatedPixels) {
		// accepted type: [{x: <>, y: <>}]
	}

}