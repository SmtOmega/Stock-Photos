import React from 'react'
import {FcLike} from 'react-icons/fc'

const Photo = ({
    urls:{regular}, 
    alt_description,
    likes,
    user: {name, portfolio_url, profile_image: {medium}}
})=>{
    return (
        <article className="photo">
            <img src={regular} alt={alt_description} />
            <div className="photo-info">
                <div>
                    <h4>{name}</h4>
                    <p><FcLike className="icon"/>{likes}</p>
                </div>
                <a href={portfolio_url}><img src={medium} alt={name} className="profile-img" /></a>
            </div>
        </article>
    )
}

export default Photo