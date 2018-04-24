
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

var player;
var obstacles;
var walls;
var stageBG;
var cursors;
var gameOver;
var bullets;

var game = new Phaser.Game(config);



function preload() {

    // this.load.image('background','img/space2.png');
    this.load.image('stage1','img/etapa1.png');
    this.load.image('player','img/nave.png');
    this.load.image('player_shutdown','img/nave_shutdown2.png');
    this.load.image('player_turbo','img/nave_turbo2.png');
    this.load.image('alien','img/alien.png');
    this.load.image('bullet', 'img/bullets.png');

    this.load.tilemapTiledJSON('map', 'img/etapa1.json');
    this.load.image('walls', 'img/walls2.png');

}








function create() {
    this.add.tileSprite(0, 0, 1920, 1920, 'stage1').setOrigin(0);
    this.physics.world.setBounds(1, 1, 1920, 1920);

    var map = this.make.tilemap({ key: 'map' });
    var tileset = map.addTilesetImage('walls');
    var layer = map.createDynamicLayer(0, tileset, 0, 0);

    map.setCollisionByProperty({ collides: true });

    this.matter.world.convertTilemapLayer(layer);
    this.matter.world.setBounds(1, 1, 1920, 1920);

    // Categorias de colisiones
    var nave = this.matter.world.nextCategory();
    var obstacles = this.matter.world.nextCategory();
    bullets = this.matter.world.nextCategory();

    // DESCOMETAR ESTA LINEA SI SE DESEA VER LAS COLISIONES! (warning, se verá muy lento el juego)
    // this.matter.world.createDebugGraphic();

    var playerBody = this.matter.world.fromPath('58 16 58 21 0 39 0 0');
    player = this.matter.add.image(600, 400, 'player', null, {
        shape: {
            type: 'fromVerts',
            verts: playerBody,
            Mass: 100
        },
        // plugin: {
        //     attractors: [
        //         function (bodyA, bodyB) {
        //             return {
        //                 x: (bodyA.position.x - bodyB.position.x) * 0.000001,
        //                 y: (bodyA.position.y - bodyB.position.y) * 0.000001
        //             };
        //         }
        //     ]
        // }
    }).setBounce(1.5).setFriction(0,0,0).setFixedRotation();
    player.setCollisionCategory(nave);


    var spawn_points_etapa1 = [[1020,790], [1560,418], [1400,1070], [1570,1570], [915,1311], [467,1520], [600, 1000], [470, 422]]

    for (var i = 0; i < 7; i++) {
        var pos = spawn_points_etapa1[i]
        var alien = this.matter.add.image(pos[0], pos[1], 'alien').setBounce(1).setFriction(0,0,0);
        alien.scaleX = 0.4
        alien.scaleY = 0.4
        alien.setCircle(30,160,145)
        alien.setMass(3);

        alien.setCollisionCategory(obstacles);
        alien.setCollidesWith([nave])
    }
    

    this.cameras.main.setSize(800, 600);
    this.cameras.main.startFollow(player);

    this.cameras.add(450, 250, 350, 350, false, 'mini_map')
    this.cameras.cameras[1].zoom = 0.1

    // console.log(this)


    this.matter.world.on('collisionstart', function (event, bodyA, bodyB) {

        dictionary = {1: "muros", 2: "player", 4: "aliens", 8: "bala"}
        console.log(dictionary[bodyA.collisionFilter.category]+" choca con "+dictionary[bodyB.collisionFilter.category])
        // console.log(bodyA.collisionFilter.category)
        // console.log(bodyB.collisionFilter.category)
        // bodyA.gameObject.setTint(0xff0000);
        // bodyB.gameObject.setTint(0x00ff00);
    });



    cursors = this.input.keyboard.createCursorKeys();


}












var regular_speed = 5
var max_speed = 10
var slow_speed = 2.5

function update(time, delta) {


    // if (gameOver) {
    //     return;
    // }

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
        this.cameras.cameras[0].zoom = 1
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
    if (cursors.space.isDown) {
        var x = Math.cos(Phaser.Math.DegToRad(player.angle))*40 + player.body.position.x
        var y = Math.sin(Phaser.Math.DegToRad(player.angle))*40 + player.body.position.y

        var velX = Math.cos(Phaser.Math.DegToRad(player.angle))*10 + player.body.velocity.x;
        var velY = Math.sin(Phaser.Math.DegToRad(player.angle))*10 + player.body.velocity.y;

        var bullet = this.matter.add.image(x, y, 'bullet').setBounce(1).setFriction(0,0,0).setVelocity(velX, velY).setAngle(player.angle);
        bullet.setCollisionCategory(bullets)
        // console.log(bullet)

        setTimeout(function(){
            bullet.destroy();
        }, 250);

    }

}









function acelerationFromAngle(player, aceleration, permited=regular_speed){
    var newVelX;
    newVelX = Math.cos(Phaser.Math.DegToRad(player.angle))*aceleration + player.body.velocity.x;
    var newVelY;
    newVelY = Math.sin(Phaser.Math.DegToRad(player.angle))*aceleration + player.body.velocity.y;

    if (player.body.speed > permited) {
        var newSpeed = (newVelX**2 + newVelY**2)**(1/2)
        if (newSpeed < player.body.speed){
            player.setVelocity(newVelX, newVelY);
        }
        else{
            reduceVelTo(player, permited-50)
        }
    }
    else{
        player.setVelocity(newVelX, newVelY);
    }
}

function reduceVelTo(player, permited, brakePower=0.5){
    if (player.body.speed >= permited) {
        // acelerationFromAngle(player, -brakePower);
        var newVelX;
        if (player.body.velocity.x>0){
            newVelX = player.body.velocity.x - brakePower;
        }
        else {
            newVelX = player.body.velocity.x + brakePower;
        }
        var newVelY;
        if (player.body.velocity.y>0){
            newVelY = player.body.velocity.y - brakePower;
        }
        else {
            newVelY = player.body.velocity.y + brakePower;
        }
        player.setVelocity(newVelX, newVelY);
    }
}

function increaseVelTo(player, permited, acelPower=0.1){
    acelerationFromAngle(player, acelPower, permited);
}

function hitMeteor (player, obstacle)
{
    // this.physics.pause();

    // player.setTint(0xff0000);

    // player.anims.play('turn');

    // gameOver = true;
    console.log("Boom!")

}

function destroyMeteor (bullets, obstacles){
    obstacles.destroy();
}

// function createBulletEmitter ()
// {
//     this.flares = this.add.particles('flares').createEmitter({
//         x: 1600,
//         y: 200,
//         angle: { min: 170, max: 190 },
//         scale: { start: 0.4, end: 0.2 },
//         blendMode: 'ADD',
//         lifespan: 500,
//         on: false
//     });
// }
