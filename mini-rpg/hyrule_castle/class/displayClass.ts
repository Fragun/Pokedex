import { Players } from '../interface/players';
import { Classes } from '../interface/classes';
import { Races } from '../interface/races';
import getArrayRaceNameByIds from '../action/component/getRaceByIds';

const fs = require('fs');

export default class Display {
  static displayCharacter(character: Players, maxHp: number) {
    console.log(`ಊಊಊಊಊಊ${character.name}ಊಊಊಊಊಊಊ`);

    const displayHp = () => {
      const arrayHp: string[] = [];
      for (let index = 0; index < character.hp; index += 1) {
        arrayHp.push('■');
      }
      const hpLost: number = maxHp - character.hp;
      for (let j = 0; j < hpLost; j += 1) {
        arrayHp.push('□');
      }
      return arrayHp.join('');
    };

    console.log(`♡ ${displayHp()} ${character.hp} / ${maxHp}`);
  }

  static displayOptionCharacter(
    player: Players,
    race: Races,
    classes: Classes,
    playerType: number,
    exp: number,
    lvl: number,
  ) {
    const raceContent = fs.readFileSync('./ressourcesJson/races.json', 'utf-8');
    const jsonObjectRaces: Races[] = JSON.parse(raceContent);
    const raceContentClasses = fs.readFileSync('./ressourcesJson/classes.json', 'utf-8');
    const jsonObjectClasses: Classes[] = JSON.parse(raceContentClasses);
    const racesWeakness = getArrayRaceNameByIds(race.strength, jsonObjectRaces);
    const racesStrength = getArrayRaceNameByIds(race.weakness, jsonObjectRaces);
    const classesWeakness = getArrayRaceNameByIds(classes.strengths, jsonObjectClasses);
    const classesStrength = getArrayRaceNameByIds(classes.weaknesses, jsonObjectClasses);

    let titleExpAndLevel: string = '';
    let titlePlayer: string = '';
    let titleRace: string = '';
    let titleClass: string = '';
    if (playerType === 1) {
      titleExpAndLevel = `xp : ${exp} level : ${lvl}`;
      titlePlayer = 'You are';
      titleRace = 'Your race is';
      titleClass = 'Your class is';
    } else if (playerType === 2) {
      titleExpAndLevel = '';
      titlePlayer = 'Your opponent is';
      titleRace = 'The opponent\'s race is';
      titleClass = 'The opponent\'s class is';
    }

    console.log(
      `
===========================================================
==================${titlePlayer} ${player.name}=================== 
=============${titleExpAndLevel}============================
===========================================================
                 Hit point = ${player.hp}                  
                 Magic point = ${player.mp}               
                 Strength = ${player.str}                    
                 Intelligence = ${player.int}                
                 Defense = ${player.def}                     
                 Resistance = ${player.res}                  
                 Speed = ${player.spd}                      
                 Luck  = ${player.luck}                   
===========================================================
___________________________________________________________
-----------------${titleRace} ${race.name}-----------------
‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾   
                Strength against = ${racesWeakness}                      
                Weakness = ${racesStrength}  
‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
___________________________________________________________            
    ----------- ${titleClass} ${classes.name}-------------- 
‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾                                                          
                Strength = ${classesWeakness}
                Weaknesses = ${classesStrength}                        
                Attack type = ${classes.attack_type}
                Alignment = ${classes.alignment}      
  ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾  
  `,
    );
  }

  static displayRace(jsonObjectRace: Races[]) {
    for (const race of jsonObjectRace) {
      const arrayWeakRace: string[] = [];
      const arrayStrongRace: string[] = [];
      if (race.strength.length > 0) {
        for (const r of race.strength) {
          arrayWeakRace.push(jsonObjectRace[r - 1].name);
        }
      }

      if (race.weakness.length > 0) {
        for (const a of race.weakness) {
          arrayStrongRace.push(jsonObjectRace[a - 1].name);
        }
      }
      console.log(`${race.id}- ${race.name}
        strong against : ${arrayWeakRace};
        weak against : ${arrayStrongRace};
        `);
    }
  }

  static displayClasses(jsonObjectClass: Classes[]) {
    for (const classes of jsonObjectClass) {
      const arrayWeakClass = [];
      const arrayStrongClass = [];

      for (const r of classes.strengths) {
        arrayWeakClass.push(jsonObjectClass[r - 1].name);
      }
      for (const r of classes.weaknesses) {
        arrayStrongClass.push(jsonObjectClass[r - 1].name);
      }

      console.log(`${classes.id}- ${classes.name}
        strong against : ${arrayWeakClass};
        weak against : ${arrayStrongClass};
        `);
    }
  }
}
