import React, { Component } from 'react'
import { movies } from './GetMovies'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { updateFavsFromFireBase, updateFavsToFireBase } from '../firebase';
import { hover } from '@testing-library/user-event/dist/hover';

export default class Favourites extends Component {

    constructor() {
        super();

        this.state = {
            genres: [],
            currGenre: 'All Genres',
            movieList: []
        }
    }

    async componentDidMount() {
        updateFavsFromFireBase()
        let fvIds = []
        if(localStorage.getItem("Favourites") != undefined)
            fvIds = JSON.parse(localStorage.getItem("Favourites"))
        let movieObjs = []
        for (let i = 0; i < fvIds.length; i += 1) {
            let resp = await axios.get(`https://api.themoviedb.org/3/movie/${fvIds[i]}?language=en-US&api_key=d2d5c04da9b8133f121a383dc3cb2d2a`)
            let data = resp.data
            let tobj = { ...data }
            await this.setState({
                movieList:[...this.state.movieList,tobj]
            })
        }
    }

    genreFilter = async (genreName) => {
        if (genreName == 'All Genres') {
            let fvIds = JSON.parse(localStorage.getItem("Favourites"))
            let movieObjs = []
            await this.setState({
                currGenre: genreName,
                movieList : []
            })
            for (let i = 0; i < fvIds.length; i += 1) {
                let resp = await axios.get(`https://api.themoviedb.org/3/movie/${fvIds[i]}?language=en-US&api_key=d2d5c04da9b8133f121a383dc3cb2d2a`)
                let data = resp.data
                let tobj = { ...data }
                
                await this.setState({
                    movieList : [...this.state.movieList,tobj]
                })
            }
        }
        else {
            let fvIds = JSON.parse(localStorage.getItem("Favourites"))
            let movieObjs = []
            await this.setState({
                currGenre: genreName,
                movieList: []
            })
            for (let i = 0; i < fvIds.length; i += 1) {
                let resp = await axios.get(`https://api.themoviedb.org/3/movie/${fvIds[i]}?language=en-US&api_key=d2d5c04da9b8133f121a383dc3cb2d2a`)
                let data = resp.data
                let tobj = { ...data }
                let present = false
                tobj.genres.forEach((gObj) => {
                    if (gObj.name == genreName)
                        present = true
                })
                if (present)
                {
                    await this.setState({
                        movieList : [...this.state.movieList,tobj]
                    })
                }
            }
        }
    }

    rmvFromFav = (movieID) => {
        let fvIds = JSON.parse(localStorage.getItem("Favourites"))
        fvIds = fvIds.filter((ID) => {
            return (ID != movieID)
        })
        localStorage.setItem("Favourites", JSON.stringify(fvIds))
        updateFavsToFireBase()
        this.setState({
            movieList: this.state.movieList.filter((movieObj) => {
                return (movieObj.id != movieID)
            })
        })
    }

    popularitySortInc = () =>{
        
        let tempList = [...this.state.movieList]

        tempList.sort((movieA,movieB)=>{
            if(movieA.popularity < movieB.popularity)
                return -1;
            else
                return 1;
        })
        this.setState({
            movieList: [...tempList]
        })
    }

    popularitySortDec= () =>{
        
        let tempList = [...this.state.movieList]

        tempList.sort((movieA,movieB)=>{
            if(movieA.popularity < movieB.popularity)
                return 1;
            else
                return -1;
        })
        this.setState({
            movieList: [...tempList]
        })
    }

    ratingSortInc = () =>{
        
        let tempList = [...this.state.movieList]

        tempList.sort((movieA,movieB)=>{
            if(movieA.vote_average < movieB.vote_average)
                return -1;
            else
                return 1;
        })
        this.setState({
            movieList: [...tempList]
        })
    }

    ratingSortDec = () =>{
        
        let tempList = [...this.state.movieList]

        tempList.sort((movieA,movieB)=>{
            if(movieA.vote_average < movieB.vote_average)
                return 1;
            else
                return -1;
        })
        this.setState({
            movieList: [...tempList]
        })
    }

    dateSortDec = () =>{
        
        let tempList = [...this.state.movieList]

        tempList.sort((movieA,movieB)=>{
            if(movieA.release_date < movieB.release_date)
                return 1;
            else
                return -1;
        })
        this.setState({
            movieList: [...tempList]
        })
    }

    dateSortInc = () =>{
        
        let tempList = [...this.state.movieList]

        tempList.sort((movieA,movieB)=>{
            if(movieA.release_date < movieB.release_date)
                return -1;
            else
                return 1;
        })
        this.setState({
            movieList: [...tempList]
        })
    }

    render() {
        // let movieList = movies.results
        //let genreName = { 28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy', 80: 'Crime', 99: 'Documentary', 18: 'Drama', 10751: 'Family', 14: 'Fantasy', 36: 'History', 27: 'Horror', 10402: 'Music', 9648: 'Mystery', 10749: 'Romance', 878: 'Sci-fi', 10770: 'TV', 53: 'Thriller', 10752: 'War', 37: 'Western' };
        //let genreList = ['All Genres', 'Action', 'Crime', 'Thriller', 'Adventure', 'Animation', 'Science Fiction', 'Fantasy', 'Drama', 'Family', 'Comedy', 'Romance', 'Mystery', 'War']
        let genreList = ['All Genres','Action', 'Crime', 'Thriller', 'Adventure', 'Animation', 'Sci-fi','Documentry','Drama', 'Family','History','Comedy','Horror','Romance', 'Mystery']
        // movieList.map((movieObj) => {
        //     let gids = movieObj.genre_ids
        //     gids.map((gid)=>{
        //         if(! genreList.includes(genreName[gid]) )
        //             genreList.push(genreName[gid])
        //     })
        // })

        // console.log(genreList)

        return (


            <div>
                <div className='row'>
                    <div className='col-2'>
                        <ul className="list-group genre-list" data-bs-theme="dark" >
                            {
                                genreList.map((genre_name) =>

                                    (genre_name == this.state.currGenre) ?
                                        <li className="list-group-item active" key={genre_name} aria-current="true" onClick={() => { this.genreFilter(genre_name) }} >{genre_name}</li>
                                        :
                                        <li className="list-group-item" key={genre_name} aria-current="true" onClick={() => { this.genreFilter(genre_name) }} >{genre_name}</li>

                                )
                            }
                        </ul>
                    </div>
                    {
                        (this.state.movieList.length == 0)

                            ?
                            <div className="text-primary empty-fav" role="status">
                                <h1>Uhh, NOTHING 😭😿</h1>
                            </div>

                            :
                            <div className='col-10'>
                                {/* <div className="input-group filter-search row" data-bs-theme="dark" >
                            <input type="text" aria-label="First name" className="form-control" style={{ marginRight: "1rem" }} placeholder='Search Movies' />
                            <input type="number" aria-label="Last name" className="form-control" placeholder='Number of movies' />
                        </div> */}

                                <div className="table-responsive row" data-bs-theme="dark">
                                    <table className="table align-middle">
                                        <thead>
                                            <tr>
                                                <th></th>
                                                <th>Title</th>
                                                <th>Genre</th>
                                                <th><p className='list-sorter' style={{display:"inline"}} onClick={this.dateSortDec} >⬆️</p>ReleaseDate<p className='list-sorter' style={{display:"inline"}} onClick={this.dateSortInc} >⬇️</p></th>
                                                <th><p className='list-sorter' style={{display:"inline"}} onClick={this.popularitySortDec} >⬆️</p>Popularity<p className='list-sorter' style={{display:"inline"}} onClick={this.popularitySortInc} >⬇️</p></th>
                                                <th><p className='list-sorter' style={{display:"inline"}} onClick={this.ratingSortDec}>⬆️</p>Rating<p className='list-sorter' style={{display:"inline"}} onClick={this.ratingSortInc} >⬇️</p></th>
                                                <th>Overview</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                this.state.movieList.map((movieObj) =>
                                                    <tr className='movie-row' key={movieObj.id} >
                                                        
                                                        <td><Link to={`/moviepage/${movieObj.id}`} ><img src={`https://image.tmdb.org/t/p/original${movieObj.poster_path}`} style={{ width: "10vw" }} ></img></Link></td>
                                                        
                                                        <td>{movieObj.original_title}</td>
                                                        <td>{
                                                            movieObj.genres.map((genreObj) => `${genreObj.name} `)
                                                        }</td>
                                                        <td>{movieObj.release_date}</td>
                                                        <td>{movieObj.popularity}</td>
                                                        <td>{movieObj.vote_average}</td>
                                                        <td>{movieObj.overview}</td>
                                                        <td> <button type="button" className="btn btn-danger" data-bs-theme="dark" onClick={() => { this.rmvFromFav(String(movieObj.id)) }}>Delete</button>
                                                        </td>
                                                    </tr>
                                                )
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                    }
                </div>
                {/* <nav aria-label="Page navigation example" className='pagination' style={{display:"flex",justifyContent:"center"}} >
                    <ul className="pagination">
                        <li className="page-item">
                            <a className="page-link" href="#" aria-label="Previous">
                                <span aria-hidden="true">&laquo;</span>
                            </a>
                        </li>
                        <li className="page-item"><a className="page-link" href="#">1</a></li>
                        <li className="page-item"><a className="page-link" href="#">2</a></li>
                        <li className="page-item"><a className="page-link" href="#">3</a></li>
                        <li className="page-item">
                            <a className="page-link" href="#" aria-label="Next">
                                <span aria-hidden="true">&raquo;</span>
                            </a>
                        </li>
                    </ul>
                </nav> */}
            </div>
        )
    }
}
