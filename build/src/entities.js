export class ElevatorController {
    constructor(elevators, levels) {
        this.elevators = elevators;
        this.levels = levels;
    }
    elevators;
    levels;
    async callElevator(destination) {
        const elevator = this.pickupElevator(destination);
        elevator.levelsToGoTo.push(destination);
        if (elevator.levelsToGoTo.length === 1) {
            await elevator.move();
        }
    }
    async callElevatorBy(elevatorId, destination) {
        const elevator = this.elevators.find(e => e.id === elevatorId);
        if (!elevator) {
            console.log(`Unkown elevator: ${elevatorId}`);
            return;
        }
        elevator.levelsToGoTo.push(destination);
        if (elevator.levelsToGoTo.length === 1) {
            await elevator.move();
        }
    }
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
    id;
    levelsToGoTo;
    currentLevel;
    getId() {
        return this.id;
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
    async move() {
        while (this.levelsToGoTo.length > 0) {
            await this.moveToLevel(this.levelsToGoTo[0]);
            this.levelsToGoTo.shift();
        }
    }
    async moveToLevel(destination) {
        const direction = this.currentLevel.value > destination.value ? (-1) : 1;
        while (this.currentLevel.value !== destination.value) {
            await this.moveByOneLevel(direction);
        }
    }
    async moveByOneLevel(direction) {
        return new Promise((resolve) => {
            setTimeout(() => {
                this.currentLevel.value = this.currentLevel.value + direction;
                console.log(`i am elevator ${this.id} and i am now at level ${this.currentLevel.value}`);
                resolve();
            }, 2000);
        });
    }
}
export var State;
(function (State) {
    State["Available"] = "Available";
    State["Moving"] = "Moving";
})(State || (State = {}));
