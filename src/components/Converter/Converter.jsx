import React from 'react'
import { connect } from 'react-redux'
import s from './Converter.module.css'
import { apiDataSet, converter } from '../../redux/main-reducer'


class ConverterClass extends React.Component {
    update = (value, id, exchangeRate, fieldisChange) => {
        this.props.converter(value, id, exchangeRate, fieldisChange)
    }
    render() {
        if (this.props.isFetching) {
            return <> </>
        }
        return <>
            <div>
                    <div className={s.converter}>
                        <div className = {s.fields}>
                            <Fields id= {0} update={this.update} value={this.props.value0} data={this.props.data} />
                            <Fields id= {1} update={this.update} value={this.props.value1} data={this.props.data} />
                            <Fields id= {2} update={this.update} value={this.props.value2} data={this.props.data} /> </div>
                        <div className = {s.fields}>
                            <Fields id= {3} update={this.update} value={this.props.value3} data={this.props.data} />
                            <Fields id= {4} update={this.update} value={this.props.value4} data={this.props.data} />
                            <Fields id= {5} update={this.update} value={this.props.value5} data={this.props.data} />
                            </div>
                            {this.props.error ? <div>{this.props.error}</div> : null}
                    </div>
                </div>
            </>
    }
}

const mapStateToProps = (state) => ({
    value0: state.main.values[0].value,
    value1: state.main.values[1].value,
    value2: state.main.values[2].value,
    value3: state.main.values[3].value,
    value4: state.main.values[4].value,
    value5: state.main.values[5].value,
    data: state.main.data,
    isFetching: state.main.isFetching,
    error: state.main.error
})

const Fields = (props) => {
    return  <div className= {s.field} > 
        <Input id={props.id} update={props.update} value={props.value} />
        <Select id={props.id} update={props.update} data={props.data} />
    </div>
}

const Input = (props) => {
    return <input onChange={(e) => props.update(e.target.value, props.id , null, true)} value={props.value} />
}

const Select = (props) => {
    return  <select onChange={(e) => props.update(null, props.id, e.target.value, false)}>
    <option value={props.data[1].ccy}>{props.data[1].ccy}</option>
    <option value={props.data[2].ccy}>{props.data[2].ccy}</option>
    <option value={props.data[3].ccy}>{props.data[3].ccy}</option>
    <option value={props.data[0].ccy}>{props.data[0].ccy}</option>
</select>
}


export default connect(mapStateToProps, {converter, apiDataSet})(ConverterClass)



