import React, { Component } from 'react'
import "./emo.css"
// 781ab5f87c96475dbe34af3a334cec46 api key
export class newsItem extends Component {
    render() {
        let { title, description, imgUrl, newsUrl, author, publishedAt,source } = this.props
        return (
            <div>
                <div className="card">
                    <img src={imgUrl} className="card-img-top" style={{ height: "200px" }} alt="Oops somethings went wrong" />
                    <div className="card-body">
                        <h5 className="card-title">{title}... <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left: "80%", zIndex: "1"}} >
                            {source}
                        </span></h5>
                        <p className="card-text">{description}...</p>
                        <p className='card-text'><small className='text-danger'>By {author === null ? "Unkown" : author} on {new Date(publishedAt).toGMTString()}</small></p>
                        <a href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read more</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default newsItem