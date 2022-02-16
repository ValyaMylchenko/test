import { getInfo } from "../api/api";

const SET_VALUE = "SET-VALUE"
const SET_INFO_FROM_API = "SET-INFO-FROM-API"
const ISFETCHING = "ISFETCHING"



let initialState =  {
    values: [
      {   id: 1, 
        value: "",
        exchangeRate: "USD", 
        isChange: false},
    {   id: 2, 
        value: "",
        exchangeRate: "USD", 
        isChange: false},
    {   id: 3, 
        value: "",
        exchangeRate: "USD", 
        isChange: false},
    {   id: 4, 
        value: "",
        exchangeRate: "USD", 
        isChange: false},
    {   id: 5, 
        value: "",
        exchangeRate: "USD", 
        isChange: false},
    {   id: 6, 
        value: "",
        exchangeRate: "USD", 
        isChange: false}  
  ],  
    data: [
        {
            "ccy":"UAH",
            "base_ccy":"UAH",
            "buy":"1",
            "sale":"1"
        }
    ], 
    isFetching: true,
  }

export const converterReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET-VALUE":{
            let stateCopy = {...state};
            if (isNaN(Number(action.value))) {
                 return stateCopy }  
            Result(action.id, action, stateCopy)
            return stateCopy
        } case "SET-INFO-FROM-API": {
            let stateCopy = {...state}
            if (stateCopy.data.length === 1)  {
                stateCopy.data.push(action.data[0])
                stateCopy.data.push(action.data[1])
                stateCopy.data.push(action.data[2])
            }
            return stateCopy;
        }
        case "ISFETCHING": {
            return {...state, isFetching: action.isFetching}
        }  
             
        default: return state;

}
}



export const converter = (value, id, exchangeRate, fieldIsChange) => (
    { type: SET_VALUE, value, id, exchangeRate, fieldIsChange})

export const setINFO = (data) => (
    { type: SET_INFO_FROM_API, data})

export const setIsFetching = (bool) => (
    { type: ISFETCHING, isFetching: bool})

export const apiDataSet = () => {
    return (dispatch) => {
        if(initialState.data.length ===1) {
            dispatch(setIsFetching(true));
        getInfo().then((data) =>{
            dispatch(setINFO(data));
            dispatch(setIsFetching(false))
        }).catch((error)=> {
            console.log(error)
        })
        }
        
    }
}

let Result = (id, action, stateCopy) => {
    let idChange = 0;
    if (action.value ===null){
        action.value = stateCopy.values[id].value
    }
    if (action.exchangeRate === null) { 
        action.exchangeRate = stateCopy.values[id].exchangeRate
        stateCopy.values[id].isChange = action.fieldIsChange
    }
    if (id <=2) {
        idChange = id + 3
    } else {
        idChange = id - 3
    }
    if (stateCopy.values[id].isChange === true) {
        stateCopy.values[idChange].isChange = false
        return Converter(id, idChange, action, stateCopy)
    } else {
        if (stateCopy.values[idChange].exchangeRate === action.exchangeRate) {
        stateCopy.values[id].exchangeRate = action.exchangeRate
        action.value = stateCopy.values[idChange].value
            return Converter(idChange, id, action, stateCopy)
        }
        let save = stateCopy.values[idChange].exchangeRate
        stateCopy.values[id].exchangeRate = action.exchangeRate
        action.exchangeRate = save
        action.value = stateCopy.values[idChange].value
        return Converter(idChange, id, action, stateCopy)
    }

}

let Converter = (idFromUI, idChange, action, stateCopy) => {
            stateCopy.values[idFromUI].exchangeRate = action.exchangeRate
            let currencyValue = stateCopy.data.filter(x => x.ccy === action.exchangeRate)
            let anotherCurrencyValue = stateCopy.data.filter(x => x.ccy === stateCopy.values[idChange].exchangeRate)
            stateCopy.values[idFromUI].value = action.value
            stateCopy.values[idChange].value = Rounded(action.value*currencyValue[0].buy/anotherCurrencyValue[0].buy)
        return stateCopy
}

let Rounded = (number) => {
    return +number.toFixed(2)
}
