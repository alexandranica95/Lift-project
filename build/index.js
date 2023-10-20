import { ElevatorController, Elevator, State } from './entities.js';
// Initial State
const elevator1 = new Elevator('one');
const elevator2 = new Elevator('two');
const levels = [{ value: 0 }, { value: 1 }, { value: 2 }, { value: 3 }, { value: 4 }, { value: 5 }];
const elevatorController = new ElevatorController([elevator1, elevator2], levels);
console.log(elevatorController.elevators);
console.log(elevatorController.levels);
// PickupElevator Testing
console.log('pickupElevator Testing');
//Scenario 1 - Destination Level 2, Both Elevators at level 0, Available
console.log('Scenario 1 - Both Elevators at level 0, Available');
elevator1.setLevel(0);
elevator1.state = State.Available;
elevator2.setLevel(0);
elevator2.state = State.Available;
const pickedUpElevator = elevatorController.pickupElevator({ value: 2 });
console.log(pickedUpElevator);
//Scenario 2 -  Destination Level 2, Both Elevators at level 0, the second elevator Available
console.log('Scenario 2 -  Destination Level 2, Both Elevators at level 0, the second elevator Available');
elevator1.setLevel(0);
elevator1.state = State.MovingUp;
elevator2.setLevel(0);
elevator2.state = State.Available;
const scenario2PickupElevator = elevatorController.pickupElevator({ value: 2 });
console.log(scenario2PickupElevator);
//Scenario 3 - Destination Level 2, One Elevator At Level 2, One At Level 3, both Available
console.log('Scenario 3 - Destination Level 2, One Elevator At Level 2, One At Level 3, both Available');
elevator1.setLevel(2);
elevator1.state = State.Available;
elevator2.setLevel(3);
elevator2.state = State.Available;
const scenario3PickupElevator = elevatorController.pickupElevator({ value: 2 });
console.log(scenario3PickupElevator);
