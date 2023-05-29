import { useState, useEffect } from "react";
import './admin.css';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';


import { auth, db } from '../../firebaseConnections'
import { signOut } from "firebase/auth";
import { addDoc, collection, onSnapshot, query, orderBy, where, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { Container, CssBaseline } from "@mui/material";



function Admin() {
    const [tarefaInput, setTarefaInput] = useState('')
    const [editTarefa, setEditTarefa] = useState({})
    const [user, setUser] = useState({})
    const [tarefas, setTarefas] = useState([])

    useEffect(() => {
        async function loadTarefas() {
            const userDetail = localStorage.getItem("@detailUser")
            setUser(JSON.parse(userDetail))

            if (userDetail) {
                const data = JSON.parse(userDetail)

                const tarefaRef = collection(db, 'tarefas')
                const q = query(tarefaRef, orderBy('created', 'desc'), where('userUid', '==', data?.uid))
                const unsub = onSnapshot(q, (snapshot) => {
                    let lista = []

                    snapshot.forEach((doc) => {
                        lista.push({
                            id: doc.id,
                            tarefa: doc.data().tarefa,
                            userUid: doc.data().userUid,
                        })
                    })

                    setTarefas(lista)
                })
            }
        }
        loadTarefas()
    }, [])

    async function handleRegister(e) {
        e.preventDefault()

        if (tarefaInput === '') {
            alert("Digite a sua tarefa")
            return;
        }

        if (editTarefa?.id) {
            handleUpdateTarefa()
            return;
        }

        await addDoc(collection(db, 'tarefas'), {
            tarefa: tarefaInput,
            created: new Date(),
            userUid: user?.uid,
        })
            .then(() => {
                setTarefaInput('')
            })
            .catch((error) => {
                console.log(error)
            })
    }

    async function handleLogout() {
        await signOut(auth)
    }

    async function deletarTarefa(id) {
        const docRef = doc(db, 'tarefas', id)
        await deleteDoc(docRef)
    }

    async function editarTarefa(item) {
        setTarefaInput(item.tarefa)
        setEditTarefa(item)


    }

    async function handleUpdateTarefa() {
        const docRef = doc(db, 'tarefas', editTarefa?.id)
        await updateDoc(docRef, {
            tarefa: tarefaInput,
        })
            .then(() => {
                setTarefaInput('')
                setEditTarefa({})
            })

            .catch((error) => {
                setTarefaInput('')
                setEditTarefa({})
                console.log(error)
            })
    }

    return (
        <div className="body">
            <CssBaseline />
            <Container maxWidth='sm'>
                <form onSubmit={handleRegister} className="form">
                    <Typography variant="h3" gutterBottom>Minhas tarefas</Typography>
                    <Grid container spacing={2}>

                        <Grid item xs={12} >

                            <TextField
                                type="text"
                                fullWidth

                                placeholder="Digite sua tarefa..."
                                value={tarefaInput}
                                onChange={(e) => setTarefaInput(e.target.value)}
                            />

                            {Object.keys(editTarefa).length > 0 ? (
                                <Button type="submit" variant='contained' fullWidth className="botao-register">Atualizar tarefa</Button>
                            ) : (
                                <Button type="submit" variant="contained" fullWidth className="botao-register">Registrar tarefa</Button>
                            )}
                        </Grid>
                    </Grid>
                </form>

                {tarefas.map((item) => (
                    <Card className="Card" key={item.id} style={{ backgroundColor: "rgb(247, 212, 148)" }}>
                        <CardContent>
                            <Typography variant="h4">{item.tarefa}</Typography>
                        </CardContent>

                        <CardActions>

                            <Button variant="outlined" size="small" style={{ backgroundColor: "white", color: "orange", borderBlockColor: "orange", borderInlineColor: "orange", fontWeight: "bolder" }} className="botao-edit" onClick={() => editarTarefa(item)}>Editar</Button>
                            <Button className="botao-delete" size="small" style={{ backgroundColor: "orange", color: "white", fontWeight: "bolder" }} onClick={() => deletarTarefa(item.id)}>Concluir</Button>

                        </CardActions>
                    </Card>
                ))}

                <button className="botao-logout" onClick={handleLogout}>Sair</button>


            </Container>
        </div>
    )
}

export default Admin;