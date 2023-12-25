import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'
 

export default function Home() {
    const [search, setSearch] = useState('');
    const [foodCat, setFoodCat] = useState([]);
    const [foodItem, setFoodItem] = useState([]);

    const loadData = async () => {
        let response = await fetch("http://localhost:5000/api/foodData", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            }
        });


        response = await response.json();
        setFoodItem(response[0]);
        setFoodCat(response[1]);
        // console.log(foodCat,foodItem);
        //console.log(foodItem)

    }

    useEffect(() => {
        loadData()
    }, [])




    return (
        <div>
            <div><Navbar /></div>

            <div> 
            <div id="carouselExampleFade" className="carousel slide carousel-fade " data-bs-ride="carousel" style = {{objectFit : "contain !important"}}>

<div className="carousel-inner " id='carousel'>
    <div className=" carousel-caption  " style={{ zIndex: "9" }}>
        <div className=" d-flex justify-content-center">  {/* justify-content-center, copy this <form> from navbar for search box */}
            <input className="form-control me-2 w-75 bg-white text-dark" type="search" placeholder="Type in..." aria-label="Search" value ={search} onChange={(e)=>{setSearch(e.target.value)}}/>
            <button className="btn text-white bg-success" type="submit">Search</button>
        </div>
    </div>
    <div className="carousel-item active" >
        <img src="https://images.unsplash.com/photo-1563884072595-24a1d9dd5647?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=400&ixid=MnwxfDB8MXxyYW5kb218MHx8Y2VsbCBwaG9uZXN8fHx8fHwxNzAzMjg1ODE1&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=900" className="d-block w-100  " style={{ filter: "brightness(30%)" }} alt="..." />
    </div>
    <div className="carousel-item">
        <img src="https://images.unsplash.com/photo-1642005600744-545f6fa6773c?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=400&ixid=MnwxfDB8MXxyYW5kb218MHx8YXBwbGVwaG9uZXN8fHx8fHwxNzAzMjg0NDkz&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=900" className="d-block w-100 " style={{ filter: "brightness(30%)" }} alt="..." />
    </div>
    <div className="carousel-item">
        <img src="https://images.unsplash.com/photo-1621330396173-e41b1cafd17f?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=400&ixid=MnwxfDB8MXxyYW5kb218MHx8cGhvbmVzfHx8fHx8MTcwMzI4NDU1Mw&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=900" className="d-block w-100 " style={{ filter: "brightness(30%)" }} alt="..." />
    </div>
</div>
<button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
</button>
<button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
</button>
</div>
            </div>

            <div className='container'>

                    {

                        foodCat != []
                        ? foodCat.map((data)=>{
                            return (
                                <div className='row m-3'>
                                <div key = {data._id} className= 'fs-3 m-3'>
                                    {data.CategoryName}
                                    </div>

                                    <hr />
                                    {foodItem != [] 
                                    ? 
                                    foodItem.filter ((item)=> (item.CategoryName===data.CategoryName) && (item.name.toLowerCase().includes(search.toLocaleLowerCase())))
                                    .map(filterItems=>{
                                            return(
                                                <div key={filterItems._id} className="col 12 col-md-6 col-lg-3">
                                                        <Card 
                                                        foodItem = {filterItems}
                                                        options = {filterItems.options[0]}
                                                         
                                                        ></Card>
                                                </div>
                                            )
                                    })
                                    : <div>No such data</div>}
                                        
                                </div>
                            )
                        })
                        : <div>""""""</div>


                    }
                
                     
 



            </div>

            <div><Footer /></div>
        </div>
    )
}
