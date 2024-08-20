import { BrowserRouter} from "react-router-dom";
import AppRoutes from "./AppRoutes";
import AdminLayout from "./components/layout/admin/AdminLayout";
import UserLayout from "./components/layout/user/UserLayout";
import AppContext from "./contexts/AppContext";
import { useEffect, useMemo, useState } from "react";


const App: React.FC = () => {
  // const { role } = useContext(AppContext);
  let role = "user";
  // let role = "admin";
  const userData =useMemo(()=>{
    return localStorage.getItem('user');
  },[]) 
  const [user,setUser] = useState(null);
  useEffect(()=>{
    if(userData){

      setUser(JSON.parse(userData))
    }
  },[])
  
  return (
    <AppContext.Provider value={{user,setUser}}>

    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        {role === "admin" ? (
          <AdminLayout>
            <AppRoutes isAdmin={true} />
          </AdminLayout>
        ) : (
          <UserLayout>
            <AppRoutes isAdmin={false} />
          </UserLayout>
        )}
      </div>
    </BrowserRouter>
    </AppContext.Provider>
  );
};

export default App;
