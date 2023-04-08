//As constantes form, input e list estão guardando os elementos com o id 'task-form', 'task-input' e 'task-list'
const form = document.getElementById('task-form');
const input = document.getElementById('task-input');
const list = document.getElementById('task-list');

//tasks é uma lista que armazena as tarefas adicionadas pelo usuário.
var tasks = [];

/*Esse código verifica o evento de carregamento da página e, se houver uma lista de tarefas salva no
 localStorage, carrega as tarefas para a variável tasks. Por fim, ele chama a função updateTasks() */
window.addEventListener('load', () => {
  if (localStorage.getItem('tasks')) {
    tasks = localStorage.getItem('tasks').split(',');
    updateTasks();
  }
});



/*Esse código verifica o evento de carregamento de submit, quando o botão for clicado. Logo após, 'preventDefault()' é utilizado para evitar que a página seja recarregada ao enviar o formulário.  
Se o conteúdo do input for diferente de vazio, a tarefa será adicionada na variável 'tarefa' e o input voltará a ser vazio. Além disso,
acontecerá as funções 'updateTasks' e 'saveTasks' */
form.addEventListener('submit', (event) => {
  event.preventDefault();
  if (input.value !== '') {
    tasks.push(input.value);
    input.value = '';
    updateTasks();
    saveTasks();
  }
});

/*A função 'updateTasks', cria um elemento 'list' no html. Logo após, a declaração do loop for
para percorrer o comprimento da variável 'tasks', ou seja, esse loop será executa para cada tarefa adicionada.
Dentro desse loop, existe a criação da variável 'task' que guarda a tarefa pelo índice, ou seja, pela posição.
Também é criada uma variável 'li', ela guarda um elemento 'li'. Dentro desse elemento, será mostrada a variável 'taks' 
que guarda a tarefa pelo índice. Além disso é criado um botão, em que quando for clicado, acontecerá a função 'editTask'
e um botão de deletar, em que quando ele for clicado, acontecerá a função 'deleteTask'.
Esses botões e a list serão filhos do elemento 'li'*/
function updateTasks() {
  list.innerHTML = '';
  for (let i = 0; i < tasks.length; i++) {
    var task = tasks[i];
    var li = document.createElement('li');
    li.innerHTML = task;
    var editButton = document.createElement('button');
    editButton.innerText = 'Editar';
    editButton.addEventListener('click', () => editTask(i));
    var deleteButton = document.createElement('button');
    deleteButton.innerText = 'Excluir';
    deleteButton.addEventListener('click', () => deleteTask(i));
    li.appendChild(editButton);
    li.appendChild(deleteButton);
    list.appendChild(li);
  }
}

/* A função editTask, recebe como parâmetro 'index'. Ele corresponde a posição da tarefa que será editada.
Quando essa função for chamada, ela cria uma variável que guarda o conteúdo digitado dentro do prompt.
Se o conteúdo digitado pelo usuário for diferente de null, ele atualiza a tarefa desse índice específico para o conteúdo da variável 'newTask'.
Além disso, acontece as funções 'updateTasks' e 'saveTasks'*/
function editTask(index) {
  const newTask = prompt('Digite a nova tarefa:');
  if (newTask !== null) {
    tasks[index] = newTask;
    updateTasks();
    saveTasks();
  }
}



/*A função 'deleteTask' exclui uma tarefa de acordo com o índice.
'tasks.splice(index, 1)', está removendo o elemento na posição index do lista 'tasks' e o número '1' indica quantos 
elementos devem ser removidos a partir da posição index. Nesse caso, somente um elemento será removido.
Além disso, acontecerá as funções 'updateTasks' e  'saveTasks'*/
function deleteTask(index) {
  tasks.splice(index, 1);
  updateTasks();
  saveTasks();
}

// Salva as tarefas no localStorage
function saveTasks() {
  localStorage.setItem('tasks', tasks.join(','));
}
