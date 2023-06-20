var myLeads = []    //assigning empty array to metion the data type
let i = 0

const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const tabBtn = document.getElementById("tab-btn")

const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads")) //getting value from LocalStorage by converting string to array again to get item from LocalStorage as it was

if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    renderLeads()
}

//activates only when delete btn is clickied twice-dblclick
deleteBtn.addEventListener("dblclick", function(){
    localStorage.clear()
    myLeads = []
    ulEl.textContent = ""
})

tabBtn.addEventListener("click", function(){
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].URL)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        inputEl.value = tabs[0].url
        //alert(tabs[0].url)
        //renderLeads()
    })
})

inputBtn.addEventListener("click", function(){
    if(inputEl.value != ""){
        myLeads.push(inputEl.value)
        inputEl.value= ""
        
        localStorage.setItem("myLeads", JSON.stringify(myLeads))    //saving links in local storage by converting myLeads array to string as setItems method in LocalStorage accepts only strings
        renderLeads()
    }
})

function renderLeads(){
    while(i < myLeads.length){
        //ulEl.innerHTML += "<li>" + myLeads[i] + "</li>" //+= keeps the existing data and adds the new string also

        let li = document.createElement("li") // advance method for innerHTML
        let a = document.createElement("a")

        //li.innerText = myLeads[i] //we need to turn that text into link hence removed the li tag and added it to anchor tag

        //setting href,text,target attributes to anchor tag
        //debugger
        a.href = myLeads[i]
        a.innerText = myLeads[i]    //making the text a clickable link
        a.target = "_blank" //opening tag in new tab

        li.appendChild(a)
        ulEl.appendChild(li)
        i++
    }
}