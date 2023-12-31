import { ElevatorController, Elevator, Level, State } from './entities.js';


// Initial State
const elevator1 = new Elevator('one')
const elevator2 = new Elevator('two')
const levels: Level[] = [{value: 0}, {value: 1}, {value: 2}, {value: 3}, {value: 4}, {value: 5}]

const elevatorController = new ElevatorController([elevator1, elevator2], levels);

(async () => {
        elevatorController.callElevator({value: 5})
        setTimeout(() => {
            elevatorController.callElevator({value: 2})
        }, 3000)
})();


console.log("ceva")