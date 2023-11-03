export class ElevatorController{
    constructor(elevators: Elevator[], levels: Level[]) {
        this.elevators = elevators;
        this.levels = levels;
    }

    elevators: Elevator[];
    levels: Level[];

    callElevator(){

    }

    pickupElevator(destination: Level): Elevator[]{

       
    const availableElevator: Elevator[] = this.elevators.filter(e => e.state = State.Available)
    console.log("========this are the available elevators=========" + availableElevator)
    
    // // const minimalNumber = Math.min(availableElevator)
    //     const theMinimalNumber = availableElevator.map(e => e.currentLevel - e.signals)
    return availableElevator;
    }
}

export class Elevator {

    constructor(id: string){
        this.id = id;
        this.state = State.Available;
        this.signals = [];
        this.currentLevel = {value: 0}; 
    }

    id: string;
    state: State;
    signals: Level[];
    currentLevel: Level;

    toString(): string{
        return `Elevator: ${this.id} with state ${this.state}`;
    }

    setLevel(levelValue: number){
        this.currentLevel.value = levelValue;
    }

    move(){
        
    }
}

export interface Level{
    value: number;
}

export enum State {
    Available = 'Available',
    Moving = 'Moving',
}

