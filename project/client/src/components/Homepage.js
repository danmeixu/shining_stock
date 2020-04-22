import React from 'react';
import '../style/Homepage.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import PageNavbar from './PageNavbar';



export default class Homepage extends React.Component {
  constructor(props) {
    super(props);

    // The state maintained by this React Component. This component maintains the list of genres,
    // and a list of movies for a specified genre.
    this.state = {
      stocks: [],

    }

  //  this.showStocks = this.showStocks.bind(this);
  }

  // React function that is called when the page load.
  componentDidMount() {
    // Send an HTTP request to the server.
    fetch("http://localhost:8081/homepage",
    {
      method: 'GET' // The type of HTTP request.
    }).then(res => {
      // Convert the response data to a JSON.
      return res.json();
    }, err => {
      // Print the error if there is one.
      console.log(err);
    }).then(genreList => {
      if (!genreList) return;
      // Map each genreObj in genreList to an HTML element:
      // A button which triggers the showMovies function for each genre.
      let genreDivs = genreList.map((genreObj, i) =>
      <div key={i} className="popularstock">
       <div className="name">{genreObj.company}</div>
       <div className="rating">{genreObj.revenue}</div>
       </div>
      );



      // Set the state of the genres list to the value returned by the HTTP response from the server.
      this.setState({
        stocks: genreDivs
      });
    }, err => {
      // Print the error if there is one.
      console.log(err);
    });
  }


  /* ---- Q1b (Dashboard) ---- */
  /* Set this.state.movies to a list of <DashboardMovieRow />'s. */
  showMovies(genre) {
    // fetch("http://localhost:8081/homepage/"+genre,
    // {
    //   method: 'GET' // The type of HTTP request.
    // }).then(res => {
    //   // Convert the response data to a JSON.
    //   return res.json();
    // }, err => {
    //   // Print the error if there is one.
    //   console.log(err);
    // }).then(movieList => {
    //   if (!movieList) return;
    //   // Map each genreObj in genreList to an HTML element:
    //   // A button which triggers the showMovies function for each genre.
    //   let movieDivs = movieList.map((genre, i) =>
    //   <div key={i} className="movie">
		// 		<div className="title">{genre.title}</div>
		// 		<div className="rating">{genre.rating}</div>
		// 		<div className="votes">{genre.vote_count}</div>
		// 	</div>
    //
    //     );
    //
    //
    //
    //   // Set the state of the genres list to the value returned by the HTTP response from the server.
    //   this.setState({
    //     movies: movieDivs
    //   });
    // }, err => {
    //   // Print the error if there is one.
    //   console.log(err);
    // });
  }

  render() {
    return (
      <div className="Homepage">

        <PageNavbar active="homepage" />

        <br></br>
        <div className="container movies-container">
          <div className="jumbotron">
            <div className="h5">Most Popular Stocks</div>
            <div className="homepage-container">
            <div className="stock-header">
              <div className="header-lg"><strong>Name</strong></div>
              <div className="header"><strong>Revenue</strong></div>

            </div>
            <div className="results-container" id="results">
              {this.state.stocks}
                </div>
            </div>
          </div>


        </div>
      </div>
    );
  }
}
