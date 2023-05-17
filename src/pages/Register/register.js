import { useState } from "react";
import './register.css';
import { Link } from "react-router-dom";
import { auth } from '../../firebaseConnections'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
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



function Register(){
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [senhaConfirm, setSenhaConfirm] = useState('')
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword ] = useState(false);

  

    const navigate = useNavigate()

    async function handleRegister(e){
        e.preventDefault()

        if(email !== '' && senha !== '' && senha === senhaConfirm){
            await createUserWithEmailAndPassword(auth, email, senha)
            .then(()=> {
                navigate('/', {replace: true})
            })
            .catch(()=>{
                alert('ERRO AO FAZER CADASTRO')
            })

        }
        else if(email !== '' && senha !== '' && senha !== senhaConfirm){
            alert("As senhas não são iguais")
        }
        else{
            alert('Usuário ou senha invalidos')
        }

    }
    return(
        <div>
            <CssBaseline/>
            <Container maxWidth="sm">


                <form onSubmit={handleRegister} className="container-register">
                    <Typography variant="h3" gutterBottom>Cadastre-se</Typography>
                    <Typography variant="h6" gutterBottom>Vamos criar a sua conta</Typography>
                    <Grid container spacing={2}>
                        

                        <Grid item xs={12}>
                            <TextField
                            required
                            fullWidth
                            focused 
                            label='Email'
                            placeholder="Digite um email"
                            value={email}                            
                            onChange={(e)=> setEmail(e.target.value)}/>
                        </Grid>
                        <Grid item xs={12}>

                            <FormControl sx={{ marginTop: 1, width: '100%' }} variant="outlined" focused required>
                            <InputLabel >Senha</InputLabel>
                            <OutlinedInput
                                placeholder="Digite uma senha"
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
                        <FormControl sx={{ marginTop: 1, width: '100%', marginBottom: 2 }} variant="outlined" focused required>
                            <InputLabel >Confirmar</InputLabel>
                            <OutlinedInput
                                placeholder="Confirme a senha"
                                type={showConfirmPassword ? 'text' : 'password'}
                                value={senhaConfirm}
                                onChange={(e)=> setSenhaConfirm(e.target.value)}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={(e)=> setShowConfirmPassword(!showConfirmPassword)}
                                        edge="end"
                                        >
                                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                    }
                                    label="Password"
                                    />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <Button type="submit" variant="contained" fullWidth>Cadastrar</Button>

                        </Grid>
                        
                        <Link to='/' className="link">
                            <Typography variant="h7" gutterBottom>Já possui uma conta? Faça o login clicando aqui!</Typography>
                        </Link>
                        
                        
                    </Grid>
                </form>
            </Container>
        </div>
    )
}

export default Register;