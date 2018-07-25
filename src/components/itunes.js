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
import TextField from 'material-ui/TextField';
import {getTrackName} from '../actions/itunesActions'
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import SearchIcon from 'material-ui-icons/Search'
import Menu, { MenuItem } from 'material-ui/Menu';
import AccountCircle from 'material-ui-icons/AccountCircle';

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

class Itunes extends Component {
  constructor(props){
    super(props);
    this.state={
      search_array:'',
      search_string:'',
      profile_menu_open: false,
      user_name:""
    }
  }
  
  componentWillMount(){
      if(localStorage.getItem("data")){
          let data = JSON.parse(localStorage.getItem("data"))
          this.setState({user_name: data.name})
      }
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
            <TextField
            id="track name"
            label="Track name"
            type="search"
            className={classes.textField}
            margin="normal"
            fullWidth
            onChange={this.handleTrackName.bind(this)}
            />
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
                {this.state.search_array !==""?this.state.search_array.map((item_id, id)=>(
                  <Grid key={id} item xs={3} sm={6} md={3}>
                    <Card className={classes.card}>
                      <CardMedia
                        className={classes.media}
                        image={item_id.artworkUrl100}
                        title="Contemplative Reptile"
                      />
                      <CardContent>
                        <Typography variant="subheading" component="h2">
                          {item_id.artistName.length> 30 ? "Artist : "+item_id.artistName.slice(0, 30) : "Artist : "+item_id.artistName}
                        </Typography>
                        <Typography component="p">
                        {item_id.trackName.length> 20 ? "Track : "+item_id.trackName.slice(0, 20) : "Track : "+item_id.trackName}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button size="small" color="primary">
                          {"Genre : "+item_id.primaryGenreName}
                        </Button>
                        <Button size="small" style={{marginLeft:"150px"}} color="primary">
                         {"$"+item_id.collectionPrice}
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
  return {
    search_data : state.search.search_data
  }
}

export default connect(mapStateToProps, {getTrackName})(withStyles(styles)(Itunes));
