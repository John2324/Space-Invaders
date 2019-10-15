game.PlayScreen = me.ScreenObject.extend({
    /**
     * action to perform on state change
     */
    onResetEvent : function () {
        me.game.world.addChild(new me.ColorLayer("background", "#000000"), 0);
        me.game.world.addChild(me.pool.pull("player"));
    },
  
    /**
     * action to perform when leaving this screen (state change)
     */
    onDestroyEvent : function () {
    }
  });
  