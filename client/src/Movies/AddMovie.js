import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const initialItems = {
    id: '',
    title: '',
    director: '',
    metascore: '',
    stars: [],
}

const AddMovie = (props) => {
    const { id } = useParams();
    const [addMovie, setAddMovie] = useState(initialItems);

    useEffect(() => {
        axios.post(`http://localhost:5000/api/movies/${id}`)
            .then((res) => setAddMovie(res.data))
            .catch((err) => console.log(err.response));
    }, [id])

    const changeHandler = (evt) => {
        evt.preventDefault();
        const {name, value} = evt.target;
        setAddMovie({
            ...addMovie,
            [name]: value,
        })
    }

    const submitHandler = (evt) => {
        evt.preventDefault();
        axios
            .put(`http://localhost:5000/api/movies/${id}`, addMovie)
            .then(res => {
                props.moviesList.map((movie) => movie.id === addMovie.id ? addMovie : null);
                window.location = `/`
            })
            .catch(err => console.log(err))
    }

    return(
        <div>
            <h2> Add Movie </h2>
                <form onSubmit={submitHandler}>
                    <input
                    type='text'
                    name='title'
                    value={addMovie.title}
                    onChange={changeHandler}
                    placeholder='Movie Title'
                    > 
                    </input>
                    
                    <input
                    type='text'
                    name='director'
                    value={addMovie.director}
                    onChange={changeHandler}
                    placeholder='Director Name'
                    > 
                    </input>
                    
                    <input
                    type='number'
                    name='metascore'
                    value={addMovie.metascore}
                    onChange={changeHandler}
                    placeholder='Metascore'
                    > 
                    </input>
                </form>
        </div>
)    
}

export default AddMovie;
