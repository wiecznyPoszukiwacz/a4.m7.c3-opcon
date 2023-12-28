import { Display } from './Display.mjs'
import { OpTerminal } from './Terminal.mjs'
import { Widget } from './Widget.mjs'
import { FlatList } from './types.mjs'
import { GroundView } from './widgets/Ground.mjs'
import { Label } from "./widgets/Label.mjs"
import { VMeter } from './widgets/VMeter.mjs'

type IIncomingData = {
	type: 'terminalOutput',
	data: string | Array<string>
} | {
	type: 'config',
	data: {
		prompt?: string
	}
} | {
	type: 'report',
	data: {
		[key:string]: FlatList
	}
}

export type IWidgetDataLink = {
	widget: string
	metric: string
	device: string
	value: string
}

export class Environment{

	protected terminal!: OpTerminal
	protected display!: Display
	protected ws!: WebSocket

	protected allowedModes: Array<string> = ['local', 'server', 'script']
	protected mode: string = 'server'

	protected serverPrompt: string = ''

	protected dataLinks: Array<IWidgetDataLink> = []

	public report: {[key:string]:FlatList} = {}

	protected prompts: Record<string, string> = {
		'local':  ' ',
		'server': '󰤉 ',
		'script': ' '
	}

	public constructor(){
		this.dataLinks.push({
			widget: 'm1', 
			metric: 'value',
			device: 'AC878',
			value: 'level'
		})
		this.dataLinks.push({
			widget: 'gv', 
			metric: 'starAngle',
			device: 'W0',
			value: 'starAngle'
		})
		this.dataLinks.push({
			widget: 'lb', 
			metric: 'text',
			device: 'AC878',
			value: 'charge'
		})
		this.connect()
	}

	protected connect(): void{
		// @ts-ignore
		this.ws = new WebSocket(process.env.MACHINARIUM_URL ?? '')

		this.ws.onopen = (_event) => {
			this.terminal.line('connected to server')
		}

		this.ws.onclose = (_e: any) => {
			setTimeout(()=> {
				this.connect()
			}, 1000)
		}
		this.ws.onmessage = (message) => {
			this.handleIncomingData(JSON.parse(message.data))
		}
	}

	protected handleIncomingData(data: IIncomingData){

		if(data.type === 'terminalOutput'){
			if(Array.isArray(data.data)){
				for(const line of data.data){
					this.terminal.line(line)
				}
			}else{
				this.terminal.line(data.data)
			}
		}else if(data.type === 'report'){
			this.report = data.data

			for(let link of this.dataLinks){
				let v: FlatList = {}
				v[link.metric] = this.report[link.device][link.value]
				const widget = this.getWidget(link.widget)
				if(widget){
					widget.setup(v)
				}
			}

		}else if(data.type === 'config'){
			if(data.data.prompt){
				this.serverPrompt = data.data.prompt
				this.terminal.setPrompt(this.prompts[this.mode] + this.serverPrompt )
			}
		}else{
			this.terminal.line(`received unknown data packet ${JSON.stringify(data)}`)
		}

	}

	protected getWidget(id: string): Widget | null | undefined {
		if(this.display.widgets.has(id)){
			return this.display.widgets.get(id)
		}else{
			return null
		}
	}


	public setTerminal(terminal: OpTerminal): void{
		this.terminal = terminal
		this.terminal.setPrompt(this.prompts[this.mode] + this.serverPrompt )
	}

	public setDisplay(display: Display): void{
		this.display = display

			
		display.addWidget('gv', new GroundView({
			w: 150, h: 150, x: 10, y: 10
		}))


		display.addWidget('m1', new VMeter({
			w: 20, h: 150, x: 170, y: 10, margin: 0, border: 0}, {
				bars: 20,
				space: 6
			}
		))

		display.addWidget('lb', new Label({
			w: 100, h: 20, x: 230, y: 30, border: 0, margin: 0
		}, {label: 'charge', text: '78%', invert: true, unit: '', invertMargin: 5}))

		display.addWidget('lb2', new Label({
			w: 100, h: 20, x: 230, y: 52, border: 1, margin: 0
		}, {label: 'charge', text: '78%', invert: false, unit: '', invertMargin: 0}))
	}

	public execute(command: string): void{

		let answer: string = ''
		if(command.startsWith('/')){
			this.executeControlCommand(command)

		}else if(this.mode === 'local'){
			answer = this.executeLocalCommand(command)

		}else if(this.mode === 'server'){
			answer = this.executeServerCommand(command)

		}else if(this.mode === 'script'){
			answer = this.executeScript(command)
		}

		this.terminal.line(answer)
	}

	protected executeLocalCommand(command: string){
		if(command === 'report'){
			this.terminal.dir(this.report)
		}
		return ''
	}

	protected executeServerCommand(command: string){

		this.ws.send(JSON.stringify({
			type: 'userCommand',
			command
		}))

		return ''
	}

	protected executeControlCommand(command: string){

		const [cmd, args] = command.substring(1).split(' ')
		if(cmd === 'mode'){
			this.mode = args
			this.terminal.setPrompt(this.prompts[this.mode])
		}
	}

	protected executeScript(command: string){
		return ''

		/*
		const ast = acorn.parse(command, {ecmaVersion: 2024})

		let scope = {
			a: (p) => p*5,
			b: 7
		}

		const getNodeValue = (node: acorn.Node) => {
			if(node.type === 'Literal'){

				return (node as Literal).value

			}else if(node.type === 'Identifier'){

				const n = (node as acorn.Identifier)
				return scope[n.name]

			}else if(node.type === 'CallExpression'){
				const n = (node as acorn.CallExpression)

				const callee = getNodeValue(n.callee)
				const args = n.arguments.map(n => getNodeValue(n))

				let wynik = callee(...args)
				return wynik

			}else if(node.type === 'Program'){
			}else if(node.type === 'ExpressionStatement'){
				/*
				const n = (node as acorn.ExpressionStatement)

				return getNodeValue(n.expression)
				* /
			       return null

			}else{
				this.terminal.line('---- unknown node type')
				this.terminal.dir(node)
				return null
			}
		}

		awalk.full(ast, (node) => {
			let value = getNodeValue(node)
			this.terminal.line(value?.toString() ?? '-no-value-')
		})
		*/

	}
}
