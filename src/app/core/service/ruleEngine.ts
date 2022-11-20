import { Action, Position } from "../model/action";
import { Rule, RuleTypeEnum } from "../model/rule";

export class RuleEngine { 
     public static rules: Array<Rule> = [
         { type: RuleTypeEnum.horizontal,   gap: [0,4]},
         { type: RuleTypeEnum.vertical,     gap: [0,4]},
         { type: RuleTypeEnum.occupational, gap: [0,0]}
     ];

    constructor () {
        
    }

    public static isValid(position: Position, occupidPositions: Array<Position>): boolean {

        let results: Array<boolean> = []
        this.rules.forEach(r => {
            results.push(this.validateRule(r, position, occupidPositions));
        });
        return results.every(result => result);
    }

    private static validateRule(rule: Rule, position: Position, occupidPositions: Array<Position>): boolean {

        let result = true;
        switch (rule.type) {
            case RuleTypeEnum.horizontal:
                result = position.x >= rule.gap[0] && position.x <= rule.gap[1];
                break;

            case RuleTypeEnum.vertical:
                result = position.y >= rule.gap[0] && position.y <= rule.gap[1];
                break;

            case RuleTypeEnum.occupational:
                result = !occupidPositions.some(p => p.x === position.x && p.y === position.y);
                break;
        
        }

        return result;
    }


}