import { IIncomingData } from "./types.mjs"

export class Machinarium{

	protected ws!: WebSocket

	public constructor(protected url: string, protected dataHandler:(data: IIncomingData) => void){
		this.connect(url)
	}

	public send(type: string, data:unknown): void{
		this.ws.send(JSON.stringify({
			type,
			data
		}))

	}

	protected connect(url: string): void{

		this.ws = new WebSocket(url)

		this.ws.onopen = (_event) => {
			//this.terminal.line('connected to server')
		}

		this.ws.onclose = (_e: unknown): void => {
			setTimeout(()=> {
				this.connect(url)
			}, 1000)
		}
		this.ws.onmessage = (message: {data:string}) => {
			this.dataHandler(JSON.parse(message.data) as IIncomingData)
		}
	}


}
