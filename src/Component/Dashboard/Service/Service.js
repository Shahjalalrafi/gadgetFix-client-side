import React, { useEffect, useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';

const Service = () => {
    const [allService, setAllService] = useState([])

    useEffect(() => {
        fetch('https://secure-tundra-37871.herokuapp.com/service')
            .then(res => res.json())
            .then(data => setAllService(data))
    }, [])
    console.log(allService)

    return (
        <div className='row'>
            <div className="col-md-2">
                <Sidebar />
            </div>
            <div className="col-md-10 pt-5 mt-5">
                <h2>Our service</h2>
                <div className="row">
                    <div className="col-md-12"  >
                        <table className='col-md-12'>
                            <tr>
                                <th className='py-2'>Service</th>
                                <th className='py-2'>Price</th>
                                <th className='py-2'>garenty</th>
                            </tr>
                            {
                                allService.map(service => <tr style={{background: 'black', color: 'white'}} className="table-data">
                                    <td style={{ padding: '15px', borderBottom: '2px solid red'}}>{service.name}</td>
                                    <td>{service.price}</td>
                                    <td>{service.garanty}</td>
                                </tr>)
                            }
                        </table>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Service;