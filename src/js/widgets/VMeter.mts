import { Widget } from "../Widget.mjs";
import { FlatList } from "../types.mjs";

export type IVMeterConfig = {

	barHeight: number
	space: number
	value: number
	bars: number
	inactiveBarHeight: number
}

export class VMeter extends Widget{

	declare protected config: IVMeterConfig

	protected override onInit(_config: FlatList | null):void{
		this.config = {
			space: 12,
			value: 2,
			bars: 10,
			barHeight: 3,
			inactiveBarHeight: 0.3
		}

	}

	protected override onDraw(_frame: number): void{

		const space = this.config["space"]

		this.setStyle({strokeWeight: this.config.barHeight })

		let y = this.size.h - space

		const v = (parseInt(this.getValue(this.config.value).toString()) / 100) * this.config.bars

		for(let bar = 0; bar <= this.config.bars; bar++){
			if(bar >= v){
				this.setStyle({
					strokeWeight: this.config.inactiveBarHeight
				})
			}
			this.line(this.leftMid.setY(y), this.rightMid.setY(y))
			y -= space
		}
	}

}
