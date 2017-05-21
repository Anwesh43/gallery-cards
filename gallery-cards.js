class Gallery {
    constructor(x,y) {
        this.img = document.createElement('canvas')
        this.img.style.position = 'absolute'
        this.img.style.left = x
        this.img.style.top = y
        this.isAnimated = false
        this.cards = []
        this.x = 0
        this.w = window.innerWidth/4
        document.body.appendChild(this.img)
        this.dir = 0
    }
    draw() {
        const w = this.canvas.width ,h = this.canvas.height
        this.context.clearRect(0,0,w,h)
        this.context.fillStyle = '#BDBDBD'
        this.context.fillRect(0,0,w,h)
        this.cards.forEach((card)=>{
            card.draw(this.context)
        })
        this.img.src = this.canvas.toDataURL()
    }
    render() {
        if(!this.isAnimated) {
            this.isAnimated = true
            const initX = this.x
            const interval = setInterval(()=>{
                this.draw()
                this.x += this.dir * this.w/5
                if(Math.abs(this.x-initX) >= w) {
                    this.dir = 0
                    clearInterval(interval)
                    this.isAnimated = false
                }
            },100)
        }
    }
    startRendering(dir) {
        this.dir = dir
        this.render()
    }
    create() {
        this.canvas = document.createElement('canvas')
        this.canvas.width = this.w
        this.canvas.height = this.w
        this.context = this.canvas.getContext('2d')
        this.draw()
        const leftArrowButton = new ArrowButton(this.x-this.w/5,this.w/2,-1,(dir)=>{
            if(this.x > -this.w*this.cards.length-1) {
                this.startRendering(dir)
            }
        })
        const rightArrowButton = new ArrowButton(this.x+(6*this.w)/5,this.w/2,1,(dir)=>{
            if(this.x < 0) {
                this.startRendering(dir)
            }
        })
        leftArrowButton.render()
        rightArrowButton.render()
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
class ArrowButton {
    constructor(x,y,dir,cb) {
        this.x = x
        this.y = y
        this.dir = dir
        this.img = document.createElement('img')
        document.body.appendChild(this.img)
        this.img.onmousedown = () => {
            this.cb(this.dir)
        }
    }
    render() {
        const canvas = document.createElement('canvas')
        canvas.width = window.innerWidth/10
        canvas.height = window.innerWidth/10
        const size = canvas.width/3
        const context = canvas.getContext('2d')
        context.strokeStyle = 'black'
        context.fillStyle = '#BDBDBD'
        context.save()
        context.translate(canvas.width/2,canvas.height/2)
        context.beginPath()
        context.arc(0,0,canvas.width/2,0,2*Math.PI)
        context.fill()
        if(this.dir == 1){
            context.rotate(0)
        }
        else {
            context.rotate(Math.PI)
        }
        context.lineWidth = size/5
        for(var i=0;i<2;i++) {
            context.save()
            context.rotate(-45+90*i)
            context.beginPath()
            context.moveTo(0,0)
            context.lineTo(-size,0)
            context.stroke()
            context.restore()
        }
        context.restore()
        this.img.src = canvas.toDataURL()
    }
}
