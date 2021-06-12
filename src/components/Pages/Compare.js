import React, {Component} from 'react';
import axios from 'axios';
import FormData from 'form-data';
import Config from "../Config/Config";
import Common from "../General/Common";


export default class Favorites extends Component{

    constructor(props) {
        super(props);

        this.state = {
            product_list: []
        };
    }

    
    componentDidMount = async () => {
        const s_storage=window.localStorage,
        array_name=s_storage.getItem('compare_ids');


    if(array_name){
        const product_ids=JSON.parse(array_name).join(',');


            const data = new FormData();
            data.append('get_basket', 'true');
            data.append('ids', product_ids);

            const config2 = {
                method: 'post',
                url: Config().ApiUrl,
                headers: {},
                data : data
            };

            const product_list = await axios(config2);

            const products = [];

            for (let key in product_list.data.data){
                let row=product_list.data.data[key];

                let discount=row.metas.discount,
                    price=row.metas.price,
                    discount_start_date=new Date(row.metas.discount_start_date),
                    discount_end_date=new Date(row.metas.discount_end_date),
                    now_date=new Date(),
                    calc_discount=(price * (100 - discount)) / 100;

                let has_discount=(discount_start_date <= now_date && discount_end_date >= now_date) ? true : false;
                let new_price=(has_discount) ? calc_discount : null;

                products.push({
                    id : row.id,
                    title : row.title,
                    featured : row.featured,
                    link : "/products/"+row.slug,
                    has_discount : has_discount,
                    discount : discount,
                    price : price,
                    new_price : new_price,
                    compare_page : true
                });
            }

            this.setState({
                product_list : products
            });


        }



    };


    render(){
        const {product_list} = this.state;
        return(
            <section class="full_w sct_p">
		<div class=" full_w product_area">
	<div class="center">
<div class="blog_main full_w" style={{minHeight:"400px"}}>
            
    <div class="menu_row"> 
            {
                (product_list.length ==0) ? <span>Sizin müqayisə üçün seçilmiş məhsulunuz yoxdu!</span> : null
            }

            
     {
         product_list.map(product =>{
             return(

                <Common product={product} />
        
             );
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






