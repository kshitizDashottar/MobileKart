import React, { useState,useRef, useEffect } from 'react'
import { useDispatchCart , useCart } from './ContextReducer';
export default function Card(props) {
    let dispatch = useDispatchCart(); 
    let priceRef = useRef();
    let options = props.options;
    let priceOptions = Object.keys(options);
    const [qty,setQty] = useState(1)
    const [size,setSize] = useState("")
    const handleAddToCart = async ()=>{

        await dispatch({type:"ADD", id:props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty:qty, size:size})

    }
    let finalPrice = qty * parseInt(options[size]);
    useEffect(() => {
        setSize(priceRef.current.value)
      }, [])
    
    return (
        <div>


            <div>
                <div className="card mt-3" style={{ "width": "18rem", "maxHeight": "360px" }}>
                    <img className="card-img-top" src= {props.foodItem.img} alt="Card image cap" style={{height:"120px", objectFit: "fill"}} />
                    <div className="card-body">
                        <h5 className="card-title">{props.foodItem.name}</h5>
                        <p className="card-text"> </p>
                        <div className='container w-100'>
                            <select className='m-2 h-100   bg-success rounded'>
                                {Array.from(Array(5), (e, i) => {
                                    return (
                                        <option key={i + 1} value={i + 1}>{i + 1}</option>
                                    )

                                })}
                            </select>

                            <select className='m-2 h-100   bg-success rounded' ref={priceRef} onChange={(e)=> setQty(e.target.value)}>
                               {priceOptions.map((data)=>{
                                  return <option key={data} value={data}>{data}</option>
                               })}

                                
                            </select>

                            <div className='d-inline h-100 fs-5'>
                            ₹{finalPrice}/-
                            </div>
                        </div>

                    <hr>
                    </hr>
                    <button className='btn btn-success justify-centre ms-2' onClick = {handleAddToCart}>Add to Cart!</button>
                    </div>
                </div>
            </div>


        </div>
    )
}
