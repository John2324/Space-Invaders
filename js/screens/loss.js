game.LossScreen = me.ScreenObject.extend({
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
           this.font.draw(renderer, "YOU LOST", me.game.viewport.width, 350);
           this.font.draw(renderer, "Score: "+ game.data.score, me.game.viewport.width, 380); //render total score to player
           this.font.draw(renderer, "Waves Passed: "+ game.wave.score, me.game.viewport.width, 410);  //render total waves passed to player
           this.font.draw(renderer, "Press ENTER to play again", me.game.viewport.width, 500);
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

       //Reset score and wave counter
       game.data.score = 0;
       game.wave.score = 0;
     }
   });
   