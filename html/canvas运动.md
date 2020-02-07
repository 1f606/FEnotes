面向过程

```js
let x = 0
  let y = 0
  let width = 100
  let height = 100
  let speedX = 2
  let speedY = 2
  const canvas = document.getElementById('canvas')
  const ctx = canvas.getContext('2d')
  ctx.fillStyle = 'red'
  ctx.fillRect(x, y, width, height)
  setInterval(function () {
    // ctx.clearRect(0, 0, canvas.width, canvas.height)
    x += speedX
    if (x > canvas.width - width) {
      speedX *= -1
    } else if (x < 0) {
      speedX *= -1
    }
    y += speedY
    if (y > canvas.height - height) {
      speedY *= -1
    } else if (y < 0) {
      speedY *= -1
    }
    ctx.fillRect(x, y, width, height)
  }, 10)
```

利用requestAnimationFrame

```js

```


