export type Primitive = string | number | boolean

export type FlatList = Record<string, Primitive>

export type Report = Record<string, Record<string, string | number | boolean>>


export type IIncomingData = {
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

export type IScreenContainter = {
	domElement: HTMLDivElement
	id: string
	width: number
	height: number
}
export type IWidgetDataLink = {
	widget: string
	metric: string
	device: string
	value: string
}
