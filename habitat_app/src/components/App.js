import { Switch, Route, Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import axiosInstance from "../AxiosApi";
import Login from "./Login";
import CreatePlotMap from "./CreatePlotMap";
import Logout from "./Logout";
import Register from "./Register";
import SearchView from "./SearchView";
import { useHistory } from 'react-router-dom';
import NavbarWithRouter from './Navbar';
import Container from '@material-ui/core/Container';

function App(props) {
  const history = useHistory() 
  const [email, setEmail] = useState('');
  // useEffect(() => {
  //   const getEmail = async () =>{
  //     const data = await axiosInstance.get('getuser', {
  //     });
  //     console.log(data.data.email);
  //   };
  //   getEmail();
  // }, [history]);

  return (
    <Container maxWidth="xl" disableGutters={true}>
        <nav>
          <NavbarWithRouter/>
        </nav>
        <main>

          {/* <Gmap/> */}

          <Switch>
            <Route exact path={"/login/"} component={Login} />
            <Route exact path={"/register/"} component={Register} />
            <Route exact path={"/search/"} component={SearchView} />
            <Route exact path={"/create/"} component={CreatePlotMap} />
            {/* <Route exact path={"/map/"} component={Gmap} /> */}
            {/* <Route path={"/"} render={() => <div>Home again</div>} /> */}
          </Switch>
        </main>        
    </Container>
  );
}

export default App;
