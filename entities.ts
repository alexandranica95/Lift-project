export class ElevatorController{
    constructor(elevators: Elevator[], levels: Level[]) {
        this.elevators = elevators;
        this.levels = levels;
    }

    elevators: Elevator[];
    levels: Level[];

    callElevator(){}

    pickupElevator(destination: Level): Elevator{
        return this.elevators[0];
    }
}

export class Elevator {

    constructor(id: string){
        this.id = id;
        this.state = State.Available;
        this.signals = [];
        this.currentLevel = {value: 0};
    }

    id: string
    state: State
    signals: Level[]
    currentLevel: Level

    setLevel(levelValue: number){
        this.currentLevel.value = levelValue;
    }

    move(){}
}

export interface Level{
    value: number;
}

export enum State {
    Available = 'Available',
    MovingUp = 'Up',
    MovingDown = 'Down',
}
