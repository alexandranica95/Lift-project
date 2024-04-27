var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ElevatorController, Elevator } from '../src/entities';
describe('Scenario 1 - All elevators available', () => {
    test('all elevators level 0, called at level 2', () => {
        // Arrange
        const { elevator1, elevator2, elevatorController } = InitialSetupWithTwoElevators();
        elevator1.setLevel(0);
        elevator2.setLevel(0);
        const levelToGo = { value: 2 };
        //Act
        const result = elevatorController.pickupElevator(levelToGo);
        //Assert
        expect(result).toBe(elevator1);
    });
    test('one elevators level 1, one elevator at level 2, called at level 3', () => {
        // Arrange
        const { elevator1, elevator2, elevatorController } = InitialSetupWithTwoElevators();
        elevator1.setLevel(1);
        elevator2.setLevel(2);
        const levelToGo = { value: 3 };
        //Act
        const result = elevatorController.pickupElevator(levelToGo);
        //Arrange
        expect(result).toBe(elevator2);
    });
});
describe('Scenario 2 - One elevator available', () => {
    test('elevator1 available and elevator2 moving, called at level 2', () => {
        // Arrange
        const { elevator1, elevator2, elevatorController } = InitialSetupWithTwoElevators();
        elevator2.levelsToGoTo = [{ value: 1 }];
        const levelToGo = { value: 2 };
        //Act
        const result = elevatorController.pickupElevator(levelToGo);
        //Assert
        expect(result).toBe(elevator1);
    });
    test('elevator1 moving, elevator2 moving, elevator3 available at level 3 called at level 2', () => {
        // Arrange
        const { elevator1, elevator2, elevator3, elevatorController } = InitialSetupWithThreeElevators();
        elevator1.levelsToGoTo = [{ value: 1 }];
        elevator2.levelsToGoTo = [{ value: 3 }];
        const levelToGo = { value: 2 };
        //Act
        const result = elevatorController.pickupElevator(levelToGo);
        //Assert
        expect(result).toBe(elevator3);
    });
});
describe('Scenario 3 - None available', () => {
    test('elevator1 moving to level 1, elevator2 moving to level 3, elevator3 moving to level 4, called at level 5, should pick elevator3', () => {
        // Arrange
        const { elevator1, elevator2, elevator3, elevatorController } = InitialSetupWithThreeElevators();
        elevator1.setLevel(1);
        elevator1.levelsToGoTo = [{ value: 1 }];
        elevator2.setLevel(3);
        elevator2.levelsToGoTo = [{ value: 3 }];
        elevator3.setLevel(4);
        elevator3.levelsToGoTo = [{ value: 4 }];
        const levelToGo = { value: 5 };
        //Act
        const result = elevatorController.pickupElevator(levelToGo);
        //Assert
        expect(result).toBe(elevator3);
    });
    test('elevator1 at level 1 moving at level 5 and elevator2 moving at level 3, elevator3 moving at level 4  called at level 2', () => {
        // Arrange
        const { elevator1, elevator2, elevator3, elevatorController } = InitialSetupWithThreeElevators();
        elevator1.setLevel(5);
        elevator1.levelsToGoTo = [{ value: 4 }, { value: 2 }];
        elevator2.setLevel(3);
        elevator2.levelsToGoTo = [{ value: 4 }, { value: 5 }, { value: 3 }];
        elevator3.setLevel(4);
        elevator3.levelsToGoTo = [{ value: 4 }, { value: 1 }];
        const levelToGo = { value: 2 };
        //Act
        const result = elevatorController.pickupElevator(levelToGo);
        //Assert
        expect(result).toBe(elevator1);
    });
    test('four elevators, 8 levels, called at level 6', () => {
        // Arrange
        const { elevator1, elevator2, elevator3, elevator4, elevatorController } = InitialSetupWithFourElevators();
        elevator1.levelsToGoTo = [{ value: 4 }, { value: 2 }];
        elevator2.levelsToGoTo = [{ value: 4 }, { value: 5 }, { value: 3 }, { value: 4 }, { value: 7 }];
        elevator3.levelsToGoTo = [{ value: 4 }, { value: 1 }, { value: 8 }];
        elevator4.levelsToGoTo = [{ value: 4 }, { value: 1 }, { value: 6 }];
        const levelToGo = { value: 6 };
        //Act
        const result = elevatorController.pickupElevator(levelToGo);
        //Assert
        expect(result).toBe(elevator1);
    });
});
describe('Scenario 4 - All elevators available', () => {
    test('all elevators level 0, called at level 5', () => __awaiter(void 0, void 0, void 0, function* () {
        // Arrange
        const { elevator1, elevator2, elevatorController } = InitialSetupWithTwoElevators();
        elevator1.setLevel(0);
        elevator2.setLevel(0);
        const elevatorId = elevator1.getId();
        const levelToGo = { value: 5 };
        //Act
        yield elevatorController.callElevatorBy(elevatorId, levelToGo);
        //Assert
        expect(elevator1.currentLevel.value).toBe(5);
    }));
    test('elevators on differents levels, called at level 4', () => __awaiter(void 0, void 0, void 0, function* () {
        // Arrange
        const { elevator1, elevator2, elevatorController } = InitialSetupWithTwoElevators();
        elevator1.setLevel(1);
        elevator2.setLevel(5);
        const elevatorId = elevator2.getId();
        const levelToGo = { value: 4 };
        //Act
        yield elevatorController.callElevatorBy(elevatorId, levelToGo);
        //Assert
        expect(elevator2.currentLevel.value).toBe(4);
    }));
});
describe('Scenario 5 - elevators moving', () => {
    test.only('all elevators on differents levels, elevators called at', () => __awaiter(void 0, void 0, void 0, function* () {
        // Arrange
        const { elevator1, elevator2, elevatorController } = InitialSetupWithTwoElevators();
        elevator1.setLevel(2);
        elevator2.setLevel(1);
        //Act
        const promises = [];
        promises.push(elevatorController.callElevator({ value: 4 }));
        promises.push(elevatorController.callElevator({ value: 3 }));
        promises.push(elevatorController.callElevator({ value: 0 }));
        // Wait for all promises to resolve
        yield Promise.all(promises);
        //Assert
        expect(elevator1.currentLevel.value).toBe(4);
        expect(elevator2.currentLevel.value).toBe(0);
    }));
});
function InitialSetupWithTwoElevators() {
    const elevator1 = new Elevator('one');
    const elevator2 = new Elevator('two');
    const levels = [{ value: 0 }, { value: 1 }, { value: 2 }, { value: 3 }, { value: 4 }, { value: 5 }];
    const elevatorController = new ElevatorController([elevator1, elevator2], levels);
    return { elevator1, elevator2, elevatorController };
}
function InitialSetupWithThreeElevators() {
    const elevator1 = new Elevator('one');
    const elevator2 = new Elevator('two');
    const elevator3 = new Elevator('three');
    const levels = [{ value: 0 }, { value: 1 }, { value: 2 }, { value: 3 }, { value: 4 }, { value: 5 }];
    const elevatorController = new ElevatorController([elevator1, elevator2, elevator3], levels);
    return { elevator1, elevator2, elevator3, elevatorController };
}
function InitialSetupWithFourElevators() {
    const elevator1 = new Elevator('one');
    const elevator2 = new Elevator('two');
    const elevator3 = new Elevator('three');
    const elevator4 = new Elevator('four');
    const levels = [{ value: 0 }, { value: 1 }, { value: 2 }, { value: 3 }, { value: 4 }, { value: 5 }, { value: 6 }, { value: 7 }, { value: 8 }];
    const elevatorController = new ElevatorController([elevator1, elevator2, elevator3, elevator4], levels);
    return { elevator1, elevator2, elevator3, elevator4, elevatorController };
}
