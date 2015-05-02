var game_structure = new Object();

function create_game_structure()
{
    game_structure = {
        "no_cards_in_hand" : 0,
        "active" :  {"card" : "", "energy" : [], "devolution" : [], "trainer" : []},
        "bench"  : [{"card" : "", "energy" : [], "devolution" : [], "trainer" : []},
                    {"card" : "", "energy" : [], "devolution" : [], "trainer" : []},
                    {"card" : "", "energy" : [], "devolution" : [], "trainer" : []},
                    {"card" : "", "energy" : [], "devolution" : [], "trainer" : []},
                    {"card" : "", "energy" : [], "devolution" : [], "trainer" : []}],
        "hand"   : [{"card" : ""},
                    {"card" : ""},
                    {"card" : ""},
                    {"card" : ""},
                    {"card" : ""},
                    {"card" : ""},
                    {"card" : ""},
                    {"card" : ""},
                    {"card" : ""},
                    {"card" : ""},
                    {"card" : ""},
                    {"card" : ""},
                    {"card" : ""},
                    {"card" : ""},
                    {"card" : ""},
                    {"card" : ""}],
        "discard" : {"card" : ""}
    }
}