import * as acorn  from 'acorn'
import * as awalk  from 'acorn-walk'
import { OpTerminal } from './Terminal.mjs'
import { Literal } from 'acorn'

export class Environment{

	protected terminal: OpTerminal

	public setTerminal(terminal: OpTerminal){
		this.terminal = terminal
	}

	public execute(command: string){

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
				*/
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

	}
}
