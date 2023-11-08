export class ElevatorController {
  constructor(elevators: Elevator[], levels: Level[]) {
    this.elevators = elevators;
    this.levels = levels;
  }

  elevators: Elevator[];
  levels: Level[];

  callElevator() {}

  pickupElevator(destination: Level): Elevator {
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

  private findClosestMovingElevator(destination: Level) {
    const movingElevators = this.elevators;

    const numberOfLevelsToGo = movingElevators.map(
      (e) => e.levelsToGoTo.length
    );

    const minimalLevelsToGoTo = Math.min(...numberOfLevelsToGo);

    const elevatorsWithLessLevelsToGo = movingElevators.filter(
      (e) => e.levelsToGoTo.length === minimalLevelsToGoTo
    );

    const calculateDistancesToDestination = elevatorsWithLessLevelsToGo.map(
      (e) =>
        Math.abs(
          e.levelsToGoTo[e.levelsToGoTo.length - 1].value - destination.value
        )
    );

    const minimalDistanceToDestination = Math.min(
      ...calculateDistancesToDestination
    );

    const elevatorToGo = movingElevators.find((e) => {
      const lastLevelToGo = e.levelsToGoTo[e.levelsToGoTo.length - 1].value;

      return (
        Math.abs(lastLevelToGo - destination.value) ===
        minimalDistanceToDestination
      );
    });
    return elevatorToGo;
  }

  private findClosestAvailableElevator(destination: Level) {
    const availableElevators: Elevator[] = this.elevators.filter(
      (e) => e.getState() === State.Available
    );
    const distancesToDestination = availableElevators.map((e) => {
      return Math.abs(e.currentLevel.value - destination.value);
    });

    const minimalDistance = Math.min(...distancesToDestination);

    const availableElevator = availableElevators.find((e) => {
      return (
        Math.abs(e.currentLevel.value - destination.value) === minimalDistance
      );
    });
    return availableElevator;
  }
}

export class Elevator {
  constructor(id: string) {
    this.id = id;
    this.levelsToGoTo = [];
    this.currentLevel = { value: 0 };
  }

  private id: string;
  levelsToGoTo: Level[];
  currentLevel: Level;

  toString(): string {
    return `Elevator: ${this.id} with state ${this.getState()}`;
  }

  setLevel(levelValue: number) {
    this.currentLevel.value = levelValue;
  }
  
  getState(): State{
    return this.levelsToGoTo.length === 0? State.Available: State.Moving
  }

  move() {}
}

export interface Level {
  value: number;
}

export enum State {
  Available = "Available",
  Moving = "Moving",
}
