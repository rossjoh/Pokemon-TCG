function card_clicked(slot) //function is called when the card is clicked
{
    var card_name = find_card_from_slot(slot);
    
    //if(card_name )
    
    
    document.getElementById("popup_window").innerHTML = "<IMG src=\"images/" + card_name.card + ".jpg\" style=\"width:500px\" id=\"" + slot + "_image\" onclick=\"overlay_clicked();\">";
    document.getElementById("popup_window").style.width  = "500px"
    document.getElementById("popup_window").style.height = "700px"
    document.getElementById("popup_window").style.left = "0px"
    document.getElementById("popup_window").style.top = "0px"
    document.getElementById("popup_window").style.position = "absolute"
    $("#popup_window").fadeIn(200);
    $("#overlay").fadeIn(200);
    document.getElementById("overlay").onclick = (function(){overlay_clicked();});
}

function overlay_clicked()
{
    $("#popup_window").fadeOut(200);
    $("#overlay").fadeOut(200);
}