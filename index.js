var firebaseConfig = {
    apiKey: "AIzaSyBKdjqkQ6iQvG05uowsCE95NTyPqYN7LEI",
    authDomain: "test-82bbc.firebaseapp.com",
    databaseURL: "https://test-82bbc.firebaseio.com",
    projectId: "test-82bbc",
    storageBucket: "test-82bbc.appspot.com",
    messagingSenderId: "503673191260",
    appId: "1:503673191260:web:442faf835a3b7156bcdf99"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// conection DB
const db = firebase.firestore();

// elementos HTML
const taskForm = document.getElementById('task-form');
const taskContainer = document.getElementById('myTable');

// function

const onGetTasks = (callback) => db.collection('tasks').onSnapshot(callback); // Cuando hay un cambio en la BD, manda un mensaje
const deleteTask = id => db.collection('tasks').doc(id).delete(); // funcion para eliminar los datos
const updateTask = (id, updateTask) => db.collection('tasks').doc(id).update(updateTask); // actualizar tarea

// Get Task

const getTasks = () => db.collection('tasks').get(); // Obtener de firebase todas la tareas
const getTask = (id) => db.collection('tasks').doc(id).get();

let editStatus = false;
let id = '';

// Create Task
const saveTask = (title, description) =>
    db.collection('tasks').doc().set({
        title, description
    });

//Escuchar evento submit

taskForm.addEventListener('submit', async (e) => { // toma los eventos del objeto
    e.preventDefault();
    const title = taskForm['title'];
    const description = taskForm['description'];
    if (!editStatus) {
          await saveTask(title.value, description.value);
    } else {
        await updateTask(id, {
            title: title.value,
            description: description.value,
        });
        taskForm['btn-task-form'].innerText = 'Save';
        id = '';
        editStatus = true;
    }
    taskForm.reset();
    title.focus();
    // almacenar los datos en la db
});

// eventos en el DOM

window.addEventListener('DOMContentLoaded', async (e) => { // Ejecutar cuando se cargue la pagina
    onGetTasks((querySnapshot) => {
        taskContainer.innerHTML = '';
        querySnapshot.forEach(doc => {
            const task = doc.data();
            task.id = doc.id;
            taskContainer.innerHTML += '<tr> <td>' + task.title + '</td> <td>' + task.description + '</td> <td><button class="btn btn-success btn-edit" data-id="' + task.id + '">Edit</button></td><td><button class="btn btn-danger btn-delete" data-id="' + task.id + '">Delete</button></td></tr>'
            const btnsDelete = document.querySelectorAll('.btn-delete'); // selecciona los elementos con la clase btn-delete
            btnsDelete.forEach(btn => {
                btn.addEventListener('click', async (e) => {
                    await deleteTask(e.target.dataset.id); // toma el id que esta en el boton y lo manda a la funcion eliminar
                });
            });
            const btnsEdit = document.querySelectorAll('.btn-edit'); //// selecciona los elementos con la clase btn-edit
            btnsEdit.forEach(btn => {
                btn.addEventListener('click', async (e) => {
                    const doc = await getTask(e.target.dataset.id);
                    const task = doc.data();
                    taskForm['title'].value = task.title;
                    taskForm['description'].value = task.description;
                    taskForm['btn-task-form'].innerText = 'Update';
                    editStatus = true;
                    id = doc.id;
                });
            });
        });

    });
});



