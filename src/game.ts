import {
    action, addAgent, addUserActionTree, addUserInteractionTree, attachTreeToAgent,
    displayActionEffectText, displayDescriptionAction, getUserInteractionObject, guard,
    initialize, selector, sequence
} from "./scripting";

var Strength, Intelligence, BellaLikesYou, BellaAsked, JacobineLikesYou,
    DateFound, JacobineAsked, Fangs, Fur, SharpenTeethAction, TransplantHairAction;

Strength = 0;
Intelligence = 0;
BellaLikesYou = (false);
BellaAsked = (false);
JacobineLikesYou = (false);
JacobineAsked = (false);
Fangs = (false);
Fur = (false);
SharpenTeethAction = (false);
TransplantHairAction = (false);
DateFound = (false);

var Bella = addAgent("Bella");
attachTreeToAgent(Bella, selector([action(() => ((((Intelligence >= 4)) && ((Fangs == (true))))), () => {
    BellaLikesYou = (true);
}, 0), guard(() => ((BellaAsked == (true))), selector([action(() => ((Fangs == (false))), () => {
    displayActionEffectText('"Ew, you don\'t even have fangs.."'); SharpenTeethAction = (true);
    BellaAsked = (false);
}, 0), action(() => ((Intelligence < 4)), () => {
    displayActionEffectText('"Sorry, I only like intelligent guys.."'); BellaAsked = (false);
}, 0)]))]));

var Jacobine = addAgent("Jacobine");
attachTreeToAgent(Jacobine, selector([action(() => ((((Strength >= 4)) && ((Fur == (true))))), () => {
    JacobineLikesYou = (true);
}, 0), guard(() => ((JacobineAsked == (true))), selector([action(() => ((Fur == (false))), () => {
    displayActionEffectText('"I\'m more of a furry type of person.."'); TransplantHairAction = (true);
    JacobineAsked = (false);
}, 0), action(() => ((Strength < 4)), () => {
    displayActionEffectText('"You are kinda weak.."'); JacobineAsked = (false);
}, 0)]))]));

addUserInteractionTree(guard(() => ((DateFound == (false))),
    sequence([displayDescriptionAction('Prom is approaching! You need to have a date! Bella or Jacobine...'),
    addUserActionTree('Ask Bella the Vampire to Prom', selector([action(() => ((BellaLikesYou == (true))), () => {
        displayActionEffectText('Bella swoons and turns into a bat. Congratulations, you have a date! '); DateFound = (true);
    }, 0), action(() => ((BellaLikesYou == (false))), () => {
        BellaAsked = (true);
    }, 0)])), addUserActionTree('Ask Jacobine the Werewolf to Prom', selector([action(() => ((JacobineLikesYou == (true))), () => {
        displayActionEffectText('Jacobine gives a nasty snarl. That means yes in werewolf-speak. Congratulations!'); DateFound = (true);
    }, 0), action(() => ((JacobineLikesYou == (false))), () => {
        JacobineAsked = (true);
    }, 0)])), addUserActionTree('Hit the gym', action(() => (true), () => {
        Strength = (typeof Strength == 'number' ? Strength : 0) + 2;
        displayActionEffectText((['You strength improves to ', Strength, ' (+2)'].join('')));
    }, 0)), addUserActionTree('Hit the library', action(() => (true), () => {
        Intelligence = (typeof Intelligence == 'number' ? Intelligence : 0) + 2;
        displayActionEffectText((['Your intelligence improves to ', Intelligence, ' (+2)'].join('')));
    }, 0)), selector([guard(() => ((SharpenTeethAction == (true))), addUserActionTree('Sharpen your teeth', action(() => (true), () => {
        displayActionEffectText('You sharpen your teeth into makeshift fangs.'); Fangs = (true);
        SharpenTeethAction = (false);
    }, 0))), action(() => (true), () => { }, 0)]),
    selector([guard(() => ((TransplantHairAction == (true))), addUserActionTree('Transplant hair onto your body', action(() => (true), () => {
        displayActionEffectText('You become more hairy.'); Fur = (true);
        TransplantHairAction = (false);
    }, 0))), action(() => (true), () => { }, 0)])])));

var userInteractionObject = getUserInteractionObject();

export function getUIO() {
    initialize();
    return userInteractionObject;
}