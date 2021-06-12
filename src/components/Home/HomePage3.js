import React,{Component}  from "react";
import axios from 'axios';
import Config from '../Config/Config';
import Translate from '../Config/Translate';


export default class HomePage3 extends Component {
    constructor(props){
        super(props);
            
            this.state = {
                slider : [],
                translate_list : []
            }
        };

        
        componentDidMount = async () =>{
            const FormData = require('form-data');
            const data = new FormData();
            data.append('get_posts', true);
            data.append('post_type', 16);

            const config = {
            method: 'post',
            url: Config().ApiUrl,
            headers: {},
            data : data
            };

           const slider_area = await axios(config);
           const make_slider = [];

           for(let key in slider_area.data.data){
               let row = slider_area.data.data[key];

               make_slider.push({
                   id : row.id,
                   title : row.title,
                   featured : row.featured
               });

               this.setState({
                   slider : make_slider
               });
           }


          /** */

          const translate_list = await Translate();

          this.setState({
            translate_list : translate_list
          });
        }
    
    render(){
        
        const {slider,translate_list}=this.state;

        return(
            <section className=" full_w sct2">
    <div className="full_w wrapper">
      <div className="center">
        <div className="sldr">
          <h1>{translate_list.proudly_title}</h1>
          <p>{translate_list.proudly_excerpt}</p>
                      
                       <div class="carousel owl-carousel">
           
                        {
                          slider.map(slider_item =>{
                            return(
                              <div class="img-area" key={slider_item.id}>
                              <img src={slider_item.featured} alt={slider_item.title}/> 
                             </div>
                            )
                          })
                        }
        </div>
         
       
        </div>
        
      
      </div>
      
    </div>

    
  </section>
        )
    }
}