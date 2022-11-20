export type Action = { 
    type: ActionTypeEnum;
    placePosition? : Position;
    robotCommandID? : number;
}

export enum ActionTypeEnum { 
    'Place', 'Move', 'Left', 'Right', 'Report', 'Robot'
}

export enum OrientationEnun {
    'North', 'West', 'East', 'South'
}

export type Position = {
    x: number;
    y: number;
    o: OrientationEnun;
}