var enterButton = document.getElementById("enter");
var input = document.getElementById("userinput");
var ul = document.getElementById("ul");
var item = document.getElementsByTagName("li");

// aqui eu crio uma variável vazia para guardar todas as tarefas
let array_de_tarefas = [];

function inputLenght() {
  return input.value.length;
}

function createListElement() {
  var li = document.createElement("li");

  li.appendChild(document.createTextNode(input.value));
  // sempre que for criado uma tarefa eu adiciono ela no array e guardo no localStorage
  array_de_tarefas.push(input.value);
  // aqui eu salvo no localStorage o array
  localStorage.setItem("todas_as_tarefas", JSON.stringify(array_de_tarefas));

  ul.appendChild(li);
  input.value = "";

  function crossOut() {
    li.classList.toggle("done");
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

// aqui é o que irá acontecer quando a página for atualizada.
onload = function () {
  let valor_no_localStorage = localStorage.getItem("todas_as_tarefas");

  // se tiver algum valor no localStorage nos colocamos no lugar do nosso array inicial
  if (valor_no_localStorage) {
    array_de_tarefas = JSON.parse(valor_no_localStorage);

    // com  o valor do array nós populamos a tela novamente:
    // cada item será adicionado em tela novamente, baseado nesse array
    for (let i = 0; i < array_de_tarefas.length; i++) {
      var li = document.createElement("li");

      li.appendChild(document.createTextNode(array_de_tarefas[i]));
      ul.appendChild(li);
      input.value = "";

      function crossOut() {
        li.classList.toggle("done");
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
  }
};

enterButton.addEventListener("click", addListAfterClick);
input.addEventListener("keypress", addListAfterKeypress);

function addListAfterClick(e){
    e.preventDefault();
    if (inputLenght() > 0){
        createListElement();
    }
}

function addListAfterKeypress(){
    if(inputLenght() > 0 && event.which === 13){
        createListElement();
    }
}