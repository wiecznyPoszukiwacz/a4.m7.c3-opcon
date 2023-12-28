import { Point, Widget } from "../Widget.mjs";
import { FlatList } from '../types.mjs'

export type ILabelConfig = {
	label: string
	text: string
	invert: boolean | number
	textSize: number
	invertedMargin: number
	unit: string
}

export class Label extends Widget{

	declare protected config: ILabelConfig


	protected override onInit(_config: FlatList | null): void{
		this.config = {
			label: '()',
			text: '',
			invert: false,
			textSize: 13,
			invertedMargin: 3,
			unit: ''
		}

	}
	protected override onDraw(frame: number): void{

		let invert:boolean

		if(this.config.invert === true){
			invert = true
		}else if(this.config.invert === false){
			invert = false
		}else{
			invert = (this.config.invert & frame) > 0
		}



		this.setStyle({
			fill: 'normal',
		})

		if(invert){

			this.rectangle(new Point(0,0), this.size)

			this.setStyle({
				fill: 'invNormal'
			})
		}

		this.setStyle({
			strokeWeight: 0, 
			textSize: this.config.textSize,
			textFont: 'Agave Nerd Font'
		})

		this.text(this.config.label, this.leftMid.move(this.config.invertedMargin, 0), 'leftMid')
		this.text(this.config.text + ' ' + this.config.unit,  this.rightMid.move(-this.config.invertedMargin, 0), 'rightMid')

	}
}
