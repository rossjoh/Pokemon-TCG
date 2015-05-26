
//energy played
function energy_played(id, slot, hand_number)
{
    id = id.substring(0, id.length - 6);
    document.getElementById(id).innerHTML = "";
    if(slot.indexOf("my_active") >= 0)
    {
        game_structure.active.energy.push(game_structure.hand[hand_number].card);
    }
    else
    {
        game_structure.bench[find_number_in_string(slot)].energy.push(game_structure.hand[hand_number].card);
    }
    game_structure.hand[hand_number].card = "";
    
    move_card_up_stack(hand_number);
    
    $("#" + slot + "_image").draggable("option", "revert", true);
    document.getElementById(slot + "_image").onmouseover = null;
    document.getElementById(slot + "_image").onmouseleave = null;
    move_cards_in_hand(hand_number);
}