import { Point, Widget } from "../Widget.mjs";
import { FlatList } from "../types.mjs";

export type IGroundViewConfig = {
	starAngle: number
}

export class GroundView extends Widget{

	declare protected config: IGroundViewConfig

	protected override onInit(_config: FlatList | null):void{
		this.config = {
			starAngle: 90
		}

	}


	protected override onDraw():void{

		const starPathRadius = this.r * 0.75

		this.setStyle({lineDash: [1, 4]})
		this.circle(this.center, starPathRadius)

		let angle = this.config.starAngle + 180
		if(angle > 360){
			angle -= 360
		}
		const starPosition = this.getPointOnCircle(this.center, starPathRadius, angle)
		if(angle > 180){
			this.setStyle({ fill: true })
			this.line(starPosition, this.center)
		}else{
			this.setStyle({ lineDash: false, fill: false })
		}

		this.setStyle({ lineDash: false})

		// gwiazda
		const starRadius = this.size.w / 20
		this.circle(starPosition, starRadius)

		// grunt
		this.line(this.leftMid, this.rightMid)

		for(let x = this.margin + 10; x < this.size.w; x+= 10){
			this.line(new Point(x, this.center.y), new Point(x - 10, this.center.y + 10))
		}


	}

}
