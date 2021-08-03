var ball;
var database, ballPosition;
var value1, value2;

function setup(){
    createCanvas(2100, 1200);
    background(color(0, 0, 255));
    ball = createSprite(1050,600,20,20);
    ball.shapeColor = "green";
    

    database = firebase.database();
    // ref() - reference to the location in the database
    ballPosition = database.ref("ball/position");
    // on() - listener
    ballPosition.on("value", readPosition, showError);

    backtoMid = createButton("Reset to Middle");
    backtoMid.position(ball.x + 850, ball.y - 600);
    backtoMid.style('font-size','20px');
    backtoMid.style('background-color','Cyan');
    backtoMid.size(200,50);
    backtoMid.mousePressed(pressButton);

    var inp = createButton("Change Zoom to 1x");
    inp.position(ball.x - 850, ball.y - 600);
    inp.style('font-size','21px');
    inp.style('background-color','#0f0');
    inp.size(200,50);
    inp.mousePressed(zoomX1);

    var inp2 = createButton("Change Zoom to 2x");
    inp2.position(ball.x - 650, ball.y - 600);
    inp2.style('font-size','21px');
    inp2.style('background-color','#0f0');
    inp2.size(200,50);
    inp2.mousePressed(zoomX2);

    var inp3 = createButton("Change Zoom to 0.5x");
    inp3.position(ball.x - 1050, ball.y - 600);
    inp3.style('font-size','21px');
    inp3.style('background-color','#0f0');
    inp3.size(200,50);
    inp3.mousePressed(zoomX3);

    var inp4 = createButton("Make a Challenge");
    inp4.position(ball.x + 850, ball.y + 550);
    inp4.style('font-size','21px');
    inp4.style('background-color','#0f0');
    inp4.size(200,50);
    inp4.mousePressed(genValues);

      }
      
    

function readPosition(data) {
    var position = data.val() //val()
    ball.x = position.x;
    ball.y = position.y;
}

function showError(error) {
    console.log(error);
}

function changePosition(changeInX,changeInY){
    // set() - writes data
    ballPosition.set({
        x : ball.x + changeInX,
        y : ball.y + changeInY
       })
   
}

function pressButton() {
    var ballRef = database.ref("ball/position");
        ballRef.set({
            x : 1050,
            y : 600
       });
}

function zoomX1() {
    if(camera.zoom === 0.5 || camera.zoom === 2) {
        camera.zoom = 1;
    }
}

function zoomX2() {
    if(camera.zoom === 1 || camera.zoom === 0.5) {
        camera.zoom = 2;
    }
}

function zoomX3() {
    if(camera.zoom === 1 || camera.zoom === 2) {
        camera.zoom = 0.5;
    }
}

function genValues() {
    value1 = round(random(-1000, 3000), 0);
    value2 = round(random(-1000, 2000), 0);
}
 


function draw(){
    background(230)
    camera.position = ball;
    if(keyDown(LEFT_ARROW)){
        changePosition(-3,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        changePosition(+3,0);
    }
    else if(keyDown(UP_ARROW)){
        changePosition(0,-3);
    }
    else if(keyDown(DOWN_ARROW)){
        changePosition(0,+3);
    }

    if(value1%3 === 2) {
        value1 = value1 + 1
    }
    
     if(value1%3 === 1) {
        value1 = value1 + 2
    }

    if(value2%3 === 2) {
        value2 = value2 + 1
    }
    
    if(value2%3 === 1) {
        value2 = value2 + 2
    }
    

    fill("blue");
    textSize(45);
   ballPos = text("x:"+ ball.x + ", y: " + ball.y, ball.x - 1045, ball.y - 510);

    fill("black")
    textSize(50);
    text("My Asynchronous Moving Ball", 700, 40);

    fill("orange")
    textSize(30);
    text("Made by Umar Bashir, Age: 13", 810, 70);


    fill("red")
    textSize(30);
    text("Press ↑ to move up", 10, 130);
    text("Press ↓ to move down", 10, 160);
    text("Press ← to move left", 10, 190);
    text("Press → to move right", 10, 220);

    fill("red");
    textSize(45);
    text("You need to try and get to x:"+ value1 + ", y: " + value2, ball.x + 200, ball.y - 510);
    
    if(camera.zoom === 0.5) {
        fill("red");
    textSize(45);
    text("Zoom: 0.5x", ball.x - 650, ball.y - 510);
    }

    if(camera.zoom === 1) {
        fill("red");
    textSize(45);
    text("Zoom: 1x", ball.x - 650, ball.y - 510);
    }

    if(camera.zoom === 2) {
        fill("red");
    textSize(45);
    text("Zoom: 2x", ball.x - 650, ball.y - 510);
    }
    

    if(ball.x === value1 && ball.y === value2) {
      fill("yellow")
    textSize(60);
    text("Congratulations, you have defeated the challenge!!", value1 - 600, value2);  
    }
    
    
    drawSprites();
}



