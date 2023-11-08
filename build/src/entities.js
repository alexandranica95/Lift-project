export class ElevatorController {
    constructor(elevators, levels) {
        this.elevators = elevators;
        this.levels = levels;
    }
    callElevator() { }
    pickupElevator(destination) {
        const availableElevator = this.findClosestAvailableElevator(destination);
        if (availableElevator) {
            return availableElevator;
        }
        const movingElevatorToGo = this.findClosestMovingElevator(destination);
        if (!movingElevatorToGo) {
            throw new Error("No elevator found");
        }
        return movingElevatorToGo;
    }
    findClosestMovingElevator(destination) {
        const movingElevators = this.elevators;
        const numberOfLevelsToGo = movingElevators.map((e) => e.levelsToGoTo.length);
        const minimalLevelsToGoTo = Math.min(...numberOfLevelsToGo);
        const elevatorsWithLessLevelsToGo = movingElevators.filter((e) => e.levelsToGoTo.length === minimalLevelsToGoTo);
        const calculateDistancesToDestination = elevatorsWithLessLevelsToGo.map((e) => Math.abs(e.levelsToGoTo[e.levelsToGoTo.length - 1].value - destination.value));
        const minimalDistanceToDestination = Math.min(...calculateDistancesToDestination);
        const elevatorToGo = movingElevators.find((e) => {
            const lastLevelToGo = e.levelsToGoTo[e.levelsToGoTo.length - 1].value;
            return (Math.abs(lastLevelToGo - destination.value) ===
                minimalDistanceToDestination);
        });
        return elevatorToGo;
    }
    findClosestAvailableElevator(destination) {
        const availableElevators = this.elevators.filter((e) => e.getState() === State.Available);
        const distancesToDestination = availableElevators.map((e) => {
            return Math.abs(e.currentLevel.value - destination.value);
        });
        const minimalDistance = Math.min(...distancesToDestination);
        const availableElevator = availableElevators.find((e) => {
            return (Math.abs(e.currentLevel.value - destination.value) === minimalDistance);
        });
        return availableElevator;
    }
}
export class Elevator {
    constructor(id) {
        this.id = id;
        this.levelsToGoTo = [];
        this.currentLevel = { value: 0 };
    }
    toString() {
        return `Elevator: ${this.id} with state ${this.getState()}`;
    }
    setLevel(levelValue) {
        this.currentLevel.value = levelValue;
    }
    getState() {
        return this.levelsToGoTo.length === 0 ? State.Available : State.Moving;
    }
    move() { }
}
export var State;
(function (State) {
    State["Available"] = "Available";
    State["Moving"] = "Moving";
})(State || (State = {}));
