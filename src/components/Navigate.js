import React, { Component } from 'react'

class Navigate extends Component {

    setPrevPage = (e) => {  
      e.preventDefault();
      this.props.handleSetPrevPage();
    }

    setNextPage = (e) => {  
        e.preventDefault();
        this.props.handleSetNextPage();
    }
  
    render() {
    
    if( this.props.page === 1){
      return (
        <div>
          <button type="button" ref="nextPage" onClick={((e) => this.setNextPage(e))} className="next-page">Next Page</button>
        </div>
      )
    } else {

      return (
        <div>
          <button type="button" ref="prevPage" onClick={((e) => this.setPrevPage(e))} className="prev-page">Prev Page</button>
          <button type="button" ref="nextPage" onClick={((e) => this.setNextPage(e))} className="next-page">Next Page</button>
        </div>
      )
  
    }    
  }
}

export default Navigate;