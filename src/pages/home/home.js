import { useState } from "react";
import '../Register/register.css';
import { Link, useNavigate } from "react-router-dom";
import { auth } from '../../firebaseConnections';
import { signInWithEmailAndPassword } from 'firebase/auth'
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment'
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import IconButton from '@mui/material/IconButton';

function Home(){
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate()

    async function handleLogin(e){
        e.preventDefault()

        if(email !== '' && senha !== ''){
            await signInWithEmailAndPassword(auth, email, senha)
            .then(()=> {
                navigate('/admin', {replace: true})
            })
            .catch(()=> {
                alert('Email ou senha incorretos')
            })
        }
        else{
            alert("Usuário ou senha incorretos")
        }

    }
    return(
        <div>
            <CssBaseline/>
            <Container maxWidth="sm">


                <form onSubmit={handleLogin} className="container-register">
                    <Typography variant="h3" style={{color:""}} gutterBottom>Lista de tarefas</Typography>
                    <Typography variant="h6" gutterBottom>Gerencie a sua agenda de forma fácil</Typography>
                    <Grid container spacing={2}>
                        

                        <Grid item xs={12}>
                            <TextField
                            required
                            fullWidth
                            
                            focused
                            id='outlined-required'
                            label='Email'
                            value={email}
                            onChange={(e)=> setEmail(e.target.value)}/>
                        </Grid>
                        <Grid item xs={12}>

                            <FormControl sx={{ marginTop: 1, width: '100%' }} variant="outlined" focused required>
                            <InputLabel htmlFor="outlined-adornment-password">Senha</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type={showPassword ? 'text' : 'password'}
                                value={senha}
                                onChange={(e)=> setSenha(e.target.value)}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={(e)=> setShowPassword(!showPassword)}
                                        edge="end"
                                        >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                    }
                                    label="Password"
                                    />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <Button type="submit" variant="contained" fullWidth>Entrar</Button>

                        </Grid>
                        
                        <Link to='/register' className="link">
                            <Typography variant="h7" gutterBottom>Não possui cadastro ainda? Cadastre-se clicando aqui!</Typography>
                        </Link>
                        
                        
                    </Grid>
                </form>
            </Container>
        </div>
    )
}

export default Home;