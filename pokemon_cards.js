function pokemon_played(id, slot, hand_number)
{
    id = id.substring(0, id.length - 6);
    $("#" + slot).append($("#" + id + "_image"));
    document.getElementById(id).innerHTML = "";
    document.getElementById(id + "_image").id = slot + "_image";
    document.getElementById(slot + "_image").style.left = "0px";
    document.getElementById(slot + "_image").style.top = "0px";
    document.getElementById(slot + "_image").style.marginLeft = "0px";
    document.getElementById(slot + "_image").style.marginTop = "0px";
    document.getElementById(slot + "_image").style.position = "relative";    
    if(slot.indexOf("my_active") >= 0)
    {
        game_structure.active.card = game_structure.hand[hand_number].card;
    }
    else
    {
        game_structure.bench[find_number_in_string(slot)].card = game_structure.hand[hand_number].card;
    }    
    game_structure.hand[hand_number].card = "";
    
    $("#" + slot + "_image").draggable("option", "revert", true);
    document.getElementById(slot + "_image").onmouseover = null;
    document.getElementById(slot + "_image").onmouseleave = null;
    move_cards_in_hand(hand_number);
}