import { isList } from 'immutable';
import React from 'react';
import '../../Styles/style.css';
import {List as iList} from 'immutable';
import { connect } from 'react-redux';
import {fetchYearSpecificData, loadSpinner} from '../../actions/actions';
import axios from 'axios';
import chunk from 'lodash.chunk';
import { Card } from 'react-bootstrap';


class Leftpan extends React.Component {


    onClickYear = async(year) =>{
        const {loadSpinner} = this.props;
        loadSpinner(true);
        console.log('Year data to be fetched is:-', year);
        await axios.get('https://api.spacexdata.com/v3/launches?limit=100&launch_year='+year)
        .then((response)=>{
            console.log('Response year specific is :-', response.data);
            this.props.fetchYearSpecificData(response.data);
            loadSpinner(false)
        })   
    }

    onLaunch = async(type,val) =>{
        const {loadSpinner} = this.props;
        loadSpinner(true);
        if(type === 'launch'){

        await axios.get('https://api.spacexdata.com/v3/launches?limit=100&launch_success='+val)
        .then((response)=>{
            console.log('Response year specific is :-', response.data);
            this.props.fetchYearSpecificData(response.data);
            loadSpinner(false)
        })  
        }
        if(type === 'landing'){
            await axios.get(`https://api.spacexdata.com/v3/launches?limit=100&launch_success=${val}&land_success=${val}`)
        .then((response)=>{
            console.log('Response year specific is :-', response.data);
            this.props.fetchYearSpecificData(response.data);
            loadSpinner(false)
        })  
        }
    }

    render() {
        const {years = iList([])} = this.props;
        const rows = chunk(years.toJS(), 2);
        return(
        <div style={{backgroundColor: 'white', maxHeight: '800px', width: '200px'}} className="left-pan">
            <p style={{fontWeight: 'bold'}}>Filter</p>
            <p>Launch Years</p>
            <hr style={{width: '80%'}} />
            <div style={{paddingLeft: '20px'}}>
            {

                rows.map((row)=>(
                    <div>
                        {
                            row.map((year) =>(
                                <div className="column-years">
                                <Card style={{cursor: 'pointer'}} onClick={() => this.onClickYear(year)}>
                                <Card.Body style={{backgroundColor: 'lightgreen', borderRadius: '5px'}}>
                                    <Card.Text>
                                        <span>{year}</span>
                                    </Card.Text>
                                </Card.Body>
                                </Card>
                                </div>
                            ))
                        }
                    </div>
                ))


            }
            </div>




                    <div style={{paddingTop: '30px'}}>
                        <div style={{fontWeight: 'bold', paddingTop: '20px'}}>Successful Launch</div>
                        <hr style={{width: '80%'}} />
                        <div style={{display: 'flex', justifyContent: 'space-around', borderRadius: '5px'}}>
                        <span onClick={() => this.onLaunch('launch', true)} style={{backgroundColor: 'lightgreen',paddingRight: '10px', cursor: 'pointer'}}>True</span>
                        <span onClick={() =>{this.onLaunch('launch',false)}} style={{backgroundColor: 'lightgreen',paddingLeft: '10px', cursor: 'pointer'}}>False</span>
                        </div>
                    </div>

                    <div>
                        <div style={{fontWeight: 'bold', padding: '10px'}}>Successful Landing</div>
                        <hr style={{width: '80%'}} />
                        <div style={{display: 'flex', justifyContent: 'space-around', borderRadius: '5px'}}>
                        <span onClick={() => this.onLaunch('landing',true)} style={{backgroundColor: 'lightgreen',paddingRight: '10px', cursor: 'pointer'}}>True</span>
                        <span onClick={() =>{this.onLaunch('landing',false)}} style={{backgroundColor: 'lightgreen',paddingLeft: '10px', cursor: 'pointer'}}>False</span>
                        </div>
                        </div>

        </div>
        )
    }

}


const mapStateToProps = (state) => {
    return {
       years: state.get('years')
    };
 };

 const mapDispatchToProps = (dispatch) => {
    return {
        fetchYearSpecificData: (data) => dispatch(fetchYearSpecificData(data)),
        loadSpinner: (data) => dispatch(loadSpinner(data))
    };
 };


export default connect(mapStateToProps, mapDispatchToProps)(Leftpan);