import React, { Component } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios';
import { updateFavsFromFireBase, updateFavsToFireBase } from '../firebase';


export default class MoviePage extends Component {

    constructor() {
        super();
        this.state = {
            movie: 'non',
            FavouritesArray: []
        }
    }

    async componentDidMount() {
        updateFavsFromFireBase()
        let url = String(window.location.href)
        let i = url.length - 1
        while (url[i] != '/')
            i -= 1
        i += 1
        let movieID = ''
        while (i < url.length) {
            movieID = movieID + url[i]
            i++
        }
        let resp = await axios.get(`https://api.themoviedb.org/3/movie/${movieID}?language=en-US&api_key=d2d5c04da9b8133f121a383dc3cb2d2a`)
        let movieObj = { ...resp.data }
        let fvArr = []
        if(localStorage.getItem("Favourites") != undefined)
            fvArr = JSON.parse(localStorage.getItem("Favourites"))
        this.setState({
            movie: { ...movieObj },
            FavouritesArray: [...fvArr]
        })


    }

    addToFav = (movieID) => {
        let fv = localStorage.getItem("Favourites")
        let fvArr = []
        if (fv == undefined) {
            fvArr = [String(movieID)]
            fv = JSON.stringify(fvArr)
            localStorage.setItem("Favourites", fv)
        }
        else {
            fvArr = JSON.parse(fv)
            fvArr.push(String(movieID))
            fv = JSON.stringify(fvArr)
            localStorage.setItem("Favourites", fv)
        }
        updateFavsToFireBase()
        this.setState({
            FavouritesArray: [...fvArr]
        })
    }

    rmvFromFav = (movieID) => {
        let fv = localStorage.getItem("Favourites")
        let fvArr = JSON.parse(fv)
        movieID = String(movieID)
        let ind = 0;
        while ((ind < fvArr.length) && (fvArr[ind] != movieID)) {
            ind += 1;
        }
        fvArr.splice(ind, 1)
        fv = JSON.stringify(fvArr)
        localStorage.setItem("Favourites", fv)
        updateFavsToFireBase()
        this.setState({
            FavouritesArray: [...fvArr]
        })
    }

    render() {
        //movie = this.state.movie
        return (
            <>

                {
                    (this.state.movie == 'non') ?
                        <div className="spinner-border" role="status" />
                        :
                        <div>
                            <center>
                                <img src={`https://image.tmdb.org/t/p/original${this.state.movie.backdrop_path}`} className="img-fluid movie-banner" alt="..."></img>
                            </center>
                            <br></br>
                            <div className='row'>
                                <div className='col-2'>
                                    <img src={`https://image.tmdb.org/t/p/original${this.state.movie.poster_path}`} className="img-fluid poster" alt="..."></img>
                                    <h3 className='under-poster-content'>{this.state.movie.original_title}</h3>
                                    <h5 className='under-poster-content'>{this.state.movie.tagline}</h5>
                                </div>
                                <div className='col-10 movie-desc' >
                                    <center>
                                        <h1><strong>{this.state.movie.original_title}</strong></h1>
                                    </center>
                                    <div className='row ' >
                                        <div className='col-2 movie-highlights' style={{ height: "7rem", textAlign: "center", color: "red" }}>
                                            <h4>Popularity</h4>
                                            <h3>{this.state.movie.popularity}</h3>
                                        </div>
                                        <div className='col-2 movie-highlights' style={{ height: "7rem", textAlign: "center", color: "yellow" }}>
                                            <h4>Release Date</h4>
                                            <h3>{this.state.movie.release_date}</h3>
                                        </div>
                                        <div className='col-2 movie-highlights' style={{ height: "7rem", textAlign: "center", color: "green" }}>
                                            <h4>Average Vote</h4>
                                            <h3>{this.state.movie.vote_average}</h3>
                                        </div>
                                        <div className='col-2 movie-highlights' style={{ height: "7rem", textAlign: "center", color: "blue" }}>
                                            <h4>Vote Count</h4>
                                            <h3>{this.state.movie.vote_count}</h3>
                                        </div>
                                        <div className='col-2 movie-highlights' style={{ height: "7rem", textAlign: "center", color: "orange" }}>
                                            <h4>Run Time</h4>
                                            <h3>{this.state.movie.runtime}</h3>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <center>
                                            {
                                                this.state.movie.genres.map((genreObj) => (
                                                    <div className="badge rounded-pill text-bg-warning genre-tag" key={genreObj.id} >{genreObj.name}</div>
                                                ))
                                            }
                                        </center>
                                    </div>
                                    <div className='row' style={{ padding: "2rem", color: "yellow", fontSize: "1.25rem" }} >
                                        <h2>Overview</h2>
                                        {
                                            this.state.movie.overview
                                        }
                                    </div>
                                    <div className="d-grid gap-2">
                                        <center>
                                        {
                                            (this.state.FavouritesArray.includes(String(this.state.movie.id))) ?
                                                <button className="btn btn-outline-danger rmv-from-fav" type="button" onClick={() => this.rmvFromFav(this.state.movie.id)} >Remove From Favourites</button>
                                                :
                                                <button className="btn btn-outline-danger add-to-fav" type="button" onClick={() => this.addToFav(this.state.movie.id)}>Add To Favourites</button>
                                        }
                                        </center>
                                    </div>
                                </div>
                            </div>
                        </div>
                }
            </>
        )

    }
}

