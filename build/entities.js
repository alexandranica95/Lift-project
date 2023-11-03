export class ElevatorController {
    constructor(elevators, levels) {
        this.elevators = elevators;
        this.levels = levels;
    }
    callElevator() {
    }
    pickupElevator(destination) {
        const availableElevator = this.elevators.filter(e => e.state = State.Available);
        console.log("========this are the available elevators=========" + availableElevator);
        // // const minimalNumber = Math.min(availableElevator)
        //     const theMinimalNumber = availableElevator.map(e => e.currentLevel - e.signals)
        return availableElevator;
    }
}
export class Elevator {
    constructor(id) {
        this.id = id;
        this.state = State.Available;
        this.signals = [];
        this.currentLevel = { value: 0 };
    }
    toString() {
        return `Elevator: ${this.id} with state ${this.state}`;
    }
    setLevel(levelValue) {
        this.currentLevel.value = levelValue;
    }
    move() {
    }
}
export var State;
(function (State) {
    State["Available"] = "Available";
    State["Moving"] = "Moving";
})(State || (State = {}));
