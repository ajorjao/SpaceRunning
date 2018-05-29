// ship speeds
var regular_speed = 5;
var max_speed = 10;
var slow_speed = 2.5;

//categorias tokens
var walls;
var alies;
var obstacles;
var bullets;
var keys;
var doors;
var portals;
var collisionTokens;

// stage global variables (se modifican cada vez que se cambia la etapa)
var player_spawn;
var stage_obstacles;
var stage_doors;
var spawn_points;

//global variables
var player;
var deaths = 0;
var stage_deaths = 0;
var total_time = 0;
var unsaved_time = 0;
var score = 0;

var Selector;
var selected_item;

var nextStageBarTime = false;
var this_life_score = 0;
var num_enemies;
var timeProgress;
var isPaused = true;
var canShot = true;
var canPause = true;
var enemiesText;
var cursors;
var colors = {
    "rojo":0xff8b00, 
    "azul":0x1c00ad, 
    "verde":0x00ad07, 
    "amarillo":0xecda3a, 
    "celeste":0x3aece5,
    "rosado":0xe23aec, 
    "naranjo":0xd47700
}



var Scene1 = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function Scene1 ()
    {
        Phaser.Scene.call(this, { key: 'scene1' });
    },

    preload: function () {
        //player
        this.load.image('player','img/nave.png');
        this.load.image('player_turbo','img/nave_turbo.png');
        this.load.image('player_shutdown','img/nave_shutdown.png');

        //enemigos
        this.load.image('alien','img/alien.png');
        this.load.image('alien_follow','img/alien_follow.png');

        //objetos
        this.load.image('bullet', 'img/bullets.png');
        this.load.image('door', 'img/LockedDoor.png');
        this.load.image('key', 'img/key3.png');

        //efectos
        this.load.spritesheet('explosion', 'img/Explosion.png', { frameWidth: 64, frameHeight: 64 })
        this.load.spritesheet('portal', 'img/portal.png', { frameWidth: 32, frameHeight: 32 })

        //mapas
        this.load.image('stage1','img/space1.png');
        this.load.tilemapTiledJSON('map', 'img/etapa1.json');
        this.load.image('walls', 'img/walls.png');

        this.load.audio('theme', 'audio/VivaldisWinter.mp3');
    },

    create: function () {
        createScene(this, etapa1, 'scene2');
        // createScene(this, etapa1, 'endScene');
        etapa1(this);
    },

    update: function(time, delta){
        updateScene(this);
    }
});

var Scene2 = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function Scene2 ()
    {
        Phaser.Scene.call(this, { key: 'scene2' });
    },

    preload: function () {
        //player
        this.load.image('player','img/nave.png');
        this.load.image('player_turbo','img/nave_turbo.png');
        this.load.image('player_shutdown','img/nave_shutdown.png');

        //enemigos
        this.load.image('alien','img/alien.png');
        this.load.image('alien_follow','img/alien_follow.png');

        //objetos
        this.load.image('bullet', 'img/bullets.png');
        this.load.image('door', 'img/LockedDoor.png');
        this.load.image('key', 'img/key3.png');

        //efectos
        this.load.spritesheet('explosion', 'img/Explosion.png', { frameWidth: 64, frameHeight: 64 })
        this.load.spritesheet('portal', 'img/portal.png', { frameWidth: 32, frameHeight: 32 })

        //mapas
        this.load.image('stage2','img/space2.png');
        this.load.tilemapTiledJSON('map2', 'img/etapa2.json');
        this.load.image('walls2', 'img/walls2.png');
    },

    create: function () {
        createScene(this, etapa2, 'scene3');
        etapa2(this);
    },

    update: function(time, delta){
        updateScene(this);
    }
});

var Scene3 = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function Scene3 ()
    {
        Phaser.Scene.call(this, { key: 'scene3' });
    },

    preload: function () {
        //player
        this.load.image('player','img/nave.png');
        this.load.image('player_turbo','img/nave_turbo.png');
        this.load.image('player_shutdown','img/nave_shutdown.png');

        //enemigos
        this.load.image('alien','img/alien.png');
        this.load.image('alien_follow','img/alien_follow.png');

        //objetos
        this.load.image('bullet', 'img/bullets.png');
        this.load.image('door', 'img/LockedDoor.png');
        this.load.image('key', 'img/key3.png');

        //efectos
        this.load.spritesheet('explosion', 'img/Explosion.png', { frameWidth: 64, frameHeight: 64 })
        this.load.spritesheet('portal', 'img/portal.png', { frameWidth: 32, frameHeight: 32 })

        //mapas
        this.load.image('stage3','img/space3.png');
        this.load.tilemapTiledJSON('map3', 'img/etapa3.json');
        this.load.image('walls2', 'img/walls2.png');
    },

    create: function () {
        createScene(this, etapa3, 'scene4');
        etapa3(this);
    },

    update: function(time, delta){
        updateScene(this);
    }
});

var Scene4 = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function Scene4 ()
    {
        Phaser.Scene.call(this, { key: 'scene4' });
    },

    preload: function () {
        //player
        this.load.image('player','img/nave.png');
        this.load.image('player_turbo','img/nave_turbo.png');
        this.load.image('player_shutdown','img/nave_shutdown.png');

        //enemigos
        this.load.image('alien','img/alien.png');
        this.load.image('alien_follow','img/alien_follow.png');

        //objetos
        this.load.image('bullet', 'img/bullets.png');
        this.load.image('door', 'img/LockedDoor.png');
        this.load.image('key', 'img/key3.png');

        //efectos
        this.load.spritesheet('explosion', 'img/Explosion.png', { frameWidth: 64, frameHeight: 64 })
        this.load.spritesheet('portal', 'img/portal.png', { frameWidth: 32, frameHeight: 32 })

        //mapas
        this.load.image('stage4','img/space4.png');
        this.load.tilemapTiledJSON('map4', 'img/etapa4.json');
        this.load.image('walls2', 'img/walls2.png');
    },

    create: function () {
        createScene(this, etapa4, 'endScene');
        etapa4(this);
    },

    update: function(time, delta){
        updateScene(this);
    }
});

var endScene = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function endScene ()
    {
        Phaser.Scene.call(this, { key: 'endScene' });
    },

    
    create: function () {
        var diff = total_time;
        diff /= 60;

        var new_record = ''
        if (getAchievements().mejor_puntaje < score){
            updateAchievements("best_score", score)
            new_record = " - <i>Nuevo Record!</i>"
        }

        document.getElementById("myProgress").style.visibility = "hidden";
        document.getElementById("score").innerHTML = '\
            Felicitaciones! has terminado<br>\
            la demo de Space Running<br><br>\
            Tu puntaje final fue:<br>\
            '+score+new_record+'<br><br>\
            Has muerto: '+deaths+' veces<br>\
            Tiempo jugado: '+Math.abs(Math.floor(diff))+' min '+Math.abs(Math.floor((diff%1)*60))+' seg<br><br>Presiona arriba para volver <br> al menu principal'
        document.getElementById("score").style.top = '100px'
        document.getElementById("score").style.textAlign = 'center'
        cursors = this.input.keyboard.createCursorKeys();
        score = 0;
        deaths = 0;
        total_time = 0;
    },

    update: function(time, delta){
        if(cursors.up.isDown){
            game.resize(800, 600);
            document.getElementById("score").removeAttribute("style");
            this.scene.start('menuScene');
        }
    }
});

var menuScene = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function menuScene ()
    {
        Phaser.Scene.call(this, { key: 'menuScene' });
    },

    preload: function () {
        this.load.image('MainMenu','img/MainMenu.png');
        this.load.image('Selector','img/MenuSelector.png');
    },

    create: function () {
        this.add.tileSprite(0, 0, 800, 600, 'MainMenu').setOrigin(0);
        // this.add.tileSprite(0, 0, 1920, 1920, 'MainMenu').setOrigin(0);
        Selector = this.matter.add.image(280, 400, 'Selector', null, {})
        selected_item = "Jugar"
        document.getElementById("score").innerHTML = ''
        document.getElementById("myProgress").style.visibility = "hidden";

        cursors = this.input.keyboard.createCursorKeys();
        this.f = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
    },

    update: function(time, delta){
        if(this.f.isDown){
            game.resize(window.innerWidth, window.innerHeight);
        }
        if(cursors.up.isDown && canShot){
            canShot = false;

            if(selected_item=="ComoJugar"){
                selected_item = "Logros"
                Selector.y = 470;
            }
            else if(selected_item=="Logros"){
                selected_item = "Jugar"
                Selector.y = 400;
            }

            setTimeout(function(){
                canShot = true;
            }, 200);
        }
        else if(cursors.down.isDown && canShot){
            canShot = false;

            if(selected_item=="Jugar"){
                selected_item = "Logros"
                Selector.y = 470;
            }
            else if(selected_item=="Logros"){
                selected_item = "ComoJugar"
                Selector.y = 543;
            }

            setTimeout(function(){
                canShot = true;
            }, 200);
        }
        else if(cursors.space.isDown && canShot){
            canShot = false;

            var items = {"Jugar":startGame, "Logros":seeAchievements, "ComoJugar":howToPlay}
            items[selected_item](this); //se llama

            setTimeout(function(){
                canShot = true;
            }, 200);
        }
    } 
});

function startGame(dis){
    document.getElementById("myProgress").style.visibility = "visible";
    dis.scene.start('scene1');
}

function seeAchievements(dis){
    dis.scene.start('seeAchievementsScene');
}

function howToPlay(dis){
    dis.scene.start('howToPlayScene');
}

var howToPlayScene = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function howToPlayScene ()
    {
        Phaser.Scene.call(this, { key: 'howToPlayScene' });
    },

    preload: function () {
        this.load.image('HowToPlay','img/HowToPlay.png');
    },

    create: function () {
        this.add.tileSprite(0, 0, 800, 600, 'HowToPlay').setOrigin(0);

        this.f = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        this.esc = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
    },

    update: function(time, delta){
        if(this.f.isDown){
            game.resize(window.innerWidth, window.innerHeight);
        }
        if(this.esc.isDown){
            this.scene.start('menuScene');
        }
    }
});

var seeAchievementsScene = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function seeAchievementsScene ()
    {
        Phaser.Scene.call(this, { key: 'seeAchievementsScene' });
    },

    preload: function () {
        this.load.image('Achievements','img/Achievements.png');
    },

    create: function () {
        this.add.tileSprite(0, 0, 800, 600, 'Achievements').setOrigin(0);

        achievements = getAchievements()
        this.add.text(235, 100, achievements.mejor_puntaje, { fontSize: '24px', fill: '#fff' });
        this.add.text(235, 130, achievements.muertes, { fontSize: '24px', fill: '#fff' });
        this.add.text(235, 160, achievements.ascesinatos, { fontSize: '24px', fill: '#fff' });
        // this.add.text(235, 190, achievements.tiempo_jugado, { fontSize: '24px', fill: '#fff' });
        this.add.text(235, 190, Math.abs(Math.floor(achievements.tiempo_jugado/60))+' min '+Math.abs(Math.floor((achievements.tiempo_jugado/60%1)*60))+' seg', { fontSize: '24px', fill: '#fff' });


        this.add.text(680, 82, achievements.morir_10_veces.toString(), { fontSize: '22px', fill: '#fff' });
        this.add.text(680, 112, achievements.morir_25_veces.toString(), { fontSize: '22px', fill: '#fff' });
        this.add.text(680, 142, achievements.morir_50_veces.toString(), { fontSize: '22px', fill: '#fff' });
        this.add.text(680, 172, achievements.matar_25_enemigos.toString(), { fontSize: '22px', fill: '#fff' });
        this.add.text(680, 202, achievements.matar_50_enemigos.toString(), { fontSize: '22px', fill: '#fff' });
        this.add.text(680, 232, achievements.matar_100_enemigos.toString(), { fontSize: '22px', fill: '#fff' });
        this.add.text(680, 265, achievements.pasar_etapa_1_muriendo_maximo_10_veces.toString(), { fontSize: '22px', fill: '#fff' });
        this.add.text(680, 290, achievements.pasar_etapa_1_muriendo_maximo_5_veces.toString(), { fontSize: '22px', fill: '#fff' });
        this.add.text(680, 317, achievements.pasar_etapa_1_muriendo_maximo_2_veces.toString(), { fontSize: '22px', fill: '#fff' });
        this.add.text(680, 346, achievements.pasar_etapa_2_muriendo_maximo_10_veces.toString(), { fontSize: '22px', fill: '#fff' });
        this.add.text(680, 372, achievements.pasar_etapa_2_muriendo_maximo_5_veces.toString(), { fontSize: '22px', fill: '#fff' });
        this.add.text(680, 398, achievements.pasar_etapa_2_muriendo_maximo_2_veces.toString(), { fontSize: '22px', fill: '#fff' });
        this.add.text(680, 427, achievements.pasar_etapa_3_muriendo_maximo_10_veces.toString(), { fontSize: '22px', fill: '#fff' });
        this.add.text(680, 453, achievements.pasar_etapa_3_muriendo_maximo_5_veces.toString(), { fontSize: '22px', fill: '#fff' });
        this.add.text(680, 481, achievements.pasar_etapa_3_muriendo_maximo_2_veces.toString(), { fontSize: '22px', fill: '#fff' });
        this.add.text(680, 507, achievements.pasar_etapa_4_muriendo_maximo_10_veces.toString(), { fontSize: '22px', fill: '#fff' });
        this.add.text(680, 535, achievements.pasar_etapa_4_muriendo_maximo_5_veces.toString(), { fontSize: '22px', fill: '#fff' });
        this.add.text(680, 563, achievements.pasar_etapa_4_muriendo_maximo_2_veces.toString(), { fontSize: '22px', fill: '#fff' });

        this.f = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        this.esc = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
    },

    update: function(time, delta){
        if(this.f.isDown){
            game.resize(window.innerWidth, window.innerHeight);
        }
        if(this.esc.isDown){
            this.scene.start('menuScene');
        }
    }
});


var config = {
    type: Phaser.WEBGL,
    width: 800,
    height: 600,
    scene: [menuScene, Scene1, Scene2, Scene3, Scene4, endScene, howToPlayScene, seeAchievementsScene],
    physics: {
        default: 'matter',
        matter: {
            gravity: {
                scale: 0
            }
        }
    },
    audio: {
        disableWebAudio: true
    }
};

var game = new Phaser.Game(config);

function resize(width, height){
    if(game.config.width == window.innerWidth){
        game.config.width = 800;
    }else{
        game.config.width = window.innerWidth;
        this.cameras.resize(width, height);
    }
    if(game.config.height == window.innerHeight){
        game.config.height = 600;
        this.cameras.resize(width, height);
    }else{
       game.config.height = window.innerHeight;
       this.cameras.resize(width, height); 
    }
}



function etapa1(dis, includingMap=true){
    if (includingMap){
        // var loopMarker = {
        //     name: 'loop',
        //     start: 0,
        //     config: {
        //         loop: true
        //     }
        // };
        // var music = dis.sound.add('theme');
        // music.addMarker(loopMarker);
        // music.play('loop',{delay: 1});

        dis.add.tileSprite(0, 0, 1920, 1920, 'stage1').setOrigin(0);
        
        var map = dis.make.tilemap({ key: 'map' });
        var tileset = map.addTilesetImage('walls');
        var layer = map.createDynamicLayer(0, tileset, 0, 0);

        map.setCollisionByProperty({ collides: true });

        dis.matter.world.convertTilemapLayer(layer);
        dis.matter.world.setBounds(1, 1, 1920, 1920);

        player_spawn = [400, 400]
        createPlayer(dis);

        spawn_points = [[1728,790], [1560,418], [1400,1070], [1570,1570], [915,1311], [467,1520], [600, 1000], [470, 422]];

        var maxTime = 180;
        startTimeBar(maxTime); //barra de tiempo en segundos
        changeScore(maxTime*20)

        stage_doors = []
        stage_doors.push(createDoor(dis, [11.5*64, 5*64], "rojo", 0, 1, 2))
        stage_doors.push(createDoor(dis, [19.5*64, 5*64], "rojo", 0, 1, 2))
        stage_doors.push(createDoor(dis, [27*64-20, 8*64+20], "amarillo", 45, 1, 2))
        stage_doors.push(createDoor(dis, [27*64-20, 23*64-20], "amarillo", -45, 1, 2))
        stage_doors.push(createDoor(dis, [4*64+20, 8*64+20], "verde", -45, 1, 2))
        stage_doors.push(createDoor(dis, [4*64+20, 23*64-20], "verde", 45, 1, 2))
        stage_doors.push(createDoor(dis, [11.5*64, 26*64], "rosado", 0, 1, 2))
        stage_doors.push(createDoor(dis, [19.5*64, 26*64], "rosado", 0, 1, 2))
        stage_doors.push(createDoor(dis, [10.5*64, 15.5*64], "celeste", 0, 1, 3))
        stage_doors.push(createDoor(dis, [20.5*64, 15.5*64], "celeste", 0, 1, 3))

        createKey(dis, [23.5*64, 24.5*64], "rojo")
        createKey(dis, [15.5*64, 5.5*64], "rosado")
        createKey(dis, [15.5*64, 25.5*64], "amarillo")
        createKey(dis, [27.5*64, 15.5*64], "verde")
        createKey(dis, [3.5*64, 15.5*64], "celeste")

        createPortal(dis, [15.5*64, 15.5*64])

        num_enemies = spawn_points.length;
        changeScore(100*num_enemies)

        
        isPaused = false;

        enemiesText = dis.add.text(400, 210, 'Nº enemigos: ', { fontSize: '32px', fill: '#000' });

        if(game.config.width == window.innerWidth){
            dis.cameras.main.setSize(window.innerWidth, window.innerHeight);
            dis.cameras.add(game.config.width-360, game.config.height-350, 350, 350, false, 'mini_map')
            
        }
        else{
            dis.cameras.main.setSize(800, 600);
            dis.cameras.add(450, 250, 350, 350, false, 'mini_map')
        }
        
        
        dis.cameras.cameras[1].zoom = 0.1

        dis.cameras.main.startFollow(player);

    }

    stage_obstacles = []
    for (var i = 0; i < num_enemies; i++) {
        //no se considera el ultimo spawn point al iniciar la etapa ya que está muy cerca del personaje
        var pos = spawn_points[Phaser.Math.Between(0, spawn_points.length-2)];
        stage_obstacles.push(createAlien(dis, pos));
    }

    enemiesText.setText('Nº enemigos: '+num_enemies);
    return stage_obstacles
}


function etapa2(dis, includingMap=true){
    if (includingMap){
        dis.add.tileSprite(0, 0, 2368, 1600, 'stage2').setOrigin(0);
        
        var map = dis.make.tilemap({ key: 'map2' });
        var tileset = map.addTilesetImage('walls2');
        var layer = map.createDynamicLayer(0, tileset, 0, 0);
        map.setCollisionByProperty({ collides: true });
        dis.matter.world.convertTilemapLayer(layer);

        layer.forEachTile(function (tile) {
            if (tile.properties.obstacles){
                tile.physics.matterBody.body.label = 'espinas';
            }
        });

        dis.matter.world.setBounds(1, 1, 2368, 1600);

        player_spawn = [4.5*64, 12.5*64]
        createPlayer(dis);

        spawn_points = [[30.5*64,6.5*64], [18.5*64,8.5*64], [18.5*64,12.5*64], [24.5*64,18.5*64], [12.5*64,18.5*64], [24.5*64,6.5*64], [30.5*64, 17.5*64], [30.5*64, 19.5*64]];

        var maxTime = 300;
        startTimeBar(maxTime); //barra de tiempo en segundos
        changeScore(maxTime*20)

        stage_doors = []
        stage_doors.push(createDoor(dis, [10.5*64, 19*64], "rojo", 0, 1, 2))
        stage_doors.push(createDoor(dis, [18.5*64, 10.5*64], "amarillo", 0, 3, 1))
        stage_doors.push(createDoor(dis, [30*64, 14.5*64], "azul", 0, 2, 1))
        stage_doors.push(createDoor(dis, [5*64, 10.5*64], "verde", 0, 2, 1))
        stage_doors.push(createDoor(dis, [22.5*64, 19*64], "rosado", 0, 1, 2))
        stage_doors.push(createDoor(dis, [30*64, 10.5*64], "celeste", 0, 2, 1))
        stage_doors.push(createDoor(dis, [18.5*64, 6.5*64], "naranjo", 0, 3, 1))

        createKey(dis, [24.5*64, 20.5*64], "rojo")
        createKey(dis, [5*64, 20*64], "amarillo")
        createKey(dis, [17*64, 8*64], "azul")
        createKey(dis, [30.5*64, 21*64], "verde")
        createKey(dis, [12*64, 4*64], "rosado")
        createKey(dis, [15.5*64, 20.5*64], "celeste")
        createKey(dis, [30.5*64, 6.5*64], "naranjo")

        createPortal(dis, [18.5*64, 4.5*64])

        num_enemies = spawn_points.length;
        changeScore(100*num_enemies)

        enemiesText = dis.add.text(7.5*64, 10.25*64, 'Nº enemigos: ', { fontSize: '32px', fill: '#000' });
        
        isPaused = false;

        if(game.config.width == window.innerWidth){
            dis.cameras.main.setSize(window.innerWidth, window.innerHeight);
            dis.cameras.add(game.config.width-470, game.config.height-330, 470, 350, false, 'mini_map')
            
        }
        else{
            dis.cameras.main.setSize(800, 600);
            dis.cameras.add(450, 250, 350, 350, false, 'mini_map')
        }
        dis.cameras.cameras[1].zoom = 0.11

        dis.cameras.main.startFollow(player);
    }

    stage_obstacles = []
    for (var i = 0; i < num_enemies; i++) {
        var pos = spawn_points[Phaser.Math.Between(0, spawn_points.length-1)];
        stage_obstacles.push(createAlien(dis, pos));
    }

    enemiesText.setText('Nº enemigos: '+num_enemies);
    return stage_obstacles
}


function etapa3(dis, includingMap=true){
    if (includingMap){

        dis.add.tileSprite(0, 0, 3840, 1600, 'stage3').setOrigin(0);
        
        var map = dis.make.tilemap({ key: 'map3' });
        var tileset = map.addTilesetImage('walls2');
        var layer = map.createDynamicLayer(0, tileset, 0, 0);
        map.setCollisionByProperty({ collides: true });
        dis.matter.world.convertTilemapLayer(layer);

        layer.forEachTile(function (tile) {
            if (tile.properties.obstacles){
                tile.physics.matterBody.body.label = 'espinas';
            }
        });

        dis.matter.world.setBounds(1, 1, 3600, 1500);

        player_spawn = [3.5*64, 11.5*64]
        createPlayer(dis);

        spawn_points = [[5.5*64,19.5*64], [16.5*64,7.5*64], [23.5*64,3.5*64], [34.5*64,18.5*64], [40.5*64,15.5*64], [45.5*64,11.5*64], [52.5*64, 4.5*64], [56.5*64, 17.5*64]];

        var maxTime = 420;
        startTimeBar(maxTime); //barra de tiempo en segundos
        changeScore(maxTime*20)

        stage_doors = []
        stage_doors.push(createDoor(dis, [6*64, 6.5*64], "rojo", 0, 2, 1))
        stage_doors.push(createDoor(dis, [20.5*64, 4.5*64], "amarillo", 0, 1, 3))
        stage_doors.push(createDoor(dis, [41.5*64, 12.5*64], "azul", 0, 1, 3))
        stage_doors.push(createDoor(dis, [48.5*64, 4*64], "verde", 0, 1, 2))
        stage_doors.push(createDoor(dis, [4*64, 10.5*64], "rosado", 0, 2, 1))
        stage_doors.push(createDoor(dis, [35.5*64, 6.5*64], "celeste", 0, 3, 1))
        stage_doors.push(createDoor(dis, [17.5*64, 8*64], "naranjo", 0, 1, 2))

        createKey(dis, [53.5*64, 19.5*64], "rojo")
        createKey(dis, [44*64, 5*64], "amarillo")
        createKey(dis, [7*64, 7.5*64], "azul")
        createKey(dis, [9.75*64, 4.5*64], "verde")
        createKey(dis, [33*64, 3.5*64], "rosado")
        createKey(dis, [22.5*64, 16.5*64], "celeste")
        createKey(dis, [10.5*64, 12.5*64], "naranjo")

        createPortal(dis, [7.5*64, 3.5*64])

        num_enemies = spawn_points.length;
        changeScore(100*num_enemies)

        enemiesText = dis.add.text(5.25*64, 10.25*64, 'Nº enemigos: ', { fontSize: '32px', fill: '#000' });
        
        isPaused = false;

        if(game.config.width == window.innerWidth){
            dis.cameras.main.setSize(window.innerWidth, window.innerHeight);
            dis.cameras.add(game.config.width-750, game.config.height-330, 750, 330, false, 'mini_map')
            
        }
        else{
            dis.cameras.main.setSize(800, 600);
            dis.cameras.add(450, 250, 350, 350, false, 'mini_map')
        }
        dis.cameras.cameras[1].zoom = 0.11

        dis.cameras.main.startFollow(player);
    }
    stage_obstacles = []
    for (var i = 0; i < num_enemies; i++) {
        //no se considera el ultimo spawn point al iniciar la etapa ya que está muy cerca del personaje
        var pos = spawn_points[Phaser.Math.Between(0, spawn_points.length-2)];
        stage_obstacles.push(createAlien(dis, pos));
    }

    enemiesText.setText('Nº enemigos: '+num_enemies);
    return stage_obstacles
}


function etapa4(dis, includingMap=true){
    if (includingMap){

        dis.add.tileSprite(0, 0, 1920, 2560, 'stage4').setOrigin(0);
        
        var map = dis.make.tilemap({ key: 'map4' });
        var tileset = map.addTilesetImage('walls2');
        var layer = map.createDynamicLayer(0, tileset, 0, 0);
        map.setCollisionByProperty({ collides: true });
        dis.matter.world.convertTilemapLayer(layer);

        layer.forEachTile(function (tile) {
            if (tile.properties.obstacles){
                tile.physics.matterBody.body.label = 'espinas';
            }
        });

        dis.matter.world.setBounds(1, 1, 1920, 2560);

        player_spawn = [12.5*64, 16.5*64]
        createPlayer(dis);

        spawn_points = [[25*64,5*64], [23*64,17.5*64], [20*64,27*64], [13*64,36*64], [25*64,36*64], [8*64,8*64], [13*64, 8*64], [7*64, 26*64]];

        var maxTime = 600;
        startTimeBar(maxTime); //barra de tiempo en segundos
        changeScore(maxTime*20)

        stage_doors = []
        stage_doors.push(createDoor(dis, [21*64, 37*64], "rojo", 0, 1, 2))
        stage_doors.push(createDoor(dis, [14.5*64, 13*64], "amarillo", 0, 1, 2))
        stage_doors.push(createDoor(dis, [3*64, 30.5*64], "azul", 0, 2, 1))
        stage_doors.push(createDoor(dis, [3.5*64, 8.5*64], "verde", 0, 3, 1))
        stage_doors.push(createDoor(dis, [26.5*64, 26*64], "rosado", 0, 3, 1))
        stage_doors.push(createDoor(dis, [7*64, 37*64], "celeste", 0, 1, 2))
        stage_doors.push(createDoor(dis, [14*64, 10*64], "naranjo", 0, 1, 2))

        createKey(dis, [8.5*64, 16.5*64], "rojo")
        createKey(dis, [26*64, 35*64], "amarillo")
        createKey(dis, [12*64, 13.5*64], "azul")
        createKey(dis, [7.05*64, 35*64], "verde")
        createKey(dis, [6.75*64, 13*64], "rosado")
        createKey(dis, [26.5*64, 30.5*64], "celeste")
        createKey(dis, [4*64, 38*64], "naranjo")

        createPortal(dis, [16.5*64, 7.5*64])

        num_enemies = spawn_points.length;
        changeScore(100*num_enemies)

        enemiesText = dis.add.text(12.25*64, 14.25*64, 'Nº enemigos: ', { fontSize: '32px', fill: '#000' });
        
        isPaused = false;

        if(game.config.width == window.innerWidth){
            dis.cameras.main.setSize(window.innerWidth, window.innerHeight);
            dis.cameras.add(game.config.width-390, game.config.height-520, 390, 520, false, 'mini_map')
            
        }
        else{
            dis.cameras.main.setSize(800, 600);
            dis.cameras.add(450, 250, 350, 350, false, 'mini_map')
        }
        dis.cameras.cameras[1].zoom = 0.11

        dis.cameras.main.startFollow(player);
    }
    stage_obstacles = []
    for (var i = 0; i < num_enemies; i++) {
        //no se considera el ultimo spawn point al iniciar la etapa ya que está muy cerca del personaje
        var pos = spawn_points[Phaser.Math.Between(0, spawn_points.length-2)];
        stage_obstacles.push(createAlien(dis, pos));
    }

    enemiesText.setText('Nº enemigos: '+num_enemies);
    return stage_obstacles
}
