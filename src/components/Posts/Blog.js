import React,{Component} from 'react';
import axios from 'axios';
import FormData from 'form-data';
import Translate from '../Config/Translate';
import Config from '../Config/Config';



export default class Blog extends Component{
    constructor(props){
      super(props);

      this.state= {
        post_blog : [],
        post_slug : this.props.match.params.slug,
        translate_list : [],
        latest_blog : [],
        post_date : ''
      };
    }

    

    componentDidMount = async () =>{

      /* TRANSLATE LIST MONTH LIST */

     const translate_list = await Translate();

    this.setState({
      translate_list : translate_list
    });

    


    /* POST INFO & DATE */

      const data1 = new FormData();
      data1.append('get_post_by_slug', true);
      data1.append('slug', this.state.post_slug);

      const config1 = {
        method: 'post',
        url: Config().ApiUrl,
        headers: {},
        data : data1
      };

      const post_box = await axios(config1);

      this.setState({
          post_blog : post_box.data
      });

      let date=post_box.data.date.split(' ');
      let date_2=date[0].split('-');
      let month = translate_list.month_list.split(',');

      let month_index=parseInt(date_2[1] - 1);
      
      this.setState({
        post_date : date_2[2] + ' ' + month[month_index] + ' ' + date_2[0]
      });



      /* RELATED POSTS */

      const data2 = new FormData();
      data2.append('get_posts', true);
      data2.append('post_type', 8);
      data2.append('limit',3);

      const config2 = {
        method: 'post',
        url: Config().ApiUrl,
        headers: {},
        data : data2
      };

      const blog_box = await axios(config2);
      const makeBox = [];

      for(let key in blog_box.data.data){
        let row = blog_box.data.data[key];


        makeBox.push({
          id : row.id,
          title : row.title,
          featured : row.featured,
          link :'/blog/'+ row.slug
        });

        this.setState({
          latest_blog : makeBox
        });
      }


    }

   
        render(){

          const {post_blog,post_slug,post_date,latest_blog}=this.state;

            return(
                <section className="full_w">
                <div className="full_w blog_posts">
                  <div className="center">
                        <div className="full_w blog_post_area">
                          <div className="posts_1 single">
                            <div className="post_header">
                               <h2>{post_blog.title}</h2>
                               <p className="date">Date:{post_date}</p>
                               <h6 className="meta">View count: { post_blog.view }</h6>
                            </div>
                            <div className="posts_1_imgs">
                            <img src={post_blog.featured} alt={post_blog.title} title={post_blog.title}/>
                          </div>
                          <div className="posts_1_text">
          
                            <p>
                              Aenean et tempor eros, vitae sollicitudin velit. 
                              Etiam varius enim nec quam tempor, sed efficitur ex ultrices. 
                              Phasellus pretium est vel dui vestibulum condimentum. Aenean nec suscipit nibh. 
                              Phasellus nec lacus id arcu facilisis elementum. Curabitur lobortis, elit ut elementum congue, 
                              erat ex bibendum odio, nec iaculis lacus sem non lorem. Duis suscipit metus ante, sed convallis
                               quam posuere quis. Ut tincidunt eleifend odio, ac fringilla mi vehicula nec. Nunc vitae lacus eget 
                               lectus imperdiet tempus sed in dui. Nam molestie magna at risus consectetur, placerat suscipit justo dignissim. 
                               Sed vitae fringilla enim, nec ullamcorper arcu.
                            </p>
                            <blockquote>
                             {post_blog.content}
                            </blockquote>
                            <p>
                              Aenean et tempor eros, vitae sollicitudin velit. Etiam varius enim nec quam tempor, sed efficitur ex ultrices. Phasellus pretium est vel dui vestibulum condimentum. Aenean nec suscipit nibh. Phasellus nec lacus id arcu facilisis elementum. Curabitur lobortis, elit ut elementum congue, erat ex bibendum odio, nec iaculis lacus sem non lorem. Duis suscipit metus ante, sed convallis quam posuere quis. Ut tincidunt eleifend odio, ac fringilla mi vehicula nec. Nunc vitae lacus eget lectus imperdiet tempus sed in dui. Nam molestie magna at risus consectetur, placerat suscipit justo dignissim. Sed vitae fringilla enim, nec ullamcorper arcu.
                            </p>
                            <p>
                              Suspendisse turpis ipsum, tempus in nulla eu, posuere pharetra nibh. In dignissim vitae lorem non mollis. Praesent pretium tellus in tortor viverra condimentum. Nullam dignissim facilisis nisl, accumsan placerat justo ultricies vel. Vivamus finibus mi a neque pretium, ut convallis dui lacinia. Morbi a rutrum velit. Curabitur sagittis quam quis consectetur mattis. Aenean sit amet quam vel turpis interdum sagittis et eget neque. Nunc ante quam, luctus et neque a, interdum iaculis metus. Aliquam vel ante mattis, placerat orci id, vehicula quam. Suspendisse quis eros cursus, viverra urna sed, commodo mauris. Cras diam arcu, fringilla a sem condimentum, viverra facilisis nunc. Curabitur vitae orci id nulla maximus maximus. Nunc pulvinar sollicitudin molestie.
                            </p>
                          </div>
                          <div className="blog_social">
                            <h4>Share  This Post:</h4>
                        <ul>
                          <li>
                            <a href="#" className="facebook"><i className="fab fa-facebook-f"></i>
                            
                            </a>
                          </li>
                          <li>
                            <a href="#" className="twitter"><i className="fab fa-twitter"></i>
                            
                            </a>
                          </li>
                          <li>
                            <a href="#" className="pinterest"><i className="fab fa-pinterest"></i>
                           
                            </a>
                          </li>
          
                        </ul>

                      </div>
                      <a href="/blog" className="back"><i class="fas fa-long-arrow-alt-left"></i> Back to Blog</a>

                        </div>
          
                          <div className="posts_2 single">
                            <div className="post_header">
                             <h2>Related Posts</h2>
                            </div>
                            <div className="related_post">
                              <ul>
                                {
                                  latest_blog.map(latest_item =>{
                                    return(
                                      <li key={latest_item.id}>
                                  <a href={latest_item.link}>
                                  <img src={latest_item.featured} alt={latest_item.title} title={latest_item.title} />
                                  </a>
                                  <div className="related_content">
                                    <h4>
                                      <a href="organic-blog-post.HTM">{latest_item.title}</a>
                                    </h4>
                                      <p className="date">Date:{post_date}</p>
                                     
                                  </div> 
                                </li>
                                    )
                                  })
                                }
                              </ul>
                              
                            </div>
                
                        </div>
                 </div>
                </div>
                </div>
              </section>
            )
        }
}