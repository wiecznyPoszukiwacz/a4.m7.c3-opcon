import './js/Display.mjs'
import './style/style.css'  

import { OpTerminal } from './js/Terminal.mjs'
import { Environment} from './js/Environment.mjs'

const terminal = new OpTerminal()

const environment = new Environment()
environment.setTerminal(terminal)

terminal.onCommand((command: string)=>{
	environment.execute(command)
})
