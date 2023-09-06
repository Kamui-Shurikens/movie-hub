import React, { Component } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { updateFavsFromFireBase, updateFavsToFireBase } from '../firebase';
export default class SearchResults extends Component {

    constructor() {
        super();
        this.state = {
            results: 'non',
            FavouritesArray : [],
            changeState : true,
            searchQueryText: ''
        }
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
            changeState: !this.state.changeState,
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
            changeState: !this.state.changeState,
            FavouritesArray: [...fvArr]
        })
    }

    async componentDidMount() {
        updateFavsFromFireBase()
        let fvarr = JSON.parse(localStorage.getItem("Favourites")); 

        let url = String(window.location.href)
        let i = url.length - 1
        while (url[i] != '/')
            i -= 1
        i += 1
        let searchText = ''
        while (i < url.length) {
            searchText = searchText + url[i]
            i++
        }
        let arr = searchText.split('%20')
        searchText = "";
        for (let i = 0; i < arr.length; i++) {
            searchText = searchText + arr[i] + "+"
        }
        searchText = searchText.slice(0, -1)
        searchText = searchText.slice(0,-1)
        //console.log("search query", searchText)
        let resp = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=d2d5c04da9b8133f121a383dc3cb2d2a&query=${searchText}`)
        if(fvarr == undefined)
        {
            this.setState({
                results: [...resp.data.results],
                FavouritesArray: [],
                searchQueryText: searchText
            })
        }
        else
        {
        this.setState({
            results: [...resp.data.results],
            FavouritesArray: [...fvarr],
            searchQueryText: searchText
        })
    }
    }

    render() {
        return (
            <>
                {
                    (this.state.results == 'non') ?
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div> :
                        <div>
                            <h1 style={{ color: "white" }}>RESULTS FOR "{this.state.searchQueryText}"</h1>
                            <div className="movieList" >

                                {
                                    this.state.results.map((movieObj) => (
                                        <div className='full-card' key={movieObj.id}>
                                            <Link to={`/moviepage/${movieObj.id}`} >
                                                <div className="card mb-3 movie-card" style={{ maxWidth: "617px", backgroundColor: "black" }}>
                                                    <div className="row g-0" style={{ backgroundColor: "black" }}>
                                                        <div className="col-md-4" style={{ backgroundColor: "black" }}>
                                                            <img src={`https://image.tmdb.org/t/p/original${movieObj.poster_path}`} className="img-fluid rounded-start" alt="..." />
                                                        </div>

                                                        <div className="col-md-8">
                                                            <div className="card-body">
                                                                <h5 className="card-title">{movieObj.original_title}</h5>
                                                                <p className="card-text">{movieObj.overview}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                            <div className="d-grid gap-2">
                                                {
                                                    (this.state.FavouritesArray.includes(String(movieObj.id))) ?
                                                        <button className="btn btn-outline-danger rmv-from-fav" type="button" onClick={() => this.rmvFromFav(movieObj.id)} >Remove From Favourites</button>
                                                        :
                                                        <button className="btn btn-outline-danger add-to-fav" type="button" onClick={() => this.addToFav(movieObj.id)}>Add To Favourites</button>
                                                }
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>

                }
            </>
        )
    }
}
