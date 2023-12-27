import './js/Display.mjs'
import './style/style.css'  

import { OpTerminal } from './js/Terminal.mjs'
import { Environment} from './js/Environment.mjs'
import { Display } from './js/Display.mjs'

const terminal = new OpTerminal()

const display = new Display()

const environment = new Environment()
environment.setTerminal(terminal)
environment.setDisplay(display)

terminal.onCommand((command: string)=>{
	environment.execute(command)
})

