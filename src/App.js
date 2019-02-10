import React, { Component } from 'react';
// import "tachyons";
import ScreenType from './components/Screentype';
import GenreType from './components/GenreType';
import Years from './components/Years';
import Results from './components/Results';
import Navigate from './components/Navigate';
import ContentPage from './components/ContentPage';



class App extends Component {

  constructor(props){
    super(props);

    this.state = ({
      genres : null,
      years : null,
      selectedScreenType : null,    
      selectedGenres : null,    
      selectedYears : null,
      results : null,
      resultUrl : null,
      page : 1,
      contentDetails : null,
      cast : null,
      error: false,
      isLoading: false,
      screenSelected : false,
      genreSelected : false,
      yearsSelected: false,
      contentClicked: false
    })
  } 

  async fetchApi(url) {

    let response = await fetch(url);
    let data = await response.json();

    return data;

  }


  handleSelectedScreen = (selectedScreen) => {

    this.setState({
      screenSelected : true,
      selectedScreenType : selectedScreen
    }, () => {
      console.log(this.state.selectedScreenType);
    });

      this.setGenreList();


  }

  setGenreList = () => {

    this.setState({ isLoading: true });
    let  api = (this.state.selectedScreenType === 'Movie') ? 'https://api.themoviedb.org/3/genre/movie/list?api_key=' : 'https://api.themoviedb.org/3/genre/tv/list?api_key=';
    let apikey = 'e1342f00c4d9ed5321708f7f4fd1208b';

    let url = api + apikey + '&language=en-US';

    this.fetchApi(url)

      .then( data => 
        this.setState({
          genres : data.genres,
          isLoading : false
        }, () => {
        console.log(this.state.genres);
      }))
        
      .catch(
        reason => 
        this.setState({
          error : reason.message
        })
      )
  }


  handleSetSelectedGenres = (selectedGenres) => {

    this.setState({
      selectedGenres : selectedGenres,
      genreSelected : true
    }, () => {
      console.log(this.state.selectedGenres);
    });

    this.setYearList();

  }

  setYearList = () => {

    var currentYear = new Date().getFullYear(), years = [],
        
    startYear = currentYear - 30;
    while ( startYear <= currentYear ) {
            years.unshift(startYear++);
    } 

    this.setState({ 
        years  :  years
    });

  }

  handleSetSelectedYears = (selectedYears) => {
  
    this.setState({selectedYears}, () => {
      this.setState({ yearsSelected : true  });
      console.log(this.state.selectedYears)
      this.handleSetResults();
    });

  }

  handleSetResults = () => {


    this.setState({ isLoading : true });

    let selectedScreenType = this.state.selectedScreenType;
    let genreList = this.state.selectedGenres.join();
    let yearsList = this.state.selectedYears.join();


    let url = (selectedScreenType === 'Movie') ? 'https://api.themoviedb.org/3/discover/movie?api_key=' : 'https://api.themoviedb.org/3/discover/tv?api_key=';
    let apikey = 'e1342f00c4d9ed5321708f7f4fd1208b';
    let language = '&language=en-US?';
    let genre = 'with_genres=' +  genreList;
    let year = '&primary_release_year=' + yearsList;
    let nextPage = '&page=' + this.state.page


    let api = url + apikey + language + genre + year + nextPage;

    this.fetchApi(api)

      .then(result => this.setState({ 
        results: result.results, 
        resultUrl: url,
        page: result.page, 
        isLoading: false 
      }))

      .catch(
        reason => 
        this.setState({
          error : reason.message
        })
      )

  }

  handleSetPrevPage = () => {
    this.setState({
        page : this.state.page - 1
    }, () => {
        console.log(this.state.page);
        this.handleSetResults();
    });
  }

  handleSetNextPage = () => {
    this.setState({
        page : this.state.page + 1
    }, () => {
        console.log(this.state.page);
        this.handleSetResults();
    });
  }

  handleGetContentPage = (contentId) => {
    this.setState({ contentClicked : true  });
    this.setContentCredit(contentId);
    this.setContentDetails(contentId);
  }

  async setContentDetails(id) {
  
    this.setState({ isLoading : true });

    let  url = (this.state.selectedScreenType === 'Movie') ? 'https://api.themoviedb.org/3/movie/' + id + '?api_key=' : 'https://api.themoviedb.org/3/tv/' + id + '?api_key=';
    let apikey = 'e1342f00c4d9ed5321708f7f4fd1208b';
    let language = '&language=en-US?';

    let api = url + apikey + language;

    this.fetchApi(api)

      .then( result => 
        this.setState({
          contentDetails : result,
          isLoading : false
        }))
    
      .catch(
        reason => 
        this.setState({
          error : reason.message
        })
      )

  }

  setContentCredit = (id) => {

    let  url = ( this.state.selectedScreenType === 'Movie') ? 'https://api.themoviedb.org/3/movie/' + id + '/credits?api_key=' : 'https://api.themoviedb.org/3/tv/' + id + '/credits?api_key=';
    let apikey = 'e1342f00c4d9ed5321708f7f4fd1208b';
    let api = url + apikey + '&language=en-US';

    this.fetchApi(api)

      .then( data => 
        this.setState({
          cast : data.cast
        }, () => {
        console.log(this.state.cast);
      }))
        
      .catch(
        reason => 
        this.setState({
          error : reason.message
        })
      )

  }




  render() {
  
      // if(this.state.error) {
      //   return <p>yoooooo</p>;
      // }

    if(this.state.isLoading) {
      
      return(
        <div>Loading some shit</div>
      )

    }
      
    if(this.state.screenSelected && this.state.genreSelected === false){
      return(
        <div className="question-wrap">
          <GenreType
            genreList = {this.state.genres}
            selectedScreenType = {this.state.selectedScreenType}
            handleSetSelectedGenres = {this.handleSetSelectedGenres}
          /> 
        </div>      
      )              
    }

    if(this.state.screenSelected && this.state.genreSelected && this.state.yearsSelected === false){
      return(
        <div className="question-wrap">
          <Years
            yearsList = {this.state.years}          
            handleSetSelectedYears = {this.handleSetSelectedYears}   
            selectedYears = {this.state.selectedYears}

          />
        </div>      
      )              
    }


    if(this.state.screenSelected && this.state.genreSelected && this.state.yearsSelected && this.state.contentClicked === false){
      return(
        <div className="watchbox-results">
          <h3 className="title">Movies matching your search parameters</h3>
          <Results 
              selectedScreenType = {this.state.selectedScreenType}
              results = {this.state.results} 
              handleSetResults = {this.handleSetResults}            
              handleGetContentPage = {this.handleGetContentPage}            
          />
          <Navigate
              handleSetPrevPage = {this.handleSetPrevPage}
              handleSetNextPage = {this.handleSetNextPage}
              page = {this.state.page}
          />
        </div>      
      )              
    }


    if(this.state.screenSelected && this.state.genreSelected && this.state.yearsSelected && this.state.contentClicked){
      return(
        <ContentPage 
          contentDetails = {this.state.contentDetails}
          contentCast = {this.state.cast}
        />
      )              
    }

    return (
      <div className="question-wrap">
        <ScreenType
          handleSelectedScreen={this.handleSelectedScreen}
        />      
      </div>
    );

  }

}

export default App;