import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { ColorContextProvider } from '../Theme/Theme';
import './Index.css';
import {
    Box,
    Button,
    FormControl,
    FormHelperText,
    InputAdornment,
    Link as MuiLink,
    Divider,
    Typography,
    Container,
    TextField,
} from '@mui/material';
import { Check, PriorityHigh } from '@mui/icons-material';
import { auth } from '../../firebase/credenciales';
import {
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    signInWithRedirect,
    GoogleAuthProvider,
} from 'firebase/auth';
import Swal from 'sweetalert2';
import validation from './validations';
import { getUserInfo } from '../../redux/actions/user';
import GoogleIcon from '@mui/icons-material/Google';
import { API_URL } from '../../config';

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        width: 400,
    },
    button: {
        marginTop: 2,
    },
};

export default function LandingForm({ register, setRegister }) {
    const [userInfo, setUserInfo] = useState({
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState({});

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const check = validation(userInfo);
        setErrors(check);
    }, [userInfo]);

    function handleChange(e) {
        const value = e.target.value;
        const name = e.target.name;

        setUserInfo((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    async function registarUsuario(email, password) {
        const localCart = localStorage.getItem('cartList');
        const prevCart = localCart ? JSON.parse(localCart) : [];
        const newUserData = {
            email,
            password,
            prevCart,
        };
        await axios.post(`${API_URL}/register`, newUserData);
        setRegister(false);
    }

    async function submitHandler(e) {
        e.preventDefault();
        const email = userInfo.email;
        const password = userInfo.password;
        if (register) {
            try {
                await registarUsuario(email, password);
            } catch (error) {
                Swal.fire({
                    text: 'Email already in use',
                    icon: 'error',
                });
            }
        } else {
            dispatch(getUserInfo(email, true)).then(async (info) => {
                if (!info) {
                    return Swal.fire({
                        text: 'No estas registrado',
                        icon: 'error',
                    });
                } else {
                    try {
                        const { user } = await signInWithEmailAndPassword(
                            auth,
                            email,
                            password
                        );
                        if (user) {
                            navigate('/home');
                        }
                    } catch (error) {
                        Swal.fire({
                            text: 'Credenciales invalidas',
                            icon: 'error',
                        });
                    }
                }
            });
        }
    }
    async function handleReset(email) {
        const actionCodeSettings = {
            url: 'http://localhost:3000/',
            handleCodeInApp: true,
        };
        sendPasswordResetEmail(
            auth,
            (email = userInfo.email),
            actionCodeSettings
        );
        Swal.fire({
            icon: 'success',
            text: 'we have sent you an email to reset your password, please check it. ',
        });
    }
    async function handleGoogle() {
        const provider = new GoogleAuthProvider();
        signInWithRedirect(auth, provider);
    }
    return (
        <Container
            className={
                window.localStorage.getItem('themeMode') === 'dark'
                    ? 'bg'
                    : 'bg2'
            }
            sx={{
                minWidth: '100vw',
                minHeight: '100vh',
                position: 'absolute',
                top: '0',
                left: '0',
                display: 'flex',
                justifyContent: 'center',
                alingItems: 'center',
                padding: '60px',
            }}
        >
            <Box
                component={'form'}
                onSubmit={submitHandler}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    minWidth: '400px',
                    minHeight: '500px',
                    padding: '20px',
                    maxWidth: '400px',
                    backgroundColor: '#f8f9fa',
                }}
                border='solid 1px'
                borderColor={
                    window.localStorage.getItem('themeMode') === 'dark'
                        ? 'white'
                        : 'black'
                }
            >
                <Typography variant='h4'>
                    {register ? 'SING UP' : 'LOG IN'}{' '}
                </Typography>
                <FormControl>
                    <Box sx={{ marginBottom: '5%', marginTop: '10%' }}>
                        <Button
                            variant='contained'
                            startIcon={<GoogleIcon></GoogleIcon>}
                            sx={{ minWidth: '100%', maxWidth: '100%' }}
                            onClick={handleGoogle}
                        >
                            Sing in with Google
                        </Button>
                    </Box>

                    <Divider variant='middle' sx={{ marginBottom: '5%' }} />

                    <Typography variant='h6' sx={{ fontSize: '0.8rem' }}>
                        OR
                    </Typography>

                    <Divider
                        variant='middle'
                        sx={{ marginBottom: '5%', marginTop: '5%' }}
                    />

                    <TextField
                        placeholder='Enter Email'
                        onChange={handleChange}
                        id='email'
                        name='email'
                        value={userInfo.email}
                        type='email'
                        sx={{ marginBottom: '5%' }}
                        InputProps={{
                            inputProps: { style: { color: 'black' } },
                        }}
                        color='primary'
                        focused
                    />
                    {register ? (
                        <>
                            <FormHelperText variant='outlined'>
                                {errors?.emailRequired ? (
                                    <PriorityHigh color='warning' />
                                ) : (
                                    <Check color='success' />
                                )}
                                is required
                            </FormHelperText>
                            <FormHelperText variant='outlined'>
                                {errors?.emailFormat ? (
                                    <PriorityHigh color='warning' />
                                ) : (
                                    <Check color='success' />
                                )}
                                should be in email format
                            </FormHelperText>
                        </>
                    ) : (
                        <></>
                    )}
                </FormControl>
                <FormControl>
                    <TextField
                        onChange={handleChange}
                        id='password'
                        name='password'
                        value={userInfo.password}
                        type='password'
                        placeholder='Password'
                        InputProps={{
                            inputProps: { style: { color: 'black' } },
                        }}
                        color='primary'
                        focused
                    >
                        <InputAdornment position='end'>Show</InputAdornment>
                    </TextField>
                    <Button
                        onClick={handleReset}
                        sx={{
                            diplay: 'inline-block',
                            maxWidth: '50%',
                            fontSize: '0.6rem',
                            textAlign: 'start',
                            justifyContent: 'start',
                        }}
                        color='secondary'
                    >
                        I forget my password
                    </Button>

                    {register ? (
                        <>
                            <FormHelperText variant='outlined'>
                                {errors?.passRequired ? (
                                    <PriorityHigh color='warning' />
                                ) : (
                                    <Check color='success' />
                                )}
                                Is required
                            </FormHelperText>
                            <FormHelperText variant='outlined'>
                                {errors?.passFormat ? (
                                    <PriorityHigh color='warning' />
                                ) : (
                                    <Check color='success' />
                                )}
                                It must have between 6 and 14 characters, at
                                least one digit, one lowercase and uppercase
                            </FormHelperText>
                        </>
                    ) : (
                        <></>
                    )}
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            marginTop: '10%',
                        }}
                    >
                        {register && Object.keys(errors).length ? (
                            <></>
                        ) : (
                            <Button
                                type='submit'
                                sx={styles.button}
                                variant='contained'
                                color='primary'
                            >
                                {register ? 'SING UP' : 'LOG IN'}
                            </Button>
                        )}
                        <Button
                            color={
                                window.localStorage.getItem('themeMode') ===
                                'dark'
                                    ? 'secondary'
                                    : 'primary'
                            }
                            sx={styles.button}
                            variant={'outlined'}
                            onClick={() => setRegister(!register)}
                        >
                            {register
                                ? 'I HAVE AN ACCOUNT'
                                : 'I WANT TO REGISTER'}
                        </Button>
                    </Box>
                    <Box
                        sx={{
                            marginTop: '25%',
                            marginLeft: '50%',
                            minWidth: '200px',
                        }}
                    >
                        <MuiLink
                            component={Link}
                            to='/home'
                            underline='none'
                            sx={{ color: '#5e83ba' }}
                        >
                            <Typography sx={{ fontSize: '0.8rem' }}>
                                CONTINUE LIKE A GUEST
                            </Typography>
                        </MuiLink>
                    </Box>
                </FormControl>
            </Box>
        </Container>
    );
}
