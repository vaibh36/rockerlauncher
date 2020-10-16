import React from 'react';
import '../../Styles/style.css'
import { connect } from 'react-redux';
import { List as iList } from 'immutable';
import { Card } from 'react-bootstrap';
import chunk from 'lodash.chunk';
import Spinner from '../../components/spinner';

class Rightpan extends React.Component {

    render() {
        const { launchData = iList([]), spinnerStatus = false } = this.props;
        const rows = chunk(launchData.toJS(), 4);
        console.log('Final rows are:-', rows);
        return (

            rows.length > 0 ? (


            <div className="right-pan" style={{backgroundColor: 'lightgray'}}>
                { spinnerStatus === false ? (
                    rows.map((row) => (

                        <div className="row">
                            {
                                row.map((rocketInfo) => (
                                    <div className="column" style={{ backgroundColor: 'lightgray' }}>
                                        <div className="mobile-spec">
                                            <Card style={{ width: '15rem', backgroundColor: 'white', border: '20px solid white' }}>
                                                <Card.Img className="img-style" variant="top" src={rocketInfo.image} />
                                                <Card.Body>
                                                    <Card.Title><span style={{ fontWeight: 'bold', color: 'blue' }}>{rocketInfo.name}</span></Card.Title>
                                                    <Card.Text>
                                                        <span style={{ fontWeight: 'bold' }}>Launch Year:</span> <span style={{ color: 'blue' }}>{rocketInfo.year}</span>
                                                    </Card.Text>
                                                    <Card.Text>
                                                        <span style={{ fontWeight: 'bold' }}>Successful Launch:</span ><span style={{ color: 'blue' }}>{
                                                            
                                                            
                                                            
                                                            
                                                            rocketInfo.status ? (rocketInfo.status).toString() : "false"
                                                        
                                                        }</span>
                                                    </Card.Text>
                                                </Card.Body>
                                            </Card>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>

                    ))
                ) : <Spinner />

                }
            </div>) : <p>No data found</p>


        )
    }

}


const mapStateToProps = (state) => {
    return {
        launchData: state.get('completeData'),
        spinnerStatus: state.get('spinner')
    };
};

export default connect(mapStateToProps)(Rightpan);