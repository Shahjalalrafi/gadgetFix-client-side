import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { UserContext } from '../../../App';
import Navbar from '../Navbar/Navbar';
import { useForm } from "react-hook-form";

const ServiceDetails = () => {
    const [logedInUser, setLogedInUser] = useContext(UserContext)
    const serviceId = useParams()
    const history = useHistory()

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => {
        console.log(data)
        const serviceData = {
            name: data.name,
            email: data.email,
            price: data.price,
            number: data.number
        };

        const url = 'https://secure-tundra-37871.herokuapp.com/bookedService';
        console.log(serviceData);
        fetch(url, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(serviceData)
        })
            .then(res =>{
                if(res) {
                    alert('product purchase succesfully')
                    history.push('/')
                }
            })
    };

    const [Service, setService] = useState([])

    useEffect(() => {
        fetch('https://secure-tundra-37871.herokuapp.com/service')
            .then(res => res.json())
            .then(result => {
                const myService = result.find(pd => {
                    return pd._id === serviceId.id
                })
                setService(myService)
            })

    }, [])
    
    const {imageURL, name, details, price, garenty} = Service
    return (
        <div>
            <Navbar />
            <div className='container mt-5 pt-2'>
                {
                    Service.length !== 0 ? <div className="row">
                    <div className="col-md-8">
                        <img src={imageURL} alt="" />
                        <h4>{name}</h4>
                        <p>SERVICE DETAILS: {details}</p>
                        <p>SERVICE WITH GARENTY: {garenty}</p>
                        <h2>price: {price}</h2>
                    </div>
                    <div className="col-md-4">

                        <form className='' onSubmit={handleSubmit(onSubmit)}>
                            <input className="form-control py-2 my2" type='text' defaultValue={logedInUser.email} placeholder="Your Email" {...register("email")} /><br />
                            <input className="form-control py-2 my2" type='text' defaultValue={logedInUser.name} placeholder="Your Name" {...register("name")} /><br />
                            <input className="form-control py-2 my2" type='text' placeholder="Your Mobile Number" {...register("number")} /><br />
                            <input className="form-control py-2 my2" type='number' defaultValue={price}  placeholder="Service Price" {...register("price")} /><br />
                            <input type="submit" />
                        </form>

                    </div>
                </div> : <h2>LOADING</h2>
                }
            </div>
        </div>
    );
};

export default ServiceDetails;