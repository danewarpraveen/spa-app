import { Box, Grid, IconButton, List, ListItem, ListItemText, Typography } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';
import React from "react";


type CardProps = {
    selectedPrpduct: any[];
    handleDeleteCard: (productName: string) => void;
};
const UserCard: React.FC<CardProps> = (props) => {

    const { selectedPrpduct, handleDeleteCard } = props;

    return (
        <Grid size={selectedPrpduct ? 4 : 0}>
            <Box
                sx={{
                    mt: 2,
                    p: 3,
                    borderRadius: 3,
                    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)",
                    backgroundColor: "#f9fafb", // soft light background

                }}
            >
                <Typography
                    variant="h5"
                    mb={3}
                    sx={{
                        fontWeight: "700",
                        color: "#1976d2",
                        textTransform: "uppercase",
                        letterSpacing: 1.2,
                        borderBottom: "2px solid #1976d2",
                        pb: 1,
                    }}
                >
                    ADEDD SERVICESS
                </Typography>
                <List>
                    {selectedPrpduct.map((item: any, index: number) => (
                        <ListItem
                            key={index}
                            sx={{
                                borderRadius: 2,
                                mb: 1.5,
                                boxShadow: "0 3px 8px rgba(25, 118, 210, 0.1)",
                                backgroundColor: "#fff",
                                "&:hover": {
                                    boxShadow: "0 6px 15px rgba(25, 118, 210, 0.3)",
                                    backgroundColor: "#e3f2fd",
                                },
                            }}
                            secondaryAction={
                                <IconButton
                                    edge="end"
                                    color="error"
                                    onClick={() => handleDeleteCard(item.product_id)}
                                    aria-label={`delete ${item.product_id}`}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            }
                        >
                            <ListItemText
                                primary={item.productName}
                                secondary={`₹ ${item.productCost}`}
                                primaryTypographyProps={{
                                    fontWeight: 600,
                                    fontSize: "1.1rem",
                                    color: "#0d47a1",
                                }}
                                secondaryTypographyProps={{
                                    fontWeight: 500,
                                    fontSize: "0.9rem",
                                    color: "#1976d2",
                                }}
                            />
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Grid>
    )
}

export default UserCard;