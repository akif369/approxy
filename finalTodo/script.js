
//selecting needed component

const addButton = document.getElementById("add-button");

const input = document.getElementById("input");

const listArea = document.getElementById("list-area");

let delButton = document.querySelectorAll(".del-button")

let tickButton = document.querySelectorAll(".tick-button")

const count = document.querySelector("#pending-number")

const clearButton = document.querySelector("#clear-button")

const reloadButton = document.querySelector("#reload-button")
// data collection

let currentItem ="";

let counter = 0;

let elementId = 0;

let reload = []

//bud fixing..


//all function declartion

function changeCounter(value){
    
    
    counter = delButton.length;
    tickButton.forEach(e=>{
        if(e.parentElement.parentElement.classList.contains("underline"))
            counter--;
    })
    count.innerText = counter
}


function addItem(){
    
    if(input.value != ""){
        currentItem = input.value;
        input.value ="";
        return true
    }
    return false
}


function appendToList(){

    if(addItem()){
    const html = `<div class="list" id="${elementId}">
    <p>${currentItem}</p>
    <div>
    <input class="del-button" type="image" src="img/trash.svg">
    </div>
  <div>
    <input class="tick-button" type="image" src="img/check.svg">
  </div>

  </div>`
    listArea.insertAdjacentHTML("afterbegin",html)
    tickButton = document.querySelectorAll(".tick-button");
    tickButton[0].addEventListener("click",underlined);
    delButton = document.querySelectorAll(".del-button")
    delButton[0].addEventListener("click",removeFromList);
    reload.push({title:currentItem,underline:false,value:elementId})
    localStorage.setItem("todo",JSON.stringify(reload))
    changeCounter()
    elementId++;
    
    }
}

function appendFromLocal(){
    if(localStorage.getItem("todo")){
        let html = "";
        reload = JSON.parse(localStorage.getItem("todo"))
        reload.forEach((e,i)=>{
            reload[i].value = elementId;
            if(!(e.underline)){
        html = `<div class="list" id="${elementId}">
        <p>${e.title}</p>
        <div>
        <input class="del-button" type="image" src="img/trash.svg">
        </div>
    <div>
        <input class="tick-button" type="image" src="img/check.svg">
    </div>

    </div>`}
        else{
             html = `<div class="underline list" id="${elementId}">
        <p>${e.title}</p>
        <div>
        <input class="del-button" type="image" src="img/trash.svg">
        </div>
    <div>
        <input class="tick-button" type="image" src="img/check.svg">
    </div>

    </div>`
        }
        listArea.insertAdjacentHTML("afterbegin",html)
        tickButton = document.querySelectorAll(".tick-button");
        tickButton[0].addEventListener("click",underlined);
        delButton = document.querySelectorAll(".del-button")
        delButton[0].addEventListener("click",removeFromList);
        changeCounter()
        elementId++;
        
    }
        )
        localStorage.setItem("todo",JSON.stringify(reload));}


}


function removeFromList(){

    const id = this.parentElement.parentElement.getAttribute("id");

    listArea.removeChild(document.getElementById(id));
    
    tickButton = document.querySelectorAll(".tick-button");
    delButton = document.querySelectorAll(".del-button")
    reload.forEach((e,i)=>{
        if(e.value == id){
            reload.splice(i,1);
            console.log(i)
            return;
        }
    })
    localStorage.setItem("todo",JSON.stringify(reload));
    changeCounter()
}

function underlined(){

    const id = this.parentElement.parentElement.getAttribute("id");
    if(document.getElementById(id).classList.toggle("underline")){
        changeCounter()
        this.setAttribute("src","img/checks.svg")
        reload.forEach((e,i)=>{
            if(e.value == id){
                reload[i].underline = true;
                return;
            }
        })
        localStorage.setItem("todo",JSON.stringify(reload));
        
    }
    else{
        changeCounter()
        this.setAttribute("src","img/check.svg")
        reload.forEach((e,i)=>{
            if(e.value == id){
                reload[i].underline = false;
                return;
            }
        })
        localStorage.setItem("todo",JSON.stringify(reload));
        
    }
    
}




//all event listener

addButton.addEventListener("click",appendToList)

input.addEventListener("keydown",(e)=>{
    if(e.keyCode == 13){
        appendToList();
    }
})


clearButton.addEventListener("click",()=>{
    listArea.innerHTML = '';
    reload =[]
    localStorage.setItem("todo",JSON.stringify(reload));
    counter = 0;
    count.innerText = counter
})

appendFromLocal();