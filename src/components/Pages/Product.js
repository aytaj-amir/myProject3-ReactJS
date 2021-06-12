import React,{ Component } from "react";
import axios from 'axios';
import FormData from 'form-data';
import Config from '../Config/Config';
import Common from "../General/Common";


export default class Product extends Component{
  constructor(props){
    super(props);


    this.state = {
      product_data : [],
      prdct_data : [],
  
    }
  }




  componentDidMount = async () =>{
    const data = new FormData();
    data.append('get_posts', true);
    data.append('post_type', 10);

    const config = {
      method: 'post',
      url: Config().ApiUrl,
      headers: {},
      data : data
    };

    const infos = await axios(config);
    const makePrdct = [];


 

    for(let key in infos.data.data){
      let row = infos.data.data[key];
      

      let discount = row.metas.discount,
         price = row.metas.price,
         discount_start_date = new Date(row.metas.discount_start_date),
         discount_end_date = new Date(row.metas.discount_end_date),
         now_date = new Date(),
         calc_discount = (price * (100 - discount)) / 100;

         let has_discount = (discount_start_date <= now_date && discount_end_date >= now_date) ? true : false;
         let new_price = (has_discount) ? calc_discount : null



      makePrdct.push({
        id : row.id,
        title : row.title,
        featured : row.featured,
        link : '/products/'+row.slug,
        content : row.content,
        excerpt : row.excerpt,
        price : price,
        new_price :new_price,
        discount : discount,
        has_discount : has_discount

      });

     

      this.setState({
        product_data : makePrdct
      });

        /** */


        const data1 = new FormData();
        data1.append('get_post', 'true');
        data1.append('post_id', '7');

        const config1 = {
          method: 'post',
          url: Config().ApiUrl,
          headers:{},
          data : data1
        };

        const prdct_data = await axios(config1)
        const prdctBox = prdct_data.data;


        this.setState({
          prdct_data : prdctBox
        })

    }
  }

    render(){
      const {product_data,prdct_data}=this.state;



        return(
            <section className="full_w sct_p">
            <div className=" full_w product_area">
        <div className="center">
                    <div className="blog_main full_w">
                  <div className="read_our_blog2">
          <div className="texts">
            <h1>{prdct_data.title}</h1>
            <p>{prdct_data.excerpt}</p>
          </div>
        <div className="menu_row">
         {
           product_data.map(product =>{
             return(
              <Common product={product}/>
         
             );

           })

           }
          
            
           

          
            </div>
    
            </div>
            </div>
    
               
                </div>
                
            </div>
    
            
        </section>
    
    
    
    
        )
    }
}