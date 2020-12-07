import { Switch, Route, useHistory } from "react-router-dom";
import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import Login from "./Login";
import Home from "./Home";
import CreatePlotMap from "./Create/CreatePlotMap";
import Register from "./Register";
import SearchView from "./Search/SearchView";
import NavbarWithRouter from './Navbar/Navbar';
import Container from '@material-ui/core/Container';

const mapStateToProps = state => ({
  logged_in: state.loginUser.logged_in,
});

function App({ logged_in }) {
  const history = useHistory() 
  const handleClickHome = useCallback(() => history.push('/'), [history]);

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
