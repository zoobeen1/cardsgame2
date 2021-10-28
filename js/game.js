var crd = [];

var BootScene = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize:

        function BootScene() {
            Phaser.Scene.call(this, { key: 'BootScene' });
        },

    preload: function () {
        // здесь будет загрузка ресурсов
        this.load.atlas('cards', 'assets/cards/cards.png', 'assets/cards/cards_atlas.json');
    },

    create: function () {
        this.scene.start('WorldScene');
    }
});

var WorldScene = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize:

        function WorldScene() {
            Phaser.Scene.call(this, { key: 'WorldScene' });
        },

    preload: function () {

    },

    create: function () {
        // здесь мы создадим сцену мира
        this.crd = [];


        /*for(var i=0;i<7;i++) {
          var j = i+2;
          this.crd.push(this.add.sprite(x, 100, 'cards', 'hearts_'+ j));
          this.crd[i].scale = 0.9;
          this.crd[i].setInteractive();
          x += this.crd[i].width * 0.9 + 5;          
       }*/

        //placeholders
        this.crd.push(this.add.sprite(100, 150, 'cards', 'placeholder'));
        this.crd.push(this.add.sprite(260, 150, 'cards', 'placeholder'));
        this.crd.push(this.add.sprite(580, 150, 'cards', 'placeholder'));
        this.crd.push(this.add.sprite(740, 150, 'cards', 'placeholder'));
        this.crd.push(this.add.sprite(900, 150, 'cards', 'placeholder'));
        this.crd.push(this.add.sprite(1060, 150, 'cards', 'placeholder'));

        this.crd.push(this.add.sprite(100, 378, 'cards', 'placeholder'));
        this.crd.push(this.add.sprite(260, 378, 'cards', 'placeholder'));
        this.crd.push(this.add.sprite(420, 378, 'cards', 'placeholder'));
        this.crd.push(this.add.sprite(580, 378, 'cards', 'placeholder'));
        this.crd.push(this.add.sprite(740, 378, 'cards', 'placeholder'));
        this.crd.push(this.add.sprite(900, 378, 'cards', 'placeholder'));
        this.crd.push(this.add.sprite(1060, 378, 'cards', 'placeholder'));

        //для инфо 7 карт
        /*this.crd.push(this.add.sprite(260, 410, 'cards', 'card_shirt'));
        this.crd.push(this.add.sprite(260, 442, 'cards', 'card_shirt'));
        this.crd.push(this.add.sprite(260, 474, 'cards', 'card_shirt'));
        this.crd.push(this.add.sprite(260, 506, 'cards', 'card_shirt'));
        this.crd.push(this.add.sprite(260, 538, 'cards', 'card_shirt'));
        this.crd.push(this.add.sprite(260, 570, 'cards', 'card_shirt'));
        this.crd.push(this.add.sprite(260, 602, 'cards', 'card_shirt'));*/

        

        //sekcyja raskladki kart
        this.crd.push(this.add.sprite(100, 150, 'cards', 'card_shirt'));
        var j = 1;//dobavlyaet kartu na novom placeholdere      
        var x = 100;//nachalnaya koordinata po x

        for (let i = 0; i < 7; i++) {
            var y = 378;//nachalnaya koordinata po y
            var k = 0;//schetchik kart v placeholdere
            do {
                this.crd.push(this.add.sprite(x, y, 'cards', 'card_shirt'));
                y = y + 32;//sdvig v niz
                k++;
            } while (k < j);
            x = x + 160;//sdvig po x
            j = j + 1;
        }


        this.input.on('pointerdown', this.startDrag, this);
    },

    startDrag(pointer, targets) {
        this.input.off('pointerdown', this.startDrag, this);
        this.dragObj = targets[0];
        //this.scene.bringToTop(this.dragObj);
        //game.scene.bringToTop(this.dragObj);

        for (var i = 0; i < this.crd.length; i++) {
            this.crd[i].setDepth(0);
        }

        this.dragObj.setDepth(1);

        this.input.on('pointermove', this.doDrag, this);
        this.input.on('pointerup', this.stopDrag, this);
    },

    doDrag(pointer) {
        this.dragObj.x = pointer.x;
        this.dragObj.y = pointer.y;
    },

    stopDrag() {
        this.input.on('pointerdown', this.startDrag, this);
        this.input.off('pointermove', this.doDrag, this);
        this.input.off('pointerup', this.stopDrag, this);

        for (var i = 0; i < this.crd.length; i++) {
            console.log(this.crd[i].depth);
        }

    }
});

var config = {
    type: Phaser.AUTO,
    parent: 'content',
    width: 1280,
    height: 720,
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
