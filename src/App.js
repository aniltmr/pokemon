import React, {Component} from 'react';
import {Router, Route, Switch, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import Login from './components/login'
import {createBrowserHistory} from 'history';
import Itunes from './components/itunes'
import Pokemon from './components/pokemon'
import NewPoke from './components/newPoke' 
import CatchPokemon from './components/catchPoke' 
import Header from './components/header' 
import Dragable from './components/dragable'
// istyle/style'
const history= createBrowserHistory();

const theme = createMuiTheme({
    palette: {
      type: 'light', // Switching the dark mode on is a single property value change.
    },
  });

class App extends Component{
    constructor(props){
        super(props);       
        this.state={
            auth:false
        }
    }

    componentWillMount(){
        history.listen((location, action) => {
            console.log(location, action);
        });
    }

    render(){
        return(
            <MuiThemeProvider theme={theme}>
                <Router history={history}>
                <Switch>
                  <Route exact path="/" name="Login Page" component={CatchPokemon}/>
                  <Route exact path="/header" name="Header Page" component={Header}/>
                  <Route exact path="/dragable" name="Header Page" component={Dragable}/>
                  {/* <PrivateRoute path="/" name="Home" auth={this.props.auth} component={Itunes}/> */}
                </Switch>
              </Router>
            </MuiThemeProvider>
        )
    }
    
}

const PrivateRoute = ({ component: Component, auth: Auth , ...rest }) => {
    return (
      <Route
        {...rest}
        render={props =>
                localStorage.getItem("auth") ? (<Component {...props} />) : (<Redirect to={{ pathname: "/login", state: {from: props.location }}
            }
            />
          )}
      />
    );
  };
  
function mapStateToProps(state){
  return{
    auth: state.search.isAuthenticated
  }
}

export default connect(mapStateToProps, {})(App);








