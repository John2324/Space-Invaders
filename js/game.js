var game = {

    data : {
        score : 0
    },
    // Run on page load.
    onload : function () {
        // Initialize the video.
        if (!me.video.init(640, 480, {wrapper : "screen", scale : 'auto'})) {
            alert("Your browser does not support HTML5 canvas.");
            return;
        }

        // Initialize the audio.
        me.audio.init("mp3,ogg");

        // set and load all resources.
        // (this will also automatically switch to the loading screen)
        me.loader.preload(game.resources, this.loaded.bind(this));
    },

    // Run on game resources loaded.
    loaded : function () {
        me.pool.register("player", game.Player);
        me.pool.register("enemy", game.Enemy);
        me.pool.register("laser", game.Laser);
        // set the "Play/Ingame" Screen Object
        this.playScreen = new game.PlayScreen();
        me.state.set(me.state.PLAY, this.playScreen);
        
        //Create the Menu Screen
        me.state.set(me.state.MENU, new game.MenuScreen());

        //Create the Loss Screen
        me.state.set(me.state.GAMEOVER, new game.LossScreen());

        //Create the Win Screen
        me.state.set(me.state.GAME_END, new game.WinScreen());

        //set a global fading transition for the screen
        me.state.transition("fade", "#000", 250);
        
        // start the game (Replace with Menu)
        me.state.change(me.state.MENU);
    }
};
