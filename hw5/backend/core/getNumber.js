
var number;

const fs = require('fs');
fs.readFile( 'save.txt','utf8', function(err, data){
    number = parseInt(data)
});

function getNumber(){
    return number;
}
function genNumber(){
    number = Math.floor(1 + Math.random()*(100));
    var str = number.toString()
    fs.writeFile('save.txt', number.toString(), function (err) {
    })
}
export {getNumber, genNumber}