import P5 from 'p5'
import { Widget} from './Widget.mjs'
import { GroundView } from './widgets/Ground.mjs'
import { Label } from "./widgets/Label.mjs"
import { VMeter } from './widgets/VMeter.mjs'
import { IScreenContainter } from './types.mjs'
import { Registry } from './Registry.mjs'

export class Display{

	public widgets: Map<string, Widget> = new Map()
	protected p5: P5

	protected frame: number = 0

	public constructor(container: IScreenContainter, protected registry: Registry){
		setInterval(()=>{
			if(this.frame > 6){
				this.frame = 0
				return
			} 
			this.frame++

		}, 250)
		const sketch = (p5: P5):void => {
			p5.setup = () => {

				const canvas = p5.createCanvas(container.domElement.offsetWidth, container.domElement.offsetHeight);
				canvas.parent(container.domElement)
				p5.stroke(p5.color('#555555'))
				p5.strokeWeight(0.5)
				p5.frameRate(16)
				p5.angleMode(p5.DEGREES)
				p5.noFill()
			};

			// The sketch draw method
			p5.draw = () => {

				p5.clear(1, 42, 75, 56)

				//p5.background("#101020aa");
				for(const [, widget] of this.widgets){
					p5.push()
					widget.draw(Math.pow(2, this.frame))
					p5.pop()
				}

			}
		}

		this.p5 = new P5(sketch)
		this.createSetup()
	}

	protected createSetup(): void{
		this.addWidget('gv', new GroundView({ w: 150, h: 150, x: 10, y: 10}, {starAngle: '$W0.starAngle'}, this.registry))


		this.addWidget('m1', new VMeter({ w: 20, h: 150, x: 170, y: 10, margin: 0, border: 0}, { bars: 20, space: 6, value: '$AC878.level' }, this.registry))

		this.addWidget('lb', new Label({ w: 100, h: 20, x: 230, y: 30, border: 0, margin: 0 }, {label: 'charge', text: '$AC878.charge', invert: true, unit: '', invertMargin: 5}, this.registry))

		this.addWidget('lb2', new Label({ w: 100, h: 20, x: 230, y: 52, border: 1, margin: 0 }, {label: 'spgen', text: '$S1.rgn', invert: false, unit: '', invertMargin: 0}, this.registry))

		this.addWidget('lb3', new Label({
			w: 100, h: 20, x: 230, y: 74, border: 1, margin: 0
		}, {label: 'heater', text: '$H1.rce', invert: false, unit: '', invertMargin: 0}, this.registry))

	}


	public addWidget(id: string, widget: Widget): void{
		widget.setP5(this.p5)
		this.widgets.set(id, widget)
	}

}
