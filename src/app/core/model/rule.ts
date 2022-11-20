import { Action } from "./action";

export type Rule = { 
    type: RuleTypeEnum;
    gap: [number, number];

}

export enum RuleTypeEnum { 

    'vertical', 'horizontal', 'occupational'
}