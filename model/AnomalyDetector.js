const threshold = 0.9
const detect = require('./Detector_utill');
const enclosingCircle = require('smallest-enclosing-circle')

function createTimeSeries(data) {
       let map = new Map()
       let rows = data.split('\r\n')
       let atts = rows[0].split(',')
       for ( let i = 0; i < atts.length; i++) {
              let array = [];
              for(let j = 1; j < rows.length; j++) {
                     let element = parseFloat(rows[j].split(',')[i])
                     if (!isNaN(element))
                            array.push(element)
              }
              if (map.has(atts[i])) {
                     atts[i]+= "2"
              }
              map.set(atts[i], array)
       }
      return map
}
function learnNormal(map,detectorType) {
       let i = 0, j =0

       let cf = []
       let features = Array.from(map.keys());
       let size_of_cols = features.length;
       for (i = 0; i < size_of_cols; i++) {
              let maxCorl = 0;
              let j_maxCorl = 0;
              let tempX = Array.from(map.get(features[i]));
              for(j = i + 1; j < size_of_cols; j++) {
                     let tempY = Array.from(map.get(features[j]));
                     let corl = Math.abs(detect.pearson(tempX, tempY));
                     if (corl > maxCorl) {
                            maxCorl = corl;
                            j_maxCorl = j;
                     }
              }
              let tempY = Array.from(map.get(features[j_maxCorl]));
              //check if two features are correltad
              let arr = []
              for (let k = 0; k < tempX.length; k++) {
                     arr.push(detect.createPoint(tempX[k], tempY[k]));
              }
              let element = null;
              if (detectorType === 1)
                     element = learnHelperSimple(features[i], features[j_maxCorl], maxCorl ,arr);
              else if (detectorType === 2)
                      element = learnHelperHybrid(features[i], features[j_maxCorl], maxCorl ,arr)
              if (element != null)
                     cf.push(element)
       }
       return cf
}

function learnHelperSimple(f1 , f2, corl , arr){
       if (corl >= threshold) {
              let line = detect.linear_reg(arr);
              //max dev of current line and points
              let computed_th = Math.abs(maxDev(arr, line));
              return [false, f1, f2, corl, line, computed_th]
       }
       else
              return null
}
function learnHelperHybrid(f1 , f2, corl , arr) {
       if (corl < threshold && corl >= 0.5) {
              for (let i =0 ; i < arr.length; i ++) {
                     let temp = arr[i]
                     arr[i] = {x : temp.x, y : temp.y}
              }
              let circle = enclosingCircle(arr)
              let center = detect.createPoint(circle.x , circle.y)
              let computed_th = circle.r * 1.1;
              let line = detect.linear_reg(arr);
              return [true, f1, f2, corl, line, computed_th, center]
       }
}

function maxDev(arr, line) {
       let max = 0
       for (let i = 0; i < arr.length; i++) {
              let current = detect.dev2(arr[i], line);
              if (current > max) {
                     max = current;
              }
       }
       return 1.1 * max;
}

function detectAnomalies(map, cf, detectorType) {
       let jsonArr = []

       let result = 0
       for (let i = 0; i < cf.length; i++) {
              let f1 =  map.get(cf[i][1])
              let f2 =  map.get(cf[i][2])
              for (let k = 0; k < f1.length; k++) {
                     if (detectorType === 1)
                            result = isAnomalous(f1[k], f2[k], cf[i])
                     else if (detectorType === 2)
                            result = isAnomalousCircle((f1[k]), f2[k], cf[i])
                     if(result) {
                            let f1 = cf[i][1].toString()
                            let f2 = cf[i][2].toString()
                            let time = (k + 1)
                            const data = {"feature1" : f1 ,"feature2": f2 ,"line": time}
                            let jstring = JSON.stringify(data)
                            let js = JSON.parse(jstring)
                            jsonArr.push(js)
                     }
              }

       }
       return  jsonArr

}


function isAnomalous(x, y, c){
       let newX = c[4].f(x)
       return (Math.abs(y - newX) > c[5])
}

function isAnomalousCircle(x, y ,c) {
       let dist = getDistance(x, y, c[6])
       return (dist > c[5])

}
function getDistance(x, y, center) {
       return Math.sqrt(Math.pow(center.x - x, 2) + Math.pow(center.y - y , 2));
}



module.exports.createTimeSeries = createTimeSeries
module.exports.learnNormal = learnNormal

module.exports.detectAnomalies = detectAnomalies
