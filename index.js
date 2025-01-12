function set(name, value) {

  localStorage.setItem(name, value)

}
function rem(name) {

  localStorage.removeItem(name)

}
function get(name) {

return localStorage.getItem(name)
}
function clear() {
localStorage.clear()
}


var initialDateStr = new Date().toUTCString();

var ctx = document.getElementById('chart').getContext('2d');
ctx.canvas.width = 1000;
ctx.canvas.height = 700;



if (get('barData') && JSON.parse(get('barData')).length !== 0) {
  
  
  document.querySelector('[data-start]').remove()  
  
  
  var barData = JSON.parse(get('barData'))
  
  
  console.log(barData)
  
  
  let endObj = barData[barData.length - 1];
  
  oldProcent = endObj.c;
  
  
  
  
  // push + upd + save
  
  let today = new Date();
let day = today.getDate(); // день
let month = today.getMonth() + 1; // месяц (нумерация с 0)
let year = today.getFullYear(); // год

const date = `${day}${month}${year}`;

console.log('============')
console.log(oldProcent.date)
console.log('!==')
console.log(date)
console.log('============')

     if (endObj.date !== date) {
    
        
        barData.push({x: Date.now(), o: oldProcent, h: oldProcent, l: oldProcent, c: oldProcent, date: date})
        
        
        if (barData.length === 3) {
          if (barData[0].date === '') {
            barData.shift()
          }
        }
      
        set('barData', JSON.stringify(barData))
        // chart.update()
        
        
          }
  
} else {
  
  var barData = [];
  
}





var lineData = barData.map(data => ({ x: data.x, y: data.c }));

var chart = new Chart(ctx, {
  type: 'candlestick',
  data: {
    datasets: [
      
      {
        label: '',
        data: barData,
        borderColor: '#100F14',
        
       
      },
      
      {
        label: '',
        type: 'line',
        data: lineData,
        hidden: true,
      }
      
    ]
  }
});

var update = function() {
  var dataset = chart.config.data.datasets[0];

  // candlestick vs ohlc
  var type = document.getElementById('type').value;
  chart.config.type = type;

  // linear vs log
  /*
  var scaleType = document.getElementById('scale-type').value;
  chart.config.options.scales.y.type = scaleType;
  */

  // color
  
  var colorScheme = document.getElementById('color-scheme').value;
  if (colorScheme === 'neon') {
    chart.config.data.datasets[0].backgroundColors = {
      up: '#20B16B',
      down: '#EE4448',
      unchanged: '#999',
      
    };
  } else {
    delete chart.config.data.datasets[0].backgroundColors;
  }
  

  // border
  /*
  var border = document.getElementById('border').value;
  if (border === 'false') {
    dataset.borderColors = 'rgba(0, 0, 0, 0)';
  } else {
    delete dataset.borderColors;
  }
  */

  // mixed charts
  /*
  var mixed = document.getElementById('mixed').value;
  if (mixed === 'true') {
    chart.config.data.datasets[1].hidden = false;
  } else {
    chart.config.data.datasets[1].hidden = true;
  }
  */

  chart.update();
};

[...document.getElementsByTagName('select')].forEach(element => element.addEventListener('change', update));
/*
document.getElementById('update').addEventListener('click', update);
*/





if (get('base')) {
  document.querySelector('[data-body]').innerHTML = get('base')
  
  
} else {
  
  document.querySelector('[data-body]').innerHTML = `
  <div>
     <span class='name'>QL/PRC</span>
     <span> </span>
     <span data-profit>0.00%</span>
  </div>
  <div>⠀</div>
  <div><span data-procent>0.00</span><span> </span></div>
  <div>⠀</div>
     <div class='text-second'>положительные:</div>
     <div>⠀</div>
<div data-pos-list>
 
</div>
<div>⠀</div>
<div class='text-second'>отрицательные:</div>
     <div>⠀</div>
<div data-neg-list>
 
</div>
<div>⠀</div>
<div>⠀</div>

<button data-pos-add>добавить положительные</button>
<div>⠀</div>
<button data-neg-add>добавить отрицательные</button>
  `
}


   document.addEventListener("click", (event) => {
     
     

      if (event.target.closest("[data-pos-add]")) {
        
        
        
        // start
        
        let oldValueString = event.target.innerText
       let oldValue = oldValueString

        let input = document.createElement('input')
        
        input.type = 'text'
        
        event.target.innerHTML = ''
        
        event.target.appendChild(input)
        
        input.focus()
        
        let num
        
        input.addEventListener('blur', ()=>{
          
          let newValue = input.value || oldValue
          
          num = newValue
          
          event.target.innerText = oldValue
          
          
          // end
          
          if (input.value) {
            
            document.querySelector('[data-pos-list]').insertAdjacentHTML('beforeend', `
        <div data-pos-point>
         <span data-name>${input.value}</span>
         <div data-pos-span data-span>0</div>
        </div>
        `)
        
        const base = document.querySelector('[data-body]').innerHTML
        
        set('base', base) 
            
          }
        
        
        
        })
      }
      if (event.target.closest("[data-neg-add]")) {

        
         // start
        
        let oldValueString = event.target.innerText
       let oldValue = oldValueString

        let input = document.createElement('input')
        
        input.type = 'text'
        
        event.target.innerHTML = ''
        
        event.target.appendChild(input)
        
        input.focus()
        
        let num
        
        input.addEventListener('blur', ()=>{
          
          let newValue = input.value || oldValue
          
          num = newValue
          
          event.target.innerText = oldValue
          
          
          // end
          
          
          if (input.value) {
        
        
        document.querySelector('[data-neg-list]').insertAdjacentHTML('beforeend', `
        <div data-neg-point>
         <span data-name>${input.value}:</span>
         <span data-span>0</span>
        </div>
        `)
        
        const base = document.querySelector('[data-body]').innerHTML

        set('base', base) 
      
          }
          
        })
         
      }
      
      
      if (event.target.closest("[data-clear]")) {

        clear()
        event.target.style.backgroundColor = '#33181B'
         
      }
      
      if (event.target.closest("[data-start]")) {

        event.target.remove()
        
        let sum = 0;
document.querySelectorAll('[data-span]').forEach(div => {
  let num = parseFloat(div.textContent);
  if (!isNaN(num)) sum += num;
});

let posSum = 0;
document.querySelectorAll('[data-pos-span]').forEach(div => {
  let num = parseFloat(div.textContent);
  if (!isNaN(num)) posSum += num;
});

// let procentBig = (posSum / sum) * 100
let procentBig = sum > 0 ? (posSum / sum) * 100 : 0;
let procent = procentBig.toFixed(2)
procent = Number(procent)
procent = procent.toFixed(2)


// let obj = {x: Date.now(), o: oldValue, h: procent, l: oldValue, c: procent}


let today = new Date();
let day = today.getDate(); // день
let month = today.getMonth() + 1; // месяц (нумерация с 0)
let year = today.getFullYear(); // год

const date = `${day}${month}${year}`;


        
        // #
        
        
        barData.push({x: Date.now() - 86400000, o: procent, h: procent, l: procent, c: procent, date: ''})
        
        barData.push({x: Date.now(), o: procent, h: procent, l: procent, c: procent, date: date})
      
        set('barData', JSON.stringify(barData))
        chart.update()
        
        document.querySelector('[data-procent]').innerText = `${procent}`
       
       const base = document.querySelector('[data-body]').innerHTML
        set('base', base)
         
      }
      
      if (event.target.closest("[data-export]")) {
let baseClean = get('base')

       event.target.style.backgroundColor = '#112A21'

        const copy = barData;
navigator.clipboard.writeText(`${JSON.stringify(copy)}#${baseClean}`);
      
         
      }
      
      

      if (event.target.closest("[data-import]")) {
        
        event.target.style.backgroundColor = '#112A21'
        console.log('click')
        
        navigator.clipboard.readText().then(text => {
          console.log(text)
    let parts = text.split('#');
    let firstText = parts[0];
    firstText = JSON.parse(firstText)
    let secondText = parts[1];
    
    
    
    
    set('barData', JSON.stringify(firstText))
    set('base', secondText)
    
    // console.log("Первый текст:", firstText);
    // console.log("Второй текст:", secondText);
}).catch(err => {
    console.error("Ошибка при чтении с буфера обмена:", err);
});
        
      }
      
      if (event.target.closest("[data-span]")) {

       let oldValueString = event.target.innerText
       let oldValue = Number(oldValueString)

        let input = document.createElement('input')
        
        input.type = 'number'
        
        event.target.innerHTML = ''
        
        event.target.appendChild(input)
        
        input.focus()
        
        let num
        
        input.addEventListener('blur', ()=>{
          
          let newValue = input.value || oldValue
          
          num = newValue
          
          event.target.innerHTML = newValue
          
          // end
          
          if (!document.querySelector('[data-start]')) {
            
          
          
          
          
          if (num && num !== oldValue) {
        
        let sum = 0;
document.querySelectorAll('[data-span]').forEach(div => {
  let num = parseFloat(div.textContent);
  if (!isNaN(num)) sum += num;
});

let posSum = 0;
document.querySelectorAll('[data-pos-span]').forEach(div => {
  let num = parseFloat(div.textContent);
  if (!isNaN(num)) posSum += num;
});

// let procentBig = (posSum / sum) * 100
let procentBig = sum > 0 ? (posSum / sum) * 100 : 0;
let procent = procentBig.toFixed(2)
procent = Number(procent)
procent = procent.toFixed(2)

// let obj = {x: Date.now(), o: oldValue, h: procent, l: oldValue, c: procent}


let today = new Date();
let day = today.getDate(); // день
let month = today.getMonth() + 1; // месяц (нумерация с 0)
let year = today.getFullYear(); // год

const date = `${day}${month}${year}`;



let checkDate = barData.find(obj => obj.date === date)

if (checkDate) {
  
  checkDate.c = procent
  
  
  
   if (procent > checkDate.o) {
     
     document.querySelector('[data-procent]').style.color = '#20B16B'
     
     let profit = procent - checkDate.o
     profit = profit.toFixed(2)
     
     let docProfit = document.querySelector('[data-profit]')
     
     docProfit.innerText = `+${profit}%`
     docProfit.style.color = '#20B16B'
     docProfit.style.backgroundColor = '#122A21'
     
     if (procent < checkDate.h) {
       
     } else {
       checkDate.h = procent
     }
     
   } else {
     
    document.querySelector('[data-procent]').style.color = '#EF4449'
     
     
     let profit = procent - checkDate.o
     profit = profit.toFixed(2)
     
     let docProfit = document.querySelector('[data-profit]')
     
     docProfit.innerText = `${profit}%`
     docProfit.style.color = '#EF4449'
     docProfit.style.backgroundColor = '#33181C'
     
     
     if (procent > checkDate.l) {
       
     } else {
       
       
       checkDate.l = procent
     }
     
     
   }
   
  
  
  
} else {
  
  let oldProcent = barData[barData.length - 1];
  oldProcent = oldProcent.c;
  


  if (procent > oldProcent) {
    
    document.querySelector('[data-procent]').style.color = '#20B16B'
    
    let profit = procent - oldProcent
    profit = profit.toFixed(2)
    

    let docProfit = document.querySelector('[data-profit]')
    
     docProfit.innerText = `+${profit}%`
     docProfit.style.color = '#20B16B'
     docProfit.style.backgroundColor = '#122A21'
    
    barData.push({x: Date.now(), o: oldProcent, h: procent, l: oldProcent, c: procent, date: date})

  } else {
    
    document.querySelector('[data-procent]').style.color = '#EF4449'
    
    let profit = procent - oldProcent
    profit = profit.toFixed(2)
    
    
    let docProfit = document.querySelector('[data-profit]')
    
     docProfit.innerText = `${profit}%`
     docProfit.style.color = '#EF4449'
     docProfit.style.backgroundColor = '#34171D'
     
     
    
    barData.push({x: Date.now(), o: oldProcent, h: oldProcent, l: procent, c: procent, date: date})

  }
  
  

}

chart.update()

set('barData', JSON.stringify(barData))

// @@@
       procent = Number(procent)
       procent = procent.toFixed(2)
       document.querySelector('[data-procent]').innerText = `${procent}`
       
       const base = document.querySelector('[data-body]').innerHTML
        set('base', base) 
        
       
        }
      
          } else {
            
            
            const base = document.querySelector('[data-body]').innerHTML
        set('base', base) 
          }
          // ===
        })
          
          
        }
        
      
      if (event.target.closest("[data-name]")) {





        // let name = prompt('имя', '')
        
        // if (name) {
          
        // start
        
        let oldValueString = event.target.innerText
       let oldValue = oldValueString

        let input = document.createElement('input')
        
        input.type = 'text'
        
        event.target.innerHTML = ''
        
        event.target.appendChild(input)
        
        input.focus()
        
        let num
        
        input.addEventListener('blur', ()=>{
          
          let newValue = input.value || oldValue
          
          num = newValue
          
          event.target.innerText = newValue
          
          
          // end
          
        
        
        
        // event.target.innerText = name
       
       const base = document.querySelector('[data-body]').innerHTML
        set('base', base) 
       
        
        })
      }
      
   })



