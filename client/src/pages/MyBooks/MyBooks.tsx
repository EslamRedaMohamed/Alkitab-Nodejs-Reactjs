import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import UserTable from "../../components/common/UserTable";
import "./MyBooks.css";
import AppContext from "../../contexts/AppContext";
import axios from "axios";
const MyBooks = () => {

  const { user} = useContext(AppContext)

 

  
    
   
    
    return (
      <div>
        <p></p>
        <UserTable userId='66c4ec77569aa53864951478' />
      </div>
    )
  
};

export default MyBooks;
