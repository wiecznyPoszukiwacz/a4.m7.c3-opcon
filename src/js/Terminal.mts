import { Terminal } from 'xterm'
import { Readline } from 'xterm-readline'
import 'xterm/css/xterm.css'  

export class OpTerminal{

	private terminal: Terminal
	private readline: Readline
	private commandHandler: (command: string) => void


	public constructor(options = null){

		this.commandHandler = console.log

		this.terminal = new Terminal({
			tabStopWidth: 8,
			allowTransparency: true,
			fontWeight: 'normal',
			cursorBlink: true,
			theme:{
				background: '#000011ee',
			}
		})

		this.readline = new Readline()
		this.terminal.loadAddon(this.readline)

		const h = document.getElementById('terminal')
		if(!h){
			throw new Error('no #terminal element')
		}
		this.terminal.open(h)

		this.terminalRead()

	}

	public onCommand(commandHandler: (command: string) => void): void{
		this.commandHandler = commandHandler
	}

	public async terminalRead(){
		const command = await this.readline.read(">:")
		try{
			this.commandHandler(command)
		}catch(e){
			this.readline.println(e.toString())
		}
		setTimeout(() => {
			this.terminalRead()
		})

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

