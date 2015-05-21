//active energy played
function energy_active_played(id, hand_number)
{
    id = id.substring(0, id.length - 6);
    document.getElementById(id).innerHTML = "";
    game_structure.active.energy.push(game_structure.hand[hand_number].card);
    game_structure.hand[hand_number].card = "";
    
    move_card_up_stack();
    
    $("#my_active_image").draggable("option", "revert", true);
    document.getElementById("my_active_image").onmouseover = null;
    document.getElementById("my_active_image").onmouseleave = null;
    move_cards_in_hand(hand_number);
}
//bench energy played
function energy_bench_played(id, slot, hand_number)
{
    id = id.substring(0, id.length - 6);
    document.getElementById(id).innerHTML = "";
    game_structure.bench[find_number_in_string(slot)].energy.push(game_structure.hand[hand_number].card);
    game_structure.hand[hand_number].card = "";
    
    move_card_up_stack();
    
    $("#" + slot + "_image").draggable("option", "revert", true);
    document.getElementById(slot + "_image").onmouseover = null;
    document.getElementById(slot + "_image").onmouseleave = null;
    move_cards_in_hand(hand_number);
}