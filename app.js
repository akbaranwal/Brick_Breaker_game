
		var canvas = document.getElementById('myCanvas');
		var ctx =canvas.getContext("2d");
		var ballRadius = 10;
		var x = canvas.width/2;
		var y = canvas.height - 30;
		var dx = -6;
		var dy = -6;
		var paddleHeight = 10;
		var paddleWidth = 250;
		var paddleX = (canvas.width - paddleWidth)/2;
		var paddleY = (canvas.height - paddleHeight)
		var rightPressed = false;
		var leftPressed = false;
	//	var brickCount = 13;
		var brickRowCount = 14;
		var brickColumnCount = 6;
		var brickWidth = 80;
		var brickHeight = 45;
		var brickPadding = 5;
		var BrickOffsetLeft = 28;
		var BrickOffsetTop = 28;
		var score =0;
		var lives = 3;
		var bricks = [];
		for(var c=0; c<brickColumnCount; c++) {
			bricks[c] = [];

			for(var r=0; r<brickRowCount; r++) {
				bricks[c][r]= {x: 0, y: 0, status:1 };
			}
		}
		
		document.addEventListener("keydown", keyDownHandler,false);
		document.addEventListener("keyup", keyUpHandler,false);
		document.addEventListener("mousemove", mouseMoveHandler,false);

		function keyDownHandler(e) {
			if(e.keyCode == 39) {
				rightPressed = true; 
			}
			if(e.keyCode == 37) {
				leftPressed = true;
			}
		}

		function keyUpHandler(e) {
			if(e.keyCode == 39) {
				rightPressed = false; 
			}
			if(e.keyCode == 37) {
				leftPressed = false;
			}
		}

			
		function mouseMoveHandler(e) {
			var relX = e.clientX - canvas.offsetLeft;
			if(relX>0 && relX<canvas.width) {
				paddleX = relX - paddleWidth/2;
			}
		}



		function drawScore() {
			ctx.font = "16px Arial";
			ctxfillStyle = "0095DD";
			ctx.fillText("Score: " + score, 8, 20);
		}

		function drawLives() {
			ctx.font = "16px Arial";
			ctxfillStyle = "0095DD";
			ctx.fillText("Lives: " + lives, canvas.width - 65, 20);
		}

		

		function drawPaddle() {
			ctx.beginPath();
			ctx.rect(paddleX, paddleY, paddleWidth, paddleHeight);
			ctx.fillStyle = "#0095DD";
			ctx.fill();
			ctx.closePath();
		}

		function drawBall() {
			ctx.beginPath();
			ctx.arc(x,y,ballRadius,0, Math.PI*2);
			ctx.fillStyle = "#0095DD";
			ctx.fill();
			ctx.closePath();
		}

		function collisionDetection() {
			for(var c=0; c<brickColumnCount; c++) {
				for(var r=0; r<brickRowCount; r++) {
					
 
       				if(bricks[c][r].status==1) {
       					if(x>bricks[c][r].x && x<bricks[c][r].x+brickWidth && y>bricks[c][r].y && y<bricks[c][r].y+brickHeight) {
       							dy = -dy;
       							score+=7;
       							 
       							bricks[c][r].status = 0;
       							if(score == brickRowCount*brickColumnCount*7) {
       							 	alert(" you won");
       							 	document.location.reload();
       							 }

       					}

       				}
				}
			}	
		}

		function drawBricks() {
			for(var c=0; c<brickColumnCount; c++) {
				for(var r=0; r<brickRowCount; r++) {
					if(bricks[c][r].status == 1) {
						var brickX = (r* (brickWidth + brickPadding)) + BrickOffsetLeft;
						var brickY = (c* (brickHeight + brickPadding)) + BrickOffsetTop;
						bricks[c][r].x = brickX;
						bricks[c][r].y = brickY;
						ctx.beginPath();
						ctx.rect(brickX, brickY, brickWidth, brickHeight);
						
						if(c%2!=0)
         			   	  ctx.fillStyle="#fff";
        				else
       					    ctx.fillStyle="#0095DD";
						ctx.fill();
						ctx.closePath();
					}
				}
			}
		}
		function draw(){
			ctx.clearRect(0,0,canvas.width, canvas.height);
			drawBricks();
			drawBall();
			drawPaddle();
			drawScore();
			drawLives();
			collisionDetection();
			console.log(bricks);

			requestAnimationFrame(draw);	
			if(x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
				dx = -dx;
			}
			if(y + dy < ballRadius) {
				dy = -dy;
			}
			// ball and paddle collison detection
			else if (y + dy > canvas.height - ballRadius) {
				if(x > paddleX && x < paddleX + paddleWidth) {
					dx = 8*((x - (paddleX + paddleWidth/2))/paddleWidth);
					dy = -dy;
				}
				else {
					lives--;
				
				if(!lives) {
					alert("game over, Try Again");
					document.location.reload();
				}
				else {
					x = canvas.width/2;
					y = canvas.height - 30;
					dx = 6;
					dy = -6;
				}
			}
			}
			
			if(rightPressed && paddleX < canvas.width - paddleWidth/2) {
				paddleX += 14;
			}
			if(leftPressed && paddleX > 0) {
				paddleX -= 14;
			}
			x += dx;
			y += dy;
			
							

		}
		draw();
			
