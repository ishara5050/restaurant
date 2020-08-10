import React from 'react';

import Employee from './components/AddEmployee/Employee';
import AddCategory from './components/AddMenu/AddCategory';
import LoginPage from './components/loginForm/LoginPage';
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

      
      

      <Router>
        <Switch>
          <Route path="/login" component={LoginPage}><LoginPage /></Route>
          <Route path="/emp" component={Employee}> <Employee/></Route>
          <Route path="/cat" component={Test}> <Test/></Route>
          <Route path="/food" component={AddFood}> <AddFood/> </Route>

        </Switch>
      </Router>
      
     
     
     
   
    {/* <AddCategory/> image upload working */}
    
     
    </div>
  );
}

export default App;
