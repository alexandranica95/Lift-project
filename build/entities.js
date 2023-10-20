export class ElevatorController {
    constructor(elevators, levels) {
        this.elevators = elevators;
        this.levels = levels;
    }
    callElevator() { }
    pickupElevator(destination) {
        return this.elevators[0];
    }
}
export class Elevator {
    constructor(id) {
        this.id = id;
        this.state = State.Available;
        this.signals = [];
        this.currentLevel = { value: 0 };
    }
    setLevel(levelValue) {
        this.currentLevel.value = levelValue;
    }
    move() { }
}
export var State;
(function (State) {
    State["Available"] = "Available";
    State["MovingUp"] = "Up";
    State["MovingDown"] = "Down";
})(State || (State = {}));
