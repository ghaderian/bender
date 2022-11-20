import { Observable } from "rxjs";
import { Action, ActionTypeEnum, OrientationEnun, Position } from "../model/action";
import { Robot } from "../model/robot";
import { RuleEngine } from "./ruleEngine";

export class BoardEngine { 

    private defaultStartPosition = { x: 0, y: 0, o: OrientationEnun.North }

    public robots: Array<Robot> = [];
    public activeRobotId = 0;


    constructor () {
        
    }

    public executeSequence(sequence: Observable<Action>) {

        sequence.subscribe(action => {

            switch (action.type) {
                case ActionTypeEnum.Place:

                    let position = action.placePosition ? action.placePosition : this.defaultStartPosition;
                    if(RuleEngine.isValid(position, this.robots.map(r => r.position))) {
                        let newId = this.robots.length + 1;
                        let robot = new Robot(position, newId);
                        this.activeRobotId = newId;
                        this.robots.push(robot);
                    }
                    break;

                case ActionTypeEnum.Robot:
                    if(action.robotCommandID) {
                        this.activeRobotId = action.robotCommandID;
                    }
                    break;
            
                default:
                    let activeRobot = this.robots.find(r => r.id === this.activeRobotId);

                    if (activeRobot) {
                        activeRobot.doAction(action, this.robots.map(r => r.position));
                    }
                    break;
            }
        })
    }


    public resetBoard() {
        this.robots = [];
        this.activeRobotId = 0;
    }

}