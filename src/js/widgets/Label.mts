import { Widget } from "../Widget.mjs";
import { FlatList } from '../types.mjs'

export type ILabelConfig = {
	label: string
	text: string
}

export class Label extends Widget{

	declare protected config: ILabelConfig

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	protected override onInit(_config: FlatList | null): void{
		this.config = {
			label: '()',
			text: ''
		}

	}
	protected override onDraw(): void{

		this.setStyle({
			strokeWeight: 0.5, 
			fill: true,
			textSize: 15,
			textFont: 'Agave Nerd Font'
		})

		this.text(this.config.label, this.leftMid)

		this.text(this.config.text, this.leftMid.move(50, 0))

	}
}
