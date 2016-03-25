/*=============================================
=            Animated Input Plugin            =
=============================================*/

var animatedCharacterInput = (function() {
  'use strict';

  // Character Input Constructor

  function characterInput() {

    this.template = '<div class="animatedInput"><input id="textInput" type="text" maxlength="24"></input><div class="start"></div></div>'
    this.animation = "slideInUp"

  }

  // Render Template and Element to View
  characterInput.prototype.render = function() {

    var template = this.template;

    var characterInputPrototype = Object.create(HTMLElement.prototype);
    characterInputPrototype.createdCallback = function() {

      this.innerHTML = template;

    };

    characterInputPrototype.foo = function() {
      console.log('foo() called');
    };

    var XFoo = document.registerElement('character-input', {
      prototype: characterInputPrototype
    });

  }

  characterInput.prototype.observe = function() {

      const $input        = $('#textInput');
      const animationType = this.animation;
      
      var keyDowns    = Rx.Observable.fromEvent($input, 'keydown');
      var inputChange = Rx.Observable.fromEvent($input, 'select');

      var actions = Rx.Observable
          .merge(inputChange, keyDowns)
          .filter( function(x, idx, obs) {
            // console.log(idx);
            return idx;

          });

      keyDowns.subscribe(function(e) {

          var character = ""+e.keyIdentifier+"";
          var val = String.fromCharCode(parseInt(event.keyIdentifier.substr(2), 16)).toLowerCase();
          if(e.keyCode === 32) { val = "&nbsp"; }
          if(e.keyCode === 8) { 

            setTimeout( function() {

              $(".animatedInput").find("div:not(.start)").remove();
            for (var i = 0; i < e.target.value.length; i++) {
              var val = e.target.value[i];
              if(e.target.value[i] === " ") { val = "&nbsp;" }
              $(".animatedInput").append("<div class='animated'>"+val+"</div>");
            }
            }, 1);

          }
          else {
            
            if($(".animatedInput").find("div:not(.start)").length <= 24) {      
              $(".animatedInput div").eq(e.target.selectionStart).after("<div class='animated "+ animationType +"'>"+val+"</div>");
            }

          }

      });

      var observableArray = [];
      var i = 0;

      actions.subscribe(
        function(e) {

          observableArray.push(e);
          i++;
          
          console.log(e);

          if( i > 1 ) { 
            if(observableArray[i-2].type === "select") {

              setTimeout( function() {

                $(".animatedInput").find("div:not(.start)").remove();
              for (var i = 0; i < e.target.value.length; i++) {
                var val = e.target.value[i];
                if(e.target.value[i] === " ") { val = "&nbsp;" }
                $(".animatedInput").append("<div class='animated'>"+val+"</div>");
              }
              }, 1);

            }
          }

        }
      );

  }

  var animatedCharacterInput = {
    init: function(animation) {

      var input = new characterInput();
          input.render()
          input.observe()
    
    },
    changeAnimation: function() {
      
      

    }
  };

  return animatedCharacterInput;
})();

animatedCharacterInput.init();

/*=====  End of Animated Input Plugin  ======*/
