import { IScreenContainter } from "./types.mjs"

export class LayoutManager{

	protected grid: HTMLElement

	public constructor(){
		this.grid = document.createElement('div')
		this.grid.setAttribute('id', 'mgrid')

		document.body.appendChild(this.grid)

	}

	protected idCnt: number = 1

	public createBlock(type: string): IScreenContainter{

		const id = 'segment' + this.idCnt++

		// create div

		const frame = document.createElement('div')
		frame.className = 'screenFrame ' + type
		frame.setAttribute('style', `grid-area: ${type}`)
		frame.setAttribute('id', id)

		this.grid.appendChild(frame)

		const cs = getComputedStyle(frame)
		return {
			domElement: frame,
			id: id,
			width: frame.offsetWidth - (parseFloat(cs.paddingLeft) + parseFloat(cs.paddingRight) + parseFloat(cs.borderLeftWidth) + parseFloat(cs.borderRightWidth)),
			height: frame.offsetHeight - (parseFloat(cs.paddingTop) + parseFloat(cs.paddingBottom) + parseFloat(cs.borderTopWidth) + parseFloat(cs.borderBottomWidth)),
		}
	}


}
