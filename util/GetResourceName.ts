export default function GetResourceName (resourceType: number): string{

    switch (resourceType) {
        case 0:
            return "Mana"
        case 1:
            return "Rage"
        case 2:
            return "Focus"
        case 3:
            return "Energy"
        case 4:
            return "Combo Points"
        case 5:
            return "Runes"
        case 6:
            return "Runic Power"
        case 7:
            return "Soul Shards"
        case 8:
            return "Astral Power"
        case 9:
            return "Holy Power"
        case 10:
            return "Alternate"
        case 11:
            return "Maelstrom"
        case 12:
            return "Chi"
        case 13:
            return "Insanity"
        case 14:
            return "Obsolete"
        case 15:
            return "Obsolete2"
        case 16:
            return "Arcane Charges"
        case 17:
            return "Fury"
        case 18:
            return "Pain"
        case 19:
            return "Essence"
        case 20:
            return "Rune Blood (Classic)"
        case 21:
            return "Rune Frost (Classic)"
        case 22:
            return "Rune Unholy (Classic)"
        case 23:
            return "Alternate Quest"
        case 24:
            return "Alternate Encounter"
        case 25:
            return "Alternate Mount"
        default:
            return resourceType + ""
    }
}