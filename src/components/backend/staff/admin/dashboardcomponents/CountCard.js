import React from 'react'
import {Card} from "react-bootstrap";


const CountCard =(props)=>{
     if(props.count > 100){
          return(
            <>
              <Card style={{backgroundColor:'#82ca9d',color:'#fff'}}>
                  <Card.Body>
                      <h6>{props.title}</h6>
                      <h3>{props.count}+</h3>
                  </Card.Body>
              </Card>
            </>
         )
     }
     else{
         return(
            <>
              <Card style={{backgroundColor:'#82ca9d'}}>
                  <Card.Body>
                      <h6>{props.title}</h6>
                      <h3>{props.count}</h3>
                  </Card.Body>
              </Card>
            </>
         )

     }
}
export default CountCard