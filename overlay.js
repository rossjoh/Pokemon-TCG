function card_clicked(slot) //function is called when the card is clicked
{
    var card_name = find_card_from_slot(slot);
    console.log(slot)
    if(slot.indexOf("my_hand") >= 0)
    {
        document.getElementById("popup_window_1").innerHTML = "<IMG src=\"images/" + card_name.card + ".jpg\" style=\"width:500px\" id=\"" + slot + "_image\" onclick=\"overlay_clicked();\">";
        document.getElementById("popup_window_1").style.width  = "500px"
        document.getElementById("popup_window_1").style.height = "700px"
        document.getElementById("popup_window_1").style.left = "0px"
        document.getElementById("popup_window_1").style.top = "0px"
        document.getElementById("popup_window_1").style.position = "absolute"
        $("#popup_window").fadeIn(200);
        $("#popup_window_1").fadeIn(200);
        $("#overlay").fadeIn(200);
        document.getElementById("overlay").onclick = (function(){overlay_clicked();});
    }
    else if((slot.indexOf("my_active") >= 0) || (slot.indexOf("my_bench") >= 0))
    {
        document.getElementById("popup_window_1").innerHTML = "<IMG src=\"images/" + card_name.card + ".jpg\" style=\"width:500px\" id=\"" + slot + "_image\" onclick=\"overlay_clicked();\">";
        document.getElementById("popup_window_1").style.width  = "500px"
        document.getElementById("popup_window_1").style.height = "700px"
        document.getElementById("popup_window_1").style.left = "0px"
        document.getElementById("popup_window_1").style.top = "0px"
        document.getElementById("popup_window_1").style.position = "absolute"
        $("#popup_window").fadeIn(200);
        $("#popup_window_1").fadeIn(200);
        $("#overlay").fadeIn(200);
        document.getElementById("overlay").onclick = (function(){overlay_clicked();});
    }
    else
    {
        document.getElementById("popup_window_1").innerHTML = "<IMG src=\"images/" + card_name.card + ".jpg\" style=\"width:500px\" id=\"" + slot + "_image\" onclick=\"overlay_clicked();\">";
        document.getElementById("popup_window_1").style.width  = "500px"
        document.getElementById("popup_window_1").style.height = "700px"
        document.getElementById("popup_window_1").style.left = "0px"
        document.getElementById("popup_window_1").style.top = "0px"
        document.getElementById("popup_window_1").style.position = "absolute"
        $("#popup_window").fadeIn(200);
        $("#popup_window_1").fadeIn(200);
        $("#overlay").fadeIn(200);
        document.getElementById("overlay").onclick = (function(){overlay_clicked();});
    }
    
}

function overlay_clicked() //function is called when the overlay is clicked
{
    $("#popup_window").fadeIn(200);
    $("#popup_window_1").fadeOut(200);
    $("#overlay").fadeOut(200);
}