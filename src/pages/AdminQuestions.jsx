import { useEffect, useState } from "react";
import axios from "axios";
import Comments from '../sections/Comments'
import { AdminLayout } from "../components";
import config from "../config";

export default function AdminQuestions() {
  const [ questions, setQuestions ] = useState([])

  useEffect(() => {
    axios.get(`${config.BACKEND_URL}/questions`)
    .then(response => response.data.filter(el => !el.answer))
    .then(results => setQuestions(results))
    .catch(() => setQuestions([]))
  }, [])

// function handleFilters(e) {
//   const value = e.target.value;
//   const name = e.target.name;
//   setFilters((prev) => ({
//     ...prev,
//     [name]: value,
//   }));
// }

  return (
    <AdminLayout>
      <Comments list={questions} />
    </AdminLayout>
  );
}
