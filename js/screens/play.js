game.PlayScreen = me.ScreenObject.extend({
    checkIfLoss : function (y) {
        if (y >= this.player.pos.y) {
           me.state.change(me.state.GAMEOVER);
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


        this.HUD = new game.HUD.Container();
        me.game.world.addChild(this.HUD);


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

        //remove the HUD from game world
        me.game.world.removeChild(this.HUD);
        
    }
  });
