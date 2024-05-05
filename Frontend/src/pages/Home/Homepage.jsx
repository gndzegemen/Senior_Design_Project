//import { useNavigate } from 'react-router-dom';
import Categories from './components/Categories/Categories'
import Slider from './components/Slider/Slider'
import Contact from './components/Contact/Contact'
import FeaturedApps from './components/FeaturedApps/FeaturedApps'


function HomePage() {
    //const navigate = useNavigate();


    return (

        <div className="home">
            <Slider />
            <FeaturedApps type='featured'></FeaturedApps>
            <Categories />
            <FeaturedApps type='trending'></FeaturedApps>
            <Contact />

        </div>

    );

}
export default HomePage;

//button onClick={() => navigate('/register')}>Register</button>
//<button onClick={() => navigate('/login')}>Login</button>