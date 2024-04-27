export class ElevatorController {
  constructor(elevators: Elevator[], levels: Level[]) {
    this.elevators = elevators;
    this.levels = levels;
  }

  elevators: Elevator[];
  levels: Level[];

  addLevelToGoLabel(destination: string, labelClass: string) {
    const createNewDiv = document.createElement("div");
    createNewDiv.className = "level-queued";
    createNewDiv.textContent = destination;
    document.querySelector(labelClass)?.appendChild(createNewDiv);
  }

  async callElevator(destination: Level) {
    const elevator = this.pickupElevator(destination);

    elevator.levelsToGoTo.push(destination);

    let elevatorLabel = "";
    if (elevator.id === "one") {
      elevatorLabel = ".one-label";
    } else {
      elevatorLabel = ".two-label";
    }

    this.addLevelToGoLabel(destination.value.toString(), elevatorLabel);

    if (elevator.levelsToGoTo.length === 1) {
      await elevator.move();
    }
  }

  async callElevatorBy(elevatorId: string, destination: Level) {
    const elevator = this.elevators.find((e) => e.id === elevatorId);

    if (!elevator) {
      console.log(`Unkown elevator: ${elevatorId}`);
      return;
    }

    elevator.levelsToGoTo.push(destination);

    this.addLevelToGoLabel(
      destination.value.toString(),
      `.${elevatorId}-label`
    );

    if (elevator.levelsToGoTo.length === 1) {
      await elevator.move();
    }
  }

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

  id: string;
  levelsToGoTo: Level[];
  currentLevel: Level;

  getId(): string {
    return this.id;
  }

  toString(): string {
    return `Elevator: ${this.id} with state ${this.getState()}`;
  }

  setLevel(levelValue: number) {
    this.currentLevel.value = levelValue;
  }

  getState(): State {
    return this.levelsToGoTo.length === 0 ? State.Available : State.Moving;
  }

  private removeDestination(labelClass: string) {
    const divChild = document.querySelector(labelClass);
    divChild?.removeChild(divChild.querySelectorAll("div")[0]);
  }

  async move() {
    while (this.levelsToGoTo.length > 0) {
      await this.moveToLevel(this.levelsToGoTo[0]);

      this.levelsToGoTo.shift();
      this.removeDestination(`.${this.id}-label`);
    }
  }

  private async moveToLevel(destination: Level) {
    this.elevatorAnimation(destination);

    const direction = this.currentLevel.value > destination.value ? -1 : 1;

    while (this.currentLevel.value !== destination.value) {
      await this.moveByOneLevel(direction);
    }
  }

  elevatorAnimation(destination: Level) {
    let whereToGo = destination.value * 114;

    // Accessing CSS properties of an element
    const elevator = document.getElementById("elevator-" + this.id);

    elevator!.style.transform = `translateY(-${whereToGo}px)`;

    let timeToGo = Math.abs((destination.value - this.currentLevel.value) * 2);
    elevator!.style.transition = `transform ${timeToGo}s linear`;
  }

  private async moveByOneLevel(direction: number): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.currentLevel.value = this.currentLevel.value + direction;
        console.log(
          `i am elevator ${this.id} and i am now at level ${this.currentLevel.value}`
        );
        resolve();
      }, 2000);
    });
  }
}

export interface Level {
  value: number;
}

export enum State {
  Available = "Available",
  Moving = "Moving",
}
