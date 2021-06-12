import React,{Component} from 'react';
import getTotal from './getTotal';



export default class Common extends Component{
    constructor(props){
        super(props);

        this.state={
            product_favorite_status : false,
            product_cart_status : false,
            product_compare_status : false
        };
    }



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

            if(old_data.length==0){
                window.location.href='/favorites';
            }

        }else {

            const new_data=[product_id];

            s_storage.setItem('favorite_ids', JSON.stringify(new_data));



        }

        this.setState({
            product_favorite_status : fav_status
        });


    };

    addCart = (product_id, e) => {
      e.preventDefault();

      const s_storage=window.localStorage,
            array_name=s_storage.getItem('user_cart'),
            old_data=JSON.parse(array_name);

      let product_cart_status=true;

      if(old_data){

          if (old_data[product_id]){

              product_cart_status=false;

              delete  old_data[product_id];

              /*old_data[product_id] = old_data[product_id] + 1;
                */

              const new_data=old_data;


              s_storage.setItem('user_cart', JSON.stringify(new_data));



          }else{
              old_data[product_id] = 1;

              const new_data=old_data;


              s_storage.setItem('user_cart', JSON.stringify(new_data));
          }



      }else{

          const new_data={
              [product_id] : 1
          };

          s_storage.setItem('user_cart', JSON.stringify(new_data));


      }

        this.setState({
            product_cart_status : product_cart_status
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

            if(old_data.length==0){
                window.location.href='/comparies';
            }

        }else {

            const new_data=[product_id];

            s_storage.setItem('compare_ids', JSON.stringify(new_data));



        }

        this.setState({
            product_compare_status : compare_status
        });

        const all_total=getTotal();

        console.log( all_total );

    };


    render(){
        const {product}=this.props;
        const {product_favorite_status, product_cart_status, product_compare_status}=this.state;

        const s_storage=window.localStorage,
        array_name=s_storage.getItem('favorite_ids'),
        fav_ids=JSON.parse(array_name);

        const array_name2=s_storage.getItem('user_cart'),
            cart_ids=JSON.parse(array_name2);

        const comp_ids=s_storage.getItem('compare_ids'),
            compare_ids=JSON.parse(comp_ids);


        return(
            (
                ((product.fav_page && fav_ids && fav_ids.indexOf( product.id) !=-1) || !product.fav_page) &&
                ((product.compare_page && compare_ids && compare_ids.indexOf(product.id) !=-1) || !product.compare_page)
            )

            ?
            
            <div className="blog_box prdct" key={product.id}>
            <div className="product_action">

              <a href='#' onClick={this.addFavorite.bind(this, product.id)} className={ ( (fav_ids && fav_ids.indexOf( product.id) !=-1) || product_favorite_status) ? 'add_wish_list active' : ' add_wish_list ' }><i className="fas fa-heart"></i></a>

              <a href={product.link} target="_blank" className={ ( (cart_ids &&  cart_ids[product.id]) || product_cart_status  ) ? 'add_cart active' : ' add_cart ' }  onClick={this.addCart.bind(this, product.id)} ><i className="fas fa-shopping-bag"></i></a>

              <a href="#" onClick={this.addCompare.bind(this, product.id)} className={ ( (compare_ids && compare_ids.indexOf( product.id) !=-1) || product_compare_status) ? 'add_compare active' : ' add_compare ' }><i className="fa fa-exchange"></i></a>

            </div>
         <a href={product.link} target="_blank"> <img src={product.featured} alt={product.title} title={product.title}/></a>

          <div className="label_product">
           {
             (product.has_discount) ?  <span className="label_sale">&#x2010;{product.discount} &#x25;</span> : null 
           }
          </div>
          <div className="blog_text">
           <h2>{product.title}</h2>
           <div className="price_list">
            {
              (product.has_discount) ? <p className="price">&#36;{product.new_price} <del>&#36;{product.price}</del></p> : <p className="price">&#36;{product.price} </p>
            }
           </div>
          <p className="prdct_text">
           {product.excerpt}
          </p>
          </div>
          
          </div> : null
        )
    }
}