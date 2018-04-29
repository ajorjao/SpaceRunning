function createPlayer(dis){
    var playerBody = dis.matter.world.fromPath('58 16 58 21 0 39 0 0');
    player = dis.matter.add.image(player_spawn[0], player_spawn[1], 'player', null, {
        shape: {
            type: 'fromVerts',
            verts: playerBody,
            Mass: 100
        },
    })
    player.setBounce(1.1);
    player.setFriction(0,0,0)
    player.setFixedRotation();

    player.setCollisionCategory(alies);
    player.setCollidesWith(collisionTokens["alies"])
}


function playerDestroy(dis, player, stage_obstacles, this_stage){
    dis.matter.pause();
    isPaused = true;
    deaths += 1;
    if (num_enemies>0 && this_life_score>=30){
        num_enemies-=1;
    }
    this_life_score = 0;
    dis.cameras.main.shake(250, 0.01);
    dis.cameras.main.fade(750, 0, 0, 0);
    dis.cameras.cameras[1].fade(750, 0, 0, 0);
    changeScore(-100)

    setTimeout(function() {
        for (var i = 0; i < stage_obstacles.length; i++) {
            stage_obstacles[i].destroy()
        }
        player.x = player_spawn[0]
        player.y = player_spawn[1]
        player.angle = 0

        this_stage(dis, false);

        dis.cameras.main.fadeIn(1000);
        dis.cameras.cameras[1].fadeIn(1000);

        setTimeout(function() {
            dis.matter.resume();
            isPaused = false;

        }, 2000);
    }, 1000);
}

function createAlien(dis, pos){
    var alienBody = dis.matter.world.fromPath('60 0 220 90 60 157 -120 90');
    var alien = dis.matter.add.image(pos[0], pos[1], 'alien', null, {
        shape: {
            type: 'fromVerts',
            verts: alienBody,
        }
    })
    alien.setBounce(1.01);
    alien.setFrictionAir(0);
    alien.scaleX = 0.4
    alien.scaleY = 0.4
    alien.setFixedRotation()

    alien.setCollisionCategory(obstacles);
    alien.setCollidesWith(collisionTokens["obstacles"]);
    setRandomDirection(alien, 3)
    startIA(alien)
    // startIA(alien, dis)
    return alien;
}


function obstacleDestroy(dis, obstacle, spawn_points, stage_obstacles){
    
    obstacle.gameObject.destroy();
    changeScore(+20)
    for (var i = 0; i < stage_obstacles.length; i++) {
        if (stage_obstacles[i].active == false){
            stage_obstacles.splice(i, 1);
        }
    }

    var explosion = dis.matter.add.sprite(obstacle.position.x, obstacle.position.y, 'explosion');
    explosion.anims.play('explode', true);
    explosion.setCollidesWith([]);

    //alien respawn
    setTimeout(function(){
        explosion.destroy();
        var isInvalid;
        var pos = spawn_points[Phaser.Math.Between(0, spawn_points.length-1)];
        var distance = Phaser.Math.Distance.Between(pos[0], pos[1], player.body.position.x, player.body.position.y)

        while (distance<500){
            pos = spawn_points[Phaser.Math.Between(0, spawn_points.length-1)];
            distance = Phaser.Math.Distance.Between(pos[0], pos[1], player.body.position.x, player.body.position.y)
        }

        stage_obstacles.push(createAlien(dis, pos, obstacles, collisionTokens["obstacles"]));
    }, 1000);
}


function createBullet(dis, player){
    if (!isPaused){
        var x = Math.cos(Phaser.Math.DegToRad(player.angle))*40 + player.body.position.x
        var y = Math.sin(Phaser.Math.DegToRad(player.angle))*40 + player.body.position.y

        var velX = Math.cos(Phaser.Math.DegToRad(player.angle))*10 + player.body.velocity.x;
        var velY = Math.sin(Phaser.Math.DegToRad(player.angle))*10 + player.body.velocity.y;

        var bullet = dis.matter.add.image(x, y, 'bullet', null, {
            restitution: 1.009, 
            frictionAir: 0,
            angle: player.angle+180
        }).setVelocity(velX, velY)
        bullet.setCollisionCategory(bullets)
        bullet.setCollidesWith(collisionTokens["bullets"])

        setTimeout(function(){
            bullet.destroy();
        }, 500);
    }
}


function createDoor(dis, pos, color, angle=0, xscale=1, yscale=1){
    var door = dis.matter.add.image(pos[0], pos[1], 'door')
    door.setTint(colors[color]);
    door.color = color
    door.setStatic(true);
    
    door.setScale(xscale, yscale)
    door.setAngle(angle)

    door.setCollisionCategory(doors);
    door.setCollidesWith(collisionTokens["doors"]);

    return door;
}


function createKey(dis, pos, color){
    var key = dis.matter.add.image(pos[0], pos[1], 'key')
    key.setTint(colors[color]);
    key.color = color
    // key.setStatic(true);
    key.setMass(0.1);
    
    key.setCollisionCategory(keys);
    key.setCollidesWith(collisionTokens["keys"]);
}


function createPortal(dis, pos){
    var portal = dis.matter.add.sprite(pos[0], pos[1], 'portal');
    portal.anims.play('portal', true);
    portal.setStatic(true);
    
    portal.setCollisionCategory(portals);
    portal.setCollidesWith(collisionTokens["portals"]);
}


function nextStage(dis, nextScene){

    dis.matter.pause();
    isPaused = true;
    timeProgress = 0;

    dis.cameras.main.fade(750, 0, 0, 0);
    dis.cameras.cameras[1].fade(750, 0, 0, 0);

    setTimeout(function() {
        dis.scene.start(nextScene);
    }, 1000);

}



function changeScore(changed) {
    score += changed;
    if (changed>0){
        this_life_score += changed;
    }
    document.getElementById("score").innerHTML = 'Score: '+ score
}


function startTimeBar(maxTime) {
    timeProgress = maxTime;
    var elem = document.getElementById("myBar");
    elem.style.width = 100+'%';
    elem.innerHTML = maxTime + ' seg'
    var id = setInterval(frame, 1000);
    function frame() {
        if (timeProgress <= 0) {
            clearInterval(id);
            elem.innerHTML = '';
            document.getElementById("myProgress").innerHTML = '<div id="myBar"></div> Tiempo acabado'
        } else {
            if (!isPaused){
                timeProgress--;
                changeScore(-10)
                elem.style.width = timeProgress*100/maxTime + '%';
                elem.innerHTML = timeProgress  + 'seg';
            }
        }
    }
}


function startIA(obstacle){
    var movements = {0: setRandomDirection, 1: setOppositePlayerDirection, 2: setToPlayerDirection}

    if (obstacle.texture.key == "alien_follow"){
        var nextMovement = Phaser.Math.FloatBetween(0.3, 1)
    }
    else{
        var nextMovement = Phaser.Math.FloatBetween(1, 3)
    }

    setTimeout(function() {
        if(obstacle.active){
            if (Phaser.Math.Between(0, 2) < 2 || obstacle.body.speed<3){
                distance = Phaser.Math.Distance.Between(obstacle.body.position.x, obstacle.body.position.y, player.body.position.x, player.body.position.y)
                if (distance < 500){
                    obstacle.setTexture('alien_follow');
                    movements[2](obstacle, 4, distance);
                }
                else{
                    obstacle.setTexture('alien');
                    movements[Phaser.Math.Between(0, 1)](obstacle, 6);
                }
            }
            startIA(obstacle);
        }
    }, nextMovement*1000);
}





///////////////////////////////////////////////////////////////////////// 
//          Movimiento de objetos y aceleracion por anglo              //
///////////////////////////////////////////////////////////////////////// 

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

function setRandomDirection(object, velocity){
    var angle = Phaser.Math.Between(0,359)
    var newVelX = Math.cos(Phaser.Math.DegToRad(angle))*velocity
    var newVelY = Math.sin(Phaser.Math.DegToRad(angle))*velocity
    object.setVelocity(newVelX, newVelY)
}

function setToPlayerDirection(object, velocity, distance){
    var futuroPlayerX = Math.cos(Phaser.Math.DegToRad(player.angle))*distance
    var futuroPlayerY = Math.sin(Phaser.Math.DegToRad(player.angle))*distance
    var angle = Phaser.Math.Angle.Between(object.body.position.x, object.body.position.y, player.body.position.x+futuroPlayerX, player.body.position.y+futuroPlayerY)
    var newVelX = Math.cos(angle)*velocity
    var newVelY = Math.sin(angle)*velocity
    object.setVelocity(newVelX, newVelY)
}

function setOppositePlayerDirection(object, velocity){
    var angle = player.angle>0 ? player.angle-180 : player.angle+180
    var newVelX = Math.cos(angle)*velocity
    var newVelY = Math.sin(angle)*velocity
    object.setVelocity(newVelX, newVelY)
}




///////////////////////////////////////////////////////////////////////// 
//                      Creacion de escenarios                         //
///////////////////////////////////////////////////////////////////////// 
function createScene(dis, this_stage, nextScene){
    // Categorias de colisiones
    walls = 1;
    alies = dis.matter.world.nextCategory();
    obstacles = dis.matter.world.nextCategory();
    bullets = dis.matter.world.nextCategory();
    keys = dis.matter.world.nextCategory();
    doors = dis.matter.world.nextCategory();
    portals = dis.matter.world.nextCategory();

    collisionTokens = {
        "alies": [walls, obstacles, keys, doors, portals],
        "obstacles": [walls, alies, obstacles, bullets],
        "bullets": [walls, obstacles, doors],
        "keys": [walls, alies],
        "doors": [alies, bullets],
        "portals": [alies]
    }

    dis.matter.world.createDebugGraphic();
    dis.matter.world.drawDebug = false;

    dis.anims.create({
        key: 'explode',
        frames: dis.anims.generateFrameNumbers('explosion', { start: 0, end: 11 }),
        frameRate: 12,
        repeat: -1
    });

    dis.anims.create({
        key: 'portal',
        frames: dis.anims.generateFrameNumbers('portal', { start: 0, end: 4 }),
        frameRate: 16,
        repeat: -1
    });


    //Manejo de colisiones
    dis.matter.world.on('collisionstart', function (event, bodyA, bodyB) {

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
            obstacleDestroy(dis, obstacle, spawn_points, stage_obstacles)
        }

        //Colision de alien con personaje
        else if ((Acategory == alies && Bcategory == obstacles) || (Bcategory == alies && Acategory == obstacles) || (bodyA.parent.label == 'espinas' && Bcategory == alies) || (bodyB.parent.label == 'espinas' && Acategory == alies)) {
            playerDestroy(dis, player, stage_obstacles, this_stage)
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
            nextStage(dis, nextScene)
        }

    });

    cursors = dis.input.keyboard.createCursorKeys();
}

function updateEnd(dis){
    if(cursors.up.isDown){         
        dis.scene.start('menuScene');
    }
}

function updateScene(dis){
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

    if (cursors.space.isDown && canShot) {
        canShot = false;
        createBullet(dis, player)

        setTimeout(function(){
            canShot = true;
        }, 150);

    }
    

    // Esto sirve para ver las lineas de colision al hacer click
    // dis.input.on('pointerdown', function () {
    //     dis.matter.world.drawDebug = !dis.matter.world.drawDebug;
    //     dis.matter.world.debugGraphic.visible = dis.matter.world.drawDebug;
    // }, dis);
}