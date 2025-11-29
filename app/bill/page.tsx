"use client"
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCardsData } from "../components/redux/slicess/ProductSlice";
import { getFromLocalStorage } from "../components/helper/loacalSorage";
function BillPage() {

    const dispatch = useDispatch<any>();
    const[billData,setBillData] = React.useState<any>(null);

    useEffect(() => {       
        dispatch(getCardsData(getFromLocalStorage("user"))).then((res: any) => {
            console.log("Bill Page Card Data:", res);
            setBillData(res.payload || []);
        }).catch((error: any) => {
            console.error("Error fetching card data:", error);
        });
    }, []);

    return (
        <div style={{padding:"70px"}}>
   
            Bill Page
        </div>
    )
}
export default BillPage;