var scaler = {};
scaler.alter = function(element)
{
	objectScale = parseInt(element.value);
	new Audio("snap.m4a").play();
	perlinGrid();
	setupTriangleStrips();
	calculateFrustrum(0, "")
	draw(); 
};
 
var octaver = {};
octaver.alter = function(element)
{
	octave = parseInt(element.value);
	maxFrequency =Math.pow(2, octave); 
	//new Audio("snap.m4a").play();
	perlinGrid();
    draw();
};
 
var contrast = {};

contrast.alter = function(element)
{
	mag = element.value;
	perlinGrid();
	setupTriangleStrips();
	calculateFrustrum(0, "");
	draw();
};

var angler = {};
angler.alter = function(element)
{
	myAngle = parseInt(element.value);
	// new Audio("short-click.wav").play();
	changeVectorAngles(myAngle);
	perlinGrid();
	setupTriangleStrips();
	calculateFrustrum(0, "");
	draw();
};

function showInstructions()
{

    alert("To USE:\n"+
    "Arrows for forward, back, left and right.\n"+

    "1 & 3 to Yaw left and right\n"+
    
    "W & X to Pitch forward and back\n"+
    
    "Q & Z to Lift up and down\n"+
    
    "A & D to Roll left and right\n");


}

function Create2DArray(size)
{
	var arr = [];
  
	for (var i=0;i<size;i++) 
	{
	   arr[i] = [];
	}
  
	return arr;
}

function Create3DArray(gridWidth)
{
	var arr = Create2DArray(gridWidth);
  
	for (var j=0;j<gridWidth;j++) 
	{ 
		for (var i=0;i<gridWidth;i++) 
		{
			arr[i][j] = [];
		}
		
	}

	return arr;
}
 