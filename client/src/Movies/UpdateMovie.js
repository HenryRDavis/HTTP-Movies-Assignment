  
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const initialItems = {
    id: '',
    title: '',
    director: '',
    metascore: '',
    stars: [],
}

const UpdateMovie = (props) => {;
    const { id } = useParams();
    const [item, setItem] = useState(initialItems);

    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/movies/${id}`)
            .then(res => {
                setItem(res.data)
            })
            .catch(err => console.log(err))
    }, [id])

    const changeHandler = (evt) => {
        evt.preventDefault();
        const {name, value} = evt.target;
        setItem({
            ...item,
            [name]: value,
        })
    }

    // const actorsHandler = (evt) => {
    //     evt.preventDefault();
    //     const { index, value } = evt.target
    //     setItem({
    //         ...item,
    //         stars: item.stars.map((x, idx) => idx === index ? value : x)
    //     })
    // }

    const submitHandler = (evt) => {
        evt.preventDefault();
        axios
            .put(`http://localhost:5000/api/movies/${id}`, item)
            .then(res => {
                props.moviesList.map((movie) => movie.id === item.id ? item : null);
                window.location = `/`
            })
            .catch(err => console.log(err))
    }


    return(
        <div>
            <h2> Update Movie </h2>
                <form onSubmit={submitHandler}>
                    <input
                    type='text'
                    name='title'
                    value={item.title}
                    onChange={changeHandler}
                    placeholder='Movie Title'
                    > 
                    </input>
                    
                    <input
                    type='text'
                    name='director'
                    value={item.director}
                    onChange={changeHandler}
                    placeholder='Director Name'
                    > 
                    </input>
                    
                    <input
                    type='number'
                    name='metascore'
                    value={item.metascore}
                    onChange={changeHandler}
                    placeholder='Metascore'
                    > 
                    </input>

{/*                     
                    <div className='actors'>
                        {item.stars.map((actor, index) => (
                            actor.length > 0 ? 
                            <input
                            type='text'
                            name='stars'
                            value={item.stars[index]}
                            onChange={actorsHandler}
                            placeholder='Enter star actors here'
                            index={item.stars.indexOf(actor)}
                            >
                            </input>
                            : 
                            null
                    ))}
                    </div> */}
                    
                    <button>Update</button>
                </form>
        </div>
)
}

export default UpdateMovie;