import P5 from 'p5'
import { Widget} from './Widget.mts'
import { GroundView } from './widgets/Ground.mts';

const widgets: Array<Widget> = []

const sketch = (p5: P5) => {
	p5.setup = () => {
		const display = document.getElementById('display')
		if(!display){
			throw new Error('no #display element found')
		}
		const canvas = p5.createCanvas(display.offsetWidth, display.offsetHeight);
		canvas.parent('display')
		p5.stroke(p5.color('#eaeaea'))
		p5.strokeWeight(1)
		p5.frameRate(12)
		p5.angleMode(p5.DEGREES)
	};

	// The sketch draw method
	p5.draw = () => {
		p5.background("#102040");

		for(const widget of widgets){
			widget.draw()
		}
	}
}

const p5 = new P5(sketch)
widgets.push(new GroundView(p5, {
	w: 150,
	h: 150,
	x: 10,
	y: 10
}))
