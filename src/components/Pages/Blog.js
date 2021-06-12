import React,{ Component } from "react";
import axios from 'axios';
import Config from '../Config/Config';
import Translate from "../Config/Translate";




export default class Blog extends Component{
     constructor(props){
         super(props);

         this.state = {
           blog_post : [],
           blog_box : [],
           translate_list : []
         }
       
     }
     
     

    componentDidMount = async() =>{

      /* TITLE AND EXCERPT */
      const FormData = require('form-data');
      const data = new FormData();
      data.append('get_post', true);
      data.append('post_id', 8);
      
      const config = {
        method: 'post',
        url: Config().ApiUrl,
        headers: {},
        data : data
      };
      
       const blog_post = await axios(config);

       this.setState({
         blog_post : blog_post.data
       });



         /* TRANSLATE_LIST MONTHS */

     const translate_list = await Translate();

    this.setState({
      translate_list : translate_list
    });

    const month = translate_list.month_list.split(',');
    console.log(month);



      /* BLOG BOXES */

      const data1 = new FormData();
      data1.append('get_posts', true);
      data1.append('post_type', 8);

      const config1 = {
        method: 'post',
        url: Config().ApiUrl,
        headers: {},
        data : data1
      };

      const blog_box = await axios(config1);
      const makeBox = [];

      for(let key in blog_box.data.data){
        let row = blog_box.data.data[key];
        
        const  date=row.date.split(' ');
        const date_2= date[0].split('-');

        let month_index=parseInt(date_2[1]-1);


        makeBox.push({
          id : row.id,
          title : row.title,
          featured : row.featured,
          excerpt : row.excerpt,
          link :'/blog/'+ row.slug,
          date : date_2[2] + ' '+ month[month_index]+' '+ date_2[0]
        });

        this.setState({
          blog_box : makeBox
        });
      }

  }


    render(){
        const {blog_post,blog_box}=this.state;
        return(
          <section class="full_w">
          <div class=" full_w blog_area">
        <div class="center">
                      <div class="blog_main full_w">
                    <div class="read_our_blog2">
            <div class="texts">
              <h1>{blog_post.title}</h1>
              <p>{blog_post.excerpt}</p>
            </div>
          <div class="menu_row" id="boxs">
           {
             blog_box.map(item =>{
              return(
                <div class="blog_box box">
                <a href={item.link}>
                  <img src={item.featured} alt={item.title} title={item.title} />
                </a>
              <div class="blog_text">
               <h2>{item.title}</h2>
               <h6>{item.date}</h6>
              <p class="menu_col_text">
                {item.excerpt}
              </p>
              <a href={item.link} target="_blank" class="lnk">Read More</a>
              </div>
              
              </div>
              )
             })
           }
            
              </div>
              <div class="blog_btn">
               <button class="button" type="button" id="showMore">Load More</button>
                
              </div>
      
              </div>
              </div>
      
                 
            </div>
            
          </div>
      
          
        </section>
        )
    }
}