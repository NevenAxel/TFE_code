import { getRandomNumber } from './utils';
import { getObjectByRarity } from './utils';
import swipeActions from './swipeActions';
import startingroom from './rooms/startingroom';
import monsters from './rooms/monsters';
import chest from './rooms/chest';


export default {
  basicMonsterList : [
    {name: 'wolf', rarity: 5},
    {name: 'rogue', rarity: 2},
    {name: 'gobelin', rarity: 3},
    {name: 'spider', rarity: 4},
    {name: 'ogre', rarity: 2}
  ],

  //for real

  forestMonsterList : [
    {name: 'wolf', rarity: 5},
    {name: 'rogue', rarity: 2},
    {name: 'gobelin', rarity: 3},
    {name: 'spider', rarity: 2},
    {name: 'boar', rarity: 5},
    {name: 'shroom', rarity: 4},
    // Monstre plus complexe (un buisson qui fait du bruit, que faire, en fait c'est un monstre caché)
    {name: 'unicorn', rarity: 1},
  ],

  chestList : [
    {name: 'basicChest', rarity: 100},
  ],

  roomGenerator : {
    basicChest: chest.BasicChestGenerator,
    starting: startingroom.startingGenerator,


    wolf: monsters.wolfGenerator,
    rogue: monsters.rogueGenerator,
    gobelin: monsters.gobelinGenerator,
    spider: monsters.spiderGenerator,
    ogre: monsters.hugeOgreGenerator,
  }
}


/*
    Sérieusement les actions ont besoins d'avoir accès aux info du monstre (qui a l'action)
    pour pouvoir personnalisé les feedbackMessage
    Les actions doivent aussi avoir accès aux loot car on peut loot des objets avec certaines actions

    Mettre au point le systeme de require (le niveau requis pour qu'une action marche, et le % de réussite)
    Mettre au point le systeme de difficulté progressive(plus difficile de réussir les actions en fonction du niveau)



    Monstre zombie : si tu lui suce le sang (si ton perso est devenu un vampire)
    tu perds de la vie, tu attrappe une maladie(prendre du dmg sur plusieurs tour)

    possibilité d'apprendre des nouvelles aptitudes au près de personnage divers

    ce serait une bonne idée de ne pas avoir le choix de droit lock sur une action!
    --> mettre en point un algorithme qui permet d'avoir toujours 2 choix sensé ?
    --> peut être juste deux type d'action, les actions attaques (à droite)
    --> et les actions plus funky à gauche

*/
/*

    est ce qu'on met un systeme de vie au monstres ?? si oui comment ça fonctionne?
    avec des action dans le genre nourrir, caresser l'animal, crier etc.
    est ce que les dmg du monstre seraient indiquer sur la carte (bof, bof..)
    
    Scenario:
    - on commence dans une auberge
    - un personnage nous parle d'un trésor qui rend immortel caché dans la forêt
    - grosse partie de dialogue
    - finalement on décide de partir à la recherche du trésor
    - que prendre pour partir à l'aventure (un arc, une épée ou un baton magique?)
    - aller dans la forêt maudite où pourrait trouver le fameux trésor
    - On peut passer par différentes zone, le chemin feuillu ou le chemin aux arbres morts
    - puis après quelqu'un indique la direction du trésor, dans une grotte par exemple
    - le perso rentre dans la grotte pour y trouver le fameux trésor

*/