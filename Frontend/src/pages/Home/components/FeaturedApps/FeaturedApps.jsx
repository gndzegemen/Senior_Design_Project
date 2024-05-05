import React from 'react'
import './FeaturedApps.scss'
import Card from '../../../../components/Card/Card'



const FeaturedApps = ({type}) => {

  const data = [
    {
      idd: 1,
      img:'https://img.freepik.com/premium-photo/youtube-logo-video-player-3d-design-video-media-player-interface_41204-12379.jpg',
      img2: 'https://cdn.pixabay.com/photo/2021/05/24/16/24/youtube-6279763_1280.png',
      title: "Youtube",
      isNew: true,
      price: 15
    },
    {
      idd: 2,
      img: 'https://img.freepik.com/premium-vector/blue-social-media-logo_197792-1759.jpg',
      title: "Facebook",
      isNew: true,
      price: 10
    },
    {
      idd: 3,
      img: "https://cdn.icon-icons.com/icons2/2428/PNG/512/notion_black_logo_icon_147102.png",
      title: "Notion",
      price: 8

    },
    {
      idd: 4,
      img: "https://logo-base.com/logo/netflix_icon_logo_logotype_png_1024.png",
      title: "Netflix",
      price: 15
    }

  ]

  return (
    <div className='featuredApps'>
      <div className="top">
        <h1>{type} Apps</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Sunt iure porro nisi accusantium labore ratione commodi
          fugit architecto voluptate laborum, officiis excepturi
          nesciunt quam obcaecati repellendus.
          Sint facilis ut nostrum!
        </p>
      </div>


      <div className="bottom">
        {data.map(item => (
          <Card item={item} key={item.idd} />
        ))}
      </div>
    </div>
  )
}

export default FeaturedApps