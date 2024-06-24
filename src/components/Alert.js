import React from 'react'
// important thing here we have done props.alert&& ==> it is very popular in the industry and is used as
// if the value of the alert is null then alert will not work and if it has a value then the below html will work
export default function Alert(props) {
    const capitilize = (word) => {
            word = word.toLowerCase()
            return word.charAt(0).toUpperCase() + word.slice(1)
    }


    return (
        <div style={{height:'50px'}}>
        {props.alert &&
        <div>
            <div className="alert alert-warning alert-dismissible fade show" role="alert">
                <strong>{capitilize(props.alert.type)}</strong>:- {props.alert.msg}
            </div>
        </div>}
        </div>
    )
}

