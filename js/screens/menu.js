game.MenuScreen = me.ScreenObject.extend({
 /**
   * action to perform on state change
   */
  onResetEvent : function () {
    // add a new renderable component with the scrolling text
    me.game.world.addChild(new (me.Renderable.extend ({
      // constructor
      init : function () {
        this._super(me.Renderable, 'init', [0, 0, me.game.viewport.width, me.game.viewport.height]);

        // font for text
        this.font = new me.BitmapFont(me.loader.getBinary('PressStart2P'), me.loader.getImage('PressStart2P'));
        this.font.textAlign = "center";
      },

      update : function (dt) {
        return true;
      },

      draw : function (renderer) {
        this.font.draw(renderer, "HOW TO PLAY", me.game.viewport.width, 300);
        this.font.draw(renderer, "Use arrows to move", me.game.viewport.width, 350);
        this.font.draw(renderer, "Press SPACE to shoot", me.game.viewport.width, 400);
        this.font.draw(renderer, "Press ENTER to play", me.game.viewport.width, 550);
      },
    })), 1);

    // change to play state on press Enter or click/tap
    me.input.bindKey(me.input.KEY.ENTER, "enter", true);
    me.input.bindPointer(me.input.pointer.LEFT, me.input.KEY.ENTER);
    this.handler = me.event.subscribe(me.event.KEYDOWN, function (action, keyCode, edge) {
      if (action === "enter") {
        me.state.change(me.state.PLAY);
      }
    });
  },

  /**
   * action to perform when leaving this screen (state change)
   */
  onDestroyEvent : function () {
    me.input.unbindKey(me.input.KEY.ENTER);
    me.input.unbindPointer(me.input.pointer.LEFT);
    me.event.unsubscribe(this.handler);
  }
});
