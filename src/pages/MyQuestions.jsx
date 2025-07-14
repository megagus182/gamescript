import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Comments from '../sections/Comments';
import { Loader } from '../components';
import { API_URL } from '../config';

export default function MyQuestions() {
    const { id } = useSelector((state) => state.user);
    const [isLoading, setIsLoading] = useState(true);
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        axios
            .get(`${API_URL}/questions?userId=${id}`)
            .then((response) => setQuestions(response.data?.reverse()))
            .catch(() => setQuestions([]))
            .finally(() => setIsLoading(false));
    }, [id]);

    if (isLoading) return <Loader />;
    else if (!isLoading && !questions.length)
        return <h2>No has realizado ninguna pregunta</h2>;

    return <Comments list={questions} />;
}
