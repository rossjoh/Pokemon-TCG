//these functions are used when the card has been animated


//redo these to be the animatiion paths IE hand to deck

function active_pokemon_played(id, hand_number)
{
    id = id.substring(0, id.length - 6);
    document.getElementById("my_active").innerHTML = null;
    $("#my_active").append($("#" + id + "_image"));
    document.getElementById(id).innerHTML = "";
    document.getElementById(id + "_image").id = "my_active_image";
    document.getElementById("my_active_image").style.left = "0px";
    document.getElementById("my_active_image").style.top = "0px";
    document.getElementById("my_active_image").style.marginLeft = "0px";
    document.getElementById("my_active_image").style.marginTop = "0px";
    document.getElementById("my_active_image").style.position = "relative";
    game_structure.active.card = game_structure.hand[hand_number].card;
    game_structure.hand[hand_number].card = "";
    $("#my_active_image").draggable("option", "revert", true);
    document.getElementById("my_active_image").onmouseover = null;
    document.getElementById("my_active_image").onmouseleave = null;
    move_cards_in_hand(hand_number);
}

function bench_pokemon_played(id, slot, hand_number)
{
    id = id.substring(0, id.length - 6);
    document.getElementById(slot).innerHTML = null;
    $("#" + slot).append($("#" + id + "_image"));
    document.getElementById(id).innerHTML = "";
    document.getElementById(id + "_image").id = slot + "_image";
    document.getElementById(slot + "_image").style.left = "0px";
    document.getElementById(slot + "_image").style.top = "0px";
    document.getElementById(slot + "_image").style.marginLeft = "0px";
    document.getElementById(slot + "_image").style.marginTop = "0px";
    document.getElementById(slot + "_image").style.position = "relative";
    game_structure.bench[find_number_in_string(slot)].card = game_structure.hand[hand_number].card;
    game_structure.hand[hand_number].card = "";
    $("#" + slot + "_image").draggable("option", "revert", true);
    document.getElementById(slot + "_image").onmouseover = null;
    document.getElementById(slot + "_image").onmouseleave = null;
    move_cards_in_hand(hand_number);
}

function energy_active_played(id, hand_number)
{
    id = id.substring(0, id.length - 6);
    document.getElementById(id).innerHTML = "";
    game_structure.active.energy.push(game_structure.hand[hand_number].card);
    game_structure.hand[hand_number].card = "";
    $("#my_active_image").draggable("option", "revert", true);
    document.getElementById("my_active_image").onmouseover = null;
    document.getElementById("my_active_image").onmouseleave = null;
    move_cards_in_hand(hand_number);
}

function energy_bench_played(id, slot, hand_number)
{
    id = id.substring(0, id.length - 6);
    document.getElementById(id).innerHTML = "";
    game_structure.bench[find_number_in_string(slot)].energy.push(game_structure.hand[hand_number].card);
    game_structure.hand[hand_number].card = "";
    $("#" + slot + "_image").draggable("option", "revert", true);
    document.getElementById(slot + "_image").onmouseover = null;
    document.getElementById(slot + "_image").onmouseleave = null;
    move_cards_in_hand(hand_number);
}

function attachable_trainer_active_played(id, hand_number)
{
    id = id.substring(0, id.length - 6);
    document.getElementById(id).innerHTML = "";
    game_structure.active.trainer.push(game_structure.hand[hand_number].card);
    game_structure.hand[hand_number].card = "";
    $("#my_active_image").draggable("option", "revert", true);
    document.getElementById("my_active_image").onmouseover = null;
    document.getElementById("my_active_image").onmouseleave = null;
    move_cards_in_hand(hand_number);
}

function attachable_trainer_bench_played(id, slot, hand_number)
{
    id = id.substring(0, id.length - 6);
    document.getElementById(id).innerHTML = "";
    game_structure.bench[find_number_in_string(slot)].trainer.push(game_structure.hand[hand_number].card);
    game_structure.hand[hand_number].card = "";
    $("#" + slot + "_image").draggable("option", "revert", true);
    document.getElementById(slot + "_image").onmouseover = null;
    document.getElementById(slot + "_image").onmouseleave = null;
    move_cards_in_hand(hand_number);
}

function move_cards_in_hand(hand_number, callback)
{
    //console.log(game_structure.active)
    for(var i = hand_number + 1; i < game_structure.no_cards_in_hand + 1; i++)
    {
        var top_offset  = $("#my_hand_" + (i + 1)).offset().top - $("#my_hand_" + i).offset().top;
        var left_offset = $("#my_hand_" + (i + 1)).offset().left - $("#my_hand_" + i).offset().left;   
        $("#my_hand_" + (i + 1) + "_image").animate({width: "125px", height: "175px", marginLeft: -left_offset, marginTop: -top_offset}, 50);    
        $("#my_hand_" + (i + 1) + "_image").draggable("disable");        
    }
    setTimeout(function(){change_hand_slot_after_animation(hand_number, callback);}, 100)
}

function change_hand_slot_after_animation(hand_number, callback)
{
    for(var i = hand_number + 1; i < game_structure.no_cards_in_hand + 1; i++)
    {
        $("#my_hand_" + (i + 1) + "_image").draggable("enable")    
        $("#my_hand_" + i).append($("#my_hand_" + (i + 1) + "_image"));
        document.getElementById("my_hand_" + (i + 1)).innerHTML = ""; 
        document.getElementById("my_hand_" + (i + 1) + "_image").id = "my_hand_" + i + "_image";
        document.getElementById("my_hand_" + i + "_image").style.left = "0px";
        document.getElementById("my_hand_" + i + "_image").style.top = "35px";
        document.getElementById("my_hand_" + i + "_image").style.marginLeft = "0px";
        document.getElementById("my_hand_" + i + "_image").style.marginTop = "0px";
        document.getElementById("my_hand_" + i + "_image").style.position = "relative";
        game_structure.hand[i - 1].card = game_structure.hand[i].card;
        game_structure.hand[i].card = "";
           
        //$("#my_hand_" + i + "_image").draggable("option", "revert", true);
        
    }
    change_z_index_hand();
    if (callback != null)
    {
        callback();
    }
}

function draw_card(number_to_draw)
{
    document.getElementById("my_deck_on_top").innerHTML = "<IMG src=\"images/" + deck_current[0] + "_small.jpg\" style=\"width:125px;\" id=\"my_hand_" + (game_structure.no_cards_in_hand + 1) + "_image\" class=\"card\" onclick=\"card_clicked(id);\" onmouseover=\"make_card_border(id);\" onmouseleave=\"make_card_unborder(id);\">";    
    document.getElementById("my_deck_on_top").style.zIndex = 99;
    var top_offset  = $("#my_hand_" + (game_structure.no_cards_in_hand + 1) + "_image").offset().top - $("#my_hand_" + (game_structure.no_cards_in_hand + 1)).offset().top;
    var left_offset = $("#my_hand_" + (game_structure.no_cards_in_hand + 1) + "_image").offset().left - $("#my_hand_" + (game_structure.no_cards_in_hand + 1)).offset().left;  
    $("#my_hand_" + (game_structure.no_cards_in_hand + 1) + "_image").animate({marginLeft: -left_offset, marginTop: -top_offset + 35}, 500, function(){deck_to_hand(number_to_draw);});
}

function deck_to_hand(number_to_draw)
{   
    game_structure.hand[game_structure.no_cards_in_hand].card = deck_current[0];
    deck_current.splice(0, 1);    
    $("#my_hand_" + (game_structure.no_cards_in_hand + 1)).append($("#my_hand_" + (game_structure.no_cards_in_hand + 1) + "_image"));
    document.getElementById("my_hand_" + (game_structure.no_cards_in_hand + 1) + "_image").style.left = "0px";
    document.getElementById("my_hand_" + (game_structure.no_cards_in_hand + 1) + "_image").style.top = "35px";
    document.getElementById("my_hand_" + (game_structure.no_cards_in_hand + 1) + "_image").style.marginLeft = "0px";
    document.getElementById("my_hand_" + (game_structure.no_cards_in_hand + 1) + "_image").style.marginTop = "0px";
    document.getElementById("my_hand_" + (game_structure.no_cards_in_hand + 1) + "_image").style.position = "relative";
    make_card_draggable(game_structure.no_cards_in_hand + 1)
    change_z_index_hand();
    game_structure.no_cards_in_hand++;
    
    if(number_to_draw > 1)
    {
        draw_card(number_to_draw - 1);
    }
}
