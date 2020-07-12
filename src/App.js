import React from 'react';

import Employee from './components/AddEmployee/Employee';
import AddCategory from './components/AddMenu/AddCategory';
import Test from './components/AddMenu/Test';


import{
  BrowserRouter as Router,
  Switch,
  Route
 
} from 'react-router-dom';
import AddFood from './components/AddMenu/AddFood';
import Navbar from './components/Navbar/Navbar';





function App() {
  return (
    <div className="App">

      <Navbar/>
      

      <Router>
        <Switch>
          <Route path="/emp"> <Employee /> </Route>
          <Route path="/cat"> <Test/> </Route>
          <Route path="/food"> <AddFood/> </Route>

        </Switch>
      </Router>
      
     
     
     
   
    {/* <AddCategory/> image upload working */}
    
     
    </div>
  );
}

export default App;
