var enterButton = document.getElementById("enter");
var input = document.getElementById("userinput");
var ul = document.getElementById("ul");
var item = document.getElementsByTagName("li");

function inputLenght() {
    return input.value.length;
}

function createListElement() {
    var li = document.createElement("li");

    li.appendChild(document.createTextNode(input.value));
    ul.appendChild(li);
    input.value = "";

    function crossOut() {
        li.classList.toggle("done")
    }

    li.addEventListener("click", crossOut);

    var dBtn = document.createElement("button");
    dBtn.appendChild(document.createTextNode("X"));
    li.appendChild(dBtn);
    dBtn.addEventListener("click", deleteListItem);

    function deleteListItem() {
        li.classList.add("delete");
    }
}

enterButton.addEventListener("click", addListAfterClick);
input.addEventListener("keypress", addListAfterKeypress);

function addListAfterClick(){
    if (inputLenght() > 0){
        createListElement();
    }
}

function addListAfterKeypress(){
    if(inputLenght() > 0 && event.which === 13){
        createListElement();
    }
}

