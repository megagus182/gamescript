import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Container, Box, Input, Button } from "@mui/material";
import { DiscountsContainer } from "../containers";
import config from "../config";
import { Card, Footer, Loader, Navbar } from "../components";
import Swal from "sweetalert2";

const styles = {
  banner: {
    width: "100%",
    height: "auto",
    marginBottom: "1rem",
  },
  container: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
    justifyItems: "center",
    padding: "2rem",
  },
  inputContainer: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: 220,
    height: 40,
    margin: "1rem auto",
  },
  input: {
    opacity: 0,
    width: "100%",
    height: "100%",
    cursor: "pointer",
  },
  inputBox: {
    position: "absolute",
    zIndex: 0,
    top: 0,
    width: "max-content",
    height: "max-content",
    padding: "0.5rem",
    border: "1px solid red",
    borderRadius: "9px",
    backgroundColor: "#fff",
  },
};

export default function Discounts() {
  const [discounts, setDiscounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { admin } = useSelector((state) => state.user);
  const [banner, setBanner] = useState("");
  const [inputValue, setInputValue] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const discountsRes = await axios(`${config.BACKEND_URL}/discounts`);
        setDiscounts(discountsRes.data);

        const bannerRes = await axios(`${config.BACKEND_URL}/images/discounts`);
        setBanner(bannerRes.data.image);

        setLoading(false);
      } catch (error) {
        console.error("Error al cargar descuentos o banner", error);
        navigate("/home");
      }
    };

    fetchData();
  }, [navigate]);

  const handleInput = (e) => {
    setInputValue(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!inputValue) return Swal.fire("No se puede subir un archivo vacío");
    const data = new FormData();
    data.append("image", inputValue);

    try {
      const response = await axios.post(
        `${config.BACKEND_URL}/images/discounts`,
        data
      );
      setBanner(response.data.image);
      Swal.fire("Imagen actualizada correctamente");
    } catch (error) {
      Swal.fire("Error al subir imagen");
    }
  };

  if (loading) return <Loader />;

  return (
    <DiscountsContainer>
      <Navbar />

      <Box sx={{ padding: "2rem" }}>
        {banner && (
          <img
            style={styles.banner}
            src={banner}
            alt="Banner de descuentos"
          />
        )}

        {admin && (
          <>
            <Container sx={styles.inputContainer}>
              <Box sx={styles.inputBox}>
                {!inputValue ? "Selecciona un archivo" : "Archivo seleccionado"}
              </Box>
              <Input
                name="discountBanner"
                sx={styles.input}
                type="file"
                onChange={handleInput}
              />
            </Container>
            <Box display="flex" justifyContent="center" mb={3}>
              <Button onClick={handleUpload} variant="contained" color="success">
                Subir imagen
              </Button>
            </Box>
          </>
        )}

        <Box sx={styles.container}>
          {discounts.map((game) => (
            <Card
              key={game.id}
              id={game.id}
              name={game.name}
              background_image={game.background_image}
              price={game.price}
              discount={game.discount}
            />
          ))}
        </Box>
      </Box>

      <Footer />
    </DiscountsContainer>
  );
}
