import React,{ Component } from "react";
import axios from 'axios';
import Config from "../Config/Config";
import Translate from "../Config/Translate";



export default class Contact extends Component{
      constructor(props){
        super(props);


        this.state = {
          title : '',
          content : '',
          email : '',
          lastName : '',
          phone : '',
          showErrorMessage : false,
          ShowSuccessMessage : false,
          successMessage : []
        }
      }

    


      updateState = (e) =>{
        const {value,name}=e.target;


        this.setState({
          [name] : value

        });
      };

      sendMessage = async(e) =>{
        e.preventDefault();

       const {title,content,email,lastName,phone}=this.state;

        this.setState({
          showErrorMessage : true,
          ShowSuccessMessage : false
        });


        if(title && content && email && lastName && phone){
          const data = new FormData();
          data.append('contact_form', true);
          data.append('title', title);
          data.append('title', lastName);
          data.append('meta[2]',phone);
          data.append('content', content);
          data.append('meta[1]', email);
  
          const config = {
            method: 'post',
            url: Config().ApiUrl,
            headers: {},
            data : data
          };
  
          const successMessage = await axios(config);


          this.setState({
            title : '',
            content : '',
            email : '',
            lastName : '',
            phone : '',
            showErrorMessage : false,
            ShowSuccessMessage : true,
            successMessage : successMessage.data.message
             
          });

          setTimeout(() => {
            this.setState({
              successMessage : false
            })
          }, 5000);
        }

        return false;
      }


    render(){

      const {ShowSuccessMessage,successMessage,showErrorMessage,title,content,phone,lastName,email}=this.state;
        return(

          
          
            <section className="contact_area full_w">
            <div className="contact_content full_w">
              <div className="center">
              <div className="forms">
                <div className="forms_text">
                  <h2>Send us a message</h2>
                  <p>Feel free to fill out the form and reach to us.<br/>
                      We will get back to you shortly.</p>
                </div>
        
                <form action="" onSubmit={this.sendMessage} method="post">
                  
                  <div className="input-row text">
                  <p>
                    {
                      ShowSuccessMessage ? <span>{successMessage}</span> : null
                    }
                      
                      </p>
                  </div>
                 
                  <div className="input-row">
                    <div className="input-group">
                      {
                        showErrorMessage && !title ? <span>Enter Your Name</span> : null
                      }
                      <input type="text" name="title" value={title} placeholder="First Name"  onChange={this.updateState} />
                    </div>
                     <div className="input-group">
                     {
                        showErrorMessage && !lastName ? <span>Enter Your Lastname</span> : null
                      }
                      <input type="text" name="lastName" value={lastName} placeholder="Last Name" onChange={this.updateState}/>
                    </div>
                    
                  </div>
                    <div className="input-row">
                    <div className="input-group">
                    {
                        showErrorMessage && !email ? <span>Enter Your Email</span> : null
                      }
                      <input type="email" name="email" value={email} placeholder="Email Address" 
                      onChange={this.updateState} />
                    </div>
                     <div className="input-group">
                     {
                        showErrorMessage && !phone ? <span>Enter Your Phone Number</span> : null
                      }
                      <input type="text" name="phone" placeholder="Phone" value={phone} onChange={this.updateState} />
                    </div>
                    
                  </div>
        
                  <div className="input-rows">
                 
                  {
                        showErrorMessage && !content ? <span>Enter Your Message</span> : null
                    }
                  
                    <textarea placeholder="Message" name="content" onChange={this.updateState} value={content}  style={{width: "100%",height: "180px"}}></textarea>

                    
                  </div>

                    
                 <div className="input-row btn-sub">
                   <input type="submit" name="" value="Submit"  className="button"  onChange={this.updateState}/>
                 </div>

               
                </form>
                
              </div>
              
            </div>
         </div>
            </section>
         
         
        );
    }
}