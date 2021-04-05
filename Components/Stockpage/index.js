import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import moment from 'moment';

class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      from_date: "",
      id:"",
      companyStockData: [],
      fullData: [],
      chartData: [],
      selectedCompany: "",
      stockData: [],
        columns:[
          {headerName: "Date",field: "timestamp",sortable:true, filter: true },
          {headerName: "Open",field:"open"},
          {headerName: "High",field:"high"},
          {headerName: "Low",field: "low"},
          {headerName: "Close",field: "close"},
          {headerName: "Volumes", field: "volumes"},
        ],
      fetch: "http://131.181.190.87:3001/"
    };
    this.handleChange = this.handleChange.bind(this);
    this.submitHandle = this.submitHandle.bind(this);
    this.showGraph = this.showGraph.bind(this);
    this.searchStartDate = this.searchStartDate.bind(this);
  }

  componentDidMount() {
    this.setState({
      id:this.props.match.params.id
    })
    
    
    fetch(this.state.fetch + "history?symbol="+this.props.match.params.id)
      .then((res) => res.json())
      .then(
        (result) => {
          console.log("RES",result);
          
          this.setState({
            companystockData: result,
            fullData: result
          });
          this.showGraph(0,result)
        },
      
      );
  }

  searchStartDate(){
    var filteredArr = [];
    
    this.state.fullData.forEach(item => {
      if(item.timestamp, moment(item.timestamp).isAfter(moment(this.state.from_date))){
        filteredArr.push(item);
      }
    });

    console.log("FILTERED",filteredArr);
    

    this.setState({
      companystockData: filteredArr
    })
    this.showGraph(0,filteredArr);
  }

  showGraph(pos,arr) {
    var company = arr[pos];
    
    var chartArr = [];
    arr.forEach(item => {
      if (item.name === arr[pos].name) {
        chartArr.push({ name: moment(item.timestamp).format('l'), close: item.close});
      }
    });
    console.log(company);
    
    this.setState({
      chartData: chartArr
    })
  }

  handleChange(date) {
    this.setState({
      from_date: date,
    });
  }

  submitHandle(event) {
    event.preventDefault();

    fetch(this.state.fetch + "history?symbol=A"+ this.props.match.params.id+"&from="+("0" + this.state.from_date.getDate()).slice(-2)+'-'+(("0" + (this.state.from_date.getMonth() + 1)).slice(-2))+'-'+this.state.from_date.getFullYear())
      .then((res) => res.json())
      .then(result =>
        result.map(item => {
          return {
            date: new Date(item.timestamp).getDate() +
            "/" +
            new Date(item.timestamp).getMonth() +
            1 +
            "/" +
            new Date(item.timestamp).getFullYear(),
            open: item.open,
            high: item.high,
            low: item.low,
            close: item.close,
            volume: item.volume,
          };
        })
  

      );
  } 
  render() {
    return (
      <div className="container">
        <div className="agileits_search col-sm-12">
          <form onSubmit={(e) => this.submitHandle(e)}>
            <div id="agileinfo_search" className="col-sm-9 top-margin">
              <DatePicker
                selected={this.state.from_date}
                onChange={this.handleChange}
                maxDate={new Date()}
                placeholderText="Select Date"
                
              />
            </div>
           
            <button
              type="submit"
              id="but_id"
              className="but_class"
            
              onClick={this.searchStartDate}>  
              SEARCH
            </button>
          </form>
        </div>
        <div className="container-fluid col-sm-12 stock-table">
        <div
        className="ag-theme-balham"
        style={{
          height: "300px",
          width: "1200px"
        }}
      >
        <AgGridReact
          columnDefs={this.state.columns}
          rowData={this.state.companystockData}
          pagination={true}
          paginationPageSize={30}
        />
      </div>
        </div>
        <div>
          <div style={{ display: 'flex', height: '50vh', width: '100%', marginTop: '10vh', marginBottom: '10vh' }}>
            <div style={{ flex: 1 }}></div>
            <div style={{ flex: 3, backgroundColor: 'white' }}>
              <LineChart
                width={1000}
                height={300}
                data={this.state.chartData}
                margin={{
                  top: 5, right: 30, left: 20, bottom: 5,
                }}>
                <CartesianGrid strokeDasharray="5 5" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="close" stroke="#8884d8" dot={false} />
              </LineChart>
            </div>
            <div style={{ flex: 10 }}></div>
          </div>
        </div>
      </div>
    );
  }
}
export default Details;