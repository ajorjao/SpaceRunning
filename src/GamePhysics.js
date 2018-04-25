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
    num_enemies-=1;
    dis.cameras.main.shake(250, 0.01);
    dis.cameras.main.fade(750, 0, 0, 0);
    dis.cameras.cameras[1].fade(750, 0, 0, 0);
    changeScore(-100)

    setTimeout(function() {
        for (var i = 0; i < stage_obstacles.length; i++) {
            stage_obstacles[i].destroy()
        }
        player.x = 600
        player.y = 400
        player.angle = 0

        etapa1(dis, false);

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
            console.log("spawn_invalido: "+pos)
            pos = spawn_points[Phaser.Math.Between(0, spawn_points.length-1)];
            distance = Phaser.Math.Distance.Between(pos[0], pos[1], player.body.position.x, player.body.position.y)
        }

        stage_obstacles.push(createAlien(dis, pos, category, collisionCategories));
    }, 1000);
}


function createBullet(dis, player, category, collisionCategories){
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
        bullet.setCollisionCategory(category)
        bullet.setCollidesWith(collisionCategories)

        setTimeout(function(){
            bullet.destroy();
        }, 500);
    }
}




function changeScore(changed) {
    score += changed;
    document.getElementById("score").innerHTML = 'Score: '+ score
}


function startTimeBar(maxTime) {
    var timeProgress = maxTime;
    var elem = document.getElementById("myBar");
    elem.innerHTML = maxTime + ' seg'
    var id = setInterval(frame, 1000);
    function frame() {
        if (timeProgress <= 0) {
            clearInterval(id);
            elem.innerHTML = '';
            document.getElementById("myProgress").innerHTML = "Tiempo acabado"
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



function startIA(){
    var movement = {0: setRandomDirection, 1: setOppositePlayerDirection, 2: setToPlayerDirection}
    var id = setInterval(tryMove, 2000);
    function tryMove() {
        if (num_enemies<=0) {
            clearInterval(id);
        } else {
            if (!isPaused){
                for (var i = 0; i < stage_obstacles.length; i++) {
                    obstacle = stage_obstacles[i];
                    if (Phaser.Math.Between(0, 2) < 2 || obstacle.body.speed<3){ // 2/3 (66.6%) de que se mueva
                        distance = Phaser.Math.Distance.Between(obstacle.body.position.x, obstacle.body.position.y, player.body.position.x, player.body.position.y)
                        if (distance < 400){
                            movement[2](obstacle, 4);
                            obstacle.setTint(0xff8b00);
                        }
                        else{
                            obstacle.setTint();
                            movement[Phaser.Math.Between(0, 1)](obstacle, 6);
                        }
                    }
                }
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

function setToPlayerDirection(object, velocity){
    // console.log(object)
    var angle = Phaser.Math.Angle.Between(object.body.position.x, object.body.position.y, player.body.position.x+player.body.velocity.x, player.body.position.y+player.body.velocity.y)
    var newVelX = Math.cos(angle)*velocity
    var newVelY = Math.sin(angle)*velocity
    object.setVelocity(newVelX, newVelY)
}

function setOppositePlayerDirection(object, velocity){
    var angle = player.angle-180
    var newVelX = Math.cos(angle)*velocity
    var newVelY = Math.sin(angle)*velocity
    object.setVelocity(newVelX, newVelY)
}