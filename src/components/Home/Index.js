import React,{Component} from "react";
import HomePage1 from "./HomePage1";
import HomePage2 from './HomePage2';
import HomePage3 from './HomePage3';
import HomePage4 from './HomePage4';
import HomePage5 from './HomePage5';





export default class Index extends Component{
    render(){
        return(
    <main className="full_w main">
  
          <HomePage1 />
         <HomePage2 />
         <HomePage3 />
         <HomePage4 />
         <HomePage5 /> 

  

  

    </main>
        )
    }
}