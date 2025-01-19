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



function rang(num) {
  if (num <= 0) return 0; // Обработка случаев, когда num <= 0
  const step = 4.3;
  const src = Math.ceil(num / step) - 1; // Вычисляем нужный индекс
  return Math.min(src, 22); // Ограничиваем максимум до 22 (для num > 94.6)
}


var initialDateStr = new Date().toUTCString();

var ctx = document.getElementById('chart').getContext('2d');
ctx.canvas.width = 1000;
ctx.canvas.height = 700;



if (get('barData') && JSON.parse(get('barData')).length !== 0) {
  
  
  document.querySelector('[data-start]').remove()  
  
  
  var barData = JSON.parse(get('barData'))
  
  
  
  
  
  let endObj = barData[barData.length - 1];
  
  let oldProcent = endObj.c;
  
  
  
  
  // push + upd + save
  
  let today = new Date();
let day = today.getDate(); // день
let month = today.getMonth() + 1; // месяц (нумерация с 0)
let year = today.getFullYear(); // год

const date = `${day}${month}${year}`;



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

  // linear vs lo.g
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
  document.querySelector('[data-stat]').innerHTML = get('stat')
  
  
} else {
  
  document.querySelector('[data-body]').innerHTML = `
  
  
  <div class="block">
  
  <div class="pos-block">
     <div class='text-second'>положительные</div>
     <div>⠀</div>
     <div data-pos-list>
 
     </div>
  </div>
  
  
     
  <div class="neg-block">
      <div class='text-second'>отрицательные</div>
     <div>⠀</div>
     <div data-neg-list>
 
     </div>
</div>



</div>

  `
  
  document.querySelector('[data-stat]').innerHTML = `
  
  
  
  <div class="stat-top">
     <div class="icon"><img data-rang src="icon/0.jpg"></div>
     <span> </span>
     <span class='name'>QL/PRC</span>
     <span> </span>
     <span data-profit>0.00%</span>
  </div>
 
  <div><span data-procent>0.00</span><span> </span></div>
  
   <div>⠀</div>
  
  `
  
  
  
}


   document.addEventListener("click", (event) => {
     
     

      if (event.target.closest("[data-pos-add]")) {
        
        document.querySelector('[data-pos-add]').style.display = 'none'
        document.querySelector('[data-neg-add]').style.display = 'none'
        
        // start

        let input = document.createElement('input')
        
        let inputSecond = document.createElement('input')
        
        input.type = 'text'
        input.style = 'position: fixed; bottom: 10px; left: 10px; width: 100px; color: #FCFCFC;'
        input.setAttribute("tabindex", "-1")
        
        
        inputSecond.type = 'number'
        inputSecond.style = 'position: fixed; bottom: 10px; left: 135px; width: 40px; color: #20B16B;'
        inputSecond.setAttribute("tabindex", "-1")
        
        
        
        document.body.appendChild(input)
        document.body.appendChild(inputSecond)
        
        
        
        input.focus()
        
        let num
        
        
          
        function mainText() {
           
           
          
          // end
          
          if (input.value && inputSecond.value || inputSecond.value === 0) {
            
            let decorProc = inputSecond.value
            
            if (inputSecond.value >= 10) {
              decorProc = 10
            } 
            
            
            
            document.querySelector('[data-pos-list]').insertAdjacentHTML('beforeend', `
        <div data-point data-pos-point>
        
        <div data-decor data-pos-decor style="width: ${decorProc * 10}%">
        </div>
        
        <div class="flex">
        
         <div data-name>${input.value}</div>
         <div data-pos-span data-span>${inputSecond.value}</div>
         
         </div>
         
        </div>
        `)

        /*
        const base = document.querySelector('[data-body]').innerHTML
        
        set('base', base) 
        
        const stat = document.querySelector('[data-stat]').innerHTML
        set('stat', stat) 
        */
            
          }
        
        
        
        
        }
        
        function mainNum() {
            
          
          let newValue = inputSecond.value
          
          num = newValue
          
          
          
          
          
          // end
          
          if (num || num === 0 && input.value) {
          
          if (!document.querySelector('[data-start]')) {
          
            
        
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


let procentBig = sum > 0 ? (posSum / sum) * 100 : 0;
let procent = Number(procentBig.toFixed(2))

console.log(`======== [data-pos-add]
posSum: ${posSum}
sum: ${sum}
procent: ${procent} = (${posSum} / ${sum}) * 100
`)


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
       
       procent = procent.toFixed(2)
       document.querySelector('[data-procent]').innerText = `${procent}`
       document.querySelector('[data-rang]').setAttribute('src', `icon/${rang(Number(procent))}.jpg`)
       
       const base = document.querySelector('[data-body]').innerHTML
        set('base', base) 
        
        const stat = document.querySelector('[data-stat]').innerHTML
        set('stat', stat) 
       
        
      // ==
          } else {
            
            
            
              
            
          }
          // ===
          
          
            
              
          let points = document.querySelectorAll('[data-pos-point]')
              
          if (points.length > 1) {
                
                let sortPoints = Array.from(points).sort((a, b) => {
                  return Number(b.querySelector('[data-span]').innerText) - Number(a.querySelector('[data-span]').innerText)
                })
                
                let posList = document.querySelector('[data-pos-list]')
                posList.innerHTML = ''
                
                sortPoints.forEach(e =>{
                  
                  posList.insertAdjacentHTML('beforeend', `${e.outerHTML}`)
                })
                
                
              }
              
              
            // end 
            

            
            const base = document.querySelector('[data-body]').innerHTML
        set('base', base) 
        
        const stat = document.querySelector('[data-stat]').innerHTML
        set('stat', stat) 
          
          }
          
        }
          
        
        let blurStatus = true
        let blurStatusSecond = true
        
        
        input.addEventListener('keydown', (event)=>{
          
          
          if (event.key === 'Enter') {
            event.preventDefault()
            
            blurStatus = false
            
            inputSecond.focus()
            
          }
          
        })
        
        
        inputSecond.addEventListener('keydown', (event)=>{
          
          if (event.key === 'Enter') {
            event.preventDefault()
            
            blurStatusSecond = false
            
            mainText()
            mainNum()
            input.remove()
            inputSecond.remove()
            
            document.querySelector('[data-pos-add]').style.display = 'flex'
        document.querySelector('[data-neg-add]').style.display = 'flex'
        
          }
          
        })
        
        
        input.addEventListener('blur', (event)=>{
          
          if (blurStatus) {
          
            input.remove()
            inputSecond.remove()
            
            document.querySelector('[data-pos-add]').style.display = 'flex'
        document.querySelector('[data-neg-add]').style.display =  'flex'
          
          }
          
        })
        
        
        
        inputSecond.addEventListener('blur', (event)=>{
          
          if (blurStatusSecond) {
           
            input.remove()
            inputSecond.remove()
            
            document.querySelector('[data-pos-add]').style.display = 'flex'
        document.querySelector('[data-neg-add]').style.display = 'flex'
          }
          
          
        })
        
        
      }
      
      if (event.target.closest("[data-neg-add]")) {
        
        document.querySelector('[data-pos-add]').style.display = 'none'
        document.querySelector('[data-neg-add]').style.display = 'none'
        
        
        // start

        let input = document.createElement('input')
        let inputSecond = document.createElement('input')
        
        input.type = 'text'
        input.style = 'position: fixed; bottom: 10px; left: 10px; width: 100px; color: #FCFCFC;'
        input.setAttribute("tabindex", "-1")
        
        
        inputSecond.type = 'number'
        inputSecond.style = 'position: fixed; bottom: 10px; left: 135px; width: 40px; color: #EF4449;'
        inputSecond.setAttribute("tabindex", "-1")
        
        
        
        document.body.appendChild(input)
        document.body.appendChild(inputSecond)
        
        input.focus()
        
        let num
        
        

        
          
        function mainText() {
           
          
          // end
          
          if (input.value && inputSecond.value || inputSecond.value === 0) {
            
            let decorProc = inputSecond.value
            
            if (inputSecond.value >= 10) {
              decorProc = 10
            } 
            
            document.querySelector('[data-neg-list]').insertAdjacentHTML('beforeend', `
        <div data-point data-neg-point>
        
         <div data-decor data-neg-decor style="width: ${decorProc * 10}%">
         </div>
        
        <div class="flex">
        
        
         <span data-name>${input.value}</span>
          <div data-neg-span data-span>${inputSecond.value}</div>
        
         
         </div>
         
        </div>
        `)
/*
        const base = document.querySelector('[data-body]').innerHTML
        
        set('base', base) 
        
        const stat = document.querySelector('[data-stat]').innerHTML
        set('stat', stat) 
        */
            
          }
        
        
        
        
        }
        
        function mainNum() {
            
          
          let newValue = inputSecond.value
          
          num = newValue
          
          
          
          
          
          // end
          
          if (num || num === 0 && input.value) {
          
          if (!document.querySelector('[data-start]')) {
          
            
        
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


let procentBig = sum > 0 ? (posSum / sum) * 100 : 0;
let procent = Number(procentBig.toFixed(2))

console.log(`======== [data-neg-add]
posSum: ${posSum}
sum: ${sum}
procent: ${procent} = (${posSum} / ${sum}) * 100
`)

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
       
       procent = procent.toFixed(2)
       document.querySelector('[data-procent]').innerText = `${procent}`
       document.querySelector('[data-rang]').setAttribute('src', `icon/${rang(Number(procent))}.jpg`)
       
       const base = document.querySelector('[data-body]').innerHTML
        set('base', base) 
        
        const stat = document.querySelector('[data-stat]').innerHTML
        set('stat', stat) 
       
        
      // ==
          } else {
            
            
            
              
            
          }
          // ===
          
          
            
              
              let points = document.querySelectorAll('[data-neg-point]')
              
                if (points.length > 1) {
                
                let sortPoints = Array.from(points).sort((a, b) => {
                  return Number(b.querySelector('[data-span]').innerText) - Number(a.querySelector('[data-span]').innerText)
                })
                
                let posList = document.querySelector('[data-neg-list]')
                posList.innerHTML = ''
                
                sortPoints.forEach(e =>{
                  
                  posList.insertAdjacentHTML('beforeend', `${e.outerHTML}`)
                })
                
                
              }
              
              
            // end 
            
            
            
            const base = document.querySelector('[data-body]').innerHTML
        set('base', base) 
        
        const stat = document.querySelector('[data-stat]').innerHTML
        set('stat', stat) 
          
          }
          
          }
          
        
        
        
        
        let blurStatus = true
        let blurStatusSecond = true
        
        
        input.addEventListener('keydown', (event)=>{
          
          
          if (event.key === 'Enter') {
            event.preventDefault()
            
            blurStatus = false
            
            inputSecond.focus()
            
          }
          
        })
        
        
        inputSecond.addEventListener('keydown', (event)=>{
          
          if (event.key === 'Enter') {
            event.preventDefault()
            
            blurStatusSecond = false
            
            mainText()
            mainNum()
            input.remove()
            inputSecond.remove()
            
            document.querySelector('[data-pos-add]').style.display = 'flex'
        document.querySelector('[data-neg-add]').style.display = 'flex'
        
          }
          
        })
        
        
        input.addEventListener('blur', (event)=>{
          
          if (blurStatus) {
          
            input.remove()
            inputSecond.remove()
            
            document.querySelector('[data-pos-add]').style.display = 'flex'
        document.querySelector('[data-neg-add]').style.display =  'flex'
          
          }
          
        })
        
        
        
        inputSecond.addEventListener('blur', (event)=>{
          
          if (blurStatusSecond) {
           
            input.remove()
            inputSecond.remove()
            
            document.querySelector('[data-pos-add]').style.display = 'flex'
        document.querySelector('[data-neg-add]').style.display = 'flex'
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


let procentBig = sum > 0 ? (posSum / sum) * 100 : 0;
let procent = Number(procentBig.toFixed(2))

console.log(`======== [data-start]
posSum: ${posSum}
sum: ${sum}
procent: ${procent} = (${posSum} / ${sum}) * 100
`)




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
        
        document.querySelector('[data-procent]').innerText = `${procent.toFixed(2)}`
        document.querySelector('[data-rang]').setAttribute('src', `icon/${rang(Number(procent))}.jpg`)
        
        
       
       const base = document.querySelector('[data-body]').innerHTML
        set('base', base)
        
        const stat = document.querySelector('[data-stat]').innerHTML
        set('stat', stat) 
         
      }
      
      if (event.target.closest("[data-export]")) {
let baseClean = get('base')
let statClean = get('stat')

       event.target.style.backgroundColor = '#112A21'

        const copy = barData;
navigator.clipboard.writeText(`${JSON.stringify(copy)}#${baseClean}#${statClean}`);
      
         
      }
      
      if (event.target.closest("[data-export-log]")) {
let barDataClean = JSON.parse(get('barData'))

       event.target.style.backgroundColor = '#112A21'

        
navigator.clipboard.writeText(`${JSON.stringify(barData)}`);
      
         
      }
      

      if (event.target.closest("[data-import]")) {
        
        event.target.style.backgroundColor = '#112A21'
        
        
        navigator.clipboard.readText().then(text => {
          
    let parts = text.split('#');
    let firstText = parts[0];
    firstText = JSON.parse(firstText)
    let secondText = parts[1];
    let thirdText = parts[2]
    
    
    
    set('barData', JSON.stringify(firstText))
    set('base', secondText)
    set('stat', thirdText)
    
    
  
}).catch(err => {
    console.error("Ошибка при чтении с буфера обмена:", err);
});
        
      }
      
      if (event.target.closest("[data-span]")) {
        
        document.querySelector('[data-pos-add]').style.display = 'none'
        document.querySelector('[data-neg-add]').style.display = 'none'

       let oldValueString = event.target.innerText
       let oldValue = Number(oldValueString)

        let input = document.createElement('input')
        
        input.type = 'number'
        
        
        input.style = 'position: fixed; bottom: 10px; left: 10px; width: 40px;'
        input.setAttribute("tabindex", "-1")
        
        if (event.target.closest('[data-pos-list]')) {
          input.style.color =
          '#20B16B'
        } else {
          input.style.color =
  '#EF4449'
        }
        
        document.body.appendChild(input)
        
        input.focus()
        
        let num 
        
        let blurStatus = true
          
        function mainNum() {
            
          
          let newValue = input.value || input.value === 0 || oldValue
          
          num = newValue
          
          event.target.innerHTML = newValue
          
          
          // end
          
          if (num || num === 0 && num !== oldValue) {
            
            let decorProc = num
            
            if (decorProc >= 10) {
              decorProc = 10
            } 
            
            
            event.target.closest('[data-point]').querySelector('[data-decor]').style.width = `${decorProc * 10}%`
            
            
          
          if (!document.querySelector('[data-start]')) {
            
          
          
          
          
            
        
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




let procentBig = sum > 0 ? (posSum / sum) * 100 : 0;
let procent = Number(procentBig.toFixed(2))

console.log(`======== [data-span]
posSum: ${posSum}
sum: ${sum}
procent: ${procent} = (${posSum} / ${sum}) * 100
`)

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
       
       procent = procent.toFixed(2)
       document.querySelector('[data-procent]').innerText = `${procent}`
       document.querySelector('[data-rang]').setAttribute('src', `icon/${rang(Number(procent))}.jpg`)
    
       const base = document.querySelector('[data-body]').innerHTML
        set('base', base) 
        
        const stat = document.querySelector('[data-stat]').innerHTML
        set('stat', stat) 
       
        
      // ==
          } else {
            
            
            
              
            
          }
          // ===
          
          
            
            
          
          
          if (event.target.hasAttribute('data-pos-span')) {
              
              let points = document.querySelectorAll('[data-pos-point]')
              
                if (points.length > 1) {
                
                let sortPoints = Array.from(points).sort((a, b) => {
                  return Number(b.querySelector('[data-span]').innerText) - Number(a.querySelector('[data-span]').innerText)
                })
                
                let posList = document.querySelector('[data-pos-list]')
                posList.innerHTML = ''
                
                sortPoints.forEach(e =>{
                  
                  posList.insertAdjacentHTML('beforeend', `${e.outerHTML}`)
                })
                
                
              }
              
              } 
            
            
          if (event.target.hasAttribute('data-neg-span')) {
             
              
              let points = document.querySelectorAll('[data-neg-point]')
              
                if (points.length > 1) {
                
                let sortPoints = Array.from(points).sort((a, b) => {
                  return Number(b.querySelector('[data-span]').innerText) - Number(a.querySelector('[data-span]').innerText)
                })
                
                let posList = document.querySelector('[data-neg-list]')
                posList.innerHTML = ''
                
                sortPoints.forEach(e =>{
                  
                  posList.insertAdjacentHTML('beforeend', `${e.outerHTML}`)
                })
                
                
              }
              
              } 
            
           
            
            
            const base = document.querySelector('[data-body]').innerHTML
        set('base', base) 
        
        const stat = document.querySelector('[data-stat]').innerHTML
        set('stat', stat) 
          
          }
          
          }
          
          
        input.addEventListener('keydown', (event)=>{
          
          if (event.key === 'Enter') {
            event.preventDefault()
            
            blurStatus = false
            
            mainNum()
            input.remove()
            
            document.querySelector('[data-pos-add]').style.display = 'flex'
        document.querySelector('[data-neg-add]').style.display =  'flex'
          }
          
          
        })
        input.addEventListener('blur', ()=>{
          
          if (blurStatus) {
            input.remove()
            
            document.querySelector('[data-pos-add]').style.display = 'flex'
        document.querySelector('[data-neg-add]').style.display =  'flex'
          }
          
        })
          
          
        }
        
      
      if (event.target.closest("[data-name]")) {

          document.querySelector('[data-pos-add]').style.display = 'none'
        document.querySelector('[data-neg-add]').style.display = 'none'
        
          
        // start
        
        let oldValueString = event.target.innerText
       let oldValue = oldValueString

        let input = document.createElement('input')
        
        input.type = 'text'
        
        
        input.style = 'position: fixed; bottom: 10px; left: 10px; width: 80px;'
        input.setAttribute("tabindex", "-1")
        
        document.body.appendChild(input)
        
        input.focus()
        
        let num
        
        let blurStatus = true
        
        
          
        function name() {
            
          
          
          let newValue = input.value || oldValue
          
          num = newValue
          
          input.style = ''
          
          event.target.innerText = newValue
          
          
       
       const base = document.querySelector('[data-body]').innerHTML
        set('base', base) 
       
       const stat = document.querySelector('[data-stat]').innerHTML
        set('stat', stat) 
        
          }
        
        input.addEventListener('keydown', (event)=>{
          
          
          
          if (event.key === 'Enter') {
            event.preventDefault()
           
           
            
            blurStatus = false
            
            name()
            input.remove()
            
            document.querySelector('[data-pos-add]').style.display = 'flex'
        document.querySelector('[data-neg-add]').style.display =  'flex'
            
          }
          
        })
        input.addEventListener('blur', ()=>{
          
          
          
          if (blurStatus) {
            
            
            
            input.remove()
            
            document.querySelector('[data-pos-add]').style.display = 'flex'
        document.querySelector('[data-neg-add]').style.display =  'flex'
            
          }
          
        })
        
      }
      
   })



