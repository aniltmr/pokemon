import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/itunesActions';
import { bindActionCreators } from 'redux';
import Grid from 'material-ui/Grid';
import ReactDom from 'react-dom';
import { withStyles } from 'material-ui/styles';
import Card, { CardTitle, CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import Header from './header';
import Icon from 'material-ui/Icon';
import AlertTemplate from "react-alert-template-basic";
// import AlertContainer from 'react-alert';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import ImageIcon from 'material-ui-icons/Image';
import TextField from 'material-ui/TextField';
import SearchIcon from 'material-ui-icons/Search';
import 'react-select/dist/react-select.css';
import PropTypes from 'prop-types';
import Input, { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Select from 'material-ui/Select';
import Divider from 'material-ui/Divider';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import Slide from 'material-ui/transitions/Slide';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Progress from 'react-progressbar'
import { LinearProgress } from 'material-ui/Progress';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import _ from "lodash";

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
});





function Transition(props) {
  return <Slide direction="up" {...props} />;
}



class Home extends Component {

	constructor(props) {
        super(props);
        this.state = { open: false, 
        			   openModal: false,
        			   sort: '',
        			   activeSorted: '',
        			   pokemonDetails: null,
    				   selectPoke: [],
    				   sorted: false }
    };

	componentWillMount() {
		this.props.getAllPokemon();
    }

    handleClickOpenModal = (pokemon) => {
      this.setState({ openModal: true });
      this.setState({ pokemonDetails: pokemon });
  	};

    handleCloseModal = () => {
      this.setState({ openModal: false });
    };

    handleChange = event => {
    this.setState({  activeSorted: event.target.value, sorted : true });
  	};

  	handleChange2 = event => {
    this.setState({ [event.target.name]: event.target.value });
  	};

    alertOptions = {
	  position: 'top center',
	  timeout: 5000,
	  theme: 'dark',
	  offset: '30px',
	};

	// showAlert = (message, type) => {
	//   this.msg.show(message, {
	//     time: 3000,
	//     type: type
	//   })
	// };

    handleClickOpen = () => {
    	this.setState({ open: true });
	};

	handleClose = () => {
	    this.setState({ open: false });
	};

	sendPokemon = (catchpoke) => {
		this.props.catchPokemon(catchpoke);
		// this.showAlert('Great! Pokemon has been sent to Backpack','success')
	};

  	comparePoke = (pokeName) => {
  		if (this.state.selectPoke.includes(pokeName)) {
  			var pluto = this.state.selectPoke;
             var mars = _.indexOf(pluto,pokeName); 
              pluto.splice(mars)
  			this.setState({selectPoke: pluto})
  			// this.showAlert('! Pokemon Removed From Arena','success')
  		} else {
  			if
  			(this.state.selectPoke.length > 1) {
  			//  this.showAlert('Pokemon Rules! Only Two pokemon Can Fight Once ','error')
  			} else	{
  		this.setState({selectPoke : this.state.selectPoke.concat(pokeName)})
  			// this.showAlert('Great! Pokemon Selected For Arena','success')
  		}
  		}
  	};

 //  	String.prototype.capitalize = () => {
 //    return this.charAt(0).toUpperCase() + this.slice(1);
	// };

  render() {
	// console.log('pokedata', this.props.selectPoke);
	// console.log('comparePoke', this.state.favPokemon);
	// console.log ('details', this.state);

	const pokeFight = this.state.selectPoke;
	var mainData;
	if (!this.state.sorted) {
		mainData = this.props.pokedata;
	} else{
		// console.log('showing', this.state.activeSorted );
		var sortName = this.state.activeSorted;
		mainData = _.sortBy(this.props.pokedata, function(o) { return _.get(o, sortName) });
		mainData = (mainData).reverse();
		// console.log('main', mainData);
	}
	
	const pokeDetails = this.state.pokemonDetails;
	// console.log("details...", pokeDetails);
	const { classes } = this.props;

    return (
        <div>
        	{/* <Header/> */}
        	<div className="row">
        	<div className="col-md-12 col-sm-12 col-xs-12">
        		<div className="col-md-5 col-sm-12 col-xs-12">
        		    <List>
			         <ListItem>
			            <img className="" src="img/player.png" alt="compare"/>
			          <ListItemText style={{flex:"none", padding:"0 20px"}} primary="Player 1" secondary={pokeFight && pokeFight.length>=1 && pokeFight[0].name} />
			            <img className="" src="img/player.png" alt="compare"/>
			          <ListItemText style={{flex:"none", padding:"0 20px"}} primary="Player 2" secondary={pokeFight && pokeFight.length==2 && pokeFight[1].name} />
	        			<Button style={{background:"#4285f4"}} onClick={this.handleClickOpen} className="" variant="raised" color="primary">
					      Fight Now
					      <Icon className="ml-5">send</Icon>
					    </Button>
			         </ListItem>
			        </List>
        		</div>
        		<div className="col-md-4 col-sm-12 col-xs-12">
        			<form style={{float:"left", marginTop:"16px", marginRight:"10px"}} className="" autoComplete="off">
			        <FormControl className="" style={{minWidth:"60px"}}>
			          <InputLabel htmlFor="age-helper">Filter</InputLabel>
			          <Select
			            value={this.state.sort}
			            onChange={this.handleChange2}
			            input={<Input name="sort" />}
			          >
			            <MenuItem value=''>
			              <em>Default</em>
			            </MenuItem>
			            <MenuItem value={10}>HP</MenuItem>
			            <MenuItem value={20}>Speed</MenuItem>
			            <MenuItem value={30}>Attack</MenuItem>
			            <MenuItem value={40}>Defense</MenuItem>
			            <MenuItem value={50}>Weight</MenuItem>
			            <MenuItem value={60}>Height</MenuItem>
			          </Select>
			        </FormControl>
			      </form>
        		  <TextField
			        label="Enter Value"
			        className="mr-10"
			        margin="normal"
		          />
		          <Button style={{marginBottom:"10px", background:"#4285f4"}} variant="fab" mini color="primary" aria-label="add" className="">
			        <SearchIcon />
			      </Button>
        		</div>
        		<div className="col-md-3 col-sm-12 col-xs-12">
                <form className="" autoComplete="off">
			        <FormControl className="" style={{display:"flex"}}>
			          <InputLabel htmlFor="age-helper">Sort By</InputLabel>
			          <Select
			            value={this.state.activeSorted}
			            onChange={this.handleChange.bind(this)}
			            input={<Input name="sort" id="age-helper" />}
			          >
			            <MenuItem value='stats[5].base_stat'>HP</MenuItem>
			            <MenuItem value='stats[0].base_stat'>Speed</MenuItem>
			            <MenuItem value='stats[4].base_stat'>Attack</MenuItem>
			            <MenuItem value='stats[3].base_stat'>Defense</MenuItem>
			            <MenuItem value='weight'>Weight</MenuItem>
			            <MenuItem value='height'>Height</MenuItem>
			          </Select>
			          <FormHelperText>Sorting is in High to Low order</FormHelperText>
			        </FormControl>
			      </form>
        		</div>
        	</div>
        	</div>

        	{  
        		// FIRST ROW ENDS ----
        		// className={pokeFight && pokeFight>=1 ? "homeCardSelected" : "homeCard"}
        		// SECOND ROW STARTS ----
        	  }

        	<div className="row">
        	<div className="col-md-12 col-sm-12 col-xs-12">
        	{!mainData || (mainData && mainData.length<4)  &&
        		<div className="col-md-12">
        			<div className="col-md-3">
		        		<LinearProgress style={{marginTop:"120px"}} />
		        		<br />
		      			<LinearProgress style={{marginTop:"80px"}} color="secondary" />
        			</div>
        			<div className="col-md-3">
		        		<LinearProgress style={{marginTop:"120px"}} />
		        		<br />
		      			<LinearProgress style={{marginTop:"80px"}} color="secondary" />
        			</div>
        			<div className="col-md-3">
		        		<LinearProgress style={{marginTop:"120px"}} />
		        		<br />
		      			<LinearProgress style={{marginTop:"80px"}} color="secondary" />
        			</div>
        			<div className="col-md-3">
		        		<LinearProgress style={{marginTop:"120px"}} />
		        		<br />
		      			<LinearProgress style={{marginTop:"80px"}} color="secondary" />
        			</div>
        		</div>
        	}
        		<div>

						<div className="container">

									<div className="row">

								

										<div className="col-lg-9 col-md-9" >

											<div className="row" style={{display:"flex"}}>

											{mainData ? mainData.map((item_id, id)=>(

												<div className="col-lg-4 col-md-4" style={{marginRight:"10px"}}>

													<div className="box_model" style={{marginBottom:"30px"}}>

														<div className="box_model_header" >

															<div className="pokemon_image">

																<img src={"http://pokemongallery.s3-website.ap-south-1.amazonaws.com/img/"+item_id.name+".png"} />

															</div>

															<div className="pokemon_details" style={{textAlign:"left", color:"#fff", fontSize:"18px", letterSpacing:"1px", padding:"5px", }}>

																<p className="name_of_pokemon" style={{textAlign:"left", color:"#fff", fontSize:"18px", letterSpacing:"1px"}} >{item_id.name}</p>

																<label>{item_id.stats[5].stat.name.toUpperCase()}: {item_id.stats[5].base_stat}</label> <a href="javascript:void(0);">Fight Pokemon</a>

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

														<div className="box_model_footer">

															<a href="javascript:void(0);">Catch Up</a>

														</div>

													</div>

												</div>

)): null
}

											

												<div className="col-lg-4 col-md-4">

													<div className="box_model">

														<div className="box_model_header">

															<div className="pokemon_image">

																<img src="http://pokemongallery.s3-website.ap-south-1.amazonaws.com/img/raichu.png" />

															</div>

															<div className="pokemon_details">

																<p className="name_of_pokemon">DUGTRIO</p>

																<label>HP: 60</label> <a href="javascript:void(0);">Fight Pokemon</a>

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

														<div className="box_model_footer">

															<a href="javascript:void(0);">Catch Up</a>

														</div>

													</div>

												</div>

											

												<div className="col-lg-4 col-md-4">

													<div className="box_model">

														<div className="box_model_header">

															<div className="pokemon_image">

																<img src="http://pokemongallery.s3-website.ap-south-1.amazonaws.com/img/raichu.png"/>

															</div>

															<div className="pokemon_details">

																<p className="name_of_pokemon">DUGTRIO</p>

																<label>HP: 60</label> <a href="javascript:void(0);">Fight Pokemon</a>

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

														<div className="box_model_footer">

															<a href="javascript:void(0);">Catch Up</a>

														</div>

													</div>

												</div>

										

											</div>

										</div>

										<div className="col-lg-3 col-md-3"></div>

									</div>

								</div>


							<Grid container spacing={24}>
        	   
								return  <Grid container spacing={24}>
                {mainData ? mainData.map((item_id, id)=>(
                    
                  <Grid key={id} item xs={3} sm={6} md={3}>
                    <Card style={{maxWidth:"345px", paddingTop:"5px"}} className="homeCard">
                    
                    <CardMedia
                        className={classes.media}
                        image={item_id.sprites.front_shiny}
                        title="Contemplative Reptile"
                      />
                    <CardContent>
                      <Typography gutterBottom variant="headline" component="h2">
                        <span className="color-primary">{item_id.name.toUpperCase()}</span>
                        <span className="fontSize-20 color-secondary float-right">
                        {item_id.stats[5].stat.name.toUpperCase()}: {item_id.stats[5].base_stat}</span>
                        {/* <img height="25" className="float-right mr-5 mt-3" src="img/open-pokeball.png" alt="compare"/> */}
                      </Typography>
                          <Table>
                          <TableBody>
                                <TableRow>
                                  <TableCell>Weight:</TableCell>
                                  <TableCell numeric>{item_id.weight}</TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell>Height:</TableCell>
                                  <TableCell numeric>{item_id.height}</TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell>{item_id.stats[0].stat.name.replace(/\b\w/g, l => l.toUpperCase())}:</TableCell>
                                  <TableCell numeric>{item_id.stats[0].base_stat}</TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell>{item_id.stats[1].stat.name.replace(/\b\w/g, l => l.toUpperCase())}:</TableCell>
                                  <TableCell numeric>{item_id.stats[1].base_stat}</TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell>{item_id.stats[2].stat.name.replace(/\b\w/g, l => l.toUpperCase())}:</TableCell>
                                  <TableCell numeric>{item_id.stats[2].base_stat}</TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell>{item_id.stats[3].stat.name.replace(/\b\w/g, l => l.toUpperCase())}:</TableCell>
                                  <TableCell numeric>{item_id.stats[3].base_stat}</TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell>{item_id.stats[4].stat.name.replace(/\b\w/g, l => l.toUpperCase())}:</TableCell>
                                  <TableCell numeric>{item_id.stats[4].base_stat}</TableCell>
                                </TableRow>
                          </TableBody>
                        </Table>
                    </CardContent>
                    <CardActions>
                      {/* <Button onClick={this.handleClickOpenModal.bind(this, item_id)} size="small" color="primary">
                        <img className="" src="img/mystic.png" alt="details"/> More Details
                      </Button> */}
                      <Button onClick={this.comparePoke.bind(this, item_id)} size="small" color="primary">
                        Fight Pokemon
                      </Button>
                    </CardActions>
                  </Card>
                  </Grid>
                )): 
                <Grid style={{marginTop:"100px", marginLeft:"600px"}}>
                    <Typography variant="title" color="inherit" className={classes.flex} > Search Music......</Typography>
                </Grid>}
              </Grid>
		        	{/* // return <Grid key={id} item xs={3} md={6}>
			       	// <Card style={{maxWidth:"345px", paddingTop:"5px"}} className={pokeFight && pokeFight>=1 ? "homeCardSelected" : "homeCard"}>
				      //   <CardMedia overlay={<CardTitle title="Overlay title" subtitle="Overlay subtitle" />}>
		      		// 		<img src={"img/"+pokemon.name+".png"} className="center-align" height="180" width="auto" alt="bulbasaur" />
				      //   </CardMedia>
				      //   <CardContent>
				      //     <Typography gutterBottom variant="headline" component="h2">
				      //       <span className="color-primary">{pokemon.name.toUpperCase()}</span>
				      //       <span className="fontSize-20 color-secondary float-right">
				      //       {pokemon.stats[5].stat.name.toUpperCase()}: {pokemon.stats[5].base_stat}</span>
				      //       <img height="25" className="float-right mr-5 mt-3" src="img/open-pokeball.png" alt="compare"/>
				      //     </Typography>
						  //         <Table>
							//         <TableBody>
							//               <TableRow>
							//                 <TableCell>Weight:</TableCell>
							//                 <TableCell numeric>{pokemon.weight}</TableCell>
							//               </TableRow>
							//               <TableRow>
							//                 <TableCell>Height:</TableCell>
							//                 <TableCell numeric>{pokemon.height}</TableCell>
							//               </TableRow>
							//               <TableRow>
							//                 <TableCell>{pokemon.stats[0].stat.name.replace(/\b\w/g, l => l.toUpperCase())}:</TableCell>
							//                 <TableCell numeric>{pokemon.stats[0].base_stat}</TableCell>
							//               </TableRow>
							//               <TableRow>
							//                 <TableCell>{pokemon.stats[1].stat.name.replace(/\b\w/g, l => l.toUpperCase())}:</TableCell>
							//                 <TableCell numeric>{pokemon.stats[1].base_stat}</TableCell>
							//               </TableRow>
							//               <TableRow>
							//                 <TableCell>{pokemon.stats[2].stat.name.replace(/\b\w/g, l => l.toUpperCase())}:</TableCell>
							//                 <TableCell numeric>{pokemon.stats[2].base_stat}</TableCell>
							//               </TableRow>
							//               <TableRow>
							//                 <TableCell>{pokemon.stats[3].stat.name.replace(/\b\w/g, l => l.toUpperCase())}:</TableCell>
							//                 <TableCell numeric>{pokemon.stats[3].base_stat}</TableCell>
							//               </TableRow>
							//               <TableRow>
							//                 <TableCell>{pokemon.stats[4].stat.name.replace(/\b\w/g, l => l.toUpperCase())}:</TableCell>
							//                 <TableCell numeric>{pokemon.stats[4].base_stat}</TableCell>
							//               </TableRow>
							//         </TableBody>
							//       </Table>
				      //   </CardContent>
				      //   <CardActions>
				      //     <Button onClick={this.handleClickOpenModal.bind(this, pokemon)} size="small" color="primary">
				      //       <img className="" src="img/mystic.png" alt="details"/> More Details
				      //     </Button>
				      //     <Button onClick={this.comparePoke.bind(this, pokemon)} size="small" color="primary">
				      //       <img className="" src="img/fight.png" alt="compare"/> Fight Pokemon
				      //     </Button>
				      //   </CardActions>
				      // </Card>
				      // </Grid> */}
				    
								 </Grid>
                 </div>
		      </div>
		      </div>
		      {/* <AlertContainer ref={a => this.msg = a} {...this.alertOptions} /> */}

		      {  
        		// SECOND ROW ENDS ----

        		// FIRST MODAL STARTS ----
        	  }

    {

	        <div>
	        { pokeFight && pokeFight.length==2 &&
		      <Dialog
		      	  maxWidth="md"
		      	  fullWidth="true"
		          open={this.state.open}
		          onClose={this.handleClose}
		          aria-labelledby="alert-dialog-title"
		          aria-describedby="alert-dialog-description"
		        >
		          <DialogTitle className="text-center" id="alert-dialog-title">
		          <img height="42" className="mr-5 mb-10" src="img/crown.png" alt="crown"/>
		          {"Pokemon Fight Club"}</DialogTitle>
		          <DialogContent>
		          <div className="col-md-12 col-sm-12 col-xs-12">
			        	<div className="col-md-5 col-sm-12 col-xs-12 mt-20">
				       	<Card style={{maxWidth:"345px", paddingTop:"5px"}} className="homeCard">
					        <CardMedia style={{background:"#e3c8ff"}} overlay={<CardTitle title="Overlay title" subtitle="Overlay subtitle" />}>
			      				<img src={"img/"+pokeFight[0].name+".png"} className="center-align" height="180" width="auto" alt="bulbasaur" />
					        </CardMedia>
					        <CardContent>
					          <Typography gutterBottom variant="headline" component="h2">
					            <span className="color-primary">{pokeFight[0].name.toUpperCase()}</span>
					            <span className="fontSize-20 color-secondary float-right">
					            {pokeFight[0].stats[5].stat.name.toUpperCase()}: {pokeFight[0].stats[5].base_stat}</span>
					            <Icon className="color-secondary fontSize-25 mt-4 float-right">
							       group_work
							    </Icon>
					          </Typography>
					          <Table>
							        <TableBody>
							              <TableRow>
							                <TableCell>Weight:</TableCell>
							                <TableCell numeric>{pokeFight[0].weight}</TableCell>
							              </TableRow>
							              <TableRow>
							                <TableCell>Height:</TableCell>
							                <TableCell numeric>{pokeFight[0].height}</TableCell>
							              </TableRow>
							              <TableRow>
							                <TableCell>{pokeFight[0].stats[0].stat.name.replace(/\b\w/g, l => l.toUpperCase())}:</TableCell>
							                <TableCell numeric>{pokeFight[0].stats[0].base_stat}</TableCell>
							              </TableRow>
							              <TableRow>
							                <TableCell>{pokeFight[0].stats[1].stat.name.replace(/\b\w/g, l => l.toUpperCase())}:</TableCell>
							                <TableCell numeric>{pokeFight[0].stats[1].base_stat}</TableCell>
							              </TableRow>
							              <TableRow>
							                <TableCell>{pokeFight[0].stats[2].stat.name.replace(/\b\w/g, l => l.toUpperCase())}:</TableCell>
							                <TableCell numeric>{pokeFight[0].stats[2].base_stat}</TableCell>
							              </TableRow>
							              <TableRow>
							                <TableCell>{pokeFight[0].stats[3].stat.name.replace(/\b\w/g, l => l.toUpperCase())}:</TableCell>
							                <TableCell numeric>{pokeFight[0].stats[3].base_stat}</TableCell>
							              </TableRow>
							              <TableRow>
							                <TableCell>{pokeFight[0].stats[4].stat.name.replace(/\b\w/g, l => l.toUpperCase())}:</TableCell>
							                <TableCell numeric>{pokeFight[0].stats[4].base_stat}</TableCell>
							              </TableRow>
							        </TableBody>
							      </Table>
					        </CardContent>
					        <CardActions>
					          <Button size="small" color="primary">
					            <img className="" src="img/egg-incubator.png" alt="details"/> 
					            <span>Base Experience :</span> 
					            <span style={{marginLeft:"100px"}}>{pokeFight[0].base_experience}</span>
					          </Button>
					        </CardActions>
					      </Card>
					    </div>
					    <div className="col-md-2">
					    	<img className="center-align" src="img/battle.png" alt="gotcha"/>
					    	<span style={{marginTop:"135%"}} className="center-align"><Typography gutterBottom variant="headline" component="h2">V/S</Typography></span>
					    </div>
					    <div className="col-md-5 col-sm-12 col-xs-12 mt-20">
				       	<Card style={{maxWidth:"345px", paddingTop:"5px"}} className="homeCard">
					        <CardMedia style={{background:"#fddacd"}} overlay={<CardTitle title="Overlay title" subtitle="Overlay subtitle" />}>
			      				<img src={"img/"+pokeFight[1].name+".png"} className="center-align" height="180" width="auto" alt="bulbasaur" />
					        </CardMedia>
					        <CardContent>
					          <Typography gutterBottom variant="headline" component="h2">
					            <span className="color-primary">{pokeFight[1].name.toUpperCase()}</span>
					            <span className="fontSize-20 color-secondary float-right">
					            {pokeFight[1].stats[5].stat.name.toUpperCase()}: {pokeFight[1].stats[5].base_stat}</span>
					            <Icon className="color-secondary fontSize-25 mt-4 float-right">
							       group_work
							    </Icon>
					          </Typography>
					          	<Table>
							        <TableBody>
							              <TableRow>
							                <TableCell>Weight:</TableCell>
							                <TableCell numeric>{pokeFight[1].weight}</TableCell>
							              </TableRow>
							              <TableRow>
							                <TableCell>Height:</TableCell>
							                <TableCell numeric>{pokeFight[1].height}</TableCell>
							              </TableRow>
							              <TableRow>
							                <TableCell>{pokeFight[1].stats[0].stat.name.replace(/\b\w/g, l => l.toUpperCase())}:</TableCell>
							                <TableCell numeric>{pokeFight[1].stats[0].base_stat}</TableCell>
							              </TableRow>
							              <TableRow>
							                <TableCell>{pokeFight[1].stats[1].stat.name.replace(/\b\w/g, l => l.toUpperCase())}:</TableCell>
							                <TableCell numeric>{pokeFight[1].stats[1].base_stat}</TableCell>
							              </TableRow>
							              <TableRow>
							                <TableCell>{pokeFight[1].stats[2].stat.name.replace(/\b\w/g, l => l.toUpperCase())}:</TableCell>
							                <TableCell numeric>{pokeFight[1].stats[2].base_stat}</TableCell>
							              </TableRow>
							              <TableRow>
							                <TableCell>{pokeFight[1].stats[3].stat.name.replace(/\b\w/g, l => l.toUpperCase())}:</TableCell>
							                <TableCell numeric>{pokeFight[1].stats[3].base_stat}</TableCell>
							              </TableRow>
							              <TableRow>
							                <TableCell>{pokeFight[1].stats[4].stat.name.replace(/\b\w/g, l => l.toUpperCase())}:</TableCell>
							                <TableCell numeric>{pokeFight[1].stats[4].base_stat}</TableCell>
							              </TableRow>
							        </TableBody>
							      </Table>
					        </CardContent>
					        <CardActions>
					          <Button size="small" color="primary">
					            <img className="" src="img/egg-incubator-2.png" alt="details"/> 
					            <span>Base Experience :</span> 
					            <span style={{marginLeft:"100px"}}>{pokeFight[1].base_experience}</span>
					          </Button>
					        </CardActions>
					      </Card>
					      </div>
			      </div>
		          </DialogContent>
		          <DialogActions>
		            <Button onClick={this.handleClose} color="primary" autoFocus>
		            <img className="" src="img/pokestop.png" alt="close"/>
		              Go Back
		            </Button>
		          </DialogActions>
		        </Dialog>
		       }
		      </div>

	}

		        {  
        		// FIRST MODAL ENDS ----

        		// SECOND MODAL STARTS ----
        	  }

    {

        	  <div>
        	  { pokeDetails &&
			        <Dialog
			          fullScreen
			          open={this.state.openModal}
			          onClose={this.handleCloseModal}
			          transition={Transition}
			        >
			          <AppBar style={{position:"relative", background:"#4285F4"}}>
			            <Toolbar>
			              <Typography variant="title" color="inherit" className="flex-1">
			                <img className="" height="42" src="img/pointer.png" alt="close"/>
			                Know More of This Pokemon <img className="" height="32" src="img/new.png" alt="close"/> {pokeDetails.name.toUpperCase()} !
			              </Typography>
			              <Button color="inherit" onClick={this.handleCloseModal}>
			                Close
			              </Button>
			            </Toolbar>
			          </AppBar>
		          	  <div className="col-md-12 col-sm-12 col-xs-12">
			          	<div className="mt-20">
					       	<Card style={{paddingTop:"5px"}} className="homeCard">
						        <CardMedia overlay={<CardTitle title="Overlay title" subtitle="Overlay subtitle" />}>
						        <div className="col-md-4">
						        <img src={"img/"+pokeDetails.name+".png"} className="float-right" height="80" width="auto" alt="bulbasaur" />
				      			</div>
				      			<div className="col-md-4">
				      				<img src={"img/"+pokeDetails.name+".png"} className="center-align" height="180" width="auto" alt="bulbasaur" />
				      			</div>
				      			<div className="col-md-4">
				      			<img src={"img/"+pokeDetails.name+".png"} className="" height="80" width="auto" alt="bulbasaur" />
						        </div>
						        </CardMedia>
						        <CardContent>
						        <div className="col-md-12">
						          <Typography gutterBottom variant="headline" component="h2">
						            <span className="color-primary">{pokeDetails.name.toUpperCase()}</span>
						            <span className="fontSize-20 color-secondary float-right">
						            {pokeDetails.stats[5].stat.name.toUpperCase()}: {pokeDetails.stats[5].base_stat}</span>
						            <Icon className="color-secondary fontSize-25 mt-4 float-right">
								       group_work
								    </Icon>
						          </Typography>
						          </div>
						          <Table>
							        <TableBody>
							              <TableRow>
							                <TableCell>Weight:</TableCell>
							                <TableCell numeric><Progress color="#a4c3f7" completed={pokeDetails.weight} /></TableCell>
							                <TableCell numeric>{pokeDetails.weight}</TableCell>
							              </TableRow>
							              <TableRow>
							                <TableCell>Height:</TableCell>
							                <TableCell numeric><Progress color="#a4c3f7" completed={pokeDetails.height} /></TableCell>
							                <TableCell numeric>{pokeDetails.height}</TableCell>
							              </TableRow>
							              <TableRow>
							                <TableCell>{pokeDetails.stats[0].stat.name.replace(/\b\w/g, l => l.toUpperCase())}:</TableCell>
							                <TableCell numeric><Progress color="#a4c3f7" completed={pokeDetails.stats[0].base_stat} /></TableCell>
							                <TableCell numeric>{pokeDetails.stats[0].base_stat}</TableCell>
							              </TableRow>
							              <TableRow>
							                <TableCell>{pokeDetails.stats[1].stat.name.replace(/\b\w/g, l => l.toUpperCase())}:</TableCell>
							                <TableCell numeric><Progress color="#a4c3f7" completed={pokeDetails.stats[1].base_stat} /></TableCell>
							                <TableCell numeric>{pokeDetails.stats[1].base_stat}</TableCell>
							              </TableRow>
							              <TableRow>
							                <TableCell>{pokeDetails.stats[2].stat.name.replace(/\b\w/g, l => l.toUpperCase())}:</TableCell>
							                <TableCell numeric><Progress color="#a4c3f7" completed={pokeDetails.stats[2].base_stat} /></TableCell>
							                <TableCell numeric>{pokeDetails.stats[2].base_stat}</TableCell>
							              </TableRow>
							              <TableRow>
							                <TableCell>{pokeDetails.stats[3].stat.name.replace(/\b\w/g, l => l.toUpperCase())}:</TableCell>
							                <TableCell numeric><Progress color="#a4c3f7" completed={pokeDetails.stats[3].base_stat} /></TableCell>
							                <TableCell numeric>{pokeDetails.stats[3].base_stat}</TableCell>
							              </TableRow>
							              <TableRow>
							                <TableCell>{pokeDetails.stats[4].stat.name.replace(/\b\w/g, l => l.toUpperCase())}:</TableCell>
							                <TableCell numeric><Progress color="#a4c3f7" completed={pokeDetails.stats[4].base_stat} /></TableCell>
							                <TableCell numeric>{pokeDetails.stats[4].base_stat}</TableCell>
							              </TableRow>
							        </TableBody>
							      </Table>
						        </CardContent>
						        <CardActions>
						          <Button onClick={this.sendPokemon.bind(this, pokeDetails)} style={{marginRight:"auto", marginLeft:"auto", background:"#4285F4"}} variant="raised" color="primary">
								      Catch {pokeDetails.name} Now
								      <Icon className="ml-5">send</Icon>
								  </Button>
						        </CardActions>
						      </Card>
						      </div>
						    </div>
			        </Dialog>
			  }
			  </div>
	}
        </div>   
    );
}
}


function mapStateToProps(state) {
	console.log('state', state);
	return { pokedata: state.search.pokemon_details };
}

export default connect(mapStateToProps, actions)(withStyles(styles)(Home));
