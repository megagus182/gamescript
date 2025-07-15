import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Link } from "@mui/material";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box
} from "@mui/material";
import { AddToCartButton, AddToWishes } from "../";
import "./Cards.css";

const MainCard = ({ name, background_image, price, id, discount }) => {
  const getDiscountPercentage = () => {
    return `${Math.floor(
      100 - (discount.currentPrice * 100) / discount.prevPrice
    )}%`;
  };

  return (
    <Box position="relative" className="cardHover" sx={{ m: 1 }}>
      <Link component={RouterLink} to={`/detail/${id}`} underline="none">
       <Card
  sx={{
    width: 220,
    height: 320,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    borderRadius: 3,
    overflow: "hidden",
    boxShadow: 3,
    transition: "transform 0.3s ease",
    "&:hover": {
      transform: "translateY(-8px)",
      boxShadow: 6,
    },
    position: "relative",
    bgcolor: "background.paper",
    paddingBottom: '40px', // 👈 espacio para botones flotantes
  }}
>
          <CardMedia
            component="img"
            height="140"
            image={background_image}
            alt={name}
            sx={{ objectFit: "cover" }}
          />
          <CardContent sx={{ px: 2, pt: 1, pb: 0 }}>
  <Typography
    variant="subtitle1"
    fontWeight={600}
    color="text.primary"
    noWrap
  >
    {name}
  </Typography>

  {!discount?.status ? (
  <Box mt={1} minHeight={40}> {/* 👈 Espacio mínimo igual al bloque de descuento */}
    <Typography variant="subtitle2" color="text.secondary">
      ${price}
    </Typography>
  </Box>
) : (
  <Box mt={1} display="flex" alignItems="center" gap={1} minHeight={40}>
    <Box
      sx={{
        bgcolor: "error.main",
        color: "#fff",
        px: 1,
        py: 0.2,
        borderRadius: "4px",
        fontSize: 12,
      }}
    >
      -{getDiscountPercentage()}
    </Box>
    <Box>
      <Typography
        variant="caption"
        sx={{ textDecoration: "line-through", color: "gray" }}
      >
        ${discount.prevPrice}
      </Typography>
      <Typography
        variant="subtitle2"
        sx={{ color: "success.main" }}
      >
        ${discount.currentPrice}
      </Typography>
    </Box>
  </Box>
)}

</CardContent>

        </Card>
      </Link>

     <AddToWishes
  id={id}
  name={name}
  image={background_image}
  price={price}
  styles={{
    position: "absolute",
    left: 8,
    bottom: 8,
  }}
/>

<AddToCartButton
  id={id}
  name={name}
  picture={background_image}
  price={price}
  styles={{
    position: "absolute",
    right: 8,
    bottom: 8,
  }}
/>

    </Box>
  );
};

export default MainCard;
