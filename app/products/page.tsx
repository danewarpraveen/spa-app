"use client"
import { Avatar, Box, Card, CardActionArea, CardContent, CardMedia, Checkbox, CircularProgress, Grid, IconButton, Input, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, Paper, Stack, Typography } from "@mui/material"
import React, { useEffect, useState } from "react"
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from "react-redux";
import { addtoCard, deleteByCardId, getProdects, getCardsData } from "../components/redux/slicess/ProductSlice";
import UserCard from "./Card";
import { getFromLocalStorage } from "../components/helper/loacalSorage";
import { Console } from "console";

const Products = () => {

    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedService, setSelectedService] = useState([]);

    const { userData, cardData } = useSelector((state: any) => state?.products);

    const dispatch = useDispatch<any>();

    const getCardDataFunc = async (username: string) => {
        try {
            const res = await dispatch(getCardsData(username)).unwrap();
            setSelectedService(res || []);
            return res;
        } catch (error) {
            console.error("Error loading cards:", error);
            return null;
        }
    };


    useEffect(() => {
        Promise.all([
            dispatch(getProdects()).unwrap(),
            getCardDataFunc(getFromLocalStorage("user"))
        ]).then(([productsRes, cardsRes]: any) => {
            setProducts(productsRes?.data);
            // setSelectedService(cardsRes || []);
            setIsLoading(false);
        }).catch((error: any) => {
            setIsLoading(true);
        }
        );

        // dispatch(getProdects()).then((res: any) => {
        //     console.log(res?.payload.data);
        //     setProducts(res?.payload.data)
        //     setIsLoading(false);
        // }).catch((error: any) => {
        //     setIsLoading(true);
        // })
    }, []);

    const handleSelection = (item: any) => {
     const isPreset =   selectedService.find((prod: any) => prod.p_Id === item.product_id)
      if(isPreset){
        alert("Service already added in card");
        return ;
      }
        let user = getFromLocalStorage("user");
        dispatch(addtoCard({ user, item })).then((res: any) => {
            setSelectedService(res.payload || []);
        }).catch((err: any) => {
        });
    }

    const handleDeleteCard = async (cardId: string) => {
        let user = getFromLocalStorage("user");
        await dispatch(deleteByCardId({ user, cardId })).then((res: any) => {
            console.log(res.payload || []);
            setSelectedService(res.payload || []);
        }).catch((err: any) => {
            console.log(err)
        });
    }
    const handleDelete = (productName: string) => {
        setSelectedService((prev) =>
            prev.filter((item: any) => item.productName !== productName)
        );
    };

    return (
        <Stack direction={"column"}>

            <div style={{ display: "flex", padding: "20px" }}>
                <Input name="hell"></Input>
            </div>
            {isLoading ? <Box maxWidth={400} mx="auto" mt="30%"><CircularProgress /></Box> : <Grid container spacing={2}>
                <Grid size={selectedService.length > 0 ? 8 : 12}>
                    <Box sx={{
                        width: '100%',
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(min(200px, 100%), 1fr))',
                        gap: 2,
                    }}>

                        {products?.map((item: any, index: number) => (
                            <Card
                                key={index}
                                sx={{
                                    maxWidth: 250,
                                    boxShadow: 3,
                                    borderRadius: 2,
                                    position: "relative",
                                    // transition: "transform 0.3s ease",
                                    // "&:hover": { transform: "scale(1.03)" }
                                }}

                            >
                                {selectedService.some((prod: any) => prod.p_Id === item.product_id) && (
                                    <div
                                        style={{
                                            position: "absolute",
                                            top: 10,
                                            right: 10,
                                            backgroundColor: "green",
                                            color: "white",
                                            padding: "4px 6px",
                                            borderRadius: "50%",
                                            fontWeight: "bold",
                                            fontSize: "16px",
                                            zIndex: 5
                                        }}
                                    >
                                        ✓
                                    </div>
                                )}
                                <CardActionArea
                                    onClick={() => handleSelection(item)}
                                >
                                    <CardMedia
                                        sx={{ height: 200 }}
                                        image={item.productImg}
                                        title={item.productName}
                                    />


                                    <CardContent sx={{ textAlign: "center", backgroundColor: "#fafafa" }}>
                                        <Typography
                                            variant="subtitle1"
                                            fontWeight="bold"
                                            color="text.primary"
                                        >
                                            {item.productName}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                        >
                                            ₹ {item.productCost}
                                        </Typography>

                                    </CardContent>

                                </CardActionArea>
                            </Card>
                        ))}
                    </Box>


                </Grid>


                {selectedService.length > 0 && (
                    <UserCard
                        handleDeleteCard={handleDeleteCard}
                        selectedService={selectedService}
                    />

                )}


            </Grid>}

        </Stack>
    )
}

export default Products