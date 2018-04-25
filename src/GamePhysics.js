function createPlayer(dis, pos, category, collisionCategories){
    var playerBody = dis.matter.world.fromPath('58 16 58 21 0 39 0 0');
    player = dis.matter.add.image(pos[0], pos[1], 'player', null, {
        shape: {
            type: 'fromVerts',
            verts: playerBody,
            Mass: 100
        },
    })
    player.setBounce(1.4);
    player.setFriction(0,0,0)
    player.setFixedRotation();

    player.setCollisionCategory(category);
    player.setCollidesWith(collisionCategories)
}


function playerDestroy(dis, player, stage_obstacles){
    dis.matter.pause();
    isPaused = true;
    dis.cameras.main.shake(250, 0.01);
    dis.cameras.main.fade(750, 0, 0, 0);
    dis.cameras.cameras[1].fade(750, 0, 0, 0);

    setTimeout(function() {
        var num_enemies = stage_obstacles.length
        for (var i = 0; i < num_enemies; i++) {
            stage_obstacles[i].destroy()
        }
        player.x = 600
        player.y = 400
        player.angle = 0

        etapa1(dis, num_enemies-1, false);

        dis.cameras.main.fadeIn(1000);
        dis.cameras.cameras[1].fadeIn(1000);

        setTimeout(function() {
            dis.matter.resume();
            isPaused = false;
        }, 2000);
    }, 1000);

}

function createAlien(dis, pos, category, collisionCategories){
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

    alien.setCollisionCategory(category);
    alien.setCollidesWith(collisionCategories);
    setRandomDirection(alien, 3)
    return alien;
}


function obstacleDestroy(dis, obstacle, category, collisionCategories, spawn_points, stage_obstacles){
    
    obstacle.gameObject.destroy();
    for (var i = 0; i < stage_obstacles.length; i++) {
        if (stage_obstacles[i].active == false){
            stage_obstacles.splice(i, 1);
        }
    }

    var explosion = dis.matter.add.sprite(obstacle.position.x, obstacle.position.y, 'explosion');
    explosion.anims.play('explode', true)
    explosion.setCollidesWith([]);

    //alien respawn
    setTimeout(function(){
        explosion.destroy();
        var pos = spawn_points[Phaser.Math.Between(0, spawn_points.length-1)];
        stage_obstacles.push(createAlien(dis, pos, category, collisionCategories));
    }, 1000);
}


function createBullet(dis, player, category, collisionCategories){
    var x = Math.cos(Phaser.Math.DegToRad(player.angle))*40 + player.body.position.x
    var y = Math.sin(Phaser.Math.DegToRad(player.angle))*40 + player.body.position.y

    var velX = Math.cos(Phaser.Math.DegToRad(player.angle))*10 + player.body.velocity.x;
    var velY = Math.sin(Phaser.Math.DegToRad(player.angle))*10 + player.body.velocity.y;

    var bullet = dis.matter.add.image(x, y, 'bullet', null, {
        restitution: 1.009, 
        frictionAir: 0,
        angle: player.angle
    }).setVelocity(velX, velY)
    bullet.setCollisionCategory(category)
    bullet.setCollidesWith(collisionCategories)

    setTimeout(function(){
        bullet.destroy();
    }, 500);
}




function startTimeBar(maxTime) {
    var elem = document.getElementById("myBar");
    var timeProgress = maxTime;
    elem.innerHTML = maxTime + ' seg'
    // var id = setInterval(frame, maxTime*10);
    var id = setInterval(frame, 1000);
    function frame() {
        if (timeProgress <= 0) {
            clearInterval(id);
        } else {
            if (!isPaused){
                timeProgress--;
                elem.style.width = timeProgress*100/maxTime + '%';
                elem.innerHTML = timeProgress  + 'seg';
            }
        }
    }
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