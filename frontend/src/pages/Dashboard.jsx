import React, { useEffect, useState}from 'react';
import axios from 'axios';
//import {container, Row, col,  Container } from 'react-bootstrap'
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

function Dashboard(){
    const [programs,setPrograms] =useState([]);
    useEffect(()=>{
        axios.get('/api/programs').then(res=>setPrograms(res.data));
    }, []);
    return(
        <container className='mt-4'>
    <div>
            <h1 className='text-center mt-4'>Programs</h1>
            {programs.map(p=>(
               
                <col md={4} key={p._id} className='mb-3'>
                    <card>
                        <card.body>
                            <card.Title>
                                  {p.name}
                                </card.Title>
                                <card.body>
                                    <card.text>progress:{p.progress}%</card.text>

                                </card.body>
                            
                        </card.body>
                    </card>
                

                </col>
            ))}
        </div>
        </container>
    
    )
    
}

export default Dashboard;