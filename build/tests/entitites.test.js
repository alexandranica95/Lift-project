import { ElevatorController, Elevator, State } from '../src/entities';
describe('Scenario 1 - All elevators available', () => {
    test('all elevators level 0, called at level 2', () => {
        const { elevator1, elevator2, elevatorController } = InitialSetup();
        elevator1.setLevel(0);
        elevator1.state = State.Available;
        elevator2.setLevel(0);
        elevator2.state = State.Available;
        const levelToGo = { value: 2 };
        expect(elevatorController.pickupElevator(levelToGo)).toBe(elevator1);
    });
    test('one elevators level 1, one elevator at level 2, called at level 3', () => {
        const { elevator1, elevator2, elevatorController } = InitialSetup();
        elevator1.setLevel(1);
        elevator1.state = State.Available;
        elevator2.setLevel(2);
        elevator2.state = State.Available;
        const levelToGo = { value: 3 };
        expect(elevatorController.pickupElevator(levelToGo)).toBe(elevator2);
    });
});
function InitialSetup() {
    const elevator1 = new Elevator('one');
    const elevator2 = new Elevator('two');
    const levels = [{ value: 0 }, { value: 1 }, { value: 2 }, { value: 3 }, { value: 4 }, { value: 5 }];
    const elevatorController = new ElevatorController([elevator1, elevator2], levels);
    return { elevator1, elevator2, elevatorController };
}
