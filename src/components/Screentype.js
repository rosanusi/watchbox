import React, { Component } from 'react';
import './../css/main.css';



class ScreenType extends Component {
    
    constructor(props){
        super(props);

        this.state = {
            screenType : [{id : 1, type: "Movie"},{id : 2, type: "TV Show"}]  
        }
      
    }


    setScreenType(e){

        let currentTarget = e.currentTarget;
	    if (currentTarget.classList.contains('selected')) return;
        currentTarget.classList.add('selected');
        let others = document.querySelectorAll('.screen-btn');
        
	    for (var i = 0; i < others.length; i++) {
		    if (others[i] === currentTarget) continue;
		    others[i].classList.remove('selected');
        }

        let selectedScreen = currentTarget.innerText;
        this.props.handleSelectedScreen(selectedScreen);       

    }

    render() { 
        
        let screenType = this.state.screenType;
        const Screens = screenType.map((screen) =>
            <button
                type="button"
                key={screen.id} 
                className="screen-btn"
                onClick={((e) => this.setScreenType(e))}
            >
                {screen.type}
            </button>
        );

        return (  
            <div className="select-screen">
                <form name="select-screen" className="question-form">
                    <h3 className="question-title">What do you feel like watching today?</h3>
                    <div className="question-options">
                        {Screens}
                    </div>
                </form>
            </div>
        );
    }
}


export default ScreenType ;