"use client"
import { Avatar, Box, Card, CardActionArea, CardContent, CardMedia, CircularProgress, Grid, IconButton, Input, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, Paper, Stack, Typography } from "@mui/material"
import React, { useEffect, useState } from "react"
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from "react-redux";
import { addtoCard, deleteByCardId, getProdects } from "../components/redux/slicess/ProductSlice";
import UserCard from "./Card";
import { getFromLocalStorage } from "../components/helper/loacalSorage";

const Products = () => {

    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedPrpduct, setSelectedProd] = useState([]);

    const { userData } = useSelector((state: any) => state?.products);

    console.log(userData,"userDatauserDatauserData");

    const dispatch = useDispatch<any>();

    useEffect(() => {
        dispatch(getProdects()).then((res: any) => {
            console.log(res?.payload.data);
            setProducts(res?.payload.data)
            setIsLoading(false);
        }).catch((error: any) => {
            setIsLoading(true);
        })
    }, []);

    const handleSelection = (item: any) => {
        console.log(item, "produessssssss");

        setSelectedProd((prevSelected: any) => {
            const isAlreadySelected = prevSelected.some(
                (prod: any) => prod.productName === item.productName
            );

            if (isAlreadySelected) {
                // remove if already selected
                return prevSelected.filter(
                    (prod: any) => prod.productName !== item.productName
                );
            } else {
                return [...prevSelected, item];
            }
        });

        let user = getFromLocalStorage("user"); 
        dispatch(addtoCard({user,item})).then((res: any) => {
            console.log(res)
        }).catch((err: any) => {
            console.log(err)
        });

    }

    const handleDeleteCard    = async (cardId: string) => {   
        let user = getFromLocalStorage("user");
        await dispatch(deleteByCardId({user,cardId})).then((res: any) => {
            console.log(res)
        }).catch((err: any) => {
            console.log(err)
        });
    }   

    function generate(element: React.ReactElement<unknown>) {
        return [0, 1, 2].map((value) =>
            React.cloneElement(element, {
                key: value,
            }),
        );
    }

    const handleDelete = (productName: string) => {
        setSelectedProd((prev) =>
            prev.filter((item: any) => item.productName !== productName)
        );
    };

    return (
        <Stack direction={"column"}>

            <div style={{ display: "flex", padding: "20px" }}>
                <Input name="hell"></Input>
            </div>
            {isLoading ? <Box maxWidth={400} mx="auto" mt="30%"><CircularProgress /></Box> : <Grid container spacing={2}>
                <Grid size={selectedPrpduct.length > 0 ? 8 : 12}>
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
                                    transition: "transform 0.3s ease",
                                    "&:hover": { transform: "scale(1.03)" }
                                }}

                            >
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


                {selectedPrpduct.length > 0 && (
                    <UserCard
                        handleDeleteCard={handleDeleteCard}
                        selectedPrpduct={selectedPrpduct}
                    />

                )}


            </Grid>}

        </Stack>
    )
}

export default Products