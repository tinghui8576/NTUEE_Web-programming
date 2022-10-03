const p5 = document.querySelectorAll('.p5');
const micro3 = document.querySelectorAll('.micro3');
const delete3 = document.querySelectorAll('.delete3');

const people0 = document.getElementById('people0');
const people1 = document.getElementById('people1');
const people2 = document.getElementById('bear');
const people3 = document.getElementById('roseapple');
const people4 = document.getElementById('twoeight');
const people5 = document.getElementById('puppy');

const func0 = document.getElementById('hover0');
const func1 = document.getElementById('hover1');
const func2 = document.getElementById('hover2');
const func3 = document.getElementById('hover3');
const func4 = document.getElementById('hover4');
const func5 = document.getElementById('hover5');
const func6 = document.getElementById('hover6');
const func7 = document.getElementById('hover7');
const func8 = document.getElementById('hover8');
const func9 = document.getElementById('hover9');
const func10 = document.getElementById('hover10');
const func11 = document.getElementById('hover11');
const func12 = document.getElementById('hover12');
const func13 = document.getElementById('hover13');
const func14 = document.getElementById('hover14');
const func15 = document.getElementById('hover15');

var main0 = 1;
var main1 = 0;
var main2 = 0;
var main3 = 0;
var main4 = 0;
var main5 = 0;
var main6 = 1;
var main7 = 0;
var main8 = 0;
var main9 = 0;
var main10 = 0;
var main11 = 0;
var main12 = 1;
var main13 = 0;
var main14 = 0;
var main15 = 0;

var exist0 = 1;
var exist1 = 1;
var exist2 = 1;
var exist3 = 1;
var exist4 = 1;
var exist5 = 1;
var exist6 = 0;
var exist7 = 0;
var exist8 = 0;
var exist9 = 0;
var exist10 = 0;
var exist11 = 0;
var exist12 = 0;
var exist13 = 0;
var exist14 = 0;
var exist15 = 0;

var state = 0;

const bn =['Bigp0', 'Bigp1', 'Bigp2', 'Bigp3', 'Bigp4', 'Bigp5', 'Bigp6', 'Bigp7', 'Bigp8', 'Bigp9', 'Bigp10', 'Bigp11', 'Bigp12', 'Bigp13', 'Bigp14', 'Bigp15']
const n = ['p0', 'p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7', 'p8', 'p9', 'p10', 'p11', 'p12', 'p13', 'p14', 'p15']
const lin = ['name0', 'name1', 'name2', 'name3', 'name4', 'name5', 'name6' ]
const m =['micro2','micro3'];
const d = ['delete', 'delete3'];
function pin(num){
  for (let element of document.getElementsByClassName(bn[num])){
    element.style.display='block';
  }
  for (let element of document.getElementsByClassName(n[num])){
    element.style.display='none';
  }
  if (main0+main1+main2+main3+main4+main5 != 0){
    checkpin();
  }
  else{
    back();
  }
  
  switch (num) {
  case 0:
    main0 = 1;
    break;
  case 1:
    main1 = 1;
    break;
  case 2:
    main2 = 1;
    break;
  case 3:
    main3 = 1;
    break;
  case 4:
    main4 = 1;
    break;
  case 5:
    main5 = 1;
    break;
  }
}


function checkpin(){
  if (main0 == 1){
    change(0);
    main0 = 0;
  }
  else if (main1 == 1){
    change(1);
    main1 = 0;
  }
  else if (main2 == 1){
    change(2);
    main2 = 0;
  }
  else if (main3 == 1){
    change(3);
    main3 = 0;
  }
  else if (main4 == 1){
    change(4);
    main4 = 0;
  }
  else if (main5 == 1){
    change(5);
    main5 = 0;
  }
}


function change(num){
  for (let element of document.getElementsByClassName(bn[num])){
    element.style.display='none';
  }
  for (let element of document.getElementsByClassName(n[num])){
    element.style.display='block';
  }
}

function back(){    
   state = 0;
  document.getElementById('imgp2').style.width = '80pt';
  document.getElementById('imgp2').style.height = '100pt';
  document.getElementById('imgp3').style.width = '110pt';
  document.getElementById('imgp3').style.height = '70pt';
 document.getElementById('imgp5').style.width = '100pt';
  document.getElementById('imgp5').style.height = '80pt'; 
  document.getElementById('T0').style.fontSize = '15pt';
  document.getElementById('T1').style.fontSize = '15pt';
  document.getElementById('T4').style.fontSize = '15pt';
  
  for (let name of n){
    for (let element of document.getElementsByClassName(name)){
      element.style.width="130pt";
      element.style.height="100pt";
      element.style.left="10%";
      element.style.top="10%";
    }
  }
  for (let element of document.getElementsByClassName('p5')){
      element.style.width="180pt";
      element.style.left="20%";
      element.style.top="10%";
    }
  for (let element of document.getElementsByClassName('avatar2')){
      element.style.width= '50pt';
      element.style.height= '50pt';
      element.style.fontSize ='15pt';
  }
  
  
  for (let mic of m){
    for (let element of document.getElementsByClassName(mic)){
      element.style.width= '20pt';
      element.style.height= '20pt';
      element.style.left= '45%';
      element.style.top= '5%';
    }
  }
  for (let dele of d){
    for (let element of document.getElementsByClassName(dele)){
      element.style.width= '20pt';
      element.style.height= '20pt';
      element.style.left= '-45%';
      element.style.top= '6%';
  }
  }
  for (let element of document.getElementsByClassName('micro3')){
      element.style.left= '60%';
  }
  for (let element of document.getElementsByClassName('delete3')){
      element.style.left= '-30%';
  }
  for (let name of lin){
    for (let element of document.getElementsByClassName(name)){
      element.style.fontSize ='10pt';
      element.style.left='-40pt';
      element.style.bottom="-80pt";
    }
  }
  for (let element of document.getElementsByClassName('name6')){
      element.style.fontSize ='11pt';
      element.style.left='-6vw';
      element.style.bottom="-72vh";
    }
  
  if(exist1+exist2+exist3+exist4+exist5 <= 0){
    for (let element of document.getElementsByClassName('container')){
     element.style.display= 'none';
   }
    for (let element of document.getElementsByClassName('Bigp0')){
     element.style.width="100vw";
     element.style.height="80vh";
     element.style.display= 'inline';
   }
  }
  else{
  for (let element of document.getElementsByClassName('container')){
     element.style.width="35vw";
     element.style.height="80vh";
     element.style.display= 'block';
   }
  }
}
  
function unpin(num){   
 state = 1;
  document.getElementById('T0').style.fontSize = '40pt';
  document.getElementById('T1').style.fontSize = '40pt';
  document.getElementById('T4').style.fontSize = '40pt';
  
  document.getElementById('imgp2').style.width = '160pt';
  document.getElementById('imgp2').style.height = '200pt';
  document.getElementById('imgp3').style.width = '220pt';
  document.getElementById('imgp3').style.height = '140pt';
 document.getElementById('imgp5').style.width = '200pt';
  document.getElementById('imgp5').style.height = '160pt'; 
  
  for (let element of document.getElementsByClassName('function2')){
      element.style.width= '100pt';
      element.style.height= '35pt';
      element.style.borderRadius= '35px 35px 35px 35px';
  }
  
  for (let name of n){
    for (let element of document.getElementsByClassName(name)){
      element.style.width="32vw";
      element.style.height="38vh";
      element.style.left="0%";
      element.style.top="2%";
    }
  }
  for (let element of document.getElementsByClassName('avatar2')){
      element.style.width= '100pt';
      element.style.height= '100pt';
      element.style.fontSize ='20pt';
  }
  for (let mic of m){
    for (let element of document.getElementsByClassName(mic)){
      element.style.width= '25pt';
      element.style.height= '25pt';
      element.style.left= '60%';
      element.style.top= '3%';
    }
  }
  for (let dele of d){
    for (let element of document.getElementsByClassName(dele)){
      element.style.width= '25pt';
      element.style.height= '25pt';
      element.style.left= '-100pt';
      element.style.top= '3%';
  }
  }
  
  for (let name of lin){
    for (let element of document.getElementsByClassName(name)){
      element.style.fontSize ='12pt';
      element.style.left='-80pt';
      element.style.bottom="-87%";
    }
  }
  
  for (let element of document.getElementsByClassName(bn[num])){
      element.style.display= 'none';
  }
  for (let element of document.getElementsByClassName(n[num])){
      element.style.display= 'block';
  }
  main0 = 0;
  main1 = 0;
  main2 = 0;
  main3 = 0;
  main4 = 0;
  main5 = 0;
  
  
  for (let element of document.getElementsByClassName('container')){
     element.style.width="100vw";
     element.style.height="80vh";
     element.style.display= 'inline';
   }
}


function del(num){       
  for (let element of document.getElementsByClassName(n[num])){
   element.style.display="none";}
  if (state == 0){
    move();
  }
  
  switch (num) {
  case 1:
    exist1 = 0;
    break;
  case 2:
    exist2 = 0;
    break;
  case 3:
    exist3 = 0;
    break;
  case 4:
    exist4 = 0;
    break;
  case 5:
    exist5 = 0;
    break;
  }
  
  if(exist1+exist2+exist3+exist4+exist5 <= 0){
    for (let element of document.getElementsByClassName('container')){
     element.style.display= 'none';
   }
    for (let element of document.getElementsByClassName('Bigp0')){
     element.style.width="100vw";
     element.style.height="80vh";
     element.style.display= 'inline';
   }
  }
  
}



function move(){
  p5.forEach(box => {
    box.style.width = '130pt';
    box.style.left = '10%';
});
  micro3.forEach(micro => {
    micro.style.left = '45%';
});
  delete3.forEach(dele => {
    dele.style.left = '-45%';
});
}


people0.addEventListener('mouseover', function handleMouseOver() {
  func0.style.display = 'flex';
});
people0.addEventListener('mouseout', function handleMouseOut() {
  func0.style.display = 'none';
});
people1.addEventListener('mouseover', function handleMouseOver() {
  func1.style.display = 'flex';
});
people1.addEventListener('mouseout', function handleMouseOut() {
  func1.style.display = 'none';
});
people2.addEventListener('mouseover', function handleMouseOver() {
  func2.style.display = 'flex';
});
people2.addEventListener('mouseout', function handleMouseOut() {
  func2.style.display = 'none';
});
people3.addEventListener('mouseover', function handleMouseOver() {
  func3.style.display = 'flex';
});
people3.addEventListener('mouseout', function handleMouseOut() {
  func3.style.display = 'none';
});
people4.addEventListener('mouseover', function handleMouseOver() {
  func4.style.display = 'flex';
});
people4.addEventListener('mouseout', function handleMouseOut() {
  func4.style.display = 'none';
});
people5.addEventListener('mouseover', function handleMouseOver() {
  func5.style.display = 'flex';
});
people5.addEventListener('mouseout', function handleMouseOut() {
  func5.style.display = 'none';
});

const func = [func0, func1, func2, func3, func4, func5];

for (let element of func){
     element.addEventListener('mouseover', function handleMouseOver() {
        element.style.display = 'flex';
        element.style.opacity= '90%';
      });
      element.addEventListener('mouseout', function handleMouseOut() {
        element.style.display = 'none';
        element.style.opacity= '60%';
      });
}



function startTime(){   
  var today=new Date();//定義日期物件   
  var hh=today.getHours();//通過日期物件的getHours方法返回小時   
  var mm=today.getMinutes();//通過日期物件的getMinutes方法返回分鐘  
  // 如果分鐘或小時的值小於10，則在其值前加0，比如如果時間是下午3點20分9秒的話，則顯示15：20：09   
  hh=checkTime(hh);
  mm=checkTime(mm);     
  
  var Timing;
  Timing = Time(hh);
                document.getElementById('nowDateTimeSpan').innerHTML= Timing +' ' + hh+":"+mm;   
                setTimeout('startTime()',1000);//每一秒中重新載入startTime()方法 
}   
function checkTime(i) {   
  if (i<10){
    i="0" + i;
  }   
  return i;
}  
function Time(i){
  var T;
  if (i>= 4 && i<11){
    T = '早上';
  }   
  else if (i>=11 && i<=13){
    T = '中午';
  }   
  else if (i>=14 && i<=17){
    T = '下午';
  }  
  else if (i>=18 && i<=23){
    T = '晚上';
  }  
  else{
    T = '清晨';  
  }
  return T;
}