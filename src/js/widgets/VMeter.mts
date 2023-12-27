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

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	protected override onInit(_config: FlatList | null){
		this.config = {
			space: 12,
			value: 2,
			bars: 10,
			barHeight: 3,
			inactiveBarHeight: 0.3
		}

	}

	protected override onDraw(){

		const space = this.config["space"]

		this.setStyle({strokeWeight: this.config.barHeight })

		let y = this.size.h - space

		for(let bar = 0; bar <= this.config.bars; bar++){
			if(bar === this.config.value){
				this.setStyle({
					strokeWeight: this.config.inactiveBarHeight
				})
			}
			this.line(this.leftMid.setY(y), this.rightMid.setY(y))
			y -= space
		}
	}

}
