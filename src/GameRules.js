
var config = {
    type: Phaser.WEBGL,
    scene: {
        preload: preload,
        create: create,
        update: update,    
        physics: {
            // default: 'arcade',
            arcade: {
                // gravity: { y: 300 },
                maxVelocity: 600,
                debug: false
            },
            impact: {
                maxVelocity: 500,
                debug: false
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
var bullets= null;
var flares = null;
var lastFired = 0;
var flag = 1;

var game = new Phaser.Game(config);








function preload() {

    this.load.image('background','img/space2.png');
    this.load.image('player','img/nave.png');
    this.load.image('player_shutdown','img/nave_shutdown2.png');
    this.load.image('player_turbo','img/nave_turbo2.png');
    this.load.image('meteor','img/meteor.png');
    this.load.image('vwall','img/Vlaserwall.png')
    this.load.image('hwall','img/Hlaserwall.png')
    this.load.image('bullet', 'img/bullets.png');

}








function create() {
    stageBG = this.add.tileSprite(0, 0, 1920, 1920, 'background').setOrigin(0);
    this.physics.world.setBounds(1, 1, 1920, 1920);

    var Bullet = new Phaser.Class({


        Extends: Phaser.GameObjects.Image,

        initialize:


        function Bullet (scene)
        {
            Phaser.GameObjects.Image.call(this, scene, 0, 0, 'bullet');

            this.speed = 0;
            this.born = 0;
        },

        fire: function (player)
        {
            this.setPosition(player.x, player.y);

            if (flag == 1)
            {
                //  Facing left
                this.speed = Phaser.Math.GetSpeed(-1000 + player.body.velocity.x, 1);
            }
            else if(flag == 2)
            {
                //  Facing right
                this.speed = Phaser.Math.GetSpeed(1000 + player.body.velocity.x, 1);
            }
            else if(flag == 3){

                //facing up
                this.speed = Phaser.Math.GetSpeed(1000 + player.body.velocity.y, 1);
            }
            else{
                //facing down
                this.speed = Phaser.Math.GetSpeed(-1000 + player.body.velocity.y, 1);
            }

            this.born = 0;
        },

        update: function (time, delta)
        {
            if(flag == 1 || flag == 2){
                this.x += this.speed * delta;
            }
            else{
                this.y += this.speed * delta;
            }
            

            this.born += delta;

            if (this.born > 500)
            {
                this.setActive(false);
                this.setVisible(false);
            }
        }

    });

    // console.log(this)

    obstacles = this.physics.add.group();
    // obstacles.create(320, 320, 'meteor').setScale(0.5).refreshBody();
    for (var i = 0; i < 7; i++) {
        var x = Phaser.Math.Between(0,1920);
        var y = Phaser.Math.Between(0,1920);
        // var meteor = obstacles.create(x, y, 'meteor').setScale(0.3).refreshBody();
        var meteor = obstacles.create(x, y, 'meteor');
        // this.make.tilemap({ key: 'map' });
        meteor.setBounce(1);
        meteor.setCollideWorldBounds(true);
        // meteor.scaleX = 0.3
        // meteor.scaleY = 0.3
        // meteor.setCircle(23,235,215)
        meteor.scaleX = 0.4
        meteor.scaleY = 0.4
        meteor.setCircle(30,160,145)

        meteor.setVelocity(Phaser.Math.Between(-200, 200), Phaser.Math.Between(-200, 200));
    }

    bullets = this.physics.add.group({ classType: Bullet, runChildUpdate: true });


    walls = this.physics.add.staticGroup();
    etapa_1(this)

    player.setBounce(1.2);
    player.setCollideWorldBounds(true);
    player.setCircle(23,8,-3)

    this.physics.add.collider(walls, player);

    this.physics.add.collider(obstacles, obstacles);
    this.physics.add.collider(bullets, obstacles, destroyMeteor); // agregar aqui funcion para destruir
    this.physics.add.collider(player, obstacles, hitMeteor, null, this);


    this.cameras.main.setSize(800, 600);
    this.cameras.main.startFollow(player);

    this.cameras.add(450, 250, 350, 350, false, 'mini_map')
    this.cameras.cameras[1].zoom = 0.1

    // console.log(this)

    // this.physics.p2.enable(player);
    cursors = this.input.keyboard.createCursorKeys();


}

function etapa_1(dis){
    var mx = 120 //margin left
    var my = 120 //margin top

    player = dis.physics.add.sprite(208+mx, 208+my, 'player');

    walls.create(208+mx, 0+0+my, 'hwall');
    walls.create(624+mx, 0-32+my, 'hwall');
    walls.create(1040+mx, 0+0+my, 'hwall');
    walls.create(1456+mx, 0-32+my, 'hwall');

    walls.create(624+mx, 416-32+my, 'hwall');
    walls.create(1040+mx, 416+0+my, 'hwall');

    walls.create(624+mx, 1248+0+my, 'hwall');
    walls.create(1040+mx, 1248-32+my, 'hwall');

    walls.create(208+mx, 1664+0+my, 'hwall');
    walls.create(624+mx, 1664-32+my, 'hwall');
    walls.create(1040+mx, 1664-64+my, 'hwall');
    walls.create(1456+mx, 1664-32+my, 'hwall');



    walls.create(0+0+mx, 208+my, 'vwall');
    walls.create(0+32+mx, 624+my, 'vwall');
    walls.create(0+0+mx, 1040+my, 'vwall');
    walls.create(0-32+mx, 1456+my, 'vwall');

    walls.create(416+0+mx, 624+my, 'vwall');
    walls.create(416-32+mx, 1040+my, 'vwall');

    walls.create(1248+0+mx, 624+my, 'vwall');
    walls.create(1248+32+mx, 1040+my, 'vwall');

    walls.create(1664+0+mx, 208+my, 'vwall');
    walls.create(1664+0+mx, 624+my, 'vwall');
    walls.create(1664-32+mx, 1040+my, 'vwall');
    walls.create(1664+0+mx, 1456+my, 'vwall');
}







var regular_speed = 200
var max_speed = 500
var slow_speed = 100

function update(time, delta) {


    if (gameOver) {
        return;
    }



    if (cursors.up.isDown) {
        increaseVelTo(player, max_speed)
        player.setTexture('player_turbo')
        this.cameras.cameras[0].zoom = 0.9
    }
    else if (cursors.down.isDown) {
        reduceVelTo(player, slow_speed)
        player.setTexture('player_shutdown')
    }
    else {
        player.setTexture('player')
        this.cameras.cameras[0].zoom = 1
        if (player.body.speed <= regular_speed) {
            increaseVelTo(player, regular_speed);
        }
        else{
            reduceVelTo(player, regular_speed);
        }
    }

    if(cursors.up.isDown){
        flag = 4;
    }
    else if(cursors.down.isDown){
        flag = 3;
    }

    if (cursors.left.isDown) {
        player.body.angularVelocity = -200;
        flag = 1;
        if (cursors.up.isUp && cursors.down.isUp) {
            // this.physics.velocityFromAngle(player.angle, 150, player.body.velocity);
            reduceVelTo(player, regular_speed)
        }
    }
    else if (cursors.right.isDown) {
        player.body.angularVelocity = 200;
        flag = 2;
        if (cursors.up.isUp && cursors.down.isUp) {
            // this.physics.velocityFromAngle(player.angle, 150, player.body.velocity);
            reduceVelTo(player, regular_speed)
        }
    }
    else {
        player.body.angularVelocity = 0;
    }

    if (cursors.space.isDown && time > lastFired)
    {
        var bullet = bullets.get();
        bullet.setActive(true);
        bullet.setVisible(true);

        if (bullet)
        {
            bullet.fire(player);

            lastFired = time + 100;
        }
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

function reduceVelTo(player, permited, brakePower=5){
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

function increaseVelTo(player, permited, acelPower=30){
    acelerationFromAngle(player, acelPower, permited);
}

function hitMeteor (player, obstacle)
{
    // this.physics.pause();

    // player.setTint(0xff0000);

    // player.anims.play('turn');

    // gameOver = true;

}

function destroyMeteor (bullets, obstacles){
    obstacles.destroy();
}

function createBulletEmitter ()
{
    this.flares = this.add.particles('flares').createEmitter({
        x: 1600,
        y: 200,
        angle: { min: 170, max: 190 },
        scale: { start: 0.4, end: 0.2 },
        blendMode: 'ADD',
        lifespan: 500,
        on: false
    });
}