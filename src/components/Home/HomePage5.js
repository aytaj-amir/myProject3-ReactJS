import React,{Component} from 'react';
import axios from 'axios';
import Config from '../Config/Config';
import Translate from '../Config/Translate';

export default class HomePage5 extends Component{
    constructor(props){
      super(props);


      this.state = {
        blog_post : [],
        news_list : [],
        translate_list : [],
      };
    }


  


    componentDidMount = async() =>{

      const translate_list = await Translate();

      this.setState({
        translate_list : translate_list
      });

    const month = translate_list.month_list.split(',');
    console.log(month);


        /** */

        const data1 = new FormData();
        data1.append('get_post', true);
        data1.append('post_id', 8);
       

        const config1 = {
          method: 'post',
          url: Config().ApiUrl,
          headers: {},
          data : data1
        };

        const blog_post = await axios(config1);
       
        this.setState({
          blog_post : blog_post.data
        });
        

      /** */

      const data2 = new FormData();
      data2.append('get_posts', true);
      data2.append('post_type', 8);
      data2.append('limit', 3);

      const config2 = {
        method: 'post',
        url: Config().ApiUrl,
        headers: {},
        data : data2
      };

      const news_list = await axios(config2);
      const make_news = [];

      for(let key in news_list.data.data){
        let row = news_list.data.data[key];

        const  date=row.date.split(' ');
        const date_2=date[0].split('-');

        let month_index=parseInt(date_2[1]-1);
        console.log(month_index);



        make_news.push({
          id : row.id,
          title : row.title,
          featured : row.featured,
          excerpt : row.excerpt,
          link :'/blog/'+ row.slug,
          date : date_2[2] + ' '+ month[month_index]+' '+date_2[0]

        });

        this.setState({
          news_list : make_news
        });

      }
}




    render(){
      const{translate_list,news_list,blog_post}=this.state;
        return(
            <section className=" full_w sct-4">
  <div className="full_w our_blog">
     <div className="left-img1" >
        <img src="assets/image/leaf1.png" alt="photo" />
    </div>
    <div className="center">
      <div className="full_w blog_post">
          <div className="newsLetter">
            <span>{translate_list.subscribe_title}</span>
            <p>{translate_list.subscribe_content}</p>
            {/* BU HISSE ALINMADI */}
            <div className="subscribe-form">
              <form  action="" method="post">
                 <input type="email" placeholder="Enter your email address" className="e-mail" required />
                 <button type="submit">Subscribe</button>
              </form>
            </div>
          </div>

        <div className="read_our_blog">
      <div className="texts">
      <img src={blog_post.featured} className="images" alt={blog_post.title} title={blog_post.title} />
        <span>{blog_post.title}</span>
        <p>{blog_post.excerpt}</p>
      </div>
    <div className="menu_row">
      {
        news_list.map(news=>{
          return(
            <div className="blog_box">
            <img src={news.featured} alt={news.title} title={news.title} />
            <div className="blog_text">
            <h2>{news.title}</h2>
            <h6>{news.date}</h6>
            <p className="menu_col_text">
             {news.excerpt}
            </p>
            <a href={news.link} className="lnk">Read More</a>
            </div>
            
            </div>
          )
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