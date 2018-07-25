import React, { Component } from 'react';
import axios from 'axios';
import {Switch, Route, Redirect, Link} from 'react-router-dom';
import { connect } from 'react-redux'; 
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import TextField from 'material-ui/TextField';
import {getTrackName, getAllPokemon, catchPokemon} from '../actions/itunesActions'
import Card, { CardActions, CardContent, CardMedia, CardTitle } from 'material-ui/Card';
import SearchIcon from 'material-ui-icons/Search'
import Menu, { MenuItem } from 'material-ui/Menu';
import AccountCircle from 'material-ui-icons/AccountCircle';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Select from 'material-ui/Select';
import Input, { InputLabel } from 'material-ui/Input';
import _ from 'lodash';
import Dialog, {
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
  } from 'material-ui/Dialog';
  import Icon from 'material-ui/Icon';

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
	textFieldRoot: {
	  padding: 0,
	  'label + &': {
		marginTop: theme.spacing.unit * 3,
	  },
	},
	textFieldInput: {
	  borderRadius: 4,
	  backgroundColor: theme.palette.common.white,
	  border: '1px solid #ced4da',
	  fontSize: 16,
	  padding: '10px 12px',
	  width: 'calc(100% - 24px)',
	  transition: theme.transitions.create(['border-color', 'box-shadow']),
	  '&:focus': {
		borderColor: '#80bdff',
		boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
	  },
	},
	textFieldFormLabel: {
	  fontSize: 18,
	},
	card: {
	  maxWidth: 350,
	  marginLeft:10,
	  marginRight:10,
	},
	media: {
	  height: 200,
	},
	dialog:{
	  background: "#3f51b5",
	  marginBottom: "30px",
	  color: "#fff"
	}
  });
 
class Header extends React.Component {

	componentDidMount(){
		console.log("componentdidmont-------->", this.props.poke_urls)
	}
  render () {
		console.log(this.props.poke_urls)
		const {classes} = this.props;
		return (

		<div className={classes.root}>
			<Grid>
			<AppBar position="static">
			<Toolbar>
			  <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
				<MenuIcon />
			  </IconButton>
			  <Typography variant="title" color="inherit" className={classes.flex}>
				Pokemon 
			  </Typography>
			  <Grid  style={{marginRight:"400px"}}>
				<TextField
				defaultValue="Search"
			  //   onChange={this.handleSearch.bind(this)}
				InputProps={{
				  disableUnderline: true,
				  classes: {
					root: classes.textFieldRoot,
					input: classes.textFieldInput,
				  },
				}}
				InputLabelProps={{
				  shrink: true,
				  className: classes.textFieldFormLabel,
				}}
				/>
				{/* <IconButton  style={{color:"white"}} className={classes.button} aria-label="Search" onClick={this.handleSearchSubmit.bind(this)}>
				  <SearchIcon/>
				</IconButton> */}
			  </Grid>
  
			  <Link to="/" className="no-underline color-white">
				<Button color=""><span style={{color:"#ffffff"}}>Home</span></Button>
			  </Link>
			  <IconButton
					aria-owns={'menu-appbar'}
					aria-haspopup="true"
				  
				  >
					<AccountCircle />
			  </IconButton>
			  <Menu
				  id="menu-appbar"
				  anchorOrigin={{
				  vertical: 'top',
				  horizontal: 'right',
				  }}
				  transformOrigin={{
				  vertical: 'top',
				  horizontal: 'right',
				  }}
				  
			  >
			  {/* <MenuItem onClick={this.handleProfileMenuClose.bind(this)}>Profile</MenuItem>
			  <MenuItem onClick={this.handleLogout.bind(this)}>LogOut</MenuItem> */}
			  </Menu>
			  {/* <Typography variant="title" color="inherit" >{this.state.user_name}</Typography> */}
			</Toolbar>
		  </AppBar>
  
		  
		  </Grid>
			<div className="container">

									<div className="row">

										<div className="col-lg-9 col-md-9" style={{textAlign:"center"}} >

											
                                           
											{this.props.poke_urls ? this.props.poke_urls.map((item_id, id)=>(

												<div className="col-lg-4 col-md-4" style={{width:"calc(100%/4.1)", display:"inline-block", marginRight:"10px", marginTop:"0px"}}>

													<div className="box_model" style={{marginBottom:"30px"}}>

														<div className="box_model_header" >

															<div className="pokemon_image">

																<img src={"http://pokemongallery.s3-website.ap-south-1.amazonaws.com/img/"+item_id.name+".png"} />

															</div>

															<div className="pokemon_details" style={{textAlign:"left", color:"#fff", fontSize:"18px", letterSpacing:"1px", padding:"5px", }}>

																<p className="name_of_pokemon" style={{textAlign:"left", color:"#fff", fontSize:"18px", letterSpacing:"1px"}} >{item_id.name}</p>

																<label>{item_id.stats[5].stat.name.toUpperCase()}: {item_id.stats[5].base_stat}</label> <a href="javascript:void(0);" >Fight Pokemon</a>

															</div>

														</div>

														<div className="box_model_body">

															<ul>

																<li>Weight: <span>333</span></li>

																<li>Height: <span>333</span></li>

																<li>Speed: <span>333</span></li>

																<li>Special-Defense: <span>333</span></li>

																<li>Special-Attack: <span>333</span></li>

																<li>Defense: <span>333</span></li>

																<li>Attack: <span>333</span></li>

															</ul>

														</div>

														{/* <div className="box_model_footer">

															<a href="javascript:void(0);" onClick={this.sendPokemon.bind(this, item_id)}>Catch Up</a>

														</div> */}

													</div>

												</div>
												)): null
											}
										</div>
									</div>
								</div>
								</div>
		
		)
  }
}


function mapStateToProps(state){
	console.log("mapdispatchtoprops--------------->", state)
	return {
		poke_urls: state.catchPokemon.backpackPoke
	}
  }


export default connect(mapStateToProps, {})(withStyles(styles)(Header));
