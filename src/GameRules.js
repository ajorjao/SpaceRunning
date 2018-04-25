
var config = {
    type: Phaser.WEBGL,
    scene: {
        preload: preload,
        create: create,
        update: update,    
        physics: {
            // default: 'arcade',
            arcade: {
                // gravity: { 
                // 	x: 0,
                // 	y: 0 
                // },
                maxVelocity: 600,
                // debug: true
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
};

// ship speeds
var regular_speed = 5;
var max_speed = 10;
var slow_speed = 2.5;
// var slow_speed = 0;

//categorias tokens
var walls;
var alies;
var obstacles;
var bullets;
var collisionTokens;

//map global variables
var player;
var gameOver = false;
var canShot = true;
var spawn_points; //posicion de spawns de enemigos
var stage_obstacles;
var cursors;
var isPaused = true;
var enemiesText;
var score = 0;
var num_enemies = -1;

var game = new Phaser.Game(config);



function preload() {

    // this.load.image('background','img/space2.png');
    this.load.image('stage1','img/etapa1.png');

    this.load.image('player','img/nave.png');
    this.load.image('player_turbo','img/nave_turbo.png');
    this.load.image('player_shutdown','img/nave_shutdown.png');

    this.load.image('alien','img/alien.png');
    this.load.image('bullet', 'img/bullets.png');

    this.load.spritesheet('explosion', 'img/Explosion.png', { frameWidth: 64, frameHeight: 64 })

    this.load.tilemapTiledJSON('map', 'img/etapa1.json');
    this.load.image('walls', 'img/walls.png');

}








function create() {
    // Categorias de colisiones
    walls = 1;
    alies = this.matter.world.nextCategory();
    obstacles = this.matter.world.nextCategory();
    bullets = this.matter.world.nextCategory();

    collisionTokens = {
        "alies": [walls, obstacles],
        "obstacles": [walls, alies, obstacles, bullets],
        "bullets": [walls, obstacles]
    }

    // DESCOMETAR ESTA LINEA SI SE DESEA VER LAS COLISIONES! (warning, se verá muy lento el juego)
    this.matter.world.createDebugGraphic();
    this.matter.world.drawDebug = false;

    this.anims.create({
        key: 'explode',
        frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 12 }),
        frameRate: 64,
        repeat: -1
    });

    this.cameras.main.setSize(800, 600);
    this.cameras.add(450, 250, 350, 350, false, 'mini_map')
    this.cameras.cameras[1].zoom = 0.1



    stage_obstacles = etapa1(this);

    this.cameras.main.startFollow(player);



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
            obstacleDestroy(this.scene, obstacle, obstacles, collisionTokens["obstacles"], spawn_points, stage_obstacles)
        }

        // //Colision de alien con muros
        // else if ((Acategory == walls && Bcategory == obstacles) || (Bcategory == walls && Acategory == obstacles)) {
        //     if (Acategory == obstacles){
        //         var obstacle = bodyA;
        //         var wall = bodyB;
        //     }
        //     else{
        //         var wall = bodyA;
        //         var obstacle = bodyB;
        //     }

        //     setRandomDirection(obstacle.gameObject, 7)
        // }

        //Colision de alien con personaje
        else if ((Acategory == alies && Bcategory == obstacles) || (Bcategory == alies && Acategory == obstacles)) {
            playerDestroy(this.scene, player, stage_obstacles)
        }
        // bodyA.gameObject.setTint(0xff0000); //rojo
        // bodyB.gameObject.setTint(0x00ff00); //verde
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
   		player.setBounce(1.5);
        // this.cameras.cameras[0].zoom = 1
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
        createBullet(this, player, bullets, [walls, obstacles])

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
        dis.add.tileSprite(0, 0, 1920, 1920, 'stage1').setOrigin(0);
        
        var map = dis.make.tilemap({ key: 'map' });
        var tileset = map.addTilesetImage('walls');
        var layer = map.createDynamicLayer(0, tileset, 0, 0);

        map.setCollisionByProperty({ collides: true });

        dis.matter.world.convertTilemapLayer(layer);
        dis.matter.world.setBounds(1, 1, 1920, 1920);

        createPlayer(dis, [500, 400], alies, collisionTokens["alies"]);

        spawn_points = [[1020,790], [1560,418], [1400,1070], [1570,1570], [915,1311], [467,1520], [600, 1000], [470, 422]];

        startTimeBar(120); //barra de tiempo en segundos
        changeScore(120*10)

        num_enemies = spawn_points.length;
        changeScore(100*num_enemies)
        startIA()

        
        isPaused = false;

        enemiesText = dis.add.text(400, 210, 'Nº enemigos: ', { fontSize: '32px', fill: '#000' });
        // enemiesText.fixedToCamera = 1;
    }

    stage_obstacles = []
    for (var i = 0; i < num_enemies; i++) {
        //no se considera el ultimo spawn point al iniciar la etapa ya que está muy cerca del personaje
        var pos = spawn_points[Phaser.Math.Between(0, spawn_points.length-2)];
        stage_obstacles.push(createAlien(dis, pos, obstacles, collisionTokens["obstacles"]));
    }

    enemiesText.setText('Nº enemigos: '+num_enemies);
    return stage_obstacles
}