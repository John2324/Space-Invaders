game.WinScreen = me.ScreenObject.extend({
    onResetEvent : function () {
        //me.game.world.addChild(new me.ColorLayer("background", "#000000"), 0);
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
            }
        })), 1);

        // change to play state on press Enter or click/tap
        me.input.bindKey(me.input.KEY.ENTER, "enter", true);
        me.input.bindPointer(me.input.pointer.LEFT, me.input.KEY.ENTER);
        this.handler = me.event.subscribe(me.event.KEYDOWN, function (action, keyCode, edge) {
            if (action === "enter") {
            // play something on mouse click / enter
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
