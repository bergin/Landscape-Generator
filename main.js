"use strict";

// mover
var KBI, moverVector, moverPoint, moverDirection, moverSpeed=0, speed = 250; 
var completeTurn = 6.26573, degRad = 0.0174533;

// screen 
var xClipping = 115, yClipping = 600000,  zClipping = 1000000,  minZ=500, halfBoundarySize = 1000000;
var halfScrWidth, halfScrHeight, requestAnimationFrame;
var scrWidth, scrHeight, info, nearObjects, userInput, counter;
var displacement = 10;

// objects
var myObjects = [];
var theOrigin = new Point(0,0,0), rendererScale = 800, objectScale =15000;
var visibles = 0;

// noise

var detail = 0.20000, gridSize = 250, usableGrid = 12, usableGridInt = usableGrid/detail;
var gridOfValues = Create2DArray(gridSize),  calculatedValues = Create2DArray(usableGridInt+1);


var mag = 5, gAngles=0; 
var deg = 180 / Math.PI, rad = Math.PI / 180.0, my360 =  Math.PI*2 ;

 
var detailer = {};
var myAngle=1;

var  thisLoop, lastLoop = performance.now();
 


function loops()
{  
    

    updateInfoBox(fpsPerformance());

    if(KBI.isUserActive())              // look for keyboard input
    { 
        //perlinGrid();  setupTriangleStrips();
        alter_mover_position();	         // and calculate frustrum
        draw();
    }
   // else
         // calculateFrustrum(0, ""); draw();	// use this if there is something else moving.
    requestAnimationFrame(loops);      
}

function setup()
{
    init();
    perlinInit();
    setupTriangleStrips(); 
	calculateFrustrum(0, "");
    draw();
    
    showInstructions();

    loops();
}

function calculateFrustrum(direction, action)
{ 
    if(action == "yaw" || action == "pitch" || action=="roll"  )
        rotateMoverDirection(direction, action);  

    if(action)
        alterMoverPointAndVector(direction, action);

	for(var n = 0; n < myObjects.length; n++)
	{	    
       
        Triangle_Helper.applyRotation(myObjects[n]);

        myObjects[n].distance = distanceOpt(theOrigin, myObjects[n].points[0]);	 

        if(Triangle_Helper.frustrumCheck(myObjects[n]))
        { 
            Triangle_Helper.createDotProducts(myObjects[n]);

            if(myObjects[n].dot >= 0)
                myObjects[n].visibility = true ; 
            else
                myObjects[n].visibility = false ;  
        }   
        else 
            myObjects[n].visibility = false ;     
    }  

    myObjects.sort(function(a, b) /// sorting objects outside of frustrum!! So frustrating
    {
           if(  a.distance>b.distance)
               return -1;
           if( b.distance<a.distance)
               return 1;  
           return 0;
   })       
}

function alterMoverPointAndVector(moveDirection, type)  
{
    moverVector.reset(type, moveDirection, speed);  
    rotateVector(moverVector); 

    if(type=="move" || type =="side" || type =="lift")
    { 
        moverPoint = addPosVec(moverPoint, moverVector); 
    }
    return;
}

function init()
{
    requestAnimationFrame = window.requestAnimationFrame || 
                            window.mozRequestAnimationFrame ||
                            window.webkitRequestAnimationFrame ||
                            window.msRequestAnimationFrame;

    KBI = new KeyBoardInput();	 
    scrWidth = window.innerWidth * .90, scrHeight = window.innerHeight *.85;
    halfScrWidth = scrWidth / 2, halfScrHeight = scrHeight / 2;
	canvas.setAttribute("width", scrWidth), canvas.setAttribute("height", scrHeight);
	
    // where the user is
  
    moverPoint =  new Point(45000,  18000, 5000); 
	moverVector = new RVector(0, 0, 5);
    moverDirection = new Direction(0, 0, 0);
    counter = 0;  
}

function fpsPerformance()
{

    thisLoop =  performance.now();
    var fps = 1000 / (thisLoop - lastLoop);
    lastLoop = thisLoop;
    return fps.toFixed(2);
}