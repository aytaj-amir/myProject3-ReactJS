import React,{Component} from 'react';
import axios from 'axios';
import FormData from 'form-data';
import getTotal from "../General/getTotal";
import Config from "../Config/Config";



export default class Card extends Component{
	constructor(props) {
        super(props);

        this.state = {
            product_list: [],
            sub_total : 0,
        };
    }



	componentDidMount = async () => {
		
		const s_storage=window.localStorage,
		array_name=s_storage.getItem('user_cart');


	if(array_name){
		const product_ids_=[];
		const ids_data=JSON.parse(array_name);

		for(let key in ids_data){
			product_ids_.push( key );
		}


		const product_ids=product_ids_.join(',');


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

		var sub_total=0;

		for (let key in product_list.data.data){
			let row=product_list.data.data[key];

			let discount=row.metas.discount,
				price=row.metas.price,
				discount_start_date=new Date(row.metas.discount_start_date),
				discount_end_date=new Date(row.metas.discount_end_date),
				now_date=new Date(),
				calc_discount=(price * (100 - discount)) / 100;

			let has_discount=(discount_start_date <= now_date && discount_end_date >= now_date) ? true : false;
			let new_price=(has_discount) ? calc_discount : price;

			let qty = ids_data[row.id];

			products.push({
				id : row.id,
				title : row.title,
				featured : row.featured,
				link : "/products/"+row.slug,
				has_discount : has_discount,
				discount : discount,
				price : price,
				new_price : new_price,
				fav_page : true,
				qty : qty
			});

			sub_total += new_price * qty;

		}

		this.setState({
			product_list : products,
			sub_total : sub_total
		});


	}
}; 

	
removeItem = (product_id, e) => {
	const ask=window.confirm('Seçilən məhsulu silək?');

	if (ask){

		const s_storage=window.localStorage,
			array_name=s_storage.getItem('user_cart'),
			old_data=JSON.parse(array_name);

		if (old_data[product_id]){

			delete  old_data[product_id];

			const new_data=old_data;


			s_storage.setItem('user_cart', JSON.stringify(new_data));

			this.componentDidMount();

		}

	}
  };

    render(){
		const {product_list, sub_total} = this.state;
        return(
            <section class="full_w card_page">
		<div class="full_w card_area">
			<div class="center">
				<div class="full_w card_contain">
				{
                                (product_list.length ==0) ? <span>Səbətiniz boşdu!</span> : null
                }

				 {
					 (product_list.length > 0) ?

					 <table>
						<thead>
							<tr>
								<th class="card-head">Products</th>
								<th>Price</th>
								<th>Quantity</th>
								<th>Total</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							{
								product_list.map( product =>{
									return(
							<tr>
								<td class="card_item" key={product.id}>
								<img src={product.featured} alt={product.title} title={product.title} />
									<h5>{product.title}</h5>
								</td>
								<td class="card-price">&#36;{product.new_price}</td>
								<td class="card-quantity">
								<input type="number" name="number" min={1} max={100} value={product.qty} />
									
								</td>
								<td class="card-total">
								&#36;{product.new_price * product.qty}
								</td>
								<td class="card-close">
									<span onClick={this.removeItem.bind(this, product.id)}>&times;</span>
								</td>
							</tr>
							
									);
								})
							}
						</tbody>
					</table> : null
				 }
					

						<div class="card_btn">
							<a href="/products" class="card_b card_shop">CONTINUE SHOPPING</a>
							<a href="/cart" class="card_b card_update"><i class="fas fa-spinner"></i>  UPDATE CARD </a>
						</div>

						<div class="card_checkout">
			              <h5>Card Total</h5>
			              
							 <ul>
								<li>Subtotal <span>{sub_total}$</span> </li>
							</ul> 
			                
							<a href="#" class="procced_b">PROCEED TO CHECKOUT</a>
						</div>
					
				</div>
			</div>
		</div>
	</section>
        )
    }

}