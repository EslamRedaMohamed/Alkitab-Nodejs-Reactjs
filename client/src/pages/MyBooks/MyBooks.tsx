import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import UserTable from "../../components/common/UserTable";
import "./MyBooks.css";
import AppContext from "../../contexts/AppContext";
import axios from "axios";
const MyBooks = () => {
  const userData=localStorage.getItem('user')
  if(userData)
  {
    const {id} =JSON.parse(userData)
    return (
      <div>
        <p></p>
        <UserTable userId={id} />
      </div>
    )

  }else{
    return(
      <h1>no user signed in</h1>
    )
  }
   

 

  
    
   
    
    
  
};

export default MyBooks;
