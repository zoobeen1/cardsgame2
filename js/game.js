var crd = [];

var BootScene = new Phaser.Class({
    Extends: Phaser.Scene,
     initialize:
 
    function BootScene () {
        Phaser.Scene.call(this, { key: 'BootScene' });
    },
 
    preload: function ()  {
       // здесь будет загрузка ресурсов
       this.load.atlas( 'cards', 'assets/cards/cards.png', 'assets/cards/cards_atlas.json'); 
    },
 
    create: function () {
        this.scene.start('WorldScene');
    }
});

var WorldScene = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize:
 
    function WorldScene () {
        Phaser.Scene.call(this, { key: 'WorldScene' });
    },

    preload: function () {
 
    },

    create: function ()  {
        // здесь мы создадим сцену мира
        this.crd = [];
        var x = 40;

        for(var i=0;i<7;i++) {
          var j = i+2;
          this.crd.push(this.add.sprite(x, 100, 'cards', 'hearts_'+ j));
          this.crd[i].scale = 0.9;
          this.crd[i].setInteractive();
          x += this.crd[i].width * 0.9 + 5;          
       }

       this.input.on('pointerdown', this.startDrag, this);
    },

    startDrag(pointer, targets) {
       this.input.off('pointerdown', this.startDrag, this);
       this.dragObj = targets[0];
       //this.scene.bringToTop(this.dragObj);
       //game.scene.bringToTop(this.dragObj);
       
       for(var i=0; i<this.crd.length; i++) {
          this.crd[i].setDepth(0);
       }

       this.dragObj.setDepth(1);
       
       this.input.on('pointermove', this.doDrag, this);
       this.input.on('pointerup', this.stopDrag, this);
    },

    doDrag( pointer ) {
       this.dragObj.x = pointer.x;
       this.dragObj.y = pointer.y;
    },
   
    stopDrag() {
       this.input.on('pointerdown', this.startDrag, this);
       this.input.off('pointermove', this.doDrag, this);
       this.input.off('pointerup', this.stopDrag, this);
       
       for(var i=0; i<this.crd.length; i++) {
          console.log(this.crd[i].depth);
       }
       
    }
});

var config = {
    type: Phaser.AUTO,
    parent: 'content',
    width: 480,
    height: 640,
    backgroundColor: "#007700",
    zoom: 1,
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 400 }
        }
    },
    scene: [
        BootScene,
        WorldScene
    ]
};



var game = new Phaser.Game(config);
