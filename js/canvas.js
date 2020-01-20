if(window.innerWidth >= 991){
  var canvas = document.getElementById("scene");
  var ctx = canvas.getContext("2d");
  var particles = [];
  
  function drawScene() {
    canvas.width = png.width * 3;
    canvas.height = png.height * 3;
    ctx.drawImage(png, 0, 0);
    var my_gradient = ctx.createLinearGradient(0, 270, 570, 0);
    my_gradient.addColorStop(0, "#097BD8");
    my_gradient.addColorStop(0.5, "#097BD8");
    my_gradient.addColorStop(1, "#09C3D8");
  
    ctx.fillStyle = my_gradient;
    var data = ctx.getImageData(0, 0, png.width, png.height);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (var y = 0, y2 = data.height; y < y2; y++) {
      for (var x = 0, x2 = data.width; x < x2; x++) {
        var p = y * 4 * data.width + x * 4;
        if (data.data[p + 3] > 129) {
          var particle = {
            x0: x,
            y0: y,
            x1: png.width / 2,
            y1: png.height / 2,
            speed: Math.random() * 4 + 2,
            color:
              "rgb(" +
              data.data[p] +
              "," +
              data.data[p + 1] +
              "," +
              data.data[p + 2] +
              ")"
          };
          TweenMax.to(particle, particle.speed, {
            x1: particle.x0,
            y1: particle.y0,
            delay: y / 30,
            ease: Elastic.easeOut
          });
          particles.push(particle);
        }
      }
    }
    requestAnimationFrame(render);
  }
  var render = function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (var i = 0, j = particles.length; i < j; i++) {
      var particle = particles[i];
      //uncomment if you want to use image colors instead of gradient
      //ctx.fillStyle = particle.color;
      ctx.fillRect(particle.x1 * 3, particle.y1 * 3, 2, 2);
    }
    requestAnimationFrame(render);
  };
  
  var clearFrame = function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles = [];
    drawScene();
  };
  
  var png = new Image();
  png.onload = drawScene;
  png.src = "images/logo-sm.png";
}

