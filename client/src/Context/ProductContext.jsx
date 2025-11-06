import React, { createContext, useState } from 'react'


export const ProductContext=createContext();

const ProductContextProvider =(props)=>{

 const fetchProductById = async (id) => {
  let response = await fetch(`/api/products/${id}`);
  let json = await response.json();
  return json;
};



  const [search,setSearch]=useState("");
   const changeHandler =(e)=>{
        setSearch(e.target.value);
        console.log(e.target.value);
    }


// const myCart=()=>{

// }
const contextValue={
    fetchProductById,
    search,setSearch,
    changeHandler
};
    return(
         <ProductContext.Provider value={contextValue}>
            {props.children}
         </ProductContext.Provider>
    )

}
export default ProductContextProvider;
