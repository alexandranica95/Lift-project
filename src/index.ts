import * as asdasdasdas from 'gsap';
import { ElevatorController, Elevator, Level, State } from './entities.js';

// Initial State
const elevator1 = new Elevator('one')
const elevator2 = new Elevator('two')
const levels: Level[] = [{value: 0}, {value: 1}, {value: 2}, {value: 3}, {value: 4}, {value: 5}]

const elevatorController = new ElevatorController([elevator1, elevator2], levels);

const button5 = document.querySelector('#level-5');
button5?.addEventListener('click', () => {
   elevatorController.callElevator({value: 5}).then(() => {})
})

const button4 = document.querySelector('#level-4');
button4?.addEventListener('click', () => {
   elevatorController.callElevator({value: 4}).then(() => {})
})

const button3 = document.querySelector('#level-3');
button3?.addEventListener('click', () => {
   elevatorController.callElevator({value: 3}).then(() => {})
})

const button2 = document.querySelector('#level-2');
button2?.addEventListener('click', () => {
   elevatorController.callElevator({value: 2}).then(() => {})
})

const button1 = document.querySelector('#level-1');
button1?.addEventListener('click', () => {
   elevatorController.callElevator({value: 1}).then(() => {})
})

const button0 = document.querySelector('#level-0');
button0?.addEventListener('click', () => {
   elevatorController.callElevator({value: 0}).then(() => {})
})

const floors = Array.from(document.querySelectorAll('.floor'));
const elevatorOne = document.querySelector('#elevator-1')

const moveElevator = (event: MouseEvent) => {
   const floor = event.currentTarget as HTMLElement;
   const topPos = floor.getBoundingClientRect().top + window.pageYOffset;
   gsap.to(elevatorOne, { top: topPos, duration: 2 }); //GSAP animation
 };
 
 floors.forEach((floor) => floor.addEventListener('click', moveElevator as EventListener));
 