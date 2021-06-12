import React,{Component} from "react";
import axios from "axios";
import Config from '../Config/Config';


export default class HomePage1 extends Component{
    constructor(props){
        super(props);


        this.state = {
            home_menu : []
        };
    }

   

    componentDidMount = async () =>{
        const FormData = require('form-data');
        const data = new FormData();
        data.append('get_posts', true);
        data.append('post_type', 12);

        const config = {
        method: 'post',
        url: Config().ApiUrl,
        headers: {},
        data : data
        };

        const menu = await axios (config);
        const make_home = [];

        for(let key in menu.data.data){
            let row = menu.data.data[key];

            make_home.push({
                id : row.id,
                featured : row.featured,
                title : row.title,
                content : row.content,
                excerpt : row.excerpt
            });
        

        this.setState({
            home_menu : make_home
        });

    }
    }

    render(){
        const {home_menu}=this.state;
        return(
  <section className="full_w sect_1">
      <div className="sect_1_area full_w">
        <div className="center">
        <div className="landingSection">
       {

        home_menu.map(menu_item =>{
               return (
            <div className="landingSectionWrapper">
                <span>{menu_item.excerpt}</span>
                <h1>{menu_item.title}</h1>
                <p>{menu_item.content}</p>
                <a href="#" className="btn1">Explore Now</a>
          </div>
               )
           })
       }
</div>
        </div>
        {
            home_menu.map(menu_item => {
                return(
                    <img src={menu_item.featured} alt="photo" />
                )
            })
        }
 

      </div>
  </section>

)
}
  }










