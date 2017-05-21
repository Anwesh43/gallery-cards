class Gallery {
    constructor(x,y) {
        this.img = document.createElement('canvas')
        this.img.style.position = 'absolute'
        this.img.style.left = x
        this.img.style.top = y
        this.cards = []
        this.x = 0
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
        this.canvas.width = window.innerWidth/4
        this.canvas.height = window.innerHeight/3
        this.context = this.canvas.getContext('2d')
        this.draw()
    }
    addCard(src) {
        this.cards.push(new Card(src,this.cards.length*window.innerWidth/4))
    }
}
class Card {
    constructor(src,x) {
        this.x = x
        this.imageLoaded = false
        this.image = new Image()
        this.image.src = src
        this.image.onload = ()=>{
            this.imageLoaded = true
        }
    }
    draw(context,w,h) {
        if(this.imageLoaded) {
            context.fillStyle = 'white'
            context.save()
            context.translate(this.x,0)
            context.fillRect(0,0,w,h)
            context.drawImage(this.image,w/10,h/10,4*w/5,4*h/5)
            context.restore()
        }

    }
}
