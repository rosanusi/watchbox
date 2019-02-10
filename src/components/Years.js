import React, { Component } from 'react';
import './../css/main.css';



class Years extends Component {


    setSelectedYears = (e) => {

        
        e.preventDefault();
        
        var checkboxes = document.getElementsByName("year");
        var checkboxesChecked = [];
        // loop over them all
        for (var i=0; i<checkboxes.length; i++) {
        // And stick the checked ones onto an array...
            if (checkboxes[i].checked) {
                checkboxesChecked.push(checkboxes[i].value);
            }
        }

        this.props.handleSetSelectedYears(checkboxesChecked);
    }

    
    render() { 

        let yearsList = this.props.yearsList;
        let Years = Object.entries(yearsList).map(([key, value]) => 
            
            /* do what you want */
            <label key={key}>
                <input type="checkbox" name="year" value={value} />
                <span className="question-checkbox">{value}</span>            
            </label>

        )

        return (  
            <div className="select-year">
                <form name="select-year" ref="yearForm" className="question-form" onSubmit={((e) => this.setSelectedYears(e))}>
                    <h3 className="question-title">What years will you like to select from?</h3>
                    <div className="question-options">
                        {Years}
                    </div>
                    <button type="submit" className="question-btn">Continue</button>
                </form>
            </div>
        );
    }
}


export default Years ;