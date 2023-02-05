import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProductApi } from '../redux/reducers/demoRe';
import Cart from './Cart'
import ProductItem from './ProductItem'

export default function Products() {
  const { dataProduct } = useSelector(state => state.demoRe);
   const dispatch = useDispatch();
  useEffect(() => {
      const actionThunk = getAllProductApi();
      dispatch(actionThunk);
  },[])



  return (
    <div className='container'>
      <h3>Shoes Shop</h3>
      <Cart />
      <h3 className='mt-2'>
        Product list
      </h3>
      <div className='row'>
        {
          dataProduct.map((item, index) => {
            return (
              <div className="col-3" key={index}>
                <ProductItem item={item}/>
              </div>
            )
          })
        }

      </div>


    </div>
  )
}
