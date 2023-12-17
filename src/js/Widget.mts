import P5 from 'p5'

/**
 * 2d coordinates
 */
export class Point{
	public constructor(public x = 0, public y = 0){
	}
}

export type IStyle = {
	strokeWeight?: number
	lineDash?: Array<number> | false
	fill?: boolean
}

export type IWidgetOptions = {
	w: number
	h: number
	x: number
	y: number
}

export class Widget{

	protected margin: number = 5

	protected w: number
	protected h: number
	protected cx: number
	protected cy: number
	protected sy: number
	protected ey: number

	protected dw: number
	protected dh: number

	protected r: number

	protected center: Point
	protected leftMid: Point
	protected rightMid: Point

	public constructor(protected p5: P5, protected options: IWidgetOptions){
		this.w = this.options.w
		this.h = this.options.h

		this.center = new Point(this.w / 2, this.h / 2)

		this.leftMid = new Point(this.margin, this.center.y)
		this.rightMid = new Point(this.w - this.margin, this.center.y)

		this.sy = this.margin
		this.ey = this.h - this.margin

		this.dw = this.w - 2 * this.margin
		this.dh = this.h - 2 * this.margin

		this.r = Math.ceil(Math.max(this.dw, this.dh) / 2)

	}
	/**
	 * return coordinates of point on circe
	 *
	 * @param p coordinates of circle center
	 * @param r circle radius
	 * @param a angle
	 */
	protected getPointOnCircle(p: Point, r: number, a: number): Point{
        	return new Point(this.p5.cos(a) * r + p.x, this.p5.sin(a) * r + p.y)
	}

	protected setStyle(style: IStyle){
		if(style.strokeWeight){
			this.p5.strokeWeight(style.strokeWeight)
		}
		if(style.lineDash !== undefined){
			this.p5.drawingContext.setLineDash(Array.isArray(style.lineDash) ? style.lineDash : [])
		}
		if(style.fill !== undefined){
			//style.fill ? this.p5.fill(itemColor) : this.p5.noFill()
		}
	}

	protected onDraw(){}
	public draw(){
		this.p5.translate(this.options.x, this.options.y)
		this.p5.noFill()

		// border
		this.p5.rect(0, 0, this.options.w, this.options.h)

		this.onDraw()
	}

	circle(center: Point, radius: number){
		this.p5.circle(center.x, center.y, radius * 2)
		return this
	}
	line(p1: Point, p2: Point){
		this.p5.line(p1.x, p1.y, p2.x, p2.y)
		return this
	}
}



