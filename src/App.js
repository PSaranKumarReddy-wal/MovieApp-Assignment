
import './App.css';
import React,{Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Button from '@mui/material/Button';
import Pagination from '@mui/material/Pagination';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import LoveRating from './Rating/Rating';
import moviesList from './MoviesList/MoviesList';
import MoviesList from './MoviesList/MoviesList';

const IMG_PATH= "https://image.tmdb.org/t/p/w500";
const notfound="https://images-us.bookshop.org/ingram/9781651031452.jpg?height=500&v=v2";
class App extends Component{
  constructor(props) {
    super(props);
    this.state = {
      teluguMovies: [],
      API:"https://api.themoviedb.org/3/discover/movie?api_key=3f39caa6ba102e5da7d4f9979ff1f710&with_original_language=te",
      page:1,
      total_pages:1,
      isLoading:true,
      value1:"te"
    }
  }
  
  componentDidMount() {
    const url = "https://api.themoviedb.org/3/discover/movie?api_key=3f39caa6ba102e5da7d4f9979ff1f710&with_original_language=te";
    fetch(url)
    .then(response => response.json())
    .then(json => {
      console.log("json data:",json);
      console.log("json data:",json.total_pages);
      this.setState(prevState =>({ teluguMovies: json.results ,page:json.page,total_pages:json.total_pages, isLoading : !prevState.isLoading}))})
  }

  // movies next previous pages
  nextPage=async(event, value)=>{
    this.setState(prevState => ({isLoading : !prevState.isLoading}))
    let {API,page,total_pages}=this.state;
    console.log("API in function:::->",API);
    console.log("page value in next page::",value);
    if(page > 0 && page <= total_pages){
    const da=await fetch(API+"&page="+value)
    .then(response => response.json())
    .then(json => {
      console.log("json data:",json);
      console.log("json data:",json.total_pages);
      this.setState(prevState =>({ teluguMovies: json.results ,page:value,total_pages:json.total_pages,isLoading : !prevState.isLoading}))})
    }
    else{
      alert("No more pages");
    }
  }

  // searching input Component

  searchInput=async(e)=>{
    if(e.target.value){
      
      this.setState(prevState => ({isLoading : !prevState.isLoading}))
      const da=await fetch("http://api.themoviedb.org/3/search/movie?&api_key=3f39caa6ba102e5da7d4f9979ff1f710&query="+e.target.value)
      .then(response => response.json())
      .then(json => {
        console.log("json data:",json);
        console.log("json data:",json.total_pages);
        const link="http://api.themoviedb.org/3/search/movie?&api_key=3f39caa6ba102e5da7d4f9979ff1f710&query="+e.target.value;
        this.setState(prevState =>({ teluguMovies: json.results ,page:json.page,total_pages:json.total_pages,API:link, isLoading : !prevState.isLoading,value1:"temp"}))})
    }
    else{
      
    fetch("https://api.themoviedb.org/3/discover/movie?api_key=3f39caa6ba102e5da7d4f9979ff1f710&with_original_language=te")
    .then(response => response.json())
    .then(json => {
      console.log("json data:",json);
      console.log("json data:",json.total_pages);
      this.setState({ teluguMovies: json.results ,page:json.page,total_pages:json.total_pages,value1:"te"})})
    }
  }

  handleChange = async(event, newValue) => {
    this.setState(prevState => ({value1:newValue,isLoading : !prevState.isLoading}))
    const url = "https://api.themoviedb.org/3/discover/movie?api_key=3f39caa6ba102e5da7d4f9979ff1f710&with_original_language="+newValue;
    const da=await fetch(url)
    .then(response => response.json())
    .then(json => {
      console.log("json data:",json);
      console.log("json data:",json.total_pages);
      this.setState(prevState =>({ teluguMovies: json.results ,page:json.page,total_pages:json.total_pages, isLoading : !prevState.isLoading,API:url,value1:newValue}))})
    
  };


  render(){
    console.log(this.state.teluguMovies);
    let {teluguMovies,total_pages,page,API,value1, isLoading}=this.state;
    console.log("api link::::",API);
    console.log("current page::",page);
    console.log("total_pages::",total_pages);

    
    
    return(
      
      <>
      <header>
        
      <div className="head-cont">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQe5-tIwhN-m89Gw5b3O09IEKe3B12vbuBz2g&usqp=CAU" alt="saran"  className="image"/>
      
      
        <div className="nav-cont">
          <div className="">
            <input onChange={this.searchInput} className="input" type="text" name=""  id="inputsearch" placeholder="Search..."/>
          </div>
         
        </div>

        <div className="large">
        <Box sx={{ width: '100%' }}>
      <Tabs
        value={value1}
        onChange={this.handleChange}
        textColor="inherit"
        indicatorColor="secondary"
        aria-label="secondary tabs example"
      >
        <Tab value="te" label="Tollywood" className="tabs" />
        <Tab value="en" label="Hollywood" className="tabs" />
        <Tab value="hi" label="Bollywood" className="tabs" />
      </Tabs>
    </Box>
        </div>
      </div>

  

    </header>

    <section>
      <div className="section-head">
        <div className="section-description">
          <h1 className="section-head1">You can Search Your Favourite movies</h1>
          <p className="section-para"> Welcome website. Here you will be able to browse and download YIFY movies in excellent 720p, 1080p, 2160p 4K and 3D quality, all at the smallest file size. Only here: YTS Movies Torrents.</p>
          <div className="small">
        <Box sx={{ width: '100%' }}>
      <Tabs
        value={value1}
        onChange={this.handleChange}
        textColor="inherits"
        indicatorColor="secondary"
        aria-label="secondary tabs example"
      >
        <Tab value="te" label="telugu" className="tabs" />
        <Tab value="en" label="english" className="tabs" />
        <Tab value="hi" label="hindi" className="tabs" />
      </Tabs>
    </Box>
        </div>
        </div>
      </div>
    </section>

    <section>
      <div>

        <div className="card-list">
          
          { isLoading ? (<Loader
        type="Puff"
        color="#00BFFF"
        height={50}
        width={50}
       
      />):teluguMovies.length?(teluguMovies.map((data) => (
            <MoviesList movieData = {data} key = {data.id} imagePath = {IMG_PATH} notfound={notfound}/>
          )) ):<div className="Error-div"><h1>Data not found</h1></div>}
         
         
        </div>
        <div className="button-cont">
          {/* {page > 1?<Button variant="contained" className="button"  style={{
                backgroundColor: "green",
                color: "white",
                marginRight:"10px"
              }} onClick={()=>{this.nextPage("minus");window.scroll(0,0)}}>Prev</Button>:""}
          {page < total_pages?<Button variant="contained" className="button" style={{
                backgroundColor: "green",
                color: "white",
                
              }} onClick={()=>{this.nextPage("plus");window.scroll(0,0)}}>Next</Button>:""} */}
          
          <FontAwesomeIcon icon="fa-solid fa-bars" />
          <div>
          <Pagination count={total_pages} page={page} color="secondary" variant="outlined" siblingCount={3} onChange={this.nextPage} onClick={window.scroll(0,0)} />
          </div>
          </div>
          
      </div>
    </section>
      </>
    )
  }
}


export default App;
