import { Elevator, ElevatorController, Level, State } from "./entities.js";

export function RunTests(){
    pickupElevator_destinationLevel2_when_bothElevatorsAtLevel0Available_shouldReturnElevator1()
    pickupElevator_destinationLevel2_when_bothElevatorsAtLevel0_andSecondElevatorAvailable_shouldReturnElevator2()
    pickupElevator_destinationLevel2_when_firstElvetorIsAtLevel3_andSecondElevatorAtLevel4_shouldReturnElevator1()
    pickupElevator_destinationLevel1_when_firstElvetorIsAtLevel2_andSecondElevatorAtLevel_shouldReturnElevator2()
    pickupElevator_destinationLevel1_when_firstElvetorIsAtLevel2_andSecondElevatorAtLevel1_shouldReturnElevator1()
}

// PickupElevator Testing
console.log('==========pickupElevator Testing==========')
console.log('==========================================')

//Scenario 1 - Destination Level 2, Both Elevators at level 0, Available
function pickupElevator_destinationLevel2_when_bothElevatorsAtLevel0Available_shouldReturnElevator1(){
    console.log('==========================================')
    console.log('Scenario 1 - Both Elevators at level 0, Available')
    
    //Arrange
    const { elevator1, elevator2, elevatorController } = InitialSetup();

    elevator1.setLevel(0);
    elevator1.state = State.Available;
    
    elevator2.setLevel(0);
    elevator2.state = State.Available;
    
    //Act
    const pickedUpElevator = elevatorController.pickupElevator({value: 2});

    //Assert
    console.log("this should be elevator1: "  + pickedUpElevator)
}


//Scenario 2 -  Destination Level 2, Both Elevators at level 0, the second elevator Available
function pickupElevator_destinationLevel2_when_bothElevatorsAtLevel0_andSecondElevatorAvailable_shouldReturnElevator2(){
    console.log('==========================================')
    console.log('Scenario 2 - Destination Level 2, Both Elevators at level 0, the second elevator Available')

    //Arrange
    const { elevator1, elevator2, elevatorController } = InitialSetup();

    elevator1.setLevel(0);
    elevator1.state = State.Moving;
    
    elevator2.setLevel(0);
    elevator2.state = State.Available;
    
    //Act
    const pickedUpElevator = elevatorController.pickupElevator({value: 2});

    pickedUpElevator.toString()
    //Assert
    console.log("this should be elevator2: "  + pickedUpElevator.toString())
}

//Scenario 3 -  Destination Level 2, first elevator at level 3, the second elevator at level 4//
function pickupElevator_destinationLevel2_when_firstElvetorIsAtLevel3_andSecondElevatorAtLevel4_shouldReturnElevator1(){
    console.log('==========================================')
    console.log('Scenario 3 - Destination Level 2, first elevator at level 3, the second elevator at level 4')

    //Arrange
    const { elevator1, elevator2, elevatorController } = InitialSetup();

    elevator1.setLevel(3);
    elevator1.state = State.Available;
    
    elevator2.setLevel(4);
    elevator2.state = State.Moving;
    
    //Act
    const pickedUpElevator = elevatorController.pickupElevator({value: 2});

    pickedUpElevator.toString()
    //Assert
    console.log("this should be elevator1: "  + pickedUpElevator.toString())
}


//Scenario 4 -  Destination Level 1, first elevator at level 2, the second elevator at level 0//
function pickupElevator_destinationLevel1_when_firstElvetorIsAtLevel2_andSecondElevatorAtLevel_shouldReturnElevator2(){
    console.log('==========================================')
    console.log('Scenario 4 - Destination Level 1, first elevator at level 2, the second elevator at level 1')

    //Arrange
    const { elevator1, elevator2, elevatorController } = InitialSetup();

    elevator1.setLevel(1);
    elevator1.state = State.Moving;
    
    elevator2.setLevel(0);
    elevator2.state = State.Available;
    
    //Act
    const pickedUpElevator = elevatorController.pickupElevator({value: 2});

    pickedUpElevator.toString()
    //Assert
    console.log("this should be elevator2: "  + pickedUpElevator.toString());
}


//Scenario 5 -  Destination Level 4, first elevator at level 2, the second elevator at level 1//
function pickupElevator_destinationLevel1_when_firstElvetorIsAtLevel2_andSecondElevatorAtLevel1_shouldReturnElevator1(){
    console.log('==========================================')
    console.log('Scenario 5 - Destination Level 4, first elevator at level 2, the second elevator at level 1')

    //Arrange
    const { elevator1, elevator2, elevatorController } = InitialSetup();

    elevator1.setLevel(1);
    elevator1.state = State.Moving;
    
    elevator2.setLevel(4);
    elevator2.state = State.Available;
    
    //Act
    const pickedUpElevator = elevatorController.pickupElevator({value: 2});

    pickedUpElevator.toString()
    //Assert
    console.log("this should be elevator2: "  + pickedUpElevator.toString());
}


//Scenario 5 -  Destination Level 4, first elevator at level 2, the second elevator at level 1//
function pickupElevator_destinationLevel1_when_firstElvetorIsAtLevel5_andSecondElevatorAtLevel1_shouldReturnElevator1(){
    console.log('==========================================')
    console.log('Scenario 6 - Destination Level 4, first elevator at level 2, the second elevator at level 1')

    //Arrange
    const { elevator1, elevator2, elevatorController } = InitialSetup();

    elevator1.setLevel(2);
    elevator1.state = State.Moving;
    
    elevator2.setLevel(0);
    elevator2.state = State.Available;
    
    //Act
    const pickedUpElevator = elevatorController.pickupElevator({value: 2});

    pickedUpElevator.toString()
    //Assert
    console.log("this should be elevator2: "  + pickedUpElevator.toString());
}


function InitialSetup() {
    const elevator1 = new Elevator('one');
    const elevator2 = new Elevator('two');
    const levels: Level[] = [{ value: 0 }, { value: 1 }, { value: 2 }, { value: 3 }, { value: 4 }, { value: 5 }];

    const elevatorController = new ElevatorController([elevator1, elevator2], levels);
    return { elevator1, elevator2, elevatorController };
}