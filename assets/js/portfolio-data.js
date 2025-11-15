/*
const projects =
    [
        {
            title:,
            year:,
            roles:,
            coverImage:,
            link:
        },
    ];

*/
/*
<div className="swiper-slide">
    <img src="../assets/img/portfolio/Store_MainCapsule_Final.png" alt="">
</div>

<div className="swiper-slide">
    <img src="../assets/img/portfolio/Screenshot_Shield_New.png" alt="">
</div>

<div className="swiper-slide">
    <img src="../assets/img/portfolio/Screenshot_Rooftops_New.png" alt="">
</div>

<div className="swiper-slide">
    <img src="../assets/img/portfolio/Screenshot_Shoot.jpg" alt="">
    */
const projects =
    [
        {
            title: "Hermetica",
            year: 2024,
            roles: "Game Designer",
            description: "Hermetica: A deckbuilder roguelike",
            coverImage:"assets/img/portfolio/HERMETICA-KEYART.png" ,
            link: "projectsPages/project-Hermetica.html",
            categoryFilter: "filter-game",
            category: "Videogame",
            studio: "Red Mountain Games",
            platforms: "Steam, Nintendo Switch, Playstation and Xbox",
            storePage: "https://store.steampowered.com/app/2477420/Hermetica/",
            trailerURL: "https://www.youtube.com/embed/-huQUEA0v-w",
            theme: "hermetica3",
            emoji: "🧪",
            listIconType: "emoji",  // "emoji" | "image"
            dividerShape: "divider-zigzag",
            gallery: [
                "../assets/img/portfolio/HERMETICA-KEYART.png",
                "../assets/img/portfolio/Hermetica_Screenshot_1.jpg",
                "../assets/img/portfolio/Hermetica_Screenshot_2.jpg",
                "../assets/img/portfolio/Hermetica_Screenshot_4.jpg",
            ],
        },

        {
            title: "Lady Umbrella",
            year: 2025,
            roles: "Game Designer | Level Designer ",
            description: "Hermetica: A deckbuilder roguelike",
            coverImage:"assets/img/portfolio/LadyUmbrella_Cover_1200x1200.png" ,
            link: "projectsPages/project-LadyUmbrella.html",
            categoryFilter: "filter-game",
            category: "Videogame",
            studio: "Zulo Interactive",
            platforms: "Steam",
            storePage: "https://store.steampowered.com/app/3956890/Lady_Umbrella/",
            trailerURL: "https://www.youtube.com/embed/X_DgUlOjEhE",
            theme: "ladyumbrella",
            dividerShape: "divider-buildingsPNG",
            gallery: [
                "../assets/img/portfolio/Store_MainCapsule_Final.png",
                "../assets/img/portfolio/Screenshot_Shield_New.png",
                "../assets/img/portfolio/Screenshot_Rooftops_New.png",
                "../assets/img/portfolio/Screenshot_Shoot.jpg",
            ],
        },

        {
            title: "Alche Mice",
            year: 2024,
            roles: "Technical Designer | Game Programmer",
            description: "Alche Mice: A deckbuilder roguelike",
            coverImage: "assets/img/portfolio/AlcheMice_Cover.png",
            link: "projectsPages/project-AlcheMice.html",
            categoryFilter: "filter-game",
            category: "Videogame",
            studio: "Red Mountain Games",
            platforms: "Steam, Nintendo Switch, Playstation and Xbox",
            storePage: "https://store.steampowered.com/app/3670110/AlcheMice/",
            theme: "alchemice",
            emoji: "🧀",
            listIconImage: "../img/icons/cheeseIconDuo.png",
            dividerShape: "divider-mountain",
            gallery: [
                "../assets/img/portfolio/AlcheMice_Cover.png",
                "../assets/img/portfolio/AlcheMice_Witch.png",
                "../assets/img/portfolio/AlcheMice_Enviroment_1.jpg",
                "../assets/img/portfolio/AlcheMice_Potion_Crafting.jpg",
            ],
        },
        {
            title: "Lullaby",
            year: 2023,
            roles: "Game Designer | Game Programmer | Producer",
            description: "Lullaby: A 3d platformer videogame",
            coverImage: "assets/img/portfolio/Lullaby_CoverNight.jpg",
            link: "https://origamingcreations.itch.io/lullaby",
            categoryFilter: "filter-jam",
            category: "Videogame",
            studio: "Origaming Creations",
            platforms: "Windows and Web (Itch.io)",
            storePage: "https://origamingcreations.itch.io/lullaby",
            trailerURL: "https://www.youtube.com/embed/ZrVPbUZk2qM",
            theme: "lullaby",
            emoji: "🎵",
            dividerShape: "divider-wave",
        },
        {
            title: "Moonlit Mystery",
            year: 2023,
            roles: "Game Designer | Game Programmer",
            description: "Moonlit Mystery: A puzzle-detective video game",
            coverImage: "assets/img/portfolio/MoonlitMystery_Cover.png",
            link: "https://alexvbfpn.itch.io/moonlit-mystery",
            categoryFilter: "filter-jam",
            category: "Videogame",
            studio: "Origaming Creations"
        },
        {
            title: "Doing Time",
            year: 2023,
            roles: "Game Designer | Game Programmer | Producer",
            description: "Doing Time: A puzzle heist video game",
            coverImage: "assets/img/portfolio/DoingTime_Cover_Horizontal.png",
            link: "https://alexvbfpn.itch.io/doing-time",
            categoryFilter: "filter-jam",
            category: "Videogame",
            studio: "Origaming Creations"
        },
        {
            title: "Once Button A Time",
            year: 2024,
            roles: "Game Designer | Game Programmer | Producer",
            description: "OBAT: A 2.5D platformer game",
            coverImage: "assets/img/portfolio/OnceButtonATime_Cover.png",
            link: "https://origamingcreations.itch.io/once-button-a-time",
            categoryFilter: "filter-jam",
            category: "Videogame",
            studio: "Origaming Creations"
        },
        {
            title: "Inseye Out",
            year: 2024,
            roles: "Technical Designer | Game Programmer",
            description: "Inseye Out: A procedural tool for conveying emotions through eye expression",
            coverImage: "assets/img/portfolio/InseyeOut_Cover.png",
            link: "https://alexvbfpn.itch.io/inseye-out",
            categoryFilter: "filter-tool",
            category: "Tool",
            studio: "Own Project"
        },
        {
            title: "Stellar Maze",
            year: 2025,
            roles: "Game Designer | Level Designer | Game Programmer",
            description: "Stellar Maze: A 3D puzzle game around constellations",
            coverImage: "assets/img/portfolio/StellarMaze_Cover.png",
            link: "https://alexvbfpn.itch.io/stellar-maze",
            categoryFilter: "filter-jam",
            category: "Videogame",
            studio: "Own Project"
        },
        {
            title: "Recreating Game Mechanics",
            year: 2024,
            roles: "Technical Designer | Game Programmer",
            description: "TFG project about videogame mechanics recreation from games like: God of War, Metroid Dread, Superliminal or Viewfinder",
            coverImage: "assets/img/portfolio/RecreatingMechanics_Cover.png",
            link: "https://alexvbfpn.itch.io/recreating-game-mechanics",
            categoryFilter: "filter-other",
            category: "Academic Project",
            studio: "Own Project"
        },
    ];