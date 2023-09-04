import React from 'react'
import Movies_cards from './Movies_cards'
export default function MovieGenList() {

    let url = String(window.location.href)
    let i = url.length - 1
    while (url[i] != '/')
        i -= 1
    i += 1
    let genre = ''
    while (i < url.length) {
        genre = genre + url[i]
        i++
    }
    //console.log(genre)
    //let genreName = { 28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy', 80: 'Crime', 99: 'Documentary', 18: 'Drama', 10751: 'Family', 14: 'Fantasy', 36: 'History', 27: 'Horror', 10402: 'Music', 9648: 'Mystery', 10749: 'Romance', 878: 'Sci-fi', 10770: 'TV', 53: 'Thriller', 10752: 'War' };
    let genreID = { 'Action':28 ,'Adventure':12,'Animation':16 ,'Comedy':35 ,'Crime':80 ,'Documentry':99 , 'Drama':18 ,'Family': 10751,'Fantasy':14,'History':36, 'Horror':27 ,'Music':10402, 'Mystery':9648 , 'Romance': 10749, 'Sci-fi' : 878,'Thriller':53 ,'War':10752 };
    //console.log(genreID[genre])
  return (
    <Movies_cards genreTypeID={genreID[genre]} />
  )
}
