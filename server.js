// parametrage du serveur express

const express= require ('express')
const app= express()
const port= 5000
const bodyParser= require('body-parser')
app.use(bodyParser.json())

// creation des tâches 
const tasks=[
    {
        id: 1, description:'finir le travail de création API '
    },
    {
        id:2, description:'Rendre le devoir avant 22h'
    },
    {
        id:3, description:'refaire ma coiffure vers 14h'
    }
];

// Lire la liste des tâches (GET /tasks) 
app.get('/tasks',(req,res)=>{
   
        res.json(tasks);
    
});

// Afficher une tâche spécifique (GET /tasks/:id)
app.get ('/task/:id', (req, res) =>{
    const taskId=parseInt(req.params.id);
    const task =tasks.find(task=>task.id ===taskId);
    if (task) {
        res.json(task)
    } else {
        res.status(400).json({message:'Tâche non trouvée'});
    }
});

// Créer une nouvelle tâche (POST /tasks)
app.post('/tasks', (req, res)=>{
    const nouvelleTache={
     id:req.body.id,
    description: req.body.description
    };
    tasks.push(nouvelleTache);
    res.status(201).json({message:'votre tâche est bien ajoutée', task:nouvelleTache})
})

// Modifier une tâche (PUT /tasks/:id)
app.put('/tasks/:id', (req ,res)=>{
    const taskId=parseInt(req.params.id)
    const task= tasks.find(task=>task.id===taskId)
    if (task) {
        task.description=req.body.description
        res.json({message:'tâche mise a jour avec succes',task})
    } else {
        res.status(404).json({error:'la tâche est introuvable'})
    }
})

// Supprimer une tâche (DELETE /tasks/:id)
app.delete('/task/:id', (req,res)=>{
    const taskId=parseInt(req.params.id)
   const taskSupp= tasks.findIndex(task=>task.id===taskId)
    if (taskSupp === -1) {
       return res.status(404).json({message:'la tâche est introuvable'})

    } 
        tasks.splice(taskSupp,1)
    res.json({message:`la tache est supp`})
})


app.listen(port,(req,res)=>{
    console.log(`Serveur demarrer sur http:localhost:${port}`)} );

