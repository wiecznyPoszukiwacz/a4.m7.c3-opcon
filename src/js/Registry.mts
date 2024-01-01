import { FlatList, IIncomingData } from "./types.mjs";

export class Registry{

	protected registry: Map<string, string | number | null | boolean> = new Map()


	public getRegistry(): Map<string, string | number | boolean | null>{
		return this.registry
	}

	public getValue(name: string, defaultValue: string | number | boolean | null = null): string | number | boolean | null | undefined{

		if(this.registry.has(name)){
			return this.registry.get(name)
		}else{
			return defaultValue
		}

	}

	public update(data: {[key: string]: FlatList}): void{

		for(const device in data){
			for(const metric in data[device]){

				const key = `${device}.${metric}`
				this.registry.set(key, data[device][metric])

			}
		}

	}
}
