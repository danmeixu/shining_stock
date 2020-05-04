import React from 'react';
import PageNavbar from './PageNavbar';
import BestStockRow from './BestStockRow';
import '../style/BestStocks.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class BestStocks extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			selectedType: "",
			selectedPrice: "",
			stocks: []
		};

		this.submitChange = this.submitChange.bind(this);
		this.handleTypeChange = this.handleTypeChange.bind(this);
		this.handlePriceChange = this.handlePriceChange.bind(this);
	}

	handleTypeChange(e) {
		this.setState({
			selectedType: e.target.value
		});
	}

	handlePriceChange(e) {
		this.setState({
			selectedPrice: e.target.value
		});
	}

	submitChange() {
		// Send an HTTP request to the server.
		fetch(`http://localhost:8081/beststocks/${this.state.selectedType}-${this.state.selectedPrice}`,
			{
				method: 'GET' // The type of HTTP request.
			}).then(res => {
				// Convert the response data to a JSON.
				return res.json();
			}, err => {
				// Print the error if there is one.
				console.log(err);
			}).then(bestList => {
				if (!bestList) return;
				let bestDivs = bestList.map((bestStock, i) =>
					<BestStockRow key={i} bestStock={bestStock}></BestStockRow>
				);
				// Set the state of the stocks list to the value returned by the HTTP response from the server.
				this.setState({
					stocks: bestDivs
				});
			}, err => {
				// Print the error if there is one.
				console.log(err);
			});
	} 

	render() {
		const hStyle = {
			backgroundColor: "lightblue",
      		padding: "10px",
			fontFamily: "Arial",
			textAlign: "center",
			color: "black"
		};
		return (
			<div className="BestStocks">
				<PageNavbar active="beststocks" />

				<div className="container beststocks-container" style={{backgroundColor: "lightblue"}}>
			      <div className="jumbotron" style={{backgroundColor: "lightblue"}}>
			        <h2 style={hStyle}>Choose your type of stocks and get recommendations instantly</h2>

			        <div className="select-container">
			          <div className="dropdown-container">
						<h6> How would you describe yourself as an investor? </h6>
			            <select value={this.state.selectedType} onChange={this.handleTypeChange} className="dropdown" id="stocksDropdown">
			            	<option selected disabled value=''>I am the type of investor who ... </option>
			            	<option value="risk-taking">take reasonable risks exchanging for bigger profits.</option>
			            	<option value="stable-seeking">expect stable returns on my investment.</option>
			            </select>
						<h5></h5>
						<h6> How price range are you looking to buy within? </h6>
			            <select value={this.state.selectedPrice} onChange={this.handlePriceChange} className="dropdown" id="stocksDropdown">
			            	<option selected disabled value=''>Price Per Share</option>
			            	<option value="less"> $50 or less </option>
			            	<option value="between"> $50 to $100 </option>
			            	<option value="more">$100 or more  </option>
			            </select>
						<h5></h5>
			            <button style={{backgroundColor: "skyblue"}} className="submit-btn" class="btn btn-outline-dark btn-sm" id="changeSubmitBtn" onClick={this.submitChange}>Submit</button>
			          </div>
			        </div>
			      </div>
			      <div className="jumbotron">
			        <div className="stocks-container">
						<h4>Stocks to be on the look out for: </h4>
			          <div className="stock">
			            <div className="header"><strong>Ticker</strong></div>
			    		<div className="header"><strong>Stock Name</strong></div>
					    <div className="header"><strong>Sector</strong></div>
					    <div className="header"><strong>Open Price</strong></div>
					    <div className="header"><strong>High Price</strong></div>
			          </div>
			          <div className="stocks-container" id="results">
			            {this.state.stocks}
			          </div>
			        </div>
			      </div>
			    </div>
			</div>
		);
	}
}