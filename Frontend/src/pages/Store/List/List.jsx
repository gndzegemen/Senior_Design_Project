import React, { useState, useEffect } from 'react'
import './List.scss'
import axios from 'axios';
import Card from '../../../components/Card/Card'
import { baseUrl } from "../../../helper/urls"

const List = ({ maxPrice, sort }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${baseUrl}/api/data`);
                setData(response.data);
            } catch (error) {
                console.error('There was an error!', error);
            }
        }

        fetchData();
    }, []);

    const sortedAndFilteredData = data
        .filter(item => item.price <= maxPrice)
        .sort((a, b) => {
            if (sort === 'asc') {
                return a.price - b.price;
            } else if (sort === 'desc') {
                return b.price - a.price;
            } else {
                return 0;
            }
        });

    return (
        <div className="list">
            {sortedAndFilteredData?.map(item => (
                <Card item={item} key={item.id} />
            ))}
        </div>
    )
}

export default List;
