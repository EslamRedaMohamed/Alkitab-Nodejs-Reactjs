import { useEffect, useState } from "react"

const useAxios=(configObject:any)=>{
    const{
        axiosInstance,
        method,
        url,
        requestConfig={}
    }=configObject
    
    const [response,setResponse] = useState([])
    const [loading,setLoading] = useState(true)
    const [error,setError] = useState('')
    
    useEffect(()=>{
        const controller = new AbortController();
        const fetchData = async ()=>{
            try{
                const res=await axiosInstance[method.toLowerCase()](url,{
                    ...requestConfig,
                    signal:controller.signal
                })
            }catch(err:any){
                console.log(err.message)
                setError(err)
            }finally{
                setLoading(false)
            }
            // useEffect cleanup
            return () => controller.abort();
        }
    },[])
    return [response,loading,error]

}
export default useAxios