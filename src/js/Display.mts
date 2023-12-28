import P5 from 'p5'
import { Widget} from './Widget.mjs'

export class Display{

	public widgets: Map<string, Widget> = new Map()
	protected p5: P5

	protected frame: number = 0

	public constructor(){
		setInterval(()=>{
			if(this.frame > 6){
				this.frame = 0
				return
			} 
			this.frame++

		}, 250)
		const sketch = (p5: P5):void => {
			p5.setup = () => {
				const display = document.getElementById('display')
				if(!display){
					throw new Error('no #display element found')
				}
				const canvas = p5.createCanvas(display.offsetWidth, display.offsetHeight);
				canvas.parent('display')
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

	}

	public addWidget(id: string, widget: Widget): void{
		widget.setP5(this.p5)
		this.widgets.set(id, widget)
	}

}
