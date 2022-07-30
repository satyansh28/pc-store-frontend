import { useState } from 'react';
import { Switch,Route, Redirect } from 'react-router-dom';
import './App.css';
import Buildpage from './components/Buildpage';
import Orderspage from './components/Myorders';
import Header from './components/Header';
import Loginpage from './components/Loginpage';
//import Registerpage from './components/Registerpage';
import Shop from './components/Shop';
import Welcomepage from './components/Welcomepage';
import Logincontext from './store/Logincontext.js';
const backend=process.env.REACT_APP_BACKEND;
function App() {
  const [loginstate,setloginstate]=useState(false);
  return (<div className='app'>
    
    <Logincontext.Provider value={{loginstate,setloginstate}}>
    
    <Switch>
      <Route path="/login">
      <Header state={false}/>
        {loginstate?<Redirect to="/welcome"/>:<Loginpage/>}
          
      </Route>
      <Route path="/myorders">
        <Header state={true}/>
        <Orderspage/>
      </Route>
      <Route path="/welcome">
        <Header state={true}/>
        {!loginstate?<Redirect to="/login"/>:<Welcomepage/>}
      </Route>
      <Route path="/shop">
      <Header state={true}/>
        <Shop/>
      </Route>
      <Route path="/build">
      <Header />
      <Header state={true}/>
        <Buildpage/>
      </Route>
      <Route path="/*">
          <Redirect to="/login"/>
      </Route>
    </Switch>
    </Logincontext.Provider>
    </div>
  );
}

export default App;
