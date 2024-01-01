import P5 from 'p5'
import { FlatList, Primitive } from './types.mjs'
import { Registry } from './Registry.mjs'

/**
 * 2d coordinates
 */
export class Point{
	public constructor(public x:number = 0, public y:number = 0){
	}

	public move(x: number, y: number): Point{
		return new Point(this.x + x, this.y + y)
	}
	public setX(x: number): Point{
		return new Point(x, this.y)
	}

	public setY(y: number): Point{
		return new Point(this.x, y)
	}
}
export class Size{
	public constructor(public w = 0, public h = 0){
	}
}

export type IStyle = {
	strokeWeight?: number
	textSize?: number
	textFont?: string
	lineDash?: Array<number> | false
	fill?: boolean | P5.Color | string
	color?: P5.Color | string
}

export type IWidgetOptions = {
	w: number
	h: number
	x: number
	y: number
	margin?: number
	border?: number
}

export abstract class Widget{

	protected margin: number = 5
	protected border: number = 0.5

	protected size: Size
	protected pos: Point

	protected r: number

	protected center: Point
	protected leftMid: Point
	protected rightMid: Point
	protected leftTop: Point
	protected leftBot: Point

	protected config: FlatList = {}
	protected p5!: P5

	public colors: Record<string, P5.Color> = {}

	public setP5(p5: P5): void{
		this.p5 = p5

		this.colors['dark'] = p5.color(10)
		this.colors['normal'] = p5.color(50)
		this.colors['light'] = p5.color(100)

		this.colors['invDark'] = p5.color(200)
		this.colors['invNormal'] = p5.color(220)
		this.colors['invLight'] = p5.color(255)
	}


	public constructor(options: IWidgetOptions, config: FlatList | null, protected registry: Registry){
		this.size = new Size(options.w, options.h)

		this.pos = new Point(options.x, options.y)


		this.margin = options.margin ?? 5
		this.border = options.border ?? 0.5

		this.center = new Point(this.size.w / 2, this.size.h / 2)

		this.leftTop = new Point(this.margin, this.margin)
		this.leftMid = new Point(this.margin, this.center.y)
		this.rightMid = new Point(this.size.w - this.margin, this.center.y)
		this.leftBot = new Point(this.margin, this.size.h - this.margin)

		this.r = Math.ceil(Math.max(this.size.w - 2 * this.margin, this.size.h - 2 * this.margin) / 2)

		this.onInit(config)
		this.setup(config)
	}


	public draw(frame: number): void{
		this.p5.translate(this.pos.x, this.pos.y)

		// border
		if(this.border){
			this.rectangle(new Point(0, 0), this.size)
		}

		this.onDraw(frame)
	}
	/************************************************************************************************************
	*  methods that may be / should be implemented in subclasses
	*************************************************************************************************************/

	public setup(config: FlatList | null):void{
		if(config){
			this.config = {...this.config, ...config}
		}
	}
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	protected onInit(_config: FlatList | null): void{}
	protected onDraw(frame: number): void{}

	/************************************************************************************************************
	*  drawing specific methods
	*************************************************************************************************************/

	protected circle(center: Point, radius: number): Widget{

		this.p5.circle(center.x, center.y, radius * 2)
		return this
	}

	protected rectangle(topLeft: Point, size: Size): Widget{

		this.p5.rect(topLeft.x, topLeft.y, size.w, size.h)
		return this
	}

	protected text(text: string, p: Point, positionPolicy: 'leftMid' | 'rightMid' = 'leftMid'):Widget{

		if(positionPolicy === 'rightMid'){
			this.p5.textAlign(this.p5.RIGHT, this.p5.CENTER)
		}else if(positionPolicy === 'leftMid'){
			this.p5.textAlign(this.p5.LEFT, this.p5.CENTER)
		}
		this.p5.text(text, p.x, p.y)
		return this
	}

	protected line(p1: Point, p2: Point):Widget{

		this.p5.line(p1.x, p1.y, p2.x, p2.y)
		return this
	}

	/************************************************************************************************************
	*  utility methods below
	*************************************************************************************************************/

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

	protected setStyle(style: IStyle): void{
		if(style.textFont){
			this.p5.textFont(style.textFont)
		}
		if(style.textSize){
			this.p5.textSize(style.textSize)
		}
		if(style.strokeWeight){
			this.p5.strokeWeight(style.strokeWeight)
		}
		if(style.lineDash !== undefined){
			// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
			this.p5.drawingContext.setLineDash(Array.isArray(style.lineDash) ? style.lineDash : [])
		}
		if(style.fill !== undefined){
			if(style.fill instanceof P5.Color){
				this.p5.fill(style.fill)

			}else if(typeof style.fill === 'string'){
				this.p5.fill(this.colors[style.fill])

			}else if(style.fill === true){
				this.p5.fill(this.colors['normal'])
			}else{
				this.p5.noFill()

			}
		}
		if(style.color !== undefined){
			if(style.color instanceof P5.Color){
				this.p5.color(style.color)
			}else{
				this.p5.color(this.colors[style.color])

			}
		}
	}


	protected getValue(id: Primitive): Primitive{
		if((typeof id === 'string') && id.startsWith('$')){
			const v = this.registry.getValue(id.substring(1), id)
			return v ?? id
		}else{
			return id
		}
	}
}



