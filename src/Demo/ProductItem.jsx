import React from 'react'

export default function ProductItem(props) {
    const {item} = props;
    return (
        <>
            <div className="card ">
                <img  src={item.image} alt="Title" width={50} height={50}/>
                <div className="card-body">
                    <h4 className="card-title">{item.name}</h4>
                    <p className="card-text">{item.price}</p>
                </div>
            </div>

        </>
    )
}

