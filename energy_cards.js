
//energy played
function energy_played(id, slot, hand_number)
{
    id = id.substring(0, id.length - 6);
    if(slot.indexOf("my_active") >= 0)
    {
        game_structure.active.energy.push(game_structure.hand[hand_number].card);
    }
    else
    {
        game_structure.bench[find_number_in_string(slot)].energy.push(game_structure.hand[hand_number].card);
    }
    game_structure.hand[hand_number].card = "";
    
    move_card_up_stack(id, hand_number, slot);
   
    move_cards_in_hand(hand_number);
}