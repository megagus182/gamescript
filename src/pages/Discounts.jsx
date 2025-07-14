import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Container, Box, Input, Button } from '@mui/material';
import { DiscountsContainer } from '../containers';

import { Card, Footer, Loader } from '../components';
import Sidebar from '../components/Sidebar/Sidebar';
import Swal from 'sweetalert2';
import { API_URL } from '../config';

const styles = {
    banner: {
        width: 40,
        height: 'auto',
    },
    container: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
        justifyItems: 'center',
        paddingX: 10,
    },
    inputContainer: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: 220,
        height: 40,
        marginY: 2,
    },
    input: {
        opacity: 0,
        width: '100%',
        height: '100%',
    },
    inputBox: {
        position: 'absolute',
        zIndex: 0,
        top: 0,
        width: 'max-content',
        height: 'max-content',
        padding: 1,
        border: '1px solid red',
        borderRadius: '9px',
    },
};

export default function Discounts() {
    const [discounts, setDiscounts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { admin } = useSelector((state) => state.user);
    const [banner, setBanner] = useState('');
    const [inputValue, setInputValue] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios(`${API_URL}/discounts`)
            .then((response) => setDiscounts(response.data))
            .then(() => {
                axios(`${API_URL}/images/discounts`).then((response) =>
                    setBanner(response.data.image)
                );
            })
            .then(() => setLoading(false))
            .catch(() => navigate('/home'));
    }, [navigate]);

    function handleInput(e) {
        setInputValue(e.target.files[0]);
    }

    async function handleUpload() {
        if (!inputValue) return Swal.fire('No se puede subir un archivo vacio');
        const data = new FormData();
        data.append('image', inputValue);
        const url = `${API_URL}/images/discounts`;
        const image = await axios.post(url, data);
        if (image) setBanner(image.data);
    }

    if (loading) return <Loader />;

    return (
        <DiscountsContainer>
            <Sidebar></Sidebar>
            <div>
                <img
                    className={styles.banner}
                    src={banner}
                    alt='Banner de descuentos'
                />
                {admin && (
                    <>
                        <Container sx={styles.inputContainer}>
                            <Box sx={styles.inputBox}>
                                {!inputValue
                                    ? 'Selecciona un archivo'
                                    : 'Archivo seleccionado'}
                            </Box>
                            <Input
                                name='discountBanner'
                                sx={styles.input}
                                type={'file'}
                                onChange={handleInput}
                            />
                        </Container>
                        <Button
                            onClick={handleUpload}
                            variant='contained'
                            color='success'
                        >
                            Subir imagen
                        </Button>
                    </>
                )}
            </div>
            <Box sx={styles.container}>
                {discounts.map((game) => (
                    <Card
                        id={game.id}
                        name={game.name}
                        background_image={game.background_image}
                        price={game.price}
                        discount={game.discount}
                    />
                ))}
            </Box>
            <Footer></Footer>
        </DiscountsContainer>
    );
}
