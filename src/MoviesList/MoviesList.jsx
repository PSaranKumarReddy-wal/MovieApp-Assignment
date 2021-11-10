import LoveRating from "../Rating/Rating";
import "./MoviesList.css"

const MoviesList = (props) =>
{
    const {movieData, imagePath, notfound} = props
    const {overview,release_date,poster_path,vote_average, title} = movieData;
               
            console.log("called");
            return (
          
    <div className="card-main">
            <div className="card-div">
              <img className="movie-image" src={poster_path?(imagePath+poster_path):notfound} alt="" />
              </div>
              
              <div className="movie-details">
                <h4 className="heading">{title?title:"N/A"}</h4>
                <div className="card-rating">
                <span>{release_date?release_date:"N/A"}</span>
                <span className="love-icon"><LoveRating rating={vote_average/10}/>{vote_average}</span>
                
              </div>
              </div>
              
              <div className="overview">
                  <h4 >Story :</h4>
                <p>{overview?overview.substr(0,200):"Description Not Found"}...</p>
              </div>
          </div>
            )
}

export default MoviesList