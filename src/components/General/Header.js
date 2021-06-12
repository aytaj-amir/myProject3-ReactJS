import React,{Component} from "react";
import axios from "axios";
import Config from '../Config/Config';
import getTotal from "./getTotal";


export default class Header extends Component {
    constructor(props){
      super(props);

      this.state = {
          header_menu : [],
          favorite_total : 0,
          compare_total : 0,
          basket_total : 0
      }
    }

  

    componentDidMount = async () =>{
      const FormData = require('form-data');
      const data = new FormData();
      data.append('get_menus', true);
      data.append('menu_type', 1);

          const config = {
          method: 'post',
          url: Config().ApiUrl,
          headers: {},
          data : data
          };

          const menu = await axios(config);
          const make_menu = [];

          for(let key in menu.data){
            let row =  menu.data[key];

            make_menu.push({
              id : row.id,
              title : row.title,
              content : row.content
            });


            this.setState({
              header_menu : make_menu
            });


            const all_total=getTotal();

        this.setState({
            favorite_total : all_total.favorite_total,
            compare_total : all_total.compare_total,
            basket_total : all_total.basket_total,
        });

          }

    }


    render(){
      const { header_menu,favorite_total, compare_total, basket_total} = this.state;
        return(
            <header className="full_w">
    <div className="full_w header_menu">
      <div className="center">
       
      <div className="compare_and_wish_btn header_show_c_and_w">
           
      <a href="/favorites"  className="add_wish_list " data-total={favorite_total}>
          <svg className="first_heart" width="20" height="20"
              xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path fill="currentColor"
                    d="M458.4 64.3C400.6 15.7 311.3 23 256 79.3 200.7 23 111.4 15.6 53.6 64.3-21.6 127.6-10.6 230.8 43 285.5l175.4 178.7c10 10.2 23.4 15.9 37.6 15.9 14.3 0 27.6-5.6 37.6-15.8L469 285.6c53.5-54.7 64.7-157.9-10.6-221.3zm-23.6 187.5L259.4 430.5c-2.4 2.4-4.4 2.4-6.8 0L77.2 251.8c-36.5-37.2-43.9-107.6 7.3-150.7 38.9-32.7 98.9-27.8 136.5 10.5l35 35.7 35-35.7c37.8-38.5 97.8-43.2 136.5-10.6 51.1 43.1 43.5 113.9 7.3 150.8z"
                    className=""></path>
          </svg>

          <svg className="second_heart" width="20" height="20"
              xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path fill="currentColor"
                    d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"
                    className=""></path>
          </svg>
      </a>

      <a href="/comparies"  className="add_compare" data-total={compare_total} >
          <i className="fa fa-exchange"></i>
      </a>

      <a href="/cart" className="add_cart " data-total={basket_total}>
          <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 576 512">
              <path fill="currentColor"
                    d="M528.12 301.319l47.273-208C578.806 78.301 567.391 64 551.99 64H159.208l-9.166-44.81C147.758 8.021 137.93 0 126.529 0H24C10.745 0 0 10.745 0 24v16c0 13.255 10.745 24 24 24h69.883l70.248 343.435C147.325 417.1 136 435.222 136 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-15.674-6.447-29.835-16.824-40h209.647C430.447 426.165 424 440.326 424 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-22.172-12.888-41.332-31.579-50.405l5.517-24.276c3.413-15.018-8.002-29.319-23.403-29.319H218.117l-6.545-32h293.145c11.206 0 20.92-7.754 23.403-18.681z"
                    className=""></path>
          </svg>
      </a>


</div>
        <div className="navSectionWrapper full_w ">
        <a href="/" className="logo">
          <span>Organic</span>
        </a>
          
        <ul className="menu">
          {
            header_menu.map(menu_item =>{
              return(
         <li key={menu_item.id}><a href={menu_item.content} className="lnk" alt={menu_item.title} title={menu_item.title}>{menu_item.title}</a></li>

              );
            })
          }
        </ul>
          <div className="mobilenav">
            <div className="l1"></div>
            <div className="l2"></div>
            <div className="l3"></div>
          </div>
    </div>
  
    
  
  </div>
      
    </div>
  </header>
        )
    }
}