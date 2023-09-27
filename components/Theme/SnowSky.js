import { useEffect } from 'react'
const id = 'canvas_snow'
const Snow = () => {
  const destroySnow = ()=>{
    const snow = document.getElementById(id)
    if(snow && snow.parentNode){
      snow.parentNode.removeChild(snow)
    }
  }
      
  useEffect(() => {
    createSnow({})
    return () => destroySnow()
  }, [])
  return <></>
}

export default Snow

function createSnow() {
  var stop, staticx
  var img = new Image()
  img.src =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAXFJREFUaEPtmM1NQ0EMhGcaQFABJVACFEAbpAJ+LnAiFxIaANqgACiBEqiAQANGjt6TIlAS1mMprOR3tr2e+bw/CdH5x877RwnYNcEiUAREB2qERAPl9CIgWygWKAKigXJ6EZAtFAsUgdFAM9sDMAFwCuAIwD6ABYA3AM8AHkl+iYb/Sk8hYGbe+N3Q9LoeXcwlyadMEbIAM7sFcN3Q1JTkTUP8xlBJwOD8Q6CZSRaJsIBh5t+3jM2mcTrM2BOKgHMA84D7Y8oFyXshf5mqCHgBcCw08EryRMiXBXwEx2fs+ZOkH7XSpxAwaWXHT4bXH9cOFzAzlcCC5IFsQrSAmXW/B9RTyG9l5RSTN7G/ffq9B1y+mZ35Iy0whru/iVdeof2+hVZEOInZH16jVyQjxNZCDh+jPyt2/XsgsAfSUtIIpHXUWKgENBqWHl4E0i1tLFgEGg1LDy8C6ZY2FiwCjYalhxeBdEsbC/5nAt7b1r9uvgEuJF8xbrpllgAAAABJRU5ErkJggg=='
    const frameRate = 30;
    let lastTimestamp = 0;
    function Snow(x, y, s, r, fn) {
    this.x = x
    this.y = y
    this.s = s
    this.r = r
    this.fn = fn
  }
  Snow.prototype.draw = function (cxt) {
    cxt.save()
    var xc = (5 * this.s) / 5
    cxt.translate(this.x, this.y)
    cxt.rotate(this.r)
    cxt.drawImage(img, 0, 0, 25 * this.s, 30 * this.s)
    cxt.restore()
  }
  Snow.prototype.update = function () {
    this.x = this.fn.x(this.x, this.y)
    this.y = this.fn.y(this.y, this.y)
    this.r = this.fn.r(this.r)
    if (
      this.x > window.innerWidth ||
      this.x < 0 ||
      this.y > window.innerHeight ||
      this.y < 0
    ) {
      this.r = getRandom('fnr')
      if (Math.random() > 0.4) {
        this.x = getRandom('x')
        this.y = 0
        this.s = getRandom('s')
        this.r = getRandom('r')
      } else {
        this.x = window.innerWidth
        this.y = getRandom('y')
        this.s = getRandom('s')
        this.r = getRandom('r')
      }
    }
  }
  let SnowList = function () {
    this.list = []
  }
  SnowList.prototype.push = function (snow) {
    this.list.push(snow)
  }
  SnowList.prototype.update = function () {
    for (var i = 0, len = this.list.length; i < len; i++) {
      this.list[i].update()
    }
  }
  SnowList.prototype.draw = function (cxt) {
    for (var i = 0, len = this.list.length; i < len; i++) {
      this.list[i].draw(cxt)
    }
  }
  SnowList.prototype.get = function (i) {
    return this.list[i]
  }
  SnowList.prototype.size = function () {
    return this.list.length
  }
  function getRandom(option) {
    var ret, random
    switch (option) {
      case 'x':
        ret = Math.random() * window.innerWidth
        break
      case 'y':
        ret = Math.random() * window.innerHeight
        break
      case 's':
        ret = Math.random()
        break
      case 'r':
        ret = Math.random() * 6
        break
      case 'fnx':
        random = -0.5 + Math.random() * 1
        ret = function (x, y) {
          return x + 0.5 * random - 1.7
        }
        break
      case 'fny':
        random = 1.5 + Math.random() * 0.7
        ret = function (x, y) {
          return y + random
        }
        break
      case 'fnr':
        random = Math.random() * 0.03
        ret = function (r) {
          return r + random
        }
        break
    }
    return ret
  }
  function startSnow() {
    requestAnimationFrame =
      window.requestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      window.oRequestAnimationFrame;

    var canvas = document.createElement('canvas'),
      cxt;
    staticx = true;
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    canvas.setAttribute(
      'style',
      'position: fixed;left: 0;top: 0;pointer-events: none;'
    );
    canvas.setAttribute('id', id);
    document.getElementsByTagName('body')[0].appendChild(canvas);
    cxt = canvas.getContext('2d');
    var snowList = new SnowList();
    for (var i = 0; i < 50; i++) {
      var snow,
        randomX,
        randomY,
        randomS,
        randomR,
        randomFnx,
        randomFny,
        randomFnR;
      randomX = getRandom('x');
      randomY = getRandom('y');
      randomR = getRandom('r');
      randomS = getRandom('s');
      randomFnx = getRandom('fnx');
      randomFny = getRandom('fny');
      randomFnR = getRandom('fnr');
      snow = new Snow(randomX, randomY, randomS, randomR, {
        x: randomFnx,
        y: randomFny,
        r: randomFnR
      });
      snow.draw(cxt);
      snowList.push(snow);
    }
    stop = requestAnimationFrame(updateSnow);

    function updateSnow(timestamp) {
      if (!lastTimestamp) lastTimestamp = timestamp;
      const elapsed = timestamp - lastTimestamp;

      if (elapsed > 1000 / frameRate) { 
        cxt.clearRect(0, 0, canvas.width, canvas.height);
        snowList.update();
        snowList.draw(cxt);
        lastTimestamp = timestamp;
      }

      stop = requestAnimationFrame(updateSnow);
    }
  }

  img.onload = function () {
    startSnow();
  }

  function stopp() {
    if (staticx) {
      var child = document.getElementById(id);
      child.parentNode.removeChild(child);
      window.cancelAnimationFrame(stop);
      staticx = false;
    } else {
      startSnow();
    }
  }
}