
const textInput = document.getElementById('Op-Form');

const btnNumber = document.querySelectorAll('.btn-number');
const btnOperation = document.querySelectorAll('.btn-operation');
const btnClear = document.querySelectorAll('.btn-clear');
const btnDelete = document.querySelectorAll('.btn-delete');
const btnEqual = document.querySelectorAll('.btn-equal');

let status = false;
let op = '';
let num1 = '';
let num2 = '';
let result;

btnNumber.forEach(btn => {
    btn.addEventListener('click',  (e) => {
            textInput['Text-input'].value += e.target.dataset.number;
        if (!status) {
            num1 += e.target.dataset.number;
        } else {
            num2 += e.target.dataset.number;
        }
    })
})

function resultOP (op, num1,num2)  {
    switch (op){
        case '+':
            result = num1+num2;
            return result;
        case '-':
            result = num1-num2;
            return result;
        case '*':
            result = num1*num2;
            return result;
        case '/' :
            result = num1 / num2;
            return result;
    }
}

btnOperation.forEach(btn => {
    btn.addEventListener('click', (e) => {
        op = e.target.dataset.operation;
        if(op != ','){    
        status = true
        }else{
        status = false;
        }
        textInput['Text-input'].value += e.target.dataset.operation;
    })
})

btnClear.forEach(btn => {
    btn.addEventListener('click', (e) => {
        textInput['Text-input'].value = '';
        textInput['Text-operation'].value = '';
    })
}
)
btnDelete.forEach(btn => {
    btn.addEventListener('click', (e) => {
        let string = textInput['Text-input'].value;
        textInput['Text-input'].value = string.substring(0, string.length - 1);
    })
})

btnEqual.forEach(btn => {
    btn.addEventListener('click', (e) => {
        result = resultOP(op,parseFloat(num1),parseFloat(num2));
        textInput['Text-operation'].value = result;
        num1 = result;
        num2 = '';
    })
})

