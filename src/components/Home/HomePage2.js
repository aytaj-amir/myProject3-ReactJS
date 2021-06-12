import React,{Component} from 'react';
import axios from 'axios';
import Config from '../Config/Config';


export default class HomePage2 extends Component{
        constructor(props){
            super(props);


            this.state = {
                text_box : [],
                text_area : []
            };
        }

        ;

        componentDidMount = async () => {
            const FormData = require('form-data');
            const data = new FormData();
            data.append('get_posts', true);
            data.append('post_type', 13);

            var config = {
            method: 'post',
            url: Config().ApiUrl,
            headers: {},
            data : data
            };

            const boxes_info = await axios (config);
            const make_boxes = [];

            for(let key in boxes_info.data.data){
                let row = boxes_info.data.data[key];

                make_boxes.push({
                    id : row.id,
                    title : row.title,
                    featured : row.featured,
                    excerpt : row.excerpt,
                    hover_image : row.metas.hover_image[0]
                });

                this.setState({
                    text_box : make_boxes
                });
            }

            /* */
            // const FormData = require('form-data');
            const data1 = new FormData();
            data1.append('get_post', true);
            data1.append('post_id', 58);

            const config1 = {
            method: 'post',
            url: Config().ApiUrl,
            headers: {},
            data : data1
            };

             const text_area = await axios(config1);
           

             this.setState({
                 text_area : text_area.data
             });
        }



    render(){
        const {text_box,text_area}=this.state;
        return(
            <section className=" full_w sct">
            <div className="center">
              <div className="menus">
                <div className="texts">
                <img src={text_area.featured} className="images" alt={text_area.title} title={text_area.title} />
                  <span>{text_area.title}</span>
                  <p>{text_area.excerpt}</p>
                </div>
              <div className="menus_row">
                {
                    text_box.map(box_item =>{
                        return(
                <div className="menu_col">
                <div className="imgs">
                <img src={box_item.featured} className="pht1" alt={box_item.title} />
                <img src={box_item.hover_image} className="pht2" alt={box_item.title} />
                </div>
                <h3>{box_item.title}</h3>
                <p className="menu_col_text">{box_item.excerpt}</p>
                </div>
                        )
                    })
                }
                
                    </div>
                     </div>
          
                     
              </div>
          </section>
          
        )
    }
}