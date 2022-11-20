
import { from } from 'rxjs';
import { Action, ActionTypeEnum, OrientationEnun } from '../model/action';
import { BoardEngine } from './boardEngine';

describe('Board engine', () => {


  it('should create an instance', () => {
    let engine: BoardEngine;
    engine = new BoardEngine();

    expect(engine).toBeTruthy();
  });

  it('first sequence needs to generate 0,1,north result', () => {
    let engine: BoardEngine;
    engine = new BoardEngine();


    let actions: Array<Action> = [
      {type: ActionTypeEnum.Place, placePosition: {x: 0, y: 0,o: OrientationEnun.North  }},
      {type: ActionTypeEnum.Move},
      {type: ActionTypeEnum.Report},
    ]; 

    let sequence = from(actions);
    engine.executeSequence(sequence);

    expect(engine.robots.length === 1).toBeTruthy();
    expect(engine.robots[0].position.x === 0).toBeTruthy();
    expect(engine.robots[0].position.y === 1).toBeTruthy();
    expect(engine.robots[0].position.o === OrientationEnun.North).toBeTruthy();

  });

  it('second sequence needs to generate 0,0,west result', () => {
    let engine: BoardEngine;
    engine = new BoardEngine();


    let actions: Array<Action> = [
      {type: ActionTypeEnum.Place, placePosition: {x: 0, y: 0,o: OrientationEnun.North  }},
      {type: ActionTypeEnum.Left},
      {type: ActionTypeEnum.Report},
    ]; 

    let sequence = from(actions);
    engine.executeSequence(sequence);

    expect(engine.robots.length === 1).toBeTruthy();
    expect(engine.robots[0].position.x === 0).toBeTruthy();
    expect(engine.robots[0].position.y === 0).toBeTruthy();
    expect(engine.robots[0].position.o === OrientationEnun.West).toBeTruthy();

  });

  it('third sequence needs to generate 3,3,north result', () => {
    let engine: BoardEngine;
    engine = new BoardEngine();


    let actions: Array<Action> = [
      {type: ActionTypeEnum.Place, placePosition: {x: 1, y: 2,o: OrientationEnun.East  }},
      {type: ActionTypeEnum.Move},
      {type: ActionTypeEnum.Move},
      {type: ActionTypeEnum.Left},
      {type: ActionTypeEnum.Move},
      {type: ActionTypeEnum.Report},
    ]; 

    let sequence = from(actions);
    engine.executeSequence(sequence);

    expect(engine.robots.length === 1).toBeTruthy();
    expect(engine.robots[0].position.x === 3).toBeTruthy();
    expect(engine.robots[0].position.y === 3).toBeTruthy();
    expect(engine.robots[0].position.o === OrientationEnun.North).toBeTruthy();

  });

  it('place commands with out of board position should get ingnored', () => {
    let engine: BoardEngine;
    engine = new BoardEngine();

    let actions: Array<Action> = [
      {type: ActionTypeEnum.Place, placePosition: {x: 5,  y: 0, o: OrientationEnun.North  }},
      {type: ActionTypeEnum.Place, placePosition: {x: -1, y: 0, o: OrientationEnun.North  }},
      {type: ActionTypeEnum.Place, placePosition: {x: 0,  y: 5, o: OrientationEnun.North  }},
      {type: ActionTypeEnum.Place, placePosition: {x: 0,  y: -1,o: OrientationEnun.North  }},
      {type: ActionTypeEnum.Report},
    ]; 

    let sequence = from(actions);
    engine.executeSequence(sequence);

    expect(engine.robots.length === 0).toBeTruthy();

  });

  it('commands which leads robot out of board vertically will get ignored', () => {
    let engine: BoardEngine;
    engine = new BoardEngine();

    let actions: Array<Action> = [
      {type: ActionTypeEnum.Place, placePosition: {x: 0,  y: 0, o: OrientationEnun.North  }},
      {type: ActionTypeEnum.Move },
      {type: ActionTypeEnum.Move },
      {type: ActionTypeEnum.Move },
      {type: ActionTypeEnum.Move },
      {type: ActionTypeEnum.Move },
      {type: ActionTypeEnum.Move },
      {type: ActionTypeEnum.Move },
      {type: ActionTypeEnum.Move },
      {type: ActionTypeEnum.Report},
    ]; 

    let sequence = from(actions);
    engine.executeSequence(sequence);

    expect(engine.robots.length === 1).toBeTruthy();
    expect(engine.robots[0].position.x === 0).toBeTruthy();
    expect(engine.robots[0].position.y === 4).toBeTruthy();
    expect(engine.robots[0].position.o === OrientationEnun.North).toBeTruthy();

  });

  it('commands which leads robot out of board horizontally will get ignored', () => {
    let engine: BoardEngine;
    engine = new BoardEngine();

    let actions: Array<Action> = [
      {type: ActionTypeEnum.Place, placePosition: {x: 0,  y: 0, o: OrientationEnun.East  }},
      {type: ActionTypeEnum.Move },
      {type: ActionTypeEnum.Move },
      {type: ActionTypeEnum.Move },
      {type: ActionTypeEnum.Move },
      {type: ActionTypeEnum.Move },
      {type: ActionTypeEnum.Move },
      {type: ActionTypeEnum.Move },
      {type: ActionTypeEnum.Move },
      {type: ActionTypeEnum.Report},
    ]; 

    let sequence = from(actions);
    engine.executeSequence(sequence);

    expect(engine.robots.length === 1).toBeTruthy();
    expect(engine.robots[0].position.x === 4).toBeTruthy();
    expect(engine.robots[0].position.y === 0).toBeTruthy();
    expect(engine.robots[0].position.o === OrientationEnun.East).toBeTruthy();

  });

  it('place command to an occupied square will get ignored', () => {
    let engine: BoardEngine;
    engine = new BoardEngine();

    let actions: Array<Action> = [
      {type: ActionTypeEnum.Place, placePosition: {x: 0,  y: 0, o: OrientationEnun.East  }},
      {type: ActionTypeEnum.Move },
      {type: ActionTypeEnum.Place, placePosition: {x: 1,  y: 0, o: OrientationEnun.East  }},
      {type: ActionTypeEnum.Move },
      {type: ActionTypeEnum.Move },
      {type: ActionTypeEnum.Move },
      {type: ActionTypeEnum.Move },
      {type: ActionTypeEnum.Move },
      {type: ActionTypeEnum.Move },
      {type: ActionTypeEnum.Report},
    ]; 

    let sequence = from(actions);
    engine.executeSequence(sequence);

    expect(engine.robots.length === 1).toBeTruthy();

  });

  it('move command to an occupied square will get ignored', () => {
    let engine: BoardEngine;
    engine = new BoardEngine();

    let actions: Array<Action> = [
      {type: ActionTypeEnum.Place, placePosition: {x: 0,  y: 0, o: OrientationEnun.East  }},
      {type: ActionTypeEnum.Move },
      {type: ActionTypeEnum.Place, placePosition: {x: 0,  y: 0, o: OrientationEnun.East  }},
      {type: ActionTypeEnum.Move },
      {type: ActionTypeEnum.Move },
      {type: ActionTypeEnum.Move },
      {type: ActionTypeEnum.Move },
      {type: ActionTypeEnum.Move },
      {type: ActionTypeEnum.Move },
      {type: ActionTypeEnum.Report},
    ]; 

    let sequence = from(actions);
    engine.executeSequence(sequence);

    expect(engine.robots.length === 2).toBeTruthy();
    expect(engine.robots[0].position.x === 1).toBeTruthy();
    expect(engine.robots[0].position.y === 0).toBeTruthy();
    expect(engine.robots[0].position.o === OrientationEnun.East).toBeTruthy();

    expect(engine.robots[1].position.x === 0).toBeTruthy();
    expect(engine.robots[1].position.y === 0).toBeTruthy();
    expect(engine.robots[1].position.o === OrientationEnun.East).toBeTruthy();

  });

  it('robot command will switch active robot', () => {
    let engine: BoardEngine;
    engine = new BoardEngine();

    let actions: Array<Action> = [
      {type: ActionTypeEnum.Place, placePosition: {x: 0,  y: 0, o: OrientationEnun.East  }},
      {type: ActionTypeEnum.Move },
      {type: ActionTypeEnum.Place, placePosition: {x: 0,  y: 0, o: OrientationEnun.East  }},
      {type: ActionTypeEnum.Robot, robotCommandID: 1 },
      // after robot command all move commands go to first robot as active robot which is not blocked
      {type: ActionTypeEnum.Move },
      {type: ActionTypeEnum.Move },
      {type: ActionTypeEnum.Move },
      {type: ActionTypeEnum.Move },
      {type: ActionTypeEnum.Move },
      {type: ActionTypeEnum.Report},
    ]; 

    let sequence = from(actions);
    engine.executeSequence(sequence);

    expect(engine.robots.length === 2).toBeTruthy();
    expect(engine.robots[0].position.x === 4).toBeTruthy();
    expect(engine.robots[0].position.y === 0).toBeTruthy();
    expect(engine.robots[0].position.o === OrientationEnun.East).toBeTruthy();

    expect(engine.robots[1].position.x === 0).toBeTruthy();
    expect(engine.robots[1].position.y === 0).toBeTruthy();
    expect(engine.robots[1].position.o === OrientationEnun.East).toBeTruthy();

  });

});
