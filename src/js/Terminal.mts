import { Terminal } from 'xterm'
import { Readline } from 'xterm-readline'
import { FitAddon } from 'xterm-addon-fit'
import 'xterm/css/xterm.css'  

import WebFont from 'webfontloader'
import { IScreenContainter } from './types.mjs'

export class OpTerminal{

	private terminal: Terminal
	private readline: Readline
	private commandHandler: (mode: string, command: string) => void

	protected prompts: Record<string, string> = {
		'local':  ' ',
		'server': '󰤉 ',
		'script': ' '
	}

	protected serverPrompt: string = ''
	protected allowedModes: Array<string> = ['local', 'server', 'script']
	protected mode: string = 'server'
	private prompt: string = '>:'

	public constructor(container: IScreenContainter){

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
			fontSize: 15,
			cursorBlink: true,
			theme:{
				background: '#00001100',
			}
		})
		this.readline = new Readline()
		this.terminal.loadAddon(this.readline)
		
		const fitAddon = new FitAddon()
		this.terminal.loadAddon(fitAddon)

		setTimeout(()=>{
			this.terminal.open(container.domElement)
			fitAddon.fit()
			this.terminal.focus()
			void this.terminalRead()
				
		}, 1500)
	}

	public onCommand(commandHandler: (mode: string, command: string) => void): void{
		this.commandHandler = commandHandler
	}

	public configure(cfg: unknown): void{
		// if(cfg.prompt){
		// 	this.serverPrompt = cfg.prompt
		// 	this.setPrompt(this.prompts[this.mode] + this.serverPrompt )
		// }

	}

	protected executeControlCommand(command:string):void{

		const [cmd, args] = command.substring(1).split(' ')
		if(cmd === 'mode'){
			this.mode = args
		}
	}

	public async terminalRead(): Promise<void>{
		const command = await this.readline.read(this.prompts[this.mode])
		try{
			if(command.startsWith('/')){
				this.executeControlCommand(command)
			}else{
				this.commandHandler(this.mode, command)
			}

		}catch(e){
			if(e instanceof Error){
				this.line(e.message)
			}else{
				this.line('unknown error')
			}
		}
		setTimeout(() => {
			void this.terminalRead()
		}, 200)

	}

	public line(text: string):void{
		this.readline.println(text)
	}
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public dir(value: Record<string, any>, indent: number = 0): void{

		for(const pname in value){
			if(typeof value[pname] === 'object'){
				this.line('  '.repeat(indent) + `${pname} [object]`)
				// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
				this.dir(value[pname], indent + 1)
			}else{
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore
				this.line(' '.repeat(indent) + `${pname}: ${value[pname]}`)
			}
		}
	}

	public output(data:Array<string> | string):void{

		if(Array.isArray(data)){
			for(const line of data){
				this.line(line)
			}
		}else{
			this.line(data)
		}
	}
}

