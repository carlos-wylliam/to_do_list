//Criando o "banco de dados" onde vai armazenar as tarefas criadas
let banco =[
   
];

//Salvando os dados no LocalStorage
const getBanco = () => JSON.parse(localStorage.getItem('todo_List')) ?? [];

//Função para enviar para o banco
const setBanco = (banco) => localStorage.setItem('todo_List', JSON.stringify(banco));

//Função onde vai criar os itens da lista de tarefa itens = a label com a checkbox a div com o texto e botão de remover
const criarItem = (tarefa, status, indice) => {
    const item = document.createElement('label');
    item.classList.add('todo__item');
    item.innerHTML = `<input type="checkbox" ${status} data-indice=${indice}>
                      <div>${tarefa}</div>
                      <input type="button" value="X" data-indice=${indice}>
      `
      document.getElementById('todo_List').appendChild(item);
      
}

//criando uma função onda vai ler cada objeto do array e criar um item para cada objeto.
const atualizarTela = () =>{
    limparTarefas();
    const banco = getBanco();
    banco.forEach((item,indice)=> criarItem(item.tarefa, item.status, indice));
}

//Criando função para limpar as tarefas e impedir que ao atualizar os itens eles duplique:
const limparTarefas = () =>{
    const todoList = document.getElementById('todo_List');
    while(todoList.firstChild){
        todoList.removeChild(todoList.lastChild);
    }
}

//Criando a função para inserir uma nova tarefa
const inserirItem = (evento) =>{
  const tecla = evento.key;
  const texto = evento.target.value;
  if(tecla === 'Enter'){
      const banco = getBanco();
      banco.push({'tarefa': texto, 'status': ''});
      setBanco(banco);
      atualizarTela();
      evento.target.value='';
  }
}
document.getElementById('newitem').addEventListener('keypress', inserirItem);
//Criando a função de remover o item
const removerItem =(indice)=>{
    const banco = getBanco();
    banco.splice(indice,1);
    setBanco(banco);
    atualizarTela();
}
//Criando a função onde vai saber se o status é vazio ou está checado
const atualizarItem = (indice)=>{
    const banco = getBanco();
    banco[indice].status= banco[indice].status === '' ? 'checked' : '';
    setBanco(banco);
}
//Identificando as tarefas com um indice
const clickItem = (evento)=>{
    const elemento = evento.target;
    console.log(elemento);
    if(elemento.type === 'button'){
      const indice = elemento.dataset.indice;
      removerItem(indice);
    }
    //Programando a ação de atualizar os status da tarefa
    else if(elemento.type === 'checkbox'){
     const indice = elemento.dataset.indice;
     atualizarItem(indice);
    }

}
document.getElementById('todo_List').addEventListener('click', clickItem)
atualizarTela();
