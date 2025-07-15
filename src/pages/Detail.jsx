import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import parse from "html-react-parser";
import "./Detail.css";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../redux/reducers/videoGame";
import { getDetails } from "../redux/actions/videoGame";
import { getComments } from "../redux/actions/comment";
import { getQuestions, postQuestion } from "../redux/actions/questions";
import {
  AddToWishes,
  Loader,
  AddToCartButton,
  TextForm,
  ClientLayout,
} from "../components";
import Carousel from "react-material-ui-carousel";
import Item from "../components/Items/Item";
import Comments from "../sections/Comments";
import {
  Typography,
  Container,
  Box,
  Paper,
  Button,
  Divider,
} from "@mui/material";
import FloatingActionButtons from "../components/EditForm/BotonEditar";
import { useTheme } from "@mui/material/styles";

export default function Detail() {
  const { id } = useParams();
  const { status, id: userId, admin } = useSelector((state) => state.user);
  const { loading, gameComments, gameQuestions, details } = useSelector(
    (state) => state.videogames
  );
  const [questionText, setQuestionText] = useState("");
  const dispatch = useDispatch();
  const theme = useTheme();

  useEffect(() => {
    dispatch(setLoading());
    dispatch(getDetails(id));
    dispatch(getComments(id));
    dispatch(getQuestions(id));
  }, [id, dispatch]);

  const imgCarousel = details.images
    ? [details.trailer, ...details.images.split(",")]
    : [];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === "guest") {
      Swal.fire({
        toast: true,
        icon: "error",
        title: "You cannot add a post if you are not registered",
        position: "bottom-right",
        showConfirmButton: false,
        timer: 3000,
      });
    } else {
      dispatch(postQuestion({ userId, gameId: id, text: questionText }));
      setQuestionText("");
      Swal.fire({
        toast: true,
        icon: "success",
        title: "Your review has been posted",
        position: "bottom-right",
        showConfirmButton: false,
        timer: 3000,
      });
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="boxBanner2">
      <ClientLayout>
        <Paper elevation={8} sx={{ padding: 3, mx: "auto", maxWidth: 1200 }}>
          <Typography variant="caption" display="flex" mb={1}>
            <Link className="redir" to="/home">
              Games {">>"}
            </Link>
            <Typography variant="caption" ml={1} color="darkgray">
              <b>{details.name}</b>
            </Typography>
          </Typography>

          <Box
            display="flex"
            flexDirection={{ xs: "column", md: "row" }}
            gap={3}
            justifyContent="center"
          >
            {/* MAIN CARD */}
            <Box
              className="containerNombreImagenDescription"
              borderRadius={3}
              p={2}
              sx={{
                width: { xs: "100%", md: 650 },
                backgroundColor:
                  theme.palette.mode === "dark" ? "#1a2235" : "#f5f5f5",
              }}
            >
              {/* TITLE AND PRICE */}
              <Box
                backgroundColor="primary.main"
                p={2}
                borderRadius={2}
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                flexWrap="wrap"
              >
                <Box>
                  <Typography variant="h5" color="white" fontWeight="bold">
                    {details.name}
                  </Typography>
                  <Typography variant="subtitle1" color="white">
                    {details.stock < 1 ? "No disponible" : `$${details.price}`}
                  </Typography>
                </Box>

                <Box display="flex" gap={1}>
                  <AddToCartButton
                    id={id}
                    name={details.name}
                    picture={details.background_image}
                    price={details.price}
                    variant="contained"
                  />
                  <AddToWishes
                    id={id}
                    name={details.name}
                    image={details.background_image}
                    price={details.price}
                    variant="contained"
                  />
                </Box>
              </Box>

              {/* CAROUSEL */}
              <Box
                my={2}
                borderRadius={2}
                overflow="hidden"
                sx={{ height: 400, width: "100%" }}
              >
                <Carousel autoPlay={false} navButtonsAlwaysVisible>
                  {imgCarousel.map((item, index) => (
                    <Item key={index} item={item} />
                  ))}
                </Carousel>
              </Box>

              {/* DESCRIPTION */}
              <Box
                className="description"
                borderRadius={1}
                sx={{
                  padding: 2,
                  minHeight: 120,
                  maxHeight: 200,
                  overflowY: "auto",
                  backgroundColor:
                    theme.palette.mode === "dark" ? "#2b3a5eff" : "#f5f5f5",
                  boxShadow: 2,
                  scrollbarWidth: "thin",
                  "&::-webkit-scrollbar": {
                    width: "5px",
                  },
                  "&::-webkit-scrollbar-thumb": {
                    backgroundColor: "#aaa",
                    borderRadius: "10px",
                  },
                }}
              >
                <Typography
                  variant="body2"
                  textAlign="justify"
                  color="text.primary"
                  component="div"
                >
                  {details.description ? (
                    parse(details.description)
                  ) : (
                    <i>No description available</i>
                  )}
                </Typography>
              </Box>
            </Box>

            {/* REQUIREMENTS */}
            <Box
              className="requeriments"
              borderRadius={2}
              p={2}
              sx={{
                minWidth: 280,
                maxWidth: 400,
                backgroundColor:
                  theme.palette.mode === "dark" ? "#1a2235" : "#f5f5f5",
              }}
            >
              <Typography
                backgroundColor="primary.main"
                variant="h6"
                color="white"
                p={1.5}
                borderRadius={1}
              >
                Requirements
              </Typography>
              <Typography
                variant="body2"
                color="text.primary"
                textAlign="start"
                mt={2}
                component="div"
              >
                {details.requirements ? (
                  parse(details.requirements)
                ) : (
                  <i>No requirements provided</i>
                )}
              </Typography>
            </Box>

            {/* ADMIN EDIT BUTTON */}
            {admin === true && <FloatingActionButtons />}
          </Box>

          {/* COMMENTS AND QUESTIONS */}
          <Divider sx={{ my: 4 }} />

          <Box className="newComment">
            <form onSubmit={handleSubmit} className="formComment">
              <TextForm cb={setQuestionText} value={questionText} />
              <Button type="submit" sx={{ ml: 3, mt: 2 }} variant="contained">
                Submit
              </Button>
            </form>
          </Box>

          <Container
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: 3,
              mt: 3,
              mx: "auto",
              width: "100%",
            }}
          >
            <Comments list={gameComments} type="review" />
            <Comments list={gameQuestions} />
          </Container>
        </Paper>
      </ClientLayout>
    </div>
  );
}
