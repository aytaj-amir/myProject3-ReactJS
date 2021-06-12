import React,{Component} from 'react';
import {Route,Link,BrowserRouter as Router} from "react-router-dom";


import Header from "./components/General/Header";
import Footer from "./components/General/Footer";

import Index from "./components/Home/Index";

// PAGES

import About from "./components/Pages/About";
import Product from "./components/Pages/Product";
import Blog from "./components/Pages/Blog";
import Contact from "./components/Pages/Contact";
import Favorites from "./components/Pages/Favorites";
import Card from "./components/Pages/Card";
import Compare from "./components/Pages/Compare";


// POSTS
import SingleBlog from "./components/Posts/Blog";
import SingleProduct from "./components/Posts/Product";


import { useTranslation } from 'react-i18next';



export default class App extends Component {
  
  render(){

    
    return (
      
     <div>
      
       <Header/>

      <Router>
        <div>
          <Route path="/" exact component={Index} />
          <Route path="/about" exact component={About} />

          <Route path="/blog" exact component={Blog} />
          <Route path="/blog/:slug" exact component={SingleBlog} />

          <Route path="/products" exact component={Product} />
          <Route path="/products/:slug" exact component={SingleProduct} />
         
          

          <Route path="/contact" exact component={Contact} />

          <Route path="/favorites" component={Favorites} /> 

          <Route path="/cart" component={Card} />

          <Route path="/comparies" component={Compare} />

        </div>
      </Router>
      
       <Footer/>
     </div>
    );
  }
  
}


