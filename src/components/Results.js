import React, { Component } from 'react';
import './../css/main.css';


class Results extends Component {


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
      color: starColor
    };

    return(   
        <span style={numberColor} className="content-rating">{contentRating}</span>
    );
    
  }

  getContentPage = (e) => {
    
    console.log(e.currentTarget.id);
    let contentId = e.currentTarget.id;

    this.props.handleGetContentPage(contentId);
        
  }


  

  render() {

    let results = this.props.results;

    console.log(results);

    let ResultDisplay;
    if(this.props.selectedScreenType === "Movie"){
      ResultDisplay = results.map((movie) =>
      <li className="content-block" key={movie.id}>
        <div className="imageCover" id={movie.id} onClick={this.getContentPage}>
          <img src = {`http://image.tmdb.org/t/p/w500/${movie.backdrop_path}` }
           alt=""/>
          <div className="content-brief">
            {this.setRating(movie.vote_average)} 
            <span className="content-title" id={movie.id} onClick={this.getContentPage}>{movie.title}</span>    
          </div>
        </div>
      </li>
      );

    } else {
      ResultDisplay = results.map((tvshow) =>
      <li className="content-block" key={tvshow.id}>
        <div className="imageCover" id={tvshow.id} onClick={this.getContentPage}>
          <img src=  {`http://image.tmdb.org/t/p/w500/${tvshow.poster_path}` }
          alt=""/>
        </div>
        <span className="content-title" id={tvshow.id} onClick={this.getContentPage}>{tvshow.original_name}</span>
        <span className="content-rating">{this.setRating(tvshow.vote_average)}</span>
      </li>
      );
    }
    
    
    return (
      <ul className="movie-grid">
        {ResultDisplay}
      </ul>
    )


  }

}


export default Results;