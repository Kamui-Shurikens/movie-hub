import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export default function Discover() {

  let genreName = { 'Action':28 ,'Adventure':12,'Animation':26 ,'Comedy':35 ,'Crime':80 ,'Documentary':99 , 'Drama':18 ,'Family': 10751,'Fantasy':14,'History':36, 'Horror':27 ,'Music':10402, 'Mystery':9648 , 'Romance': 10749, 'Sci-fi' : 878,'Thriller':53 ,'War':10752 };
  let genreList = ['Action', 'Crime', 'Thriller', 'Adventure', 'Animation', 'Sci-fi','Documentry','Fantasy','Family','Drama', 'Family','History','Comedy','Horror','Music','Romance', 'Mystery', 'War']
  let colors = ['primary','success','danger','warning','info']
  let colorNumber = 0;
  let totalColors = colors.length

  let changeColor = ()=>{
    colorNumber = (colorNumber+1)%5;
  }
  return (
    <div>
      <h1 style={{ color: "white" }}>Discover</h1>
      <div style={{margin:"2rem"}}>   
      <center>   
        {
          genreList.map((genName)=>
            <div className={`card text-bg-${colors[colorNumber]} mb-3 category-cards`} style={{ maxWidth: "18rem" }} key={genName} >
              {changeColor()}
            <div className="card-body">
              <h5 className="card-title">{genName}</h5>
              <Link to={`/movieByGen/${genName}`} className={`btn btn-${colors[(colorNumber+1)%5]}`}>Go to {genName} !</Link>
            </div>
            </div>
          )
        }
      </center>
      </div>

    </div>
  )
}
