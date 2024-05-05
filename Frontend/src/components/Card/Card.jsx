import React from 'react'
import { Link } from 'react-router-dom'
import './Card.scss'

const Card = ({ item }) => {

    return (
        <Link className='link' to={`/product/${item.idd}`}>
            <div className='card'>
                <div className="image">
                    <img src={item.img} alt="" />
                    <img src={item.img} alt="" />
                </div>
                <div className="title">
                    <h2>{item.title}</h2>
                </div>
                <div className="price">
                    <h3>${item.price}</h3>
                </div>
            </div>
        </Link>

    )
}

export default Card