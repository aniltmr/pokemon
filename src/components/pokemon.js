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
import {getTrackName, getAllPokemon} from '../actions/itunesActions'
import Card, { CardActions, CardContent, CardMedia, CardTitle } from 'material-ui/Card';
import SearchIcon from 'material-ui-icons/Search'
import Menu, { MenuItem } from 'material-ui/Menu';
import AccountCircle from 'material-ui-icons/AccountCircle';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Select from 'material-ui/Select';
import Input, { InputLabel } from 'material-ui/Input';
import _ from 'lodash';

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

class Pokemon extends Component {
  constructor(props){
    super(props);
    this.state={
      search_array:'',
      search_string:'',
      profile_menu_open: false,
      user_name:"",
      pokemon:[],
      selectPoke: [],
      sorted: false,
      sort:'',
    }
  }
  
  componentWillMount(){
      if(localStorage.getItem("data")){
          let data = JSON.parse(localStorage.getItem("data"))
          this.setState({user_name: data.name})
      }

      this.props.getAllPokemon();
      // .then(res=>{
      //   console.log("getAlllPokemon", res)
      //   res.data.results.map(x=>{

      //     console.log(x)
      //     this.props.getSinglePokemonDetails(x.url).then(result=>{
      //       console.log("result", result)
      //     // this.state.pokemon.push()
      //     })
      //   })
      // })
      

  }


 

  handleTrackName(e){
    let track_name= e.target.value
    let temp = this.props.search_data.filter(function(el){
      return el.trackName.toLowerCase().indexOf(track_name.toLowerCase()) > -1;
    })
    this.setState({search_array: temp});
  }

  handleArtistName(e){
    let track_name= e.target.value
    let temp = this.props.search_data.filter(function(el){
      return el.artistName.toLowerCase().indexOf(track_name.toLowerCase()) > -1;
    })
    this.setState({search_array: temp});
  }

  handleGenre(e){
    let track_name= e.target.value
    let temp = this.props.search_data.filter(function(el){
      return el.primaryGenreName.toLowerCase().indexOf(track_name.toLowerCase()) > -1;
    })
    this.setState({search_array: temp});
  }

  handlePrice(e){
    let track_name= e.target.value
    let temp = this.props.search_data.filter(function(el){
      return el.collectionPrice > e.target.value;
    })
    this.setState({search_array: temp});
  }

  handleSearch(e){
    this.setState({search_string : e.target.value})
  }

  handleSearchSubmit(e){
    e.preventDefault();
    this.props.getTrackName(this.state.search_string).then(res=>{
      this.setState({search_array: this.props.search_data});
    })
  }

  handleClickOpenModal = (pokemon) => {
    this.setState({ openModal: true });
    this.setState({ pokemonDetails: pokemon });
  };

  handleCloseModal = () => {
    this.setState({ openModal: false });
  };

  handleChange2 = event => {
    console.log("handlechange2--------->", event)
    this.setState({ [event.target.name]: event.target.value });
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
  

  handleProfileMenuClose(){
      this.setState({profile_menu_open: false})
  }

  handleProfileMenu(){
      this.setState({profile_menu_open:true})
  }

  handleLogout(){
      localStorage.clear();
      window.location.reload();
  }

  render() {
    const {classes} = this.props;
    console.log("component will -------------------", this.state.data)
    // var data=this.props.poke_urls

    return (
     
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
              onChange={this.handleSearch.bind(this)}
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
              <IconButton  style={{color:"white"}} className={classes.button} aria-label="Search" onClick={this.handleSearchSubmit.bind(this)}>
                <SearchIcon/>
              </IconButton>
            </Grid>

           
            <IconButton
                  aria-owns={'menu-appbar'}
                  aria-haspopup="true"
                  onClick={this.handleProfileMenu.bind(this)}
                >
                  <AccountCircle style={{color:"#ffffff"}}/>
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
                open={this.state.profile_menu_open}
                onClose={this.handleProfileMenuClose.bind(this)}
            >
            <MenuItem onClick={this.handleProfileMenuClose.bind(this)}>Profile</MenuItem>
            <MenuItem onClick={this.handleLogout.bind(this)}>LogOut</MenuItem>
            </Menu>
            <Typography variant="title" color="inherit" >{this.state.user_name}</Typography>
          </Toolbar>
        </AppBar>

        <Grid container spacing={24} style={{marginLeft:"10px"}}>
          <Grid item xs={3} sm={6} md={3}>
            {/* <TextField
            id="track name"
            label="Track name"
            type="search"
            className={classes.textField}
            margin="normal"
            fullWidth
            onChange={this.handleTrackName.bind(this)}
            /> */}

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
          </Grid>

          <Grid item xs={3} sm={6} md={3}>
            <TextField
            id="artist name"
            label="Artist name"
            type="search"
            className={classes.textField}
            margin="normal"
            fullWidth
            onChange={this.handleArtistName.bind(this)}
            />
          </Grid>

          <Grid item xs={3} sm={6} md={3}>
            <TextField
            id="genre"
            label="Genre"
            type="search"
            className={classes.textField}
            margin="normal"
            fullWidth
            onChange={this.handleGenre.bind(this)}
            />
          </Grid>

          <Grid item xs={3} sm={6} md={3}>
            <TextField
            id="price"
            label="Price"
            type="search"
            className={classes.textField}
            margin="normal"
            fullWidth
            onChange={this.handlePrice.bind(this)}
            />
          </Grid>
              <Grid container spacing={24}>
                {this.props.poke_urls ?this.props.poke_urls.map((item_id, id)=>(
                  <Grid key={id} item xs={3} sm={6} md={3}>
                    <Card style={{maxWidth:"345px", paddingTop:"5px"}} className="homeCard">
                    <CardMedia>
                      <img src={"img/"+item_id.name+".png"} className="center-align" height="180" width="auto" alt="bulbasaur" />
                    </CardMedia>
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
                        <img height="25" className="float-right mr-5 mt-3" src="img/open-pokeball.png" alt="compare"/>
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
                        <img className="" src="img/fight.png" alt="compare"/> Fight Pokemon
                      </Button>
                    </CardActions>
                  </Card>
                  </Grid>
                )): 
                <Grid style={{marginTop:"100px", marginLeft:"600px"}}>
                    <Typography variant="title" color="inherit" className={classes.flex} > Search Music......</Typography>
                </Grid>}
              </Grid>
        </Grid>
        </Grid>
      
    );
  }
}


function mapStateToProps(state){
  console.log("mapdispatchtoprops--------------->", state)
  return {
    search_data : state.search.search_data,
    poke_urls: state.search.pokemon_details
  }
}

export default connect(mapStateToProps, {getTrackName, getAllPokemon})(withStyles(styles)(Pokemon));
