import React, { useState, useEffect } from 'react';
import './Products.scss';
import List from '../List/List'

const Products = ({ item }) => {
  
  const [maxPrice, setMaximumPrice] = useState(25)
  const [sort, setSort] = useState(null)

  return (
    <div className='products'>
      <div className="left">
        <div className="filterItem">
          <h2>App Categories</h2>
          <div className="inputItem">
            <input type="checkbox" id="1" value={1} />
            <label htmlFor="1">Creative</label>
          </div>
          <div className="inputItem">
            <input type="checkbox" id="2" value={2} />
            <label htmlFor="2">Work</label>
          </div>
          <div className="inputItem">
            <input type="checkbox" id="3" value={3} />
            <label htmlFor="3">Game</label>
          </div>
        </div>
        <div className="filterItem">
          <h2>Filter by price</h2>
          <div className="inputItem">
            <span>0</span>
            <input type="range" min={0} max={25} onChange={(e)=>setMaximumPrice(e.target.value)}/>
            <span>{maxPrice}</span>
          </div>
        </div>
        <div className="filterItem">
          <h2>Sort by</h2>
          <div className="inputItem">
            <input type="radio" id="asc" value="asc" name='price' onChange={e=>setSort("asc")}/>
            <label htmlFor="asc">Price (Lowest first)</label>
          </div>
          <div className="inputItem">
            <input type="radio" id="desc" value="desc" name='price' onChange={e=>setSort("desc")}/>
            <label htmlFor="desc">Price (Highest first)</label>
          </div>
        </div>
      </div>
      <div className="right">
        <img className='catImg' 
        src="https://images.pexels.com/photos/6068533/pexels-photo-6068533.jpeg?auto=compress&cs=tinysrgb&w=1600" 
        alt="" />
        <List maxPrice={maxPrice} sort={sort} />
      </div>
    </div>
  )
}

export default Products;
