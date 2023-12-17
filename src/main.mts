import './js/Display.mts'
import './style/style.css'  

import { OpTerminal } from './js/Terminal.mts'
import { Environment} from './js/Environment.mts'

const terminal = new OpTerminal()

const environment = new Environment()
environment.setTerminal(terminal)

terminal.onCommand((command: string)=>{
	environment.execute(command)
})
