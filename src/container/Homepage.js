import React from 'react';
import '../Styles/style.css';
import Leftpan from '../container/Leftpan/Leftpan';
import Rightpan from '../container/Rightpan/Rightpan';
import axios from 'axios';
import { connect } from 'react-redux';
import { saveLaunchDetails, loadSpinner} from '../actions/actions';
import Spinner from '../components/spinner';

class Homepage extends React.Component {

    componentDidMount = async() => {
        console.log('Component did mount');
        const {saveLaunchDetails, loadSpinner} = this.props;
        loadSpinner(true);
        axios.get('https://api.spacexdata.com/v3/launches?limit=100')
        .then((response)=>{
            console.log('Response is :-', response.data);
            const {data = []} = response;
            saveLaunchDetails(data);
            loadSpinner(false)
        })
    }

    render(){
        const {spinnerStatus} = this.props;
    return(
        <div  style={{backgroundColor: 'lightgray'}}>
            <p className="headtag">SpaceX Launch Programs</p>
            <div className="top-module">
                <Leftpan></Leftpan>
                {spinnerStatus === false ?
                <Rightpan></Rightpan> : <Spinner />
                }
            </div>
        </div>
    )
    }
}

const mapStateToProps = (state) => {
    return {
       spinnerStatus: state.get('spinner')
    };
 };

 const mapDispatchToProps = (dispatch) => {
    return {
       saveLaunchDetails: (data) => dispatch(saveLaunchDetails(data)),
       loadSpinner: (data) => dispatch(loadSpinner(data))
    };
 };

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);