import React, { Component } from 'react'
import '../Styles/FallBackSuspense.css'


class FallbackSuspense extends Component {
    render() {
        return (
            <>
                <div className="container uk-animation-fade">
                    <div className="loading">
                        <div className="loading-icon" >
                            <i className="fa fa-spinner fa-4x fa-pulse fa-fw"></i>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default FallbackSuspense
