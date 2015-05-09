var pokemon_list; 
var deck_list;
var deck_current = new Array(60);

function get_pokemon_list() //reads in JSON pokemon list
{
    var xmlhttp = new XMLHttpRequest();
    var url = "pokemon_list.txt";
    
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            pokemon_list = JSON.parse(xmlhttp.responseText);
            get_deck_list();
        }
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function get_deck_list() //reads in JSON deck list
{
    var xmlhttp = new XMLHttpRequest();
    var url = "deck.txt";
    
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            deck_list = JSON.parse(xmlhttp.responseText);
            new_game();
        }
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function new_game() //start game
{   
    var counter = 0;
    for(var i = 0; i < deck_list.length; i++)
    {
        for(var j = 0; j < deck_list[i].number; j++)
        {
            //create deck
            deck_current[counter] = deck_list[i].card;
            counter++;
        }
    }
    //shuffle deck
    shuffle_array(deck_current); 
    if(counter != 60)
    {
        //check number of cards is 60
        alert("Deck not right size!");
    }
    else
    {     
        //set enemy deck, enemy prize, my deck and my prize to pokemon card back and make them draggable
        document.getElementById("enemy_deck").innerHTML = "<IMG src=\"images/card_back_small.jpg\" style=\"width:125px;\" id=\"enemy_deck_image\" class=\"card\">";
        document.getElementById("enemy_prize").innerHTML = "<IMG src=\"images/card_back_small.jpg\" style=\"width:125px;\" id=\"enemy_prize_image\" class=\"card\">";
        document.getElementById("my_deck").innerHTML = "<IMG src=\"images/card_back_small.jpg\" style=\"width:125px;\" id=\"my_deck_image\" class=\"card\">";
        document.getElementById("my_prize").innerHTML = "<IMG src=\"images/card_back_small.jpg\" style=\"width:125px;\" id=\"my_prize_image\" class=\"card\">";  
        $("#enemy_deck_image").draggable({revert: true, stack: ".card"}); 
        $("#enemy_prize_image").draggable({revert: true, stack: ".card"}); 
        $("#my_deck_image").draggable({revert: true, stack: ".card"}); 
        $("#my_prize_image").draggable({revert: true, stack: ".card"}); 
    
        for(var i = 0; i < 7; i++) 
        {
            //set set enemy hand to pokemon card back and make them draggable
            document.getElementById("enemy_hand_" + (i + 1)).innerHTML = "<IMG src=\"images/card_back_small.jpg\" style=\"width:125px;\" id=\"enemy_hand_" + (i + 1) + "_image\" class=\"card\">";
            document.getElementById("enemy_hand_" + (i + 1) + "_image").style.zIndex = i + 1;
            $("#enemy_hand_" + (i + 1) + "_image").draggable({revert: true, stack: ".card"});      //make deck draggable   
        }
        
        //make my active, bench slots and the droppable zone (for trainers) all droppable
        $("#my_active").droppable({drop: function(event, ui){droppable_setup("my_active", game_structure.active.card, ui);}}); 
        $("#my_bench_1").droppable({drop: function(event, ui){droppable_setup("my_bench_1", game_structure.bench[0].card, ui);}}); 
        $("#my_bench_2").droppable({drop: function(event, ui){droppable_setup("my_bench_2", game_structure.bench[1].card, ui);}}); 
        $("#my_bench_3").droppable({drop: function(event, ui){droppable_setup("my_bench_3", game_structure.bench[2].card, ui);}}); 
        $("#my_bench_4").droppable({drop: function(event, ui){droppable_setup("my_bench_4", game_structure.bench[3].card, ui);}}); 
        $("#my_bench_5").droppable({drop: function(event, ui){droppable_setup("my_bench_5", game_structure.bench[4].card, ui);}});   
        $("#droppable_zone").droppable({drop: function(event, ui){droppable_setup("droppable_zone", game_structure.discard.card, ui);}});    
        //draw 7 cards
        draw_card(7);
        
        //the game is now set up. callbacks from here on.
    }
}

function make_card_draggable(i) //function to make my hand draggable
{   
    $("#my_hand_" + i + "_image").draggable({revert: (function(valid){setTimeout(function(){change_z_index_hand();}, 550);return true;}), stack: ".card", start: function(event, ui) {stop_click_event(ui);}, stop: function(event, ui) {start_click_event(ui);}});      //make deck draggable (meant to be wrong way round start-stop)
}

function droppable_setup(slot, pokemon_in_slot, ui) //function that is called when a card is dropped onto the slots
{  
    var thing_being_dropped = (ui.draggable).attr("id"); 
    if((thing_being_dropped.indexOf("enemy_hand") < 0) && (thing_being_dropped.indexOf("enemy_deck") < 0) && (thing_being_dropped.indexOf("enemy_prize") < 0) && (thing_being_dropped.indexOf("enemy_discard") < 0) && (thing_being_dropped.indexOf("my_discard") < 0) && (thing_being_dropped.indexOf("my_prize") < 0) && (thing_being_dropped.indexOf("my_deck") < 0) && (thing_being_dropped.indexOf("my_active") < 0))
    {
        var dropped_card = find_card_from_slot(thing_being_dropped);
        var slot_card = find_card_from_slot(slot);
        var pokemon_list_number = search_pokemon_list(dropped_card.card);
        var hand_number = find_number_in_string(thing_being_dropped);
        if(thing_being_dropped.indexOf("my_hand") >= 0) //if id contains my_hand       //TWO LOTS PASS THROUGH HERE PER DROP DUE TO DROPPABLE AREA AND BENCH OR ACTIVE
        {     
            if((pokemon_list[pokemon_list_number].type == "BP") && (pokemon_in_slot == "")) //check game structure if its BP
            {
                if(slot == "my_active")
                {
                    $("#" + thing_being_dropped).draggable("option", "revert", false);
                    var top_offset  = $("#" + thing_being_dropped).offset().top - $("#" + slot).offset().top;
                    var left_offset = $("#" + thing_being_dropped).offset().left - $("#" + slot).offset().left;
                    game_structure.no_cards_in_hand--;
                    $("#" + thing_being_dropped).animate({width: "200px", height: "280px", marginLeft: -left_offset, marginTop: -top_offset}, 100, function(){active_pokemon_played(thing_being_dropped, hand_number);});
                    document.getElementById(thing_being_dropped).onmouseover = null;
                    document.getElementById(thing_being_dropped).onmouseleave = null;  
                }
                else if(slot.indexOf("my_bench") >= 0)
                {
                    $("#" + thing_being_dropped).draggable("option", "revert", false);
                    var top_offset  = $("#" + thing_being_dropped).offset().top - $("#" + slot).offset().top;
                    var left_offset = $("#" + thing_being_dropped).offset().left - $("#" + slot).offset().left;
                    game_structure.no_cards_in_hand--;                    
                    $("#" + thing_being_dropped).animate({width: "125px", height: "175px", marginLeft: -left_offset, marginTop: -top_offset}, 100, function(){bench_pokemon_played(thing_being_dropped, slot, hand_number);});
                    document.getElementById(thing_being_dropped).onmouseover = null;
                    document.getElementById(thing_being_dropped).onmouseleave = null;
                }
            } 
            else if(((pokemon_list[pokemon_list_number].type == "BP") || (pokemon_list[pokemon_list_number].type == "P")) && (pokemon_in_slot != "") && ((slot == "my_active") || (slot.indexOf("my_bench") >= 0))) //check game structure if its BP or P   /EVOLVE
            {
                var devolution_string_length = pokemon_list[pokemon_list_number].devolution.length;
                var slot_card_devolution_match = slot_card.card.substring(slot_card.card.length - devolution_string_length, slot_card.card.length);
                if(pokemon_list[pokemon_list_number].devolution == slot_card_devolution_match)
                {
                    if(slot == "my_active")
                    {
                        $("#" + thing_being_dropped).draggable("option", "revert", false);
                        var top_offset  = $("#" + thing_being_dropped).offset().top - $("#" + slot).offset().top;
                        var left_offset = $("#" + thing_being_dropped).offset().left - $("#" + slot).offset().left;
                        game_structure.no_cards_in_hand--;
                        $("#" + thing_being_dropped).animate({width: "200px", height: "280px", marginLeft: -left_offset, marginTop: -top_offset}, 100, function(){active_pokemon_played(thing_being_dropped, hand_number);});
                        document.getElementById(thing_being_dropped).onmouseover = null;
                        document.getElementById(thing_being_dropped).onmouseleave = null;
                    }
                    else if(slot.indexOf("my_bench") >= 0)
                    {
                        $("#" + thing_being_dropped).draggable("option", "revert", false);
                        var top_offset  = $("#" + thing_being_dropped).offset().top - $("#" + slot).offset().top;
                        var left_offset = $("#" + thing_being_dropped).offset().left - $("#" + slot).offset().left; 
                        game_structure.no_cards_in_hand--;
                        $("#" + thing_being_dropped).animate({width: "125px", height: "175px", marginLeft: -left_offset, marginTop: -top_offset}, 100, function(){bench_pokemon_played(thing_being_dropped, slot, hand_number);});
                        document.getElementById(thing_being_dropped).onmouseover = null;
                        document.getElementById(thing_being_dropped).onmouseleave = null;
                    }
                }
            }
            else if((pokemon_list[pokemon_list_number].type == "T") && (slot == "droppable_zone")) //check game structure if its T and dropped in droppable zone
            {
                trainer_played(thing_being_dropped, slot, hand_number);
            }
            else if((pokemon_list[pokemon_list_number].type == "E") && ((slot.indexOf("my_bench") >= 0) || (slot.indexOf("my_active") >= 0)) && (pokemon_in_slot != "")) //check game structure if its E and its been dropped on the bench or active slots
            {
                $("#" + thing_being_dropped).draggable("option", "revert", false);                    
                var top_offset  = $("#" + thing_being_dropped).offset().top - $("#" + slot).offset().top;
                var left_offset = $("#" + thing_being_dropped).offset().left - $("#" + slot).offset().left;  
                game_structure.no_cards_in_hand--;
                if(slot.indexOf("my_active") >= 0)
                {
                    $("#" + thing_being_dropped).animate({width: "200px", height: "280px", marginLeft: -left_offset, marginTop: -top_offset}, 100, function(){energy_active_played(thing_being_dropped, hand_number);});                   
                }                    
                else
                {
                    $("#" + thing_being_dropped).animate({width: "125px", height: "175px", marginLeft: -left_offset, marginTop: -top_offset}, 100, function(){energy_bench_played(thing_being_dropped, slot, hand_number);});
                }               
                document.getElementById(thing_being_dropped).onmouseover = null;
                document.getElementById(thing_being_dropped).onmouseleave = null; 
            }
        }
        else if((thing_being_dropped.indexOf("my_bench") >= 0)) //bit of a hack
        {
            if(slot == "my_active" && (pokemon_in_slot == ""))
            {
                $("#" + thing_being_dropped).draggable("option", "revert", false);
                var top_offset  = $("#" + thing_being_dropped).offset().top - $("#" + slot).offset().top;
                var left_offset = $("#" + thing_being_dropped).offset().left - $("#" + slot).offset().left;
                $("#" + thing_being_dropped).animate({width: "200px", height: "280px", marginLeft: -left_offset, marginTop: -top_offset}, 100, function(){active_pokemon_played(thing_being_dropped, hand_number);});
            }
        }
        /*else if(thing_being_dropped.indexOf("my_active") >= 0) //bit of a hack
        {
            if(slot.indexOf("my_bench") >= 0)
            {
                $("#" + thing_being_dropped).draggable("option", "revert", false);
                var top_offset  = $("#" + thing_being_dropped).offset().top - $("#" + slot).offset().top;
                var left_offset = $("#" + thing_being_dropped).offset().left - $("#" + slot).offset().left;                    
                $("#" + thing_being_dropped).animate({width: "125px", height: "175px", marginLeft: -left_offset, marginTop: -top_offset}, 100, function(){bench_pokemon_played(thing_being_dropped, slot, hand_number);});
            }
        }*/
    }
}


function search_pokemon_list(card) //function that finds the array number of a particular card in the pokemon_list JSON
{
    for(var i = 0; i < pokemon_list.length; i++)
    {
        if(pokemon_list[i].card == card)
        {
            return i;
        }
    }
    return;
}

function find_card_from_slot(slot)// this finds the name of the card residing in a slot
{
    var card;
    if(slot.indexOf("my_active") >= 0)
    {        
        card = game_structure.active;
    }
    else if(slot.indexOf("my_bench") >= 0  && slot.indexOf("enemy_hand") < 0)
    {
        card = game_structure.bench[find_number_in_string(slot)];      
    }
    else if(slot.indexOf("my_hand") >= 0)
    {
        card = game_structure.hand[find_number_in_string(slot)];
    }
    else if(slot.indexOf("droppable") >= 0)
    {
        card = game_structure.droppable;
    }
    else if(slot.indexOf("discard") >= 0)
    {
        card = game_structure.discard;
    }
    return card;
}

function stop_click_event(ui) //the click event is stopped if the card is dragged  
{ 
    document.getElementById(ui.helper.context.id).style.border = null;
    document.getElementById(ui.helper.context.id).onclick = null;
}

function start_click_event(ui) //the click event is started if the card has stopped being dragged
{
    document.getElementById(ui.helper.context.id).onclick = function(){card_clicked(ui.helper.context.id);};
}

function make_card_border(slot)
{
    if($(".card").is('.ui-draggable-dragging') == false)
    {
        document.getElementById(slot).style.border = "thick solid #00FFFF";
    }
}

function make_card_unborder(slot)
{
    if($(".card").is('.ui-draggable-dragging') == false)
    {
        document.getElementById(slot).style.border = null;
    }
}

function change_z_index_hand()
{
    for(var i = 0; i < 16; i++)
    {
        if(document.getElementById("my_hand_" + (i + 1) + "_image") != null)
        {
            document.getElementById("my_hand_" + (i + 1) + "_image").style.zIndex = i + 1;
        }
    }
}

function find_number_in_string(string)
{
    var reg = /\d+/;
    var number = reg.exec(string)[0];
    return parseInt(number, 10) - 1;
}

function shuffle_array(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

window.onload = function() //startup
{
    create_game_structure();
    get_pokemon_list();
};
