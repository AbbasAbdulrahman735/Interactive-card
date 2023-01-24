let input_name = document.querySelector("#name");
let input_num = document. querySelector("#card-number")
let input_mm = document.querySelector("#mm")
let input_yy = document.querySelector("#yy")
let input_cvc = document.querySelector("#cvc")
let submit = document.querySelector(".con button")
let back = document.querySelector(".done button")

let name = document.querySelector("#card-name")
let num = document.querySelector("#card-num")
let mm= document.querySelector("#card-mm")
let yy = document.querySelector("#card-yy")
let cvc = document.querySelector("#card-cvc")
let inputs = document.querySelectorAll("input")
// length = 21

let name_error = document.querySelector(".name-error")
let num_error = document.querySelector(".num-error")
let exp_error = document.querySelector(".exp-error")
let cvc_error = document.querySelector(".cvc-error")

input_name.oninput = function(){
    if(input_name.value.length > 21) input_name.value = input_name.value.substring(0, 21);
    name.innerText = input_name.value;
}

input_num.oninput = function(){
    if(input_num.value.length == 16) input_mm.focus()
    if(isNaN(input_num.value[input_num.value.length - 1]) || input_num.value[input_num.value.length - 1] == " ") input_num.value = input_num.value.substring(0, input_num.value.length - 1)
    let card = "";
    let count = 0;
    if(input_num.value.length > 16) input_num.value = input_num.value.substring(0, 16);
    for(let i = 0; i < 17; i++){
        if(i > input_num.value.length) card += "0";
        if(count == 4){
            card += " ";
            count = 0;
        }
        count += 1;
        if(i < input_num.value.length) card += input_num.value[i]
    }
    num.innerText = card;
}

input_mm.oninput = function(){
    if(isNaN(input_mm.value[input_mm.value.length - 1]) || input_mm.value[input_mm.value.length - 1] == " ") input_mm.value = input_mm.value.substring(0, input_mm.value.length - 1)
    if(input_mm.value.length > 2 && input_mm.value[0] != "0"){
        input_mm.value = input_mm.value.substring(0, 2);
    }
    if(input_mm.value.length == 2) input_yy.focus()
    if(input_mm.value.length == 1) mm.innerText = "0" + input_mm.value;
    else if(input_mm.value == "") mm.innerText = "00";
    else mm.innerText = input_mm.value;
}
input_yy.oninput = function(){
    if(isNaN(input_yy.value[input_yy.value.length - 1]) || input_yy.value[input_yy.value.length - 1] == " ") input_yy.value = input_yy.value.substring(0, input_yy.value.length - 1)
    if(input_yy.value.length > 2 && input_yy.value[0] != "0"){
        input_yy.value = input_yy.value.substring(0, 2);
    }
    if(input_yy.value.length == 2) input_cvc.focus()
    if(input_yy.value.length == 1) yy.innerText = "0" + input_yy.value;
    else if(input_yy.value == "") yy.innerText = "00";
    else yy.innerText = input_yy.value;
}
input_cvc.oninput = function(){
    if(isNaN(input_cvc.value[input_cvc.value.length - 1]) || input_cvc.value[input_cvc.value.length - 1] == " ") input_cvc.value = input_cvc.value.substring(0, input_cvc.value.length - 1)
    if(input_cvc.value.length > 3 && input_cvc.value[0] != "0"){
        input_cvc.value = input_cvc.value.substring(0, 3);
    }
    cvc.innerText = input_cvc.value + "0".repeat(3 - input_cvc.value.length)
}

back.onclick = function(){
    document.querySelector(".con").style = "display:flex";
    document.querySelector(".done").style = "display:none";
}

submit.onclick = function(){
    let iserror = false;
    inputs.forEach(function(e){
        e.classList.remove("inputerror");
        let c = e.parentElement.className.split(" ");
        if(c == ""){
            c = e.parentElement.parentElement.className.split(" ")[0];
            document.querySelector("." + c + " p").innerText = "";
        }else{
            document.querySelector("." + c[0] + " p").innerText = "";
        }
        if(e.value == ""){
            iserror = true;
            let c = e.parentElement.className.split(" ");
            if(c != "") showerror("." + c[0], "Can't be blank")
            else{
                let c = e.parentElement.parentElement.className.split(" ")[0];
                showerror("." + c, "Can't be blank", e.id == "mm" ? 1 : 2)
            }
        }
    })
    if(input_num.value.length < 16 && input_num.value != "") {
        showerror(".card-number", "The card must be 16 digits");
        iserror = true;
    }
    if(input_cvc.value.length < 3 && input_cvc.value != ""){
        showerror(".cvc", "cvc must be 3 digits");
        iserror = true;
    }
    if(Number(input_mm.value) > 12){
        input_mm.classList.add("inputerror")
        document.querySelector(".exp-date p").innerText = "invalid input"
        iserror = true;
    }
    if(!iserror){
        inputs.forEach(function(e){
            e.value = "";
        })
        document.querySelector(".con").style = "display:none";
        document.querySelector(".done").style = "display:flex";
    }
}

function showerror(e, msg, inputnum = 1){
    let p = document.querySelector(e + " p");
    p.innerText = msg;
    if(inputnum == 1) document.querySelector(e + " input:first-of-type").classList.add("inputerror");
    else if(inputnum == 2) document.querySelector(e + " input:last-of-type").classList.add("inputerror");
}
