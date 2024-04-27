var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class ElevatorController {
    constructor(elevators, levels) {
        this.elevators = elevators;
        this.levels = levels;
    }
    addLevelToGoLabel(buttonText, labelClass) {
        var _a;
        const createNewDiv = document.createElement("div");
        createNewDiv.className = "level-queued";
        createNewDiv.textContent = buttonText;
        (_a = document.querySelector(labelClass)) === null || _a === void 0 ? void 0 : _a.appendChild(createNewDiv);
    }
    callElevator(destination) {
        return __awaiter(this, void 0, void 0, function* () {
            const elevator = this.pickupElevator(destination);
            elevator.levelsToGoTo.push(destination);
            this.addLevelToGoLabel(destination.value.toString(), `label`);
            if (elevator.levelsToGoTo.length === 1) {
                yield elevator.move();
            }
        });
    }
    callElevatorBy(elevatorId, destination) {
        return __awaiter(this, void 0, void 0, function* () {
            const elevator = this.elevators.find((e) => e.id === elevatorId);
            if (!elevator) {
                console.log(`Unkown elevator: ${elevatorId}`);
                return;
            }
            elevator.levelsToGoTo.push(destination);
            this.addLevelToGoLabel(destination.value.toString(), `.${elevatorId}-label`);
            if (elevator.levelsToGoTo.length === 1) {
                yield elevator.move();
            }
        });
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
    removeDestination(labelClass) {
        const divChild = document.querySelector(labelClass);
        divChild === null || divChild === void 0 ? void 0 : divChild.removeChild(divChild.querySelectorAll("div")[0]);
    }
    move() {
        return __awaiter(this, void 0, void 0, function* () {
            while (this.levelsToGoTo.length > 0) {
                yield this.moveToLevel(this.levelsToGoTo[0]);
                this.levelsToGoTo.shift();
                this.removeDestination(`.${this.id}-label`);
            }
        });
    }
    moveToLevel(destination) {
        return __awaiter(this, void 0, void 0, function* () {
            const direction = this.currentLevel.value > destination.value ? -1 : 1;
            while (this.currentLevel.value !== destination.value) {
                yield this.moveByOneLevel(direction);
            }
        });
    }
    moveByOneLevel(direction) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => {
                setTimeout(() => {
                    this.currentLevel.value = this.currentLevel.value + direction;
                    console.log(`i am elevator ${this.id} and i am now at level ${this.currentLevel.value}`);
                    resolve();
                }, 2000);
            });
        });
    }
}
export var State;
(function (State) {
    State["Available"] = "Available";
    State["Moving"] = "Moving";
})(State || (State = {}));
