function trainer_played(thing_being_dropped, slot, hand_number)
{
    var trainer = find_card_from_slot("my_hand_" + (hand_number + 1)).card;
    should_trainer_revert = which_trainer_card_revert(trainer);
    
    
    //console.log(trainer)
    
    if(should_trainer_revert)
    {
    }
    else if(trainer == "base_set_defender" || trainer == "base_set_pluspower")
    {
        $("#" + thing_being_dropped).draggable("option", "revert", false);                    
        var top_offset  = $("#" + thing_being_dropped).offset().top - $("#" + slot).offset().top;
        var left_offset = $("#" + thing_being_dropped).offset().left - $("#" + slot).offset().left;  
        game_structure.no_cards_in_hand--;
        if(slot.indexOf("my_active") >= 0)
        {
            $("#" + thing_being_dropped).animate({width: "200px", height: "280px", marginLeft: -left_offset, marginTop: -top_offset}, 100, function(){attachable_trainer_active_played(thing_being_dropped, hand_number);});                   
        }                    
        else
        {
            $("#" + thing_being_dropped).animate({width: "125px", height: "175px", marginLeft: -left_offset, marginTop: -top_offset}, 100, function(){attachable_trainer_bench_played(thing_being_dropped, slot, hand_number);});
        }               
        document.getElementById(thing_being_dropped).onmouseover = null;
        document.getElementById(thing_being_dropped).onmouseleave = null; 
    }
    else 
    {
        document.getElementById(thing_being_dropped).onmouseover = null;     //remove mouse effects from played trainer
        document.getElementById(thing_being_dropped).onmouseleave = null;    //remove mouse effects from played trainer
        $("#" + thing_being_dropped).draggable("option", "revert", false);   //stop revert event        
        var top_offset  = $("#" + thing_being_dropped).offset().top - $("#my_discard").offset().top;
        var left_offset = $("#" + thing_being_dropped).offset().left - $("#my_discard").offset().left;  
        game_structure.no_cards_in_hand--;
        $("#" + thing_being_dropped).animate({width: "125px", height: "175px", marginLeft: -left_offset, marginTop: -top_offset}, 400, function(){trainer_to_discard_handoff(hand_number, thing_being_dropped);});

    }                         
}

function trainer_to_discard_handoff(hand_number, thing_being_dropped)
{    
    document.getElementById("my_discard").innerHTML = null;
    $("#my_discard").append($("#" + thing_being_dropped));
    document.getElementById(thing_being_dropped).innerHTML = "";
    document.getElementById(thing_being_dropped).id = "my_discard_image";
    document.getElementById("my_discard_image").style.left = "0px";
    document.getElementById("my_discard_image").style.top = "0px";
    document.getElementById("my_discard_image").style.marginLeft = "0px";
    document.getElementById("my_discard_image").style.marginTop = "0px";
    document.getElementById("my_discard_image").style.position = "relative";
    game_structure.discard.card = game_structure.hand[hand_number].card;
    game_structure.hand[hand_number].card = "";
    $("#my_discard_image").draggable("option", "revert", true);
    move_cards_in_hand(hand_number, which_trainer_card); //callback sent through 
}
 
function which_trainer_card()
{
    trainer = game_structure.discard.card;    
    switch(trainer) 
    {
        case "base_set_bill":
            base_set_bill();
            break;
        case "base_set_computer_search":
            base_set_computer_search();
            break;
        case "base_set_defender":
            base_set_defender();
            break;
        case "base_set_devolution_spray":
            base_set_devolution_spray();
            break;
        case "base_set_energy_removal":
            base_set_energy_removal();
            break;
        case "base_set_energy_retrieval":
            base_set_energy_retrieval();
            break;
        case "base_set_full_heal":
            base_set_full_heal();
            break;
        case "base_set_gust_of_wind":
            base_set_gust_of_wind();
            break;
        case "base_set_imposter_professor_oak":
            base_set_imposter_professor_oak();
            break;
        case "base_set_item_finder":
            base_set_item_finder();
            break;
        case "base_set_lass":
            base_set_lass();
            break;
        case "base_set_maintenance":
            base_set_maintenance();
            break;
        case "base_set_plus_power":
            base_set_plus_power();
            break;
        case "base_set_pokedex":
            base_set_pokedex();
            break;
        case "base_set_pokemon_breeder":
            base_set_pokemon_breeder();
            break;
        case "base_set_pokemon_center":
            base_set_pokemon_center();
            break;
        case "base_set_pokemon_flute":
            base_set_pokemon_flute();
            break;
        case "base_set_pokemon_trader":
            base_set_pokemon_trader();
            break;
        case "base_set_potion":
            base_set_potion();
            break;
        case "base_set_professor_oak":
            base_set_professor_oak();
            break;
        case "base_set_revive":
            base_set_revive();
            break;
        case "base_set_scoop_up":
            base_set_scoop_up();
            break;
        case "base_set_super_energy_removal":
            base_set_super_energy_removal();
            break;
        case "base_set_super_potion":
            base_set_super_potion();
            break;
        case "base_set_switch":
            base_set_switch();
            break;        
    }   
}

function which_trainer_card_revert(trainer)
{    
    switch(trainer) 
    {
        case "base_set_bill":
            base_set_bill_revert();
            break;
        case "base_set_computer_search":
            base_set_computer_search_revert();
            break;
        case "base_set_defender":
            base_set_defender_revert();
            break;
        case "base_set_devolution_spray":
            base_set_devolution_spray_revert();
            break;
        case "base_set_energy_removal":
            base_set_energy_removal_revert();
            break;
        case "base_set_energy_retrieval":
            base_set_energy_retrieval_revert();
            break;
        case "base_set_full_heal":
            base_set_full_heal_revert();
            break;
        case "base_set_gust_of_wind":
            base_set_gust_of_wind_revert();
            break;
        case "base_set_imposter_professor_oak":
            base_set_imposter_professor_oak_revert();
            break;
        case "base_set_item_finder":
            base_set_item_finder_revert();
            break;
        case "base_set_lass":
            base_set_lass_revert();
            break;
        case "base_set_maintenance":
            base_set_maintenance_revert();
            break;
        case "base_set_plus_power":
            base_set_plus_power_revert();
            break;
        case "base_set_pokedex":
            base_set_pokedex_revert();
            break;
        case "base_set_pokemon_breeder":
            base_set_pokemon_breeder_revert();
            break;
        case "base_set_pokemon_center":
            base_set_pokemon_center_revert();
            break;
        case "base_set_pokemon_flute":
            base_set_pokemon_flute_revert();
            break;
        case "base_set_pokemon_trader":
            base_set_pokemon_trader_revert();
            break;
        case "base_set_potion":
            base_set_potion_revert();
            break;
        case "base_set_professor_oak":
            base_set_professor_oak_revert();
            break;
        case "base_set_revive":
            base_set_revive_revert();
            break;
        case "base_set_scoop_up":
            base_set_scoop_up_revert();
            break;
        case "base_set_super_energy_removal":
            base_set_super_energy_removal_revert();
            break;
        case "base_set_super_potion":
            base_set_super_potion_revert();
            break;
        case "base_set_switch":
            base_set_switch_revert();
            break;        
    }   
}

function base_set_bill()
{
    draw_card(2);
}

function base_set_computer_search()
{
    
}

function base_set_defender()
{
    
}

function base_set_devolution_spray()
{
    
}

function base_set_energy_removal()
{
    
}

function base_set_energy_retrieval()
{
    
}

function base_set_full_heal()
{
    
}

function base_set_gust_of_wind()
{
    
}

function base_set_imposter_professor_oak()
{
    
}

function base_set_item_finder()
{
    
}

function base_set_lass()
{
    
}

function base_set_maintenance()
{
    
}

function base_set_plus_power()
{
    
}

function base_set_pokedex()
{
    
}

function base_set_pokemon_breeder()
{
    
}

function base_set_pokemon_center()
{
    
}

function base_set_pokemon_flute()
{
    
}

function base_set_pokemon_trader()
{
    
}

function base_set_potion()
{
    
}

function base_set_professor_oak()
{
    
}

function base_set_revive()
{
    
}

function base_set_scoop_up()
{
    
}

function base_set_super_energy_removal()
{
    
}

function base_set_super_potion()
{
    
}

function base_set_switch()
{
    
}

function base_set_bill_revert()
{
    
}

function base_set_computer_search_revert()
{
    
}

function base_set_defender_revert()
{
    
}

function base_set_devolution_spray_revert()
{
    
}

function base_set_energy_removal_revert()
{
    
}

function base_set_energy_retrieval_revert()
{
    
}

function base_set_full_heal_revert()
{
    
}

function base_set_gust_of_wind_revert()
{
    
}

function base_set_imposter_professor_oak_revert()
{
    
}

function base_set_item_finder_revert()
{
    
}

function base_set_lass_revert()
{
    
}

function base_set_maintenance_revert()
{
    
}

function base_set_plus_power_revert()
{
    
}

function base_set_pokedex_revert()
{
    
}

function base_set_pokemon_breeder_revert()
{
    
}

function base_set_pokemon_center_revert()
{
    
}

function base_set_pokemon_flute_revert()
{
    
}

function base_set_pokemon_trader_revert()
{
    
}

function base_set_potion_revert()
{
    
}

function base_set_professor_oak_revert()
{
    
}

function base_set_revive_revert()
{
    
}

function base_set_scoop_up_revert()
{
    
}

function base_set_super_energy_removal_revert()
{
    
}

function base_set_super_potion_revert()
{
    
}

function base_set_switch_revert()
{
 
}