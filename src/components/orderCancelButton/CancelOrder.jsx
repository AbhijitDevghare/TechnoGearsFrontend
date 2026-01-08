import { useEffect } from "react";
import { useDispatch } from "react-redux";

function CancelOrder({orderId}) {
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch
    },[dispatch])
    
    return (
        <>
        </>
    );
}

export default CancelOrder;
