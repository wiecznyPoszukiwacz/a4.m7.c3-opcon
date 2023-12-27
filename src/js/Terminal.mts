import { Terminal } from 'xterm'
import { Readline } from 'xterm-readline'
import 'xterm/css/xterm.css'  

import WebFont from 'webfontloader'

export class OpTerminal{

	private terminal: Terminal
	private readline: Readline
	private commandHandler: (command: string) => void

	private prompt: string = '>:'

	public constructor(_options = null){
		const h = document.getElementById('terminal')
		if(!h){
			throw new Error('no #terminal element')
		}

		WebFont.load({
			custom: {
				families: ['Agave Nerd Font']
			}
		})

		this.commandHandler = console.log

		this.terminal = new Terminal({
			tabStopWidth: 8,
			allowTransparency: true,
			fontWeight: '100',
			fontFamily: 'Agave Nerd Font',
			fontSize: 20,
			cursorBlink: true,
			theme:{
				background: '#000011ee',
			}
		})
		this.readline = new Readline()
		this.terminal.loadAddon(this.readline)

		setTimeout(()=>{
			this.terminal.open(h)
			this.terminal.focus()
			this.terminalRead()
				
		}, 1500)
	}

	setPrompt(prompt: string){
		this.prompt = prompt
	}

	public onCommand(commandHandler: (command: string) => void): void{
		this.commandHandler = commandHandler
	}

	public async terminalRead(){
		const command = await this.readline.read(this.prompt)
		try{
			this.commandHandler(command)
		}catch(e){
			if(e instanceof Error){
				this.line(e.message)
			}else{
				this.line('unknown error')
			}
		}
		setTimeout(() => {
			this.terminalRead()
		}, 200)

	}

	public line(text: string){
		this.readline.println(text)
	}
	public dir(value: any, indent: number = 0){

		for(const pname in value){
			if(typeof value[pname] === 'object'){
				this.line('  '.repeat(indent) + `${pname} [object]`)
				this.dir(value[pname], indent + 1)
			}else{
				this.line(' '.repeat(indent) + `${pname}: ${value[pname]}`)
			}
		}
	}
}

