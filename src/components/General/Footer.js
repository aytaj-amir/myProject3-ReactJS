import React,{Component} from "react";
import axios from "axios";
import Config from '../Config/Config';

export default class  Footer extends Component{
  constructor(props){
    super(props);

    this.state = {
      footer_menu : []
    };
  }

  


  componentDidMount = async () =>{
    const FormData = require('form-data');
    const data = new FormData();
    data.append('get_menus', true);
    data.append('menu_type', 2);

    var config = {
      method: 'post',
      url: Config().ApiUrl,
      headers: {},
      data : data
    };

    const menu = await axios(config);
    const make_menu =[];

    for(let key in menu.data){
      let row=menu.data[key];

      make_menu.push({
        id : row.id,
        title : row.title,
        content : row.content
      });

      this.setState({
        footer_menu : make_menu
      });
    }
  }


    render(){
      const {footer_menu}=this.state;
        return(
            <footer className="full_w footer">
      <div className="full_w ftr-menu">
        <div className="center">
          <div className=" full_w ftr-menus">
            <div className="footer-section footer1">
          <div className="logo2">
           {/* <img src="/assets/image/logo-org.svg" alt="logo2" /><span>Organic</span> */}

          </div>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing
          elit, sed do eiusmod tempor </p>
          <hr/>
          <h5> &#169;Copyright 2020 Nature</h5>
        </div>
        <div className="footer-section footer2">
          <h3>Information</h3>
          <hr/>
          {
            footer_menu.map(menu_item =>{
              return(
                <a  href={menu_item.content} alt={menu_item.title} title={menu_item.title} key={menu_item.id}>{menu_item.title}</a>
              )
            })
          }
        </div>
        <div className="footer-section footer3">
          <h3>Follow Us</h3>
            <hr/>
       <div className="socials">
            <div className="button">
              <a href="#" className="icon"><i className="fab fa-facebook-f"></i></a>
              <span>Facebook</span>
            </div>
            <div className="button">
            <a href="#" className="icon"><i className="fab fa-linkedin-in"></i></a>
            <span>LinkedIn</span>
            </div>
            <div className="button">
              <a href="#" className="icon"><i className="fab fa-twitter"></i></a>
              <span>Twitter</span>
            </div>
            <div className="button">
              <a href="#" className="icon"><i className="fab fa-instagram"></i></a>
              <span>Instagram</span>
            </div>
      
  </div>
        </div>
            
          </div>
        </div>
        
      </div>
     
    </footer>
        )
    }
}
