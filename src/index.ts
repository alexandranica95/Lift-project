import { ElevatorController, Elevator, Level } from "./entities.js";

// Initial State
const levels: Level[] = [
  { value: 0 },
  { value: 1 },
  { value: 2 },
  { value: 3 },
  { value: 4 },
  { value: 5 },
  { value: 6 },
];

const elevator1 = new Elevator("one");
const elevator2 = new Elevator("two");

const elevatorController = new ElevatorController(
  [elevator1, elevator2],
  levels
);

// left floor buttons click event
const leftButtons: NodeListOf<HTMLButtonElement> = document.querySelectorAll(
  ".left-buttons > .btn"
);

for (const btn of leftButtons) {
  const levelNumber = parseInt(btn.getAttribute("data-floor")!);

  btn.addEventListener("click", function (event): void {
    //functia apelata pentru fiecare click button parte stanga
    elevatorController
      .callElevatorBy("one", { value: levelNumber })
      .then(() => {
        console.log("Call elevator completed successfully.");
      })
      .catch((error) => {
        console.error("Error calling elevator:", error);
      });

    //console.log(elevator1.levelsToGoTo.map((e) => e.value));
  });
}

// right floor buttons click event
const rightButtons: NodeListOf<HTMLButtonElement> = document.querySelectorAll(
  ".right-buttons > .btn"
);

for (const btn of rightButtons) {
  const levelNumber = parseInt(btn.getAttribute("data-floor")!);

  btn.addEventListener("click", function (event) {
    elevatorController
      .callElevatorBy("two", { value: levelNumber })
      .then(() => {
        console.log("Call elevator completed successfully.");
      })
      .catch((error) => {
        console.error("Error calling elevator:", error);
      });
  });
}

// central floor buttons click event
const floorsButtons: NodeListOf<HTMLButtonElement> = document.querySelectorAll(
  ".floor-buttons > .btn"
);

for (const btn of floorsButtons) {
  const levelNumber = parseInt(btn.getAttribute("data-floor")!);
  btn.addEventListener("click", function (event) {
    elevatorController
      .callElevator({ value: levelNumber })
      .then(() => {
        console.log("Call elevator completed successfully.");
      })
      .catch((error) => {
        console.error("Error calling elevator:", error);
      });
  });
}

// levels label
const leftButtonsClicked: NodeListOf<HTMLButtonElement> =
  document.querySelectorAll(".left-buttons [data-floor]");

// Iterate over the buttons and attach event listener

// function addLevelToGoLabel(buttonText: string, labelClass: string) {
//   const createNewDiv = document.createElement("div");
//   createNewDiv.className = "level-queued";
//   createNewDiv.textContent = buttonText;
//   document.querySelector(labelClass)?.appendChild(createNewDiv);
// }

// leftButtonsClicked.forEach((button) => {
//   button.addEventListener("click", (event) => {
//     const clickedButton = event.target as HTMLElement;

//     addLevelToGoLabel(button.getAttribute("data-floor")!, ".left-label");
//     addLevelToGoLabel(button.getAttribute("data-floor")!, ".right-label");
//   });
// });
// const firstFloor = document.querySelector(".floor-buttons :nth-child(7)");
// firstFloor?.addEventListener("click", (event) => {
//   removeDestination(".two-label");

//   function removeDestination(labelClass: string) {
//     const divChild = document.querySelector(labelClass);
//     divChild?.removeChild(divChild.querySelectorAll("div")[0]);
//   }
// });

// destinationsCollect();
