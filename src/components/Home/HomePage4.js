import React,{Component} from 'react';
import axios from "axios";
import Config from '../Config/Config';


export default class HomePage4 extends Component{
    constructor(props){
        super(props);

        this.state = {
            comment_area : []
        }

    }


    componentDidMount = async () =>{
        const FormData = require('form-data');
        const data = new FormData();
        data.append('get_posts', true);
        data.append('post_type', 17);

        const config = {
        method: 'post',
        url: Config().ApiUrl,
        headers: {},
        data : data
        };

       const commment_box = await axios(config);
       const make_comment = [];

       for(let key in commment_box.data.data){
           let row = commment_box.data.data[key];

           make_comment.push({
               id : row.id,
               title : row.title,
               content : row.content,
               featured : row.featured
           });

           this.setState({
               comment_area : make_comment
           });
       }
    }

    render(){
        const {comment_area}=this.state;
        return(

    <section className="full_w testimonial">
    <div className="full_w testimonialContent">
       <div className="left-img">
        
    </div>
    <div className="right-img">
      
    </div>
  
    <div className="center">
    <div className="testimonialArea ">
      <div className="imag1">
      <img src="assets/image/comma.png" alt="photo"/>
        </div>
        <div className="loop owl-carousel owl-theme1" id="testimonials">

              {
                  comment_area.map(item =>{
                      return(
                        <div className="item">
                        <div className="clitinfo">
                        <div className="imag2">
                        <img src={item.featured} alt="photo"/>
                          </div>
                        <h4>{item.title}</h4>
                        <div className="stars">
                          <span><i className="far fa-star"></i></span>
                          <span><i className="far fa-star"></i></span>
                          <span><i className="far fa-star"></i></span>
                          <span><i className="far fa-star"></i></span>
                          <span><i className="far fa-star"></i></span>
                      </div>
                        <p>{item.content}</p>
                        </div>
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