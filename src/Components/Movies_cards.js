import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
import { updateFavsFromFireBase, updateFavsToFireBase } from '../firebase';
export default class Movies_cards extends Component {

    constructor() {
        super();
        this.state = {
            pageArr: [1],  // this will help in creating pagination buttons
            currPage: 1,
            movies: [],   // array of arrays, each array consisting a list of 20 movies
            FavouritesArray: [],
            changeState: true
        }
    }
    async componentDidMount() {
        updateFavsFromFireBase()
        let resp;
        if(this.props.genreTypeID == undefined)
            resp = await axios.get(`https://api.themoviedb.org/3/trending/movie/day?language=en&api_key=d2d5c04da9b8133f121a383dc3cb2d2a&page=${this.state.currPage}`)
        else
            resp = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=d2d5c04da9b8133f121a383dc3cb2d2a&with_genres=${this.props.genreTypeID}&page=${this.state.currPage}`)
        const data = resp.data.results
        // console.log(resp)
        let fvArr = []
        if(localStorage.getItem("Favourites") != undefined)
        {
            fvArr = JSON.parse(localStorage.getItem("Favourites"))
        }
        else 
        {
            fvArr = []
        }
        this.setState({
            movies: [...data],
            FavouritesArray : [...fvArr]
        })
        //console.log("response")
        // console.log(this.FavouritesArray)
    }

    async updatePage() {
        let resp;
        if(this.props.genreTypeID == undefined)
            resp = await axios.get(`https://api.themoviedb.org/3/trending/movie/day?language=en&api_key=d2d5c04da9b8133f121a383dc3cb2d2a&page=${this.state.currPage}`)
        else
            resp = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=d2d5c04da9b8133f121a383dc3cb2d2a&with_genres=${this.props.genreTypeID}&page=${this.state.currPage}`)
        const data = resp.data
        var focus = document.getElementById('trending');
        // console.log(focus);
        focus.scrollIntoView({ behavior: 'auto' });
        this.setState({
            movies: [...data.results]
        }, () => {
            if (this.state.currPage > this.state.pageArr.length) {
                let tempPageArr = [...this.state.pageArr]
                tempPageArr.push(this.state.currPage);
                this.setState({
                    pageArr: [...tempPageArr]
                })
            }
        })
    }

    nextPage = () => {
        this.setState({
            currPage: this.state.currPage + 1
        }, this.updatePage)

    }

    setPage = (pageNum) => {
        this.setState({
            currPage: pageNum
        }, this.updatePage)
    }

    prevPage = () => {
        if (this.state.currPage != 1) {
            this.setState({
                currPage: this.state.currPage - 1
            }, this.updatePage)
        }
    }

    addToFav = (movieID) => {
        let fv = localStorage.getItem("Favourites")
        let fvArr = []
        if (fv == undefined) {
            fvArr = [String(movieID)]
            // this.state.FavouritesArray = [...fvArr]
            fv = JSON.stringify(fvArr)
            localStorage.setItem("Favourites", fv)
        }
        else {
            fvArr = JSON.parse(fv)
            fvArr.push(String(movieID))
            //this.FavouritesArray = [...fvArr]
            fv = JSON.stringify(fvArr)
            localStorage.setItem("Favourites", fv)
        }
        updateFavsToFireBase()
        this.setState({
            changeState: !this.state.changeState,
            FavouritesArray : [...fvArr]
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
        //this.FavouritesArray = [...fvArr]
        fv = JSON.stringify(fvArr)
        localStorage.setItem("Favourites", fv)
        updateFavsToFireBase()
        this.setState({
            changeState: !this.state.changeState,
            FavouritesArray : [...fvArr]
        })
    }


    render() {
        let genreIDtoName = { 28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy', 80: 'Crime', 99: 'Documentary', 18: 'Drama', 10751: 'Family', 14: 'Fantasy', 36: 'History', 27: 'Horror', 10402: 'Music', 9648: 'Mystery', 10749: 'Romance', 878: 'Sci-fi', 10770: 'TV', 53: 'Thriller', 10752: 'War', 37: 'Western' };
        return (
            <>
                {
                    (this.state.movies.length == 0) ?
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        :
                        <div>
                            <div id='trending'><strong><h1 style={{ color: "white", }}># {
                                (this.props.genreTypeID == undefined)? "Trending" : genreIDtoName[this.props.genreTypeID]
                            } </h1></strong></div>
                            <div className="movieList" >

                                {
                                    this.state.movies.map((movieObj) => (
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
                                                    (this.state.FavouritesArray.includes(String(movieObj.id)))?
                                                    <button className="btn btn-outline-danger rmv-from-fav" type="button" onClick={()=>this.rmvFromFav(movieObj.id)} >Remove From Favourites</button>
                                                    :
                                                    <button className="btn btn-outline-danger add-to-fav" type="button" onClick={()=>this.addToFav(movieObj.id)}>Add To Favourites</button>
                                                }
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                            <div style={{ display: "flex", justifyContent: "center" }}>
                                <nav aria-label="Page navigation example">
                                    <ul className="pagination">
                                        <li className="page-item"><a className="page-link" onClick={this.prevPage} style={{ backgroundColor: "black", color: "greenyellow" }} >Previous</a></li>
                                        {
                                            this.state.pageArr.map((pageNum) => (
                                                <li className="page-item" key={pageNum}   ><a className="page-link" onClick={() => this.setPage(pageNum)} >{pageNum}</a></li>
                                            ))
                                        }
                                        <li className="page-item"><a className="page-link" onClick={this.nextPage} style={{ backgroundColor: "black", color: "greenyellow" }} >Next</a></li>
                                    </ul>
                                </nav>
                            </div>
                        </div>

                }
            </>
        )
    }
}
