import React from 'react';
import { apiDataSet } from '../../redux/main-reducer'
import { connect } from 'react-redux'
import Preloader from '../Preloader/Preloader';
import s from './Header.module.css'

class HeaderClass extends React.Component {
    componentDidMount() {
        this.props.apiDataSet()
    }
    render() {
        if (this.props.isFetching) {
            return <Preloader />
        }
        return <div className={s.header} >
            <h2>Конвертер Валют</h2>
            <h3>Актуальний курс валют: </h3> 
        <div>{this.props.data[1].ccy}: {this.props.data[1].buy} </div>
        <div> {this.props.data[2].ccy}: {this.props.data[2].buy}</div>
        <div> {this.props.data[3].ccy}: {this.props.data[3].buy}</div>
            </div>
    }
}


const mapStateToProps = (state) => ({
    data: state.main.data,
    isFetching: state.main.isFetching
})



export default connect(mapStateToProps, {apiDataSet})(HeaderClass)