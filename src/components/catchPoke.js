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

class CatchPokemon extends Component {
  constructor(props){
    super(props);
    this.state={
      search_array:'',
      search_string:'',
      profile_menu_open: false,
      user_name:"",
      openModal: false,
      sort: '',
      activeSorted: '',
      pokemonDetails: null,
      pokemon:[],
      selectPoke: [],
      sorted: false,
      sort:'',
      open:false
    }
  }
  
  componentWillMount(){
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
      console.log("this.state open", this.state.open)
  };

  handleClose = () => {
      this.setState({ open: false });
      console.log("this.state", this.state.open)
  };

//   sendPokemon = (catchpoke) => {
//       this.props.catchPokemon(catchpoke);
//       // this.showAlert('Great! Pokemon has been sent to Backpack','success')
//   };

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

        console.log("pokemonnnnnnnnn------------>", this.state.selectPoke)
    };

sendPokemon = (catchpoke) => {
    var m=[];
    if(localStorage.getItem("pokeMons")){
        m = JSON.parse(localStorage.getItem("pokeMons"))
        m.push(catchpoke)
        var y= JSON.stringify(m)
        localStorage.setItem("pokeMons", y)
    }else{
        m.push(catchpoke)
        var g= JSON.stringify(m)
        localStorage.setItem("pokeMons",g)
    }
   
    this.props.catchPokemon(catchpoke);
    // this.showAlert('Great! Pokemon has been sent to Backpack','success')
};
navigate(){
    history.replace('/header')
}

handleChange = event => {
  this.setState({  activeSorted: event.target.value, sorted : true });
  };
 


  render() {
    const {classes} = this.props;
    const pokeFight = this.state.selectPoke;
    var mainData;
    if (!this.state.sorted) {
      mainData = this.props.poke_urls;
    } else{
      // console.log('showing', this.state.activeSorted );
      var sortName = this.state.activeSorted;
      mainData = _.sortBy(this.props.poke_urls, function(o) { return _.get(o, sortName) });
      mainData = (mainData).reverse();
      // console.log('main', mainData);
    }
    
    const pokeDetails = this.state.pokemonDetails;

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

            <Link to="/header" className="no-underline color-white">
              <Button style={{}}><span style={{color:"#ffffff"}}>Backpack</span></Button>
            </Link>
            <IconButton
                  aria-owns={'menu-appbar'}
                  aria-haspopup="true"
                //   onClick={this.handleProfileMenu.bind(this)}
                >
                  <AccountCircle onClick={this.navigate.bind(this)}/>
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
                // open={this.state.profile_menu_open}
                // onClose={this.handleProfileMenuClose.bind(this)}
            >
            {/* <MenuItem onClick={this.handleProfileMenuClose.bind(this)}>Profile</MenuItem>
            <MenuItem onClick={this.handleLogout.bind(this)}>LogOut</MenuItem> */}
            </Menu>
            <Typography variant="title" color="inherit" >{this.state.user_name}</Typography>
          </Toolbar>
        </AppBar>

        <Grid container spacing={24} style={{marginLeft:"10px", marginTop:"10px", marginBottom:"10px"}}>
          <Grid item xs={3} sm={6} md={3}>
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
          </Grid>
          <Grid item xs={3} sm={6} md={3}>

          <Button style={{background:"#4285f4"}} onClick={this.handleClickOpen} className="" variant="raised" color="primary">
					      Compare Now
					    </Button>
          </Grid>
        </Grid>
        </Grid>
        <div className="container">

									<div className="row">

										<div className="col-lg-9 col-md-9" style={{textAlign:"center"}} >

											
                                           
											{mainData ? mainData.map((item_id, id)=>(

												<div className="col-lg-4 col-md-4" style={{width:"calc(100%/4.1)", display:"inline-block", marginRight:"10px", marginTop:"0px"}}>

													<div className="box_model" style={{marginBottom:"30px"}}>

														<div className="box_model_header" >

															<div className="pokemon_image">

																<img src={"http://pokemongallery.s3-website.ap-south-1.amazonaws.com/img/"+item_id.name+".png"} />

															</div>

															<div className="pokemon_details" style={{textAlign:"left", color:"#fff", fontSize:"18px", letterSpacing:"1px", padding:"5px", }}>

																<p className="name_of_pokemon" style={{textAlign:"left", color:"#fff", fontSize:"18px", letterSpacing:"1px"}} >{item_id.name}</p>

																<label>{item_id.stats[5].stat.name.toUpperCase()}: {item_id.stats[5].base_stat}</label> <a href="javascript:void(0);" onClick={this.comparePoke.bind(this, item_id)}>Fight Pokemon</a>

															</div>

														</div>

														<div className="box_model_body">

															<ul>

																<li>Weight: <span>{item_id.weight}</span></li>

																<li>Height: <span>{item_id.height}</span></li>

																<li>Speed: <span>{item_id.stats[0].base_stat}</span></li>

																<li>Special-Defense: <span>{item_id.stats[1].base_stat}</span></li>

																<li>Special-Attack: <span>{item_id.stats[2].base_stat}</span></li>

																<li>Defense: <span>{item_id.stats[3].base_stat}</span></li>

																<li>Attack: <span>{item_id.stats[4].base_stat}</span></li>

															</ul>

														</div>

														<div className="box_model_footer">

															<a href="javascript:void(0);" onClick={this.sendPokemon.bind(this, item_id)}>Catch Up</a>

														</div>

													</div>

												</div>

                                                )): null
                                            }
                                        </div>
                                    </div>
                                </div>

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
                      <DialogTitle className={classes.dialog} id="alert-dialog-title" style=
                      {{background: "#3f51b5", marginBottom: "30px", color: "#fff"}}>
                      {/* <img height="42" className="mr-5 mb-10" src="img/crown.png" alt="crown"/> */}
                      {"Pokemon Fight Club"}</DialogTitle>
                      <DialogContent>
                      <div className="col-md-12 col-sm-12 col-xs-12" style={{display:"block", textAlign:"center"}}>
                            <div className="col-md-6 col-sm-12 col-xs-12 mt-20" style={{maxWidth:"345px", paddingTop:"5px", display:"inline-block", verticalAlign:"middle"}}>
                               <Card className="homeCard">
                                <CardMedia style={{background:"#e3c8ff"}} >
                                      <img src={"http://pokemongallery.s3-website.ap-south-1.amazonaws.com/img/"+pokeFight[0].name+".png"} className="center-align" height="180" width="auto" alt="bulbasaur" />
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
                                {/* <CardActions>
                                  <Button size="small" color="primary">
                                    <img className="" src="img/egg-incubator.png" alt="details"/> 
                                    <span>Base Experience :</span> 
                                    <span style={{marginLeft:"100px"}}>{pokeFight[0].base_experience}</span>
                                  </Button>
                                </CardActions> */}
                              </Card>
                            </div>
                            <div className="col-md-2" style={{maxWidth:"400px", padding:"0 25px", display:"inline-block", verticalAlign:"middle"}}>
                                {/* <img className="center-align" src="img/battle.png" alt="gotcha"/> */}
                                <span className="center-align"><Typography gutterBottom variant="headline" component="h2">V/S</Typography></span>
                            </div>
                            <div className="col-md-6 col-sm-12 col-xs-12 mt-20" style={{maxWidth:"400px", display:"inline-block", verticalAlign:"middle"}}>
                               <Card className="homeCard">
                                <CardMedia style={{background:"#fddacd"}} >
                                      <img src={"http://pokemongallery.s3-website.ap-south-1.amazonaws.com/img/"+pokeFight[1].name+".png"}  height="180px" width="auto"  />
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
                                {/* <CardActions>
                                  <Button size="small" color="primary">
                                    <img className="" src="img/egg-incubator-2.png" alt="details"/> 
                                    <span>Base Experience :</span> 
                                    <span style={{marginLeft:"100px"}}>{pokeFight[1].base_experience}</span>
                                  </Button>
                                </CardActions> */}
                              </Card>
                              </div>
                      </div>
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={this.handleClose} color="primary" autoFocus>
                        {/* <img className="" src="img/pokestop.png" alt="close"/> */}
                          Go Back
                        </Button>
                      </DialogActions>
                    </Dialog>
                   }
                  </div>
    
        }

                            </div>
       
    );
  }
}


function mapStateToProps(state){
//   console.log("mapdispatchtoprops--------------->", state)
  return {
    search_data : state.search.search_data,
    poke_urls: state.search.pokemon_details
  }
}

export default connect(mapStateToProps, {getTrackName, getAllPokemon,catchPokemon})(withStyles(styles)(CatchPokemon));
