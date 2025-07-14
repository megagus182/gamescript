import { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Container } from '@mui/system';
import Comments from '../sections/Comments';
import { AdminLayout } from '../components';
import { API_URL } from '../config';

export default function AdminQuestions() {
    const [questions, setQuestions] = useState([]);
    const [filters, setFilters] = useState({
        name: '',
        status: '',
        date: '',
    });

    useEffect(() => {
        axios
            .get(`${API_URL}/questions`)
            .then((response) => response.data.filter((el) => !el.answer))
            .then((results) => setQuestions(results))
            .catch(() => setQuestions([]));
    }, [filters]);

    function handleFilters(e) {
        const value = e.target.value;
        const name = e.target.name;
        setFilters((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    return (
        <AdminLayout>
            <Comments list={questions} />
        </AdminLayout>
    );
}
