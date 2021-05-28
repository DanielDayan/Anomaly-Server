class Point {
    constructor(x,y) {
        this.x = x
        this.y = y
    }

}
class Line {
    constructor(a,b) {
        this.a = a
        this.b = b
    }
    f(x) {
        return this.a * x + this.b
    }

}
function avg(x) {
    let sum = 0
    for (let i = 0; i < x.length; i++) {
        sum = sum + x[i]
    }
   // console.log(sum)
    return sum/x.length
}
function Var(x) {
    let av = avg(x)
    let size = x.length
    let sum = 0
    x.forEach(element=> sum+= element * element)
    return (sum/size) - (av * av)
}
function cov(x,y) {
    let sum = 0
    let avgx = avg(x)
    let avgy = avg(y)
    for (let i = 0; i < x.length; i++) {
        sum += x[i] * y[i]
    }
    sum/=x.length
    return sum - (avgx * avgy)
}
function pearson(x,y) {
  let a = cov(x,y)
  let b = Math.sqrt(Var(x))
  let c = Math.sqrt(Var(y))
    let d = b * c
    if (a === 0)
        return 0
    return a / d
}
function linear_reg(points) {
    let x = []
    let y = []
    for(let i = 0; i < points.length; i++) {
        x[i] = points[i].x
        y[i] = points[i].y
    }
    let a = cov(x,y) / Var(x)
    let b = avg(y) - a*(avg(x))
    return new Line(a,b)
}
function dev(p, points) {
    let line = linear_reg(points)
    return dev2(p,line)
}
function dev2(p,l) {
    let x = p.y - l.f(p.x)
    if (x < 0)
        x*= -1
    return x
}
function createPoint(x,y) {
    return new Point(x,y)
}
module.exports.avg = avg
module.exports.cov = cov
module.exports.Var = Var
module.exports.dev2 = dev2
module.exports.pearson = pearson
module.exports.linear_reg = linear_reg
module.exports.createPoint = createPoint
module.exports.Line = Line.constructor

