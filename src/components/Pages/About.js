import React,{ Component } from "react";
import axios from 'axios';
import HomePage2 from "../Home/HomePage2";
import Config from "../Config/Config";



export default class About extends Component{
	constructor(props){
		super(props);

		this.state = {
			about_text : [],
			
		}
	}

	componentDidMount = async () =>{
		const FormData = require('form-data');
		const data = new FormData();
		data.append('get_post', 'true');
		data.append('post_id', '6');

		const config = {
		method: 'post',
		url: Config().ApiUrl,
		headers: {},
		data : data
		};

		const text_box = await  axios(config);

		this.setState({
			about_text : text_box.data
		});

		
	}

    render(){
		const {about_text}=this.state;
        return(
		<section className="full_w">
		<div className=" full_w about_area">
		<div className="left1-img">
		<img src="assets/image/cntct-img.png" alt="photos"/>
		</div>
		<div className="right1-img">
		<img src="assets/image/leaf2.png"  alt="photos"/>
		</div>

		<div className="center">
		<div className="about_main full_w">
		<div className="about_text" key={about_text.id}>
			<h1>{about_text.title}</h1>
			<p className="p1">{about_text.content} </p>
			<p className="p2">{about_text.excerpt}</p>

			
		</div>
		<div className="about_contain">
		<HomePage2/>
		</div>
	
	</div>
			
	</div>
	</div>
	</section>
        )
    }
}