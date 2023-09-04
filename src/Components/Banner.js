import React, { Component } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
export default class Banner extends Component {
    constructor() {
        super();
        this.state = {
            movieList: []
        }
    }


    async componentDidMount() {
        let resp = await axios(`https://api.themoviedb.org/3/movie/popular?region=IN&language=en-US&page=1&api_key=d2d5c04da9b8133f121a383dc3cb2d2a`)
        let data = resp.data.results
        this.setState({
            movieList: [...data]
        })
    }

    render() {
        // let movieObj
        // if(this.state.movieList.length != 0)
        // movieObj = this.state.movieList[0]
        return (
            <>
                {
                    (this.state.movieList.length == 0) ?
                        <div className="spinner-border" role="status" />
                        :

                        <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" >
                            <div className="carousel-inner">
                                {
                                    this.state.movieList.map((movieObj) => 
                                    (this.state.movieList[0].id != movieObj.id)
                                    ?
                                        <div className="carousel-item" key={movieObj.id} >
                                            <Link to={`/moviepage/${movieObj.id}`} >
                                            <img src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`} className="d-block w-100" alt="..." />
                                            </Link>
                                            <div className="card text-bg-info mb-3 banner-card" style={{zIndex:"10"}}>
                                                <div className="card-body">
                                                    <h5 className="card-title">{movieObj.original_title}</h5>
                                                    <p className="card-text">{movieObj.overview}</p>
                                                </div>
                                            </div>
                                        </div>
                                        
                                    :
                                        <div className="carousel-item active" key={movieObj.id} >
                                            <img src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`} className="d-block w-100" alt="..." />
                                            <div className="card text-bg-info mb-3 banner-card" style={{zIndex:"10"}} >
                                                <div className="card-body">
                                                    <h5 className="card-title">{movieObj.original_title}</h5>
                                                    <p className="card-text">{movieObj.overview}</p>
                                                </div>
                                            </div>
                                        </div>
                                )
                                }                       
                            </div>
                            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Previous</span>
                            </button>
                            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Next</span>
                            </button>
                        </div>
                }
            </>
        )
    }
}
