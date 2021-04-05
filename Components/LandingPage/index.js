import React, { Component } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import './index.css';

class Dashboard extends Component {
    render() {
        return(
            <div className="container-fluid">
                <Carousel>
                    <div>
                        <img 
                src={process.env.PUBLIC_URL +"/image/image1.jpg" }
                alt="Stocksymbol" height="220px" width="100%"></img>
                        <h2 className="msg">No 1 Application for all your  
                        <br />Stock Solutions</h2>
                    </div>
                    <div>
                    <img 
                    src={process.env.PUBLIC_URL +"/image/image2.jpg" }
                      alt="Stocksymbol" height="220px" width="100%"></img>
                        <h2 className="msg">Invest at  
                        <br />Right Place</h2>
                    </div>
                    <div>
                    <img 
                    src={process.env.PUBLIC_URL +"/image/image3.jpg" }
                      alt="Stocksymbol" height="220px" width="100%">

                      </img>
                    <h2 className="msg1">Grow rich slowly   
                        <br />Than Fastly</h2>
                    </div>
                </Carousel>
                <div className= "body">
                    <h3>Welcome to the Stock Market Page. You may click on stocks to view all the stocks or search to
                        view the latest 100 days of activity. </h3>
                </div>
                
            </div>
        );
    }
}
export default Dashboard;