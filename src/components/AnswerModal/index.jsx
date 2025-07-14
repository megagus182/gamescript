import { useState } from 'react';
import axios from 'axios';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from '@mui/material';
import { TextForm } from '..';
import { API_URL } from '../../config';

export default function AnswerModal({ userId, questionId, game }) {
    const [open, setOpen] = useState(false);
    const [answer, setAnswer] = useState('');

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = () => {
        axios
            .put(`${API_URL}/answer/` + questionId, {
                text: answer,
            })
            .then(() =>
                axios.put(`${API_URL}/user/notifications/${userId}`, {
                    text: `Recibiste una respuesta en tu pregunta sobre el juego: ${game}`,
                })
            );
    };
    return (
        <>
            <div>
                <Button
                    variant='outlined'
                    onClick={handleClickOpen}
                    sx={{ mt: 3 }}
                >
                    Responder
                </Button>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Responder Pregunta</DialogTitle>
                    <DialogContent>
                        <form style={{ paddingTop: 40 }}>
                            <TextForm cb={setAnswer} value={answer} />
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancelar</Button>
                        <Button
                            onClick={() => {
                                handleSubmit();
                                handleClose();
                            }}
                        >
                            Enviar
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </>
    );
}
