import { Widget } from "../Widget.mjs";

export class GroundView extends Widget{

	protected angle: number = 0

	protected onDraw(){

		const targetAngle = (new Date().getSeconds()) * 6

		this.angle += (targetAngle - this.angle) / 2

		const starPathRadius = this.r * 0.75

		this.setStyle({lineDash: [1, 4]})
		this.circle(this.center, starPathRadius)

		const starPosition = this.getPointOnCircle(this.center, starPathRadius, this.angle)
		if(this.angle > 180){
			this.line(starPosition, this.center)
		}
		this.setStyle({ lineDash: false, fill: true })

		let starRadius = this.w / 20
		this.circle(starPosition, starRadius)

		this.line(this.leftMid, this.rightMid)

		for(let x = this.margin + 10; x < this.w; x+= 10){
			this.line({x, y: this.center.y}, {x: x - 10, y: this.center.y + 10})
		}


	}

}
