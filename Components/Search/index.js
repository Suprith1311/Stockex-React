import React, { Component } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import './style1.css';

class Stock extends Component {
  constructor() {
    super();

    this.state = {
      symbSearch:'',
      indSearch:'',
      indOpt: "",
      StckOpt: "",
      stckData: [],
       columns : [
        { headerName: "Symbol", field: "symbol", cellRenderer: function(params) {
          return '<a href="/stock/'+params.value+'" >'+ params.value+'</a>' }},
        { headerName: "Name", field: "name" },
        { headerName: "Industry", field: "industry" }
      ],
    };
    this.handleChange = this.handleChange.bind(this);
    this.submitHandle = this.submitHandle.bind(this);
  }

  componentDidMount() {
    
    fetch("http://131.181.190.87:3001/all")
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            stckData: result,
            StckOpt: [...new Set(result.map((item) => item.symbol))],
            indOpt: [
              ...new Set(result.map((item) => item.industry)),
            ],
          });
        },
       
      );
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  submitHandle(event) {
    event.preventDefault();
  
    var url= "http://131.181.190.87:3001/";
    if(this.state.symbSearch == "" && this.state.indSearch == ""){
      url += "all?symbol="+this.state.symbSearch+"&&industry="+this.state.indSearch;
    }else if(this.state.symbSearch == ""){
      url += "industry?industry="+this.state.indSearch;
    }else if(this.state.indSearch == ""){
      url += "all?symbol="+this.state.symbSearch;
    }else{
      url += "all?symbol="+this.state.symbSearch+"&&industry="+this.state.indSearch;
    }
    fetch(url)
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            stckData: result,
          });
        },
        
      );
  }
  render() {
    return (
      <div className="container">
        <div className="symbol_search">
          <form onSubmit={(e)=>this.submitHandle(e)}>
            <select id="search_drpdwn" name="symbSearch" className="drpdwn_ctrl" onChange={(e)=>this.handleChange(e)}>
              <option value="">
                Select Stock
              </option>
              {this.state.StckOpt
                ? this.state.StckOpt.map((item, index) => (
                    <option value={item}>{item}</option>
                ))
                : null}
            </select>
            <select id="search_drpdwn"  name="indSearch" className="drpdwn_ctrl" onChange={(e)=>this.handleChange(e)}>
              <option value="">Select Industry</option>
              {this.state.indOpt
                ? this.state.indOpt.map((item, index) => (
                    <option value={item}>{item}</option>
                ))
                : null}
            </select>
            <button
              type="submit"
              id="but_id"
              className="but_class"
            >
              Search
            </button>
          </form>
        </div>
        <div className="container-fluid ">
          
            <div
              className="ag-theme-balham"
              style={{
                height: "300px",
                width: "600px"
              }}
                >
            <AgGridReact
              columnDefs={this.state.columns}
              rowData={this.state.stckData}
              pagination={true}
              paginationPageSize={7}
            />
      </div>
       </div>
      </div>
    );
  }
}

export default Stock;