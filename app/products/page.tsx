"use client"
import { Avatar, Box, Card, CardActionArea, CardContent, CardMedia, Grid, IconButton, Input, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, Paper, Stack, Typography } from "@mui/material"
import React, { useEffect, useState } from "react"
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch } from "react-redux";
import { getProdects } from "../components/redux/slicess/ProductSlice";

const Products = () => {

    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedPrpduct, setSelectedProd] = useState([]);

    const dispatch = useDispatch<any>();

    useEffect(() => {
             dispatch(getProdects()).then((res:any)=>{
             console.log(res?.payload.data);
             setProducts(res?.payload.data)   
             setIsLoading(false);       
             }).catch((error:any)=>{
                  setIsLoading(true);   
             })
    }, []);

    const handleSelection = (item: any) => {
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
                // add new selected product
                return [...prevSelected, item];
            }
        });
    }

    // console.log(selectedPrpduct);
    console.log(products);
    

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
            {isLoading ? <div>islodinhgg</div> : <Grid container spacing={2}>
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
                
                    {/* 🧾 Selected List */}
                    {selectedPrpduct.length > 0 && (
                        <Grid size={selectedPrpduct ? 4 : 0}>
                        <Box sx={{ mt: 4, p: 2, border: "1px solid #ccc", borderRadius: 2 }}>
                            <Typography variant="h6" mb={2}>
                                Selected Services
                            </Typography>
                            <List>
                                {selectedPrpduct.map((item: any, index) => (
                                    <ListItem
                                        key={index}
                                        sx={{
                                            borderBottom: "1px solid #eee",
                                        }}
                                    >
                                        <ListItemText
                                            primary={item.productName}
                                            secondary={`₹ ${item.productCost}`}
                                        />
                                        <ListItemSecondaryAction>
                                            <IconButton
                                                edge="end"
                                                color="error"
                                                onClick={() => handleDelete(item.productName)}
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                ))}
                            </List>
                        </Box>
                     </Grid>
                    )}
                
            </Grid>}

        </Stack>
    )
}

export default Products