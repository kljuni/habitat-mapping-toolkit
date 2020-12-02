import { Switch, Route, Link, useHistory } from "react-router-dom";
import React, { useState, useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import axiosInstance from "../AxiosApi";
import Login from "./Login";
import Home from "./Home";
import CreatePlotMap from "./CreatePlotMap";
import Logout from "./Logout";
import Register from "./Register";
import SearchView from "./SearchView";
import NavbarWithRouter from './Navbar';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

const mapStateToProps = state => ({
  logged_in: state.loginUser.logged_in,
});

function App({ logged_in }) {
  const history = useHistory() 
  const [email, setEmail] = useState('');
  const handleClickHome = useCallback(() => history.push('/'), [history]);
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
          <NavbarWithRouter handleClickHome={handleClickHome}/>
        </nav>
        <main>
          <Switch>
            <Route exact path={"/"} component={Home} />
            <Route exact path={"/login/"} component={Login} />
            <Route exact path={"/register/"} component={Register} />
            <Route exact path={"/search/"} component={SearchView} />
            {logged_in ? <Route exact path={"/create/"} component={CreatePlotMap} /> : null}
          </Switch>
        </main>        
    </Container>
  );
}

export default connect(mapStateToProps, null)(App);
