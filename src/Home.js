import { useState } from 'react';
import Brands from './Brands';
import Buttons from './Buttons';
import {data} from './data';

function Home() {
    const [brands, setBrands] = useState(data);

    const chosenBrands = (category) => {
        const newBrands = data.filter(element => element.category === category);
        setBrands(newBrands)
    }

    return(
        <div>
            <Buttons filteredBrands = {chosenBrands}/>

            <div className='cont cover'>
                <h2>Packed with Savings</h2>
            </div>

            <Brands itemsToBuy = {brands} />
        </div>
    )
}
export default Home;