import React, { Component } from 'react'
import "../Styles/NoResultsFound.css"

export class NoResultsFound extends Component {
    render() {
        return (
            <>
                <div class="container uk-animation-fade">
                    <div class="noResults">
                        <div>No results found</div>
                    </div>
                </div>
            </>
        )
    }
}

export default NoResultsFound
