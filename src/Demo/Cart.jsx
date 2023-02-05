import React from 'react'
import { useSelector } from 'react-redux'
export default function () {

    const { cart } = useSelector(state => state.demoRe)
    return (
        <div>
            <h3>Carts</h3>

            <table className='table'>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>name</th>
                        <th>image</th>
                        <th>price</th>
                        <th>quantity</th>
                        <th>total</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>

                    {cart.map((item, index) => {
                        return (
                            <tr key={index}>
                            <th>{item.id}</th>
                            <th>{item.name}</th>
                            <th><img src={item.image} alt="" width={50} height={50}/></th>
                            <th>{item.price}</th>
                            <th>{item.quantity}</th>
                            <th></th>
                        </tr>
                        )
                    })}


                </tbody>
            </table>
        </div>
    )
}
