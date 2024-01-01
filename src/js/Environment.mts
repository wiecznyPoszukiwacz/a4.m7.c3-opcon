import { Display } from './Display.mjs'
import { OpTerminal } from './Terminal.mjs'
import { FlatList, IIncomingData } from './types.mjs'
//import { Explorer } from './explorer/explorer.mjs'
import { Machinarium } from './Machinarium.mjs'
import { LayoutManager } from './LayoutManager.mjs'
import { Registry } from './Registry.mjs'


export class Environment{

	protected terminal: OpTerminal | null
	protected display: Display | null
	//protected explorer: Explorer
	protected machinarium: Machinarium

	protected registry: Registry


	protected useTerminal = true
	protected useDisplay = true

	protected layoutManager!: LayoutManager

	public constructor(){
		this.registry = new Registry()
		
		this.layoutManager = new LayoutManager()

		if(this.useDisplay){
			const displayElement = this.layoutManager.createBlock('display')
			this.display = new Display(displayElement, this.registry)
		}else{
			this.display = null
		}

		if(this.useTerminal){
			const terminalElement = this.layoutManager.createBlock('terminal')
			this.terminal = new OpTerminal(terminalElement)

			this.terminal.onCommand((mode: string, command: string)=>{
				if(mode === 'server'){
					this.executeServerCommand(command)
				}else{
					this.executeLocalCommand(command)
				}
			})
		}else{
			this.terminal = null
		}

		const sceneElement = this.layoutManager.createBlock('scene')
		//this.explorer = new Explorer(sceneElement)
		


		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		this.machinarium = new Machinarium(process.env.MACHINARIUM_URL ?? '', (data: IIncomingData) => {
			this.handleIncomingData(data)
		})

	}



	protected handleIncomingData(data: IIncomingData):void{

		if(data.type === 'terminalOutput'&& this.terminal){
			this.terminal.output(data.data)

		}else if(data.type === 'report'){
			this.registry.update(data.data)


		}else if(data.type === 'config'){
			if(this.terminal){
				this.terminal.configure(data.data)
			}
		}else{
			if(this.terminal){
				this.terminal.line(`received unknown data packet ${JSON.stringify(data)}`)
			}
		}

	}

	protected executeLocalCommand(command: string): void{
		if(command === 'report' && this.terminal){
			for(const [name, value] of this.registry.getRegistry()){
				this.terminal.line(`${name} ${value}`)
			}
		}
	}

	protected executeServerCommand(command: string):void{
		this.machinarium.send('userCommand', command)
	}

	protected executeScript(command: string): void{
		return 

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
