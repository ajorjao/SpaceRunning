var config = {
    type: Phaser.WEBGL,
    scene: {
        preload: preload,
        create: create,
        update: update,
        physics: {
            arcade: {
                maxVelocity: 600,
            },
            matter: {
	            gravity: {
	                scale: 0
	            },
                plugins: {
                	attractors: true
                }
            }
        },
    },
    width: 800,
    height: 600
    // width: 1920,
    // height: 1920
};

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
var stages = [etapa1, etapa2];
var this_stage;
var stageBG;
var stage_obstacles;
var stage_doors;
var map;
var tileset;
var layer;
var spawn_points; //posicion de spawns de enemigos

//global variables
var player;
var gameOver = false;
var canShot = true;
var isPaused = true;
var enemiesText;
var score = 0;
var num_enemies = -1;
var player_spawn;
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

var game = new Phaser.Game(config);



function preload() {
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
    // this.load.image('background','img/space2.png');
    this.load.image('stage1','img/etapa1.png');
    this.load.tilemapTiledJSON('map', 'img/etapa1.json');
    this.load.image('walls', 'img/walls.png');

}








function create() {
    // Categorias de colisiones
    walls = 1;
    alies = this.matter.world.nextCategory();
    obstacles = this.matter.world.nextCategory();
    bullets = this.matter.world.nextCategory();
    keys = this.matter.world.nextCategory();
    doors = this.matter.world.nextCategory();
    portals = this.matter.world.nextCategory();

    collisionTokens = {
        "alies": [walls, obstacles, keys, doors, portals],
        "obstacles": [walls, alies, obstacles, bullets],
        "bullets": [walls, obstacles, doors],
        "keys": [walls, alies],
        "doors": [alies, bullets],
        "portals": [alies]
    }

    this.matter.world.createDebugGraphic();
    this.matter.world.drawDebug = false;

    this.anims.create({
        key: 'explode',
        frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 11 }),
        frameRate: 16,
        repeat: -1
    });

    this.anims.create({
        key: 'portal',
        frames: this.anims.generateFrameNumbers('portal', { start: 0, end: 4 }),
        frameRate: 16,
        repeat: -1
    });

    this.cameras.main.setSize(800, 600);
    this.cameras.add(450, 250, 350, 350, false, 'mini_map')
    this.cameras.cameras[1].zoom = 0.1
    // this.cameras.add(0, 0, 500, 500, false, 'mini_map').centerToSize()
    // this.cameras.cameras[1].zoom = 0.15

    this_stage = stages.splice(0, 1)[0];
    this_stage(this);


    this.cameras.main.startFollow(player);


    // esto se uso para sacar el fondo de la imagen con el mapa
    // NOTA: antes se debio comentar las camaras, la funcinon "etapa1(this)" y el "update" de la configuracion
    // this.add.tileSprite(0, 0, 1920, 1920, 'background').setOrigin(0);
    // var map = this.make.tilemap({ key: 'map' });
    // var tileset = map.addTilesetImage('walls');
    // var layer = map.createDynamicLayer(0, tileset, 0, 0);



    this.matter.world.on('collisionstart', function (event, bodyA, bodyB) {

        var Acategory = bodyA.collisionFilter.category
        var Bcategory = bodyB.collisionFilter.category
        //Colision de alien con balas
        if ((Acategory == bullets && Bcategory == obstacles) || (Bcategory == bullets && Acategory == obstacles)) {
            if (Acategory == obstacles){
                var obstacle = bodyA;
                var bullet = bodyB;
            }
            else{
                var bullet = bodyA;
                var obstacle = bodyB;
            }

            bullet.gameObject.destroy()
            obstacleDestroy(this.scene, obstacle, spawn_points, stage_obstacles)
        }

        //Colision de alien con personaje
        else if ((Acategory == alies && Bcategory == obstacles) || (Bcategory == alies && Acategory == obstacles)) {
            playerDestroy(this.scene, player, stage_obstacles)
        }

        //Colision de personaje con llaves
        if ((Acategory == alies && Bcategory == keys) || (Bcategory == alies && Acategory == keys)) {
            var key = Acategory == keys ?  bodyA : bodyB;

            for (var i = 0; i < stage_doors.length; i++) {
                if (stage_doors[i].color == key.gameObject.color){
                    stage_doors[i].destroy();
                }
            }
            key.gameObject.destroy()
        }

        //Colision de personaje con portal
        if ((Acategory == alies && Bcategory == portals) || (Bcategory == alies && Acategory == portals)) {
            nextStage(this.scene)
        }

    });



    cursors = this.input.keyboard.createCursorKeys();


}










function update(time, delta) {

    if (cursors.up.isDown) {
        increaseVelTo(player, max_speed)
        player.setTexture('player_turbo')
   		player.setBounce(0.6);
    }
    else if (cursors.down.isDown) {
        reduceVelTo(player, slow_speed)
        player.setTexture('player_shutdown')

    }
    else {
        player.setTexture('player')
   		player.setBounce(1.1);
        if (player.body.speed <= regular_speed) {
            increaseVelTo(player, regular_speed);
        }
        else{
            reduceVelTo(player, regular_speed);
        }
    }


    if (cursors.left.isDown) {
        player.setAngularVelocity(-0.075)
        if (cursors.up.isUp && cursors.down.isUp) {
            reduceVelTo(player, regular_speed)
        }
    }
    else if (cursors.right.isDown) {
    	player.setAngularVelocity(0.075)
        if (cursors.up.isUp && cursors.down.isUp) {
            reduceVelTo(player, regular_speed)
        }
    }
    else {
    	player.setAngularVelocity(0)
    }

    // if (cursors.space.isDown && time > lastFired)
    if (cursors.space.isDown && canShot) {
        canShot = false;
        createBullet(this, player)

        setTimeout(function(){
            canShot = true;
        }, 150);

    }

    // Esto sirve para ver las lineas de colision al hacer click
    // this.input.on('pointerdown', function () {
    //     this.matter.world.drawDebug = !this.matter.world.drawDebug;
    //     this.matter.world.debugGraphic.visible = this.matter.world.drawDebug;
    // }, this);
}





function etapa1(dis, includingMap=true){
    if (includingMap){
        stageBG = dis.add.tileSprite(0, 0, 1920, 1920, 'stage1').setOrigin(0);
        
        map = dis.make.tilemap({ key: 'map' });
        tileset = map.addTilesetImage('walls');
        layer = map.createDynamicLayer(0, tileset, 0, 0);

        map.setCollisionByProperty({ collides: true });

        dis.matter.world.convertTilemapLayer(layer);
        dis.matter.world.setBounds(1, 1, 1920, 1920);

        player_spawn = [400, 400]
        createPlayer(dis);

        spawn_points = [[1728,790], [1560,418], [1400,1070], [1570,1570], [915,1311], [467,1520], [600, 1000], [470, 422]];

        var maxTime = 180;
        startTimeBar(maxTime); //barra de tiempo en segundos
        changeScore(maxTime*10)

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

}