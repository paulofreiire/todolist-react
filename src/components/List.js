import React from 'react';
import './List.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'


function ListItems(props) {
    const items = props.items;
    const listItems = items.map(item => {
        return <div className="list" key={item.key}>
            <p>
                <input className={item.done === true ? "done" : null} type="text" id={item.key} value={item.text}
                       onChange={(e)=>{
                           props.setUpdate(e.target.value,item.key)}}/>
                <span>
                <FontAwesomeIcon className="faicons" onClick={() => {
                    props.setUpdate(item.key)
                }} icon={item.done === true ? "times" : "check"}/>
                </span>
            </p>
        </div>
    })
    return <>
        {listItems}
    </>;
}

export default ListItems;