import React, { Component } from 'react';
import './../css/main.css';



class GenreType extends Component {

    setselectedGenres = (e) => {
        e.preventDefault();

        var checkboxes = document.getElementsByName("genreType");
        var checkboxesChecked = [];

        // loop over them all
        for (var i=0; i<checkboxes.length; i++) {
        // And stick the checked ones onto an array...
            if (checkboxes[i].checked) {
                checkboxesChecked.push(checkboxes[i].value);
            }
        }
        
        this.props.handleSetSelectedGenres(checkboxesChecked);

    }



    render() { 

        let genreList = this.props.genreList;

        const Genres = genreList.map((genre) =>
            <label key={genre.id}>
                <input type="checkbox" name="genreType" value={genre.id} />
                <span className="question-checkbox">{genre.name}</span>            
            </label>
        );


        return (  
            <div className="select-genre">
                <form name="select-genre" ref="genreForm" className="question-form" onSubmit={((e) => this.setselectedGenres(e))}>
                    <h3 className="question-title">What kind of {this.props.selectedScreenType} do you feel like watching today?</h3>
                    <div className="question-options">
                        {Genres}
                    </div>
                    <button type="submit" className="question-btn">Continue</button>
                </form>


            </div>


        );
    }
}


export default GenreType ;