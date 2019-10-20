var game = {
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
        this.menuScreen = new game.MenuScreen();
        me.state.set(me.state.MENU, this.menuScreen());
        //me.state.transition("fade", "#000", 250);
        //me.state.change(me.state.MENU);

        //Create the Loss Screen
        this.lossScreen = new game.LossScreen();
        me.state.set(me.state.GAMOVER, this.lossScreen());

        //Create the Win Screen
        this.winScreen = new game.WinScreen();
        me.state.set(me.state.GAME_END, this.winScreen());

        // start the game
        me.state.change(me.state.PLAY);
    }
};
