import { RuleEngine } from "../service/ruleEngine";
import { Action, ActionTypeEnum, OrientationEnun, Position } from "./action";


export class Robot { 
    
    public position: Position;
    public id: number;
    public name: string = '';
    
    constructor (_position: Position, _id: number) {
        this.position = _position; 
        this.id = _id;
        this.name = 'Robot ' + _id;
    }



    doAction(action: Action, occupidPositions: Array<Position>): boolean {

        switch (action.type) {
            case ActionTypeEnum.Left:
                
                switch (this.position.o) {
                    case OrientationEnun.North:
                        this.position.o = OrientationEnun.West
                        break;

                    case OrientationEnun.East:
                        this.position.o = OrientationEnun.North
                        break;

                    case OrientationEnun.South:
                        this.position.o = OrientationEnun.East
                        break;

                    case OrientationEnun.West:
                        this.position.o = OrientationEnun.South
                        break;                        
                
                    default:
                        break;
                }
                break;

            case ActionTypeEnum.Right:
            
                switch (this.position.o) {
                    case OrientationEnun.North:
                        this.position.o = OrientationEnun.East
                        break;

                    case OrientationEnun.East:
                        this.position.o = OrientationEnun.South
                        break;

                    case OrientationEnun.South:
                        this.position.o = OrientationEnun.West
                        break;

                    case OrientationEnun.West:
                        this.position.o = OrientationEnun.North
                        break;                        
                
                    default:
                        break;
                }
                break;            

            case ActionTypeEnum.Move:
                
                let targetPosition: Position = { x: this.position.x, y: this.position.y, o: this.position.o };
                switch (this.position.o) {
                    case OrientationEnun.North:
                        targetPosition.y = this.position.y + 1;
                        break;

                    case OrientationEnun.East:
                        targetPosition.x = this.position.x + 1;
                        break;

                    case OrientationEnun.South:
                        targetPosition.y = this.position.y - 1;
                        break;

                    case OrientationEnun.West:
                        targetPosition.x = this.position.x - 1;
                        break;                        
                
                }

                if (RuleEngine.isValid(targetPosition, occupidPositions)) {
                    this.position = targetPosition;
                } else {
                    console.log('Action Ignored');
                    return false;
                }

                break;
            
            case ActionTypeEnum.Robot, ActionTypeEnum.Place:
                // nothing needs to be done in robot level
                break;

            case ActionTypeEnum.Report:
                console.log('Report: ' +this.position.x + ',' + this.position.y + ',' + this.position.o.toString())
                break;

            default:
                break;
        }

        return true;
    }


}