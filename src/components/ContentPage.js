import React, { Component } from 'react';
import './../css/main.css';
import Moment from 'react-moment';  
// import FiveStar from './../images/fivestar.svg';
// import FourStarHalf from './../images/fourhalfstar.svg';
// import FourStar from './../images/fourstar.svg';
// import ThreeStarHalf from './../images/threehalfstar.svg';
// import ThreeStar from './../images/threestar.svg';
// import TwoStarHalf from './../images/twohalfstar.svg';
// import TwoStar from './../images/twostar.svg';
// import OneStar from './../images/onestar.svg';


Moment.globalFormat = 'D MMM YYYY';

class ContentPage extends Component {



  setGenres = (genres) => {
    const genreList = Object.values(genres);

    let contentGenre = [];
    for (const genre of genreList) {
      contentGenre.push(genre.name);  
    }

    return contentGenre.join(", ");
  }

  setRating = (contentRating) => {

    let starColor;

    if (contentRating < 4) {
      starColor = "#FD5437";
    } else if ((contentRating >= 4) && (contentRating <= 6.9) ) {
      starColor = "#FDC837";      
    } else if ((contentRating >= 7) && (contentRating <= 10) ) {
      starColor = "#52FD37";
    }

    const numberColor = {
      color: starColor,
      fontSize: '30px',
      fontWeight: '400',
      border: `1px solid ${starColor}`
    };

    return(   
        <span style={numberColor} className="content-rating">{contentRating}</span>
    );

  }


  setDate = (date) => {
    let dateToFormat = date;
    return <span>Release Date: <Moment>{dateToFormat}</Moment></span>;
  }

  



  render() {

    let content = this.props.contentDetails;
    let bgUrl = "http://image.tmdb.org/t/p/original" + content.backdrop_path;

    const bgStyle = {
      backgroundImage: `url(${bgUrl})`,
      backgroundColor: 'purple',
      backgroundBlendMode : 'multiply'
    };



    let cast = this.props.contentCast;
    let castBrief = cast.slice(0, 10)

    console.log(cast.slice(0, 10));

    let contentCast = castBrief.map((actor, index) =>
      <li key={cast[index].cast_id}>
        <div className="actor-img">
          <img src={`http://image.tmdb.org/t/p/w185/${cast[index].profile_path}`} alt="" />
        </div>
        <div className="actor-details">
          <span className="name">{cast[index].name}</span>        
          <span className="character">{cast[index].character}</span>
        </div>
      </li>
    );

          
    return (
      <div style={bgStyle} className="content-page">
        <div className="background-conceal">
          <div className="content-details">
            <div className="content-wrap">

              <div className="left-pane">
                <div className="content-poster">
                  <img src = {`http://image.tmdb.org/t/p/original/${content.poster_path}`} alt ={content.original_title} />
                </div>
              </div>

              <div className="right-pane">

                <div className="basic-details">
                  <h2 className="title">{content.original_title}</h2>
                  <small className="tagline">{content.tagline}</small>
                  <div className="synopsis">
                    <p>{content.overview}</p>
                  </div>                
                </div>

                <div className="content-metadata">
                    <span className="rating">{this.setRating(content.vote_average)}</span>
                    <span className="genres">{this.setGenres(content.genres)}</span>                
                    <span className="date">{this.setDate(content.release_date)}</span>                
                </div>
                
                <ul className="content-cast">

                  {contentCast}
                </ul>                
              </div>     
            </div>   
          </div>  

        </div>
      </div>   
    )
  }
}


export default ContentPage;