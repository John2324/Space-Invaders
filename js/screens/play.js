game.PlayScreen = me.ScreenObject.extend({
    checkIfLoss : function (y) {
        if (y >= this.player.pos.y) {

            //Change this code to the "loss" screen with me.state.change(me.state.GAMEOVER)
           this.reset();
        }
    },

    /**
     * action to perform on state change
     */
    onResetEvent : function () {
        me.game.world.addChild(new me.ColorLayer("background", "#000000"), 0);
        
        this.player = me.pool.pull("player");
        me.game.world.addChild(this.player, 1);

        this.enemyManager = new game.EnemyManager();
        this.enemyManager.createEnemies();
        me.game.world.addChild(this.enemyManager, 2);


        me.input.bindKey(me.input.KEY.LEFT, "left");
        me.input.bindKey(me.input.KEY.RIGHT, "right");
        me.input.bindKey(me.input.KEY.A, "left");
        me.input.bindKey(me.input.KEY.D, "right");
        me.input.bindKey(me.input.KEY.SPACE, "shoot", true);
    },
  
    /**
     * action to perform when leaving this screen (state change)
     */
    onDestroyEvent : function () {
        me.input.unbindKey(me.input.KEY.LEFT);
        me.input.unbindKey(me.input.KEY.RIGHT);
        me.input.unbindKey(me.input.KEY.A);
        me.input.unbindKey(me.input.KEY.D);
        me.input.unbindKey(me.input.KEY.SPACE);
        
    }
});

//Add Win Screen
game.WinScreen = me.ScreenObject.extend({
    onResetEvent : function () {
        me.game.world.addChild(new me.ColorLayer("background", "#000000"), 0);
        me.game.world.addChild(new (me.Renderable.extend ({
            // constructor
            init : function () {
                this._super(me.Renderable, 'init', [0, 0, me.game.viewport.width, me.game.viewport.height]);
        
                // font for the text
                this.font = new me.BitmapFont(me.loader.getBinary("PressStart2P"), me.loader.getImage("PressStart2P"));
        
            },
        
            // Draw Text to Screen
            draw : function (renderer) {
                this.font.draw(renderer, "YOU WIN", 20, 240);
                this.font.draw(renderer, "PRESS ENTER TO PLAY AGAIN", 40, 240);
            },
        })), 1);

        // change to play state on press Enter or click/tap
        me.input.bindKey(me.input.KEY.ENTER, "enter", true);
        me.input.bindPointer(me.input.pointer.LEFT, me.input.KEY.ENTER);
        this.handler = me.event.subscribe(me.event.KEYDOWN, function (action, keyCode, edge) {
            if (action === "enter") {
            // play something on tap / enter
            me.state.change(me.state.PLAY);
            }
        });
    },

    onDestroyEvent : function () {
        me.input.unbindKey(me.input.KEY.ENTER);
        me.input.unbindPointer(me.input.pointer.LEFT);
        me.event.unsubscribe(this.handler);
    }

});


    /*
    Add Loss Screen

    */


    /* Add Menu Screen
game.MenuScreen = me.ScreenObject.extend({

})
    */
