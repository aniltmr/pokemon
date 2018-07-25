import React, { Component } from 'react';
import { connect } from 'react-redux'; 
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import FacebookLogin from 'react-facebook-login';
import {store} from '../index';
import { bindActionCreators } from 'redux'
import * as TodoActionCreators from '../actions/itunesActions'
import {createBrowserHistory} from 'history';

const history= createBrowserHistory();

const styles = theme=>({
    root: {
      width: '100%',
    },
    flex: {
      flex: 1,
    },
    menuButton: {
      marginLeft: -12,
      marginRight: 20,
    },
    button: {
        margin: theme.spacing.unit,
      },
  });

 
  
  class Login extends Component {
    constructor(props){
      super(props);
      const {dispatch} = props;
      this.boundActionCreators = bindActionCreators(TodoActionCreators, dispatch)
     
      this.state={
        search_array:'',
        search_string:'',
        login: false
      }
    }
    
   
    
    responseFacebook(response) {
        localStorage.setItem("auth", response.accessToken)
        localStorage.setItem("data", JSON.stringify(response))
        let data =response;
        let action = TodoActionCreators.get_facebook_auth(data)
        store.dispatch(action)
        history.replace('/')
        window.location.reload();
    }

    handleLogin(){
        this.setState({login: true})
    }
  
    render() {
      const {classes} = this.props;
    
      return (
          <Grid>
            <AppBar position="static">
            <Toolbar>
              <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                <MenuIcon />
              </IconButton>
              <Typography variant="title" color="inherit" className={classes.flex}>
                Itunes 
              </Typography>
              {this.state.login ? 
               <FacebookLogin
                appId="1956258181330453"
                autoLoad={true}
                fields="name,email,picture"
                callback={this.responseFacebook.bind(this)}
              /> :
                <Button variant="raised" color="primary" className={classes.button} onClick={this.handleLogin.bind(this)}>Login With Facebook</Button>
              }
             
            </Toolbar>
          </AppBar>
          </Grid>
      );
    }
  }

  export default connect(null, store=>(this.props)) (withStyles(styles)(Login));
  