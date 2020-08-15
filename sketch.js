var hypnoticBall,database,position;

function setup(){
    //create a datebase and store it in a variable
   database= firebase.database();
   console.log(database);
    createCanvas(500,500);
    hypnoticBall = createSprite(250,250,10,10);
    hypnoticBall.shapeColor = "blue";
    //use to refer to locationof database value(where we have to point inside the database )
    var hypnoticBallPosition=database.ref('ball/position');
    //on is a listner, when the value of ball position  changes it will call readposition function
    //readPosition will read the new position of the ball
    //showErrorwill be call ifthere is any error  in reading the value
    hypnoticBallPosition.on("value",readPosition,showError)
}

function draw(){
    //draw ball or write to the database only when the position  isnot equal to (!==)undefined
    if(position  !== undefined)
    {
    background("red");
    if(keyDown(LEFT_ARROW)){
        writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+1);
    }
    drawSprites();}
}
//writePosition=writes the new ball position to the data base
function writePosition(x,y){
    //first refer to the point and set the value
   database.ref('ball/position').set({
       'x':position.x+x,
       'y':position.y+y
   })
}
//readPosition = reads the ball position from the database and assigned it for the ball
function readPosition(data){
position=data.val();
console.log(position.x);
hypnoticBall.x=position.x;
hypnoticBall.y=position.y;
}

function showError(){
    console.log("error in reading from database");
}