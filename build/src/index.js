var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ElevatorController, Elevator } from './entities.js';
// Initial State
const elevator1 = new Elevator('one');
const elevator2 = new Elevator('two');
const levels = [{ value: 0 }, { value: 1 }, { value: 2 }, { value: 3 }, { value: 4 }, { value: 5 }];
const elevatorController = new ElevatorController([elevator1, elevator2], levels);
(() => __awaiter(void 0, void 0, void 0, function* () {
    elevatorController.callElevator({ value: 5 });
    setTimeout(() => {
        elevatorController.callElevator({ value: 2 });
    }, 3000);
}))();
console.log("ceva");
