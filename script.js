let input = document.querySelector('input');
let buttons = document.querySelectorAll('.btn');
let expression = "";
let result = null;

Array.from(buttons).forEach((btn)=>{
  btn.addEventListener('click', (e)=>{
    if(e.target.innerHTML == '='){
      result = compute(expression);
      input.value = result;
      expression = result.toString();
    }
    else if(e.target.innerHTML == 'c'){
      expression = "";
      result = null;
      input.value = expression;
    }
    else if(e.target.innerHTML.includes("backspace")){
      if (result !== null) {
        result = null;
      }
      expression = expression.slice(0, expression.length - 1);
      input.value = expression;
    }
    else{ 
      expression += e.target.innerHTML;
      input.value = expression;
    }
  })
});

function compute(expression) {
  let i = 0;
  let j = 0;
  while (i < expression.length && j < expression.length) {
    i = expression.indexOf("√", j);
    if (i < 0) {
      break;
    }
    j = i + 1;
    let rootIndex = i;
    let operatorIndex = expression.slice(j).search(/[\+\-\*\/]/);
    if (operatorIndex < 0) {
      operatorIndex = expression.length - j;
    }
    let operand = parseFloat(expression.slice(j, j + operatorIndex));
    let result = Math.sqrt(operand);
    expression = expression.slice(0, rootIndex) + result.toString() + expression.slice(j + operatorIndex, expression.length);
    j = rootIndex + result.toString().length;
  }
  let ans = eval(expression);
  return ans;
}

