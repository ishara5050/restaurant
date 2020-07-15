import React, { Component } from 'react';

class FoodRating extends Component {

    constructor(props)
        {
            super(props);
            this.state={
                results:[]
                }

        }

    componentDidMount(){
        instance.get('/Rating.json') // changing to show food
        .then(response=>{

            console.log(response.data);
            const fetchedResult=[];
            for(let key in response.data){
                fetchedResult.unshift(
                    {
                        ...response.data[key],
                        id:key
                    }
                )

            }
            this.setState({results:fetchedResult})
            
            
        }) //end then function


    } // end ComponentDidMount



    render() {
        return (
            <div>
                <div className="row">
                    <h3>Food Retingssss</h3>
                </div>

                <div className="row">



                </div>
            </div>
        );
    }
}

export default FoodRating;
