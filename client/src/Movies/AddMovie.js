import axios from 'axios';
import React, { useState } from 'react';

const initialItems = {
    id: '',
    title: '',
    director: '',
    metascore: '',
    stars: [],
}

const AddMovie = (props) => {
    const [addMovie, setAddMovie] = useState(initialItems);

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
            .post(`http://localhost:5000/api/movies`, addMovie)
            .then(res => {
                setAddMovie(initialItems);
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
                <button>Add</button>
                </form>
               
        </div>
)    
}

export default AddMovie;
