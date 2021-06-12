import React, {Component} from 'react';
import axios from 'axios';
import FormData from 'form-data';
import Common from "../General/Common";

import Config from "../Config/Config";

export default class Product extends Component{

    constructor(props) {
        super(props);

        this.state = {
            post_slug : this.props.match.params.slug,
            product_data : [],
            images : [],
            has_discount : false,
            discount : 0,
            price : 0,
            new_price : 0,
            product_favorite_status : false,
            product_compare_status : false,
            similar_posts : [],
            qty : 1,
            product_id : '',
        };
    }


    componentDidMount = async () => {
        const data = new FormData();
        data.append('get_post_by_slug', 'true');
        data.append('slug', this.state.post_slug);

        const config = {
            method: 'post',
            url: Config().ApiUrl,
            headers: {},
            data : data
        };

        const product_data = await axios(config);

        const productData=product_data.data;

        this.setState({
            product_data : productData
        });

        const images =[];

        for(let key in productData.metas.images){
            let row=productData.metas.images[key];

            images.push(row);
        }

        let discount=productData.metas.discount,
            price=productData.metas.price,
            discount_start_date=new Date(productData.metas.discount_start_date),
            discount_end_date=new Date(productData.metas.discount_end_date),
            now_date=new Date(),
            calc_discount=(price * (100 - discount)) / 100;

        let has_discount=(discount_start_date <= now_date && discount_end_date >= now_date) ? true : false;
        let new_price=(has_discount) ? calc_discount : null;

        this.setState({
            images : images,
            has_discount : has_discount,
            discount : discount,
            price: price,
            new_price : new_price,
            product_id : productData.id
        });

        /**/
        const s_data = new FormData();
        s_data.append('similar_posts', 'true');
        s_data.append('slug', this.state.post_slug);

        const config3 = {
            method: 'post',
            url: Config().ApiUrl,
            headers: {},
            data : s_data
        };

        const similar_products_data = await axios(config3);

        const products = [];

        for (let key in similar_products_data.data.data){
            let row=similar_products_data.data.data[key];

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
            });
        }

        this.setState({
            similar_posts : products
        });

        /**/
        const s_storage=window.localStorage,
            array_name=s_storage.getItem('favorite_ids'),
            product_id=this.state.product_data.id;

        if (array_name ){

            const old_data=JSON.parse(array_name);
            const check_index=old_data.indexOf(product_id);

            if(check_index != -1){

                this.setState({
                    product_favorite_status : true
                });

            }

        }

        /**/
        /**/
        const array_name2=s_storage.getItem('compare_ids');

        if (array_name2 ){

            const old_data=JSON.parse(array_name2);
            const check_index=old_data.indexOf(product_id);

            if(check_index != -1){

                this.setState({
                    product_compare_status : true
                });

            }

        }

    };

    setQTY = (e) => {
        const {name, value} = e.target;

        this.setState({
            qty : this.state.qty + 1
        });


    };

    addBasket = (e) => {
        e.preventDefault();

        const s_storage=window.localStorage,
            array_name=s_storage.getItem('user_cart'),
            old_data=JSON.parse(array_name),
            product_id=this.state.product_id,
            qty=this.state.qty;

        if(old_data){

            old_data[product_id] = qty;

            const new_data=old_data;

            s_storage.setItem('user_cart', JSON.stringify(new_data));


        }else{

            const new_data={
                [product_id] : qty
            };

            s_storage.setItem('user_cart', JSON.stringify(new_data));


        }
    };

    addFavorite = (product_id, e) => {
        e.preventDefault();

        const s_storage=window.localStorage,
              array_name=s_storage.getItem('favorite_ids');

        let fav_status=true;

        if(array_name){
            const old_data=JSON.parse(array_name);
            const check_index=old_data.indexOf(product_id);

            if(check_index != -1){

                old_data.splice(check_index, 1);

                s_storage.setItem('favorite_ids', JSON.stringify(old_data));

                fav_status=false;

            }else{

                old_data.push(product_id);

                s_storage.setItem('favorite_ids', JSON.stringify(old_data));


            }

        }else {

            const new_data=[product_id];

            s_storage.setItem('favorite_ids', JSON.stringify(new_data));



        }

        this.setState({
            product_favorite_status : fav_status
        });

    };

    addCompare = (product_id, e) => {
        e.preventDefault();

        const s_storage=window.localStorage,
            array_name=s_storage.getItem('compare_ids');

        let compare_status=true;

        if(array_name){
            const old_data=JSON.parse(array_name);
            const check_index=old_data.indexOf(product_id);

            if(check_index != -1){

                old_data.splice(check_index, 1);

                s_storage.setItem('compare_ids', JSON.stringify(old_data));

                compare_status=false;

            }else{

                old_data.push(product_id);

                s_storage.setItem('compare_ids', JSON.stringify(old_data));


            }

        }else {

            const new_data=[product_id];

            s_storage.setItem('compare_ids', JSON.stringify(new_data));



        }

        this.setState({
            product_compare_status : compare_status
        });

    };

    render() {
        const {product_data,images, has_discount, discount, price, new_price, product_favorite_status, product_compare_status, similar_posts, qty} = this.state;


        return(
            <section class="full_w">
                <div class="product_single_main  full_w">
                    <div class="center">
                        <div class="full_w product_single_sides_box">
                    <div class="product_single_sides product_single_left single">
                     <div class="images_box">
                         <div class="main_image">
                         <a  data-fancybox="gallery" href={product_data.featured}  title={product_data.title}>
                         <img src={product_data.featured} alt={product_data.title} title={product_data.title} />
            
                       </a>
                         </div>
                          <ul class="prdcts_items">
                              <div className="carousel owl-carousel" >
                                  {
                                       images.map(image =>{
                                           return(
                                            <li class="img-area">
                                            <a href={image}  data-fancybox="gallery" title={product_data.title}>
                                                <img src={image} title={product_data.title}  alt={product_data.title}/>
                                            </a>
                                        </li>
                                           )
                                       })
                                   }
                             </div>
                         </ul>
                     </div>
            
                    </div>
            
             <div class="product_single_sides product_single_right single">
            
                 <div class="description">
                        <div class="area1">
                            <h1>{product_data.title}</h1>
                            {
                                (has_discount) ? <div class="product_price">&#36;{new_price}  <del>&#36;{price}</del></div> : <div class="product_price">&#36;{price}</div>
                            }
                            <p>
                                {product_data.content}                
                            </p>
            
                            <div class="product_quantity">
                            <form action=""  method="post"  onSubmit={this.addBasket}>
                                  <label>Quantity:</label>
                                <input type="number" min="1" max="100"  name="qty" value={qty} onChange={this.setQTY}/>
                                 <button type="submit"> Add To Cart</button>          
                            </form>                 
                            </div>
                        </div>
                        <div class="add_btn">
                          <a href="#" onClick={this.addFavorite.bind(this, product_data.id)} className={ (product_favorite_status) ? 'active' : '' }>+ Add To WishList</a>
                          <a href="#" onClick={this.addCompare.bind(this, product_data.id)} className={ (product_compare_status) ? 'active' : '' }>+ Compare</a>
                        </div>
            
                        <div class="product_social">
                          <ul>
                            <li>
                              <a href="#" class="facebook"><i class="fab fa-facebook-f"></i>
                              Like
                              </a>
                            </li>
                            <li>
                              <a href="#" class="twitter"><i class="fab fa-twitter"></i>
                              Tweet
                              </a>
                            </li>
                            <li>
                              <a href="#" class="pinterest"><i class="fab fa-pinterest"></i>
                              Save
                              </a>
                            </li>
            
                          </ul>
                        </div>
                 
                    </div>
            
                    </div>
                
                </div>
                <div class="full_w product_general_inf">
                    <h3>General Info</h3>
                    <p>
                                {product_data.content}                
                    </p>
                    <p>
                                {product_data.content}                
                    </p>
            
                    </div>
                
            
    <div class="order_related full_w">
        <div class="order_title">
            <h2>Related Products</h2>
        </div>
        
            <div class="related_products full_w">
                <ul class="related_products_list">
                  
                    <li class="order_li prdcts">
                        <div class="order_img">
                        <a href="organic_order.html">
                             <div class="label_product">
                                <span class="label_sale">-10%</span>
                                </div>
                            <img src="image/blog1.png" alt="photo" />

                        </a>
                        </div>
                            <a href="#" class="prdcts_text">
                            <h3>Product One</h3>
                            <p>$12 <del>$14</del></p>
                        </a>
                        <div class="product_action">
                            <a href="#"><i class="fas fa-heart"></i></a>
                            <a href="related-product.htm" target="_blank"><i class="fas fa-shopping-bag"></i></a>
                            <a href="#"><i class="fa fa-exchange"></i></a>
                        </div>
                        
                    </li>
                    <li class="order_li prdcts">
                         <div class="order_img">
                            <a href="#">
                                 <div class="label_product">
                                <span class="label_sale">-10%</span>
                                </div>
                                <img src="assets/image/blog2.png" alt="photo" />
                            </a>
                        </div>
                             <a href="#" class="prdcts_text">
                                <h3>Product Two</h3>
                                <p>$12 <del>$14</del></p>
                            </a>
                            <div class="product_action">
                              <a href="#"><i class="fas fa-heart"></i></a>
                            <a href="related-product.htm" target="_blank"><i class="fas fa-shopping-bag"></i></a>
                              <a href="#"><i class="fa fa-exchange"></i></a>
                            </div>
                    </li>
                     <li class="order_li prdcts">
                        <div class="order_img">
                            <a href="#">
                                <div class="label_product">
                                <span class="label_sale">-10%</span>
                              </div>
                                <img src="image/blog3.png" alt="photo" />
                            </a>
                        </div>
                            <a href="#" class="prdcts_text">
                                <h3>Product Three</h3>
                                <p>$12 <del>$14</del></p>
                            </a>
                            <div class="product_action">
                              <a href="#"><i class="fas fa-heart"></i></a>
                            <a href="related-product.htm" target="_blank"><i class="fas fa-shopping-bag"></i></a>
                              <a href="#"><i class="fa fa-exchange"></i></a>
                            </div>
                    </li>
                   
                </ul>
                
            </div>
        </div>
        </div>
                            </div>
                       
                   
                </section>
        );
    }
}

















































