const canvas = document.getElementById('canvas');
canvas.width = window.innerWidth
canvas.height = window.innerHeight
canvas.style.background = "#1a1a1a"
const ctx = canvas.getContext("2d")

class Star {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.size = Math.random() * 3 + 1
        this.color = this.randomColor()
        this.twinkleSpeed = Math.random() * 0.05 + 0.01
        this.twinklePhase = Math.random() * Math.PI * 2
        this.maxSize = this.size * 1.5
        this.minSize = this.size * 0.5
    }

    randomColor() {
        const colors = [
            '#ffffff', // white
            '#fff7e6', // warm white
            '#e6f7ff', // cool white
            '#ffe6e6', // pinkish
            '#e6ffe6'  // greenish
        ]
        return colors[Math.floor(Math.random() * colors.length)]
    }

    update() {
        this.twinklePhase += this.twinkleSpeed
        this.size = this.minSize + (Math.sin(this.twinklePhase) + 1) * (this.maxSize - this.minSize) / 2
    }

    draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = this.color
        ctx.fill()
    }
}

const stars = []

function drawStaticText() {
    ctx.save()
    
    // Title
    ctx.font = 'bold 48px Arial'
    ctx.fillStyle = '#ffffff'
    ctx.textAlign = 'center'
    ctx.fillText('Star Canvas', canvas.width / 2, 60)
    
    // Instructions
    ctx.font = '20px Arial'
    ctx.fillStyle = '#cccccc'
    ctx.fillText('Click anywhere to create your own little stars', canvas.width / 2, 100)
    
    ctx.restore()
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    drawStaticText()
    
    stars.forEach(star => {
        star.update()
        star.draw()
    })
    
    requestAnimationFrame(animate)
}

animate()

canvas.addEventListener("click", (e) => {
    const star = new Star(e.clientX, e.clientY)
    stars.push(star)
})