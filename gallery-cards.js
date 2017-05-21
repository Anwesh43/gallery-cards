class Gallery {
    constructor(x,y) {
        this.img = document.createElement('canvas')
        this.img.style.position = 'absolute'
        this.img.style.left = x
        this.img.style.top = y
        this.cards = []
    }
    draw() {
        const w = this.canvas.width ,h = this.canvas.height
        this.context.clearRect(0,0,w,h)
        this.context.fillStyle = '#BDBDBD'
        this.context.fillRect(0,0,w,h)
        this.img.src = this.canvas.toDataURL()
    }
    create() {
        this.canvas = document.createElement('canvas')
        this.canvas.width = window.innerWidth/2
        this.canvas.height = window.innerHeight/3
        this.context = this.canvas.getContext('2d')
        this.draw()
    }
    addCard(src) {

    }
}
