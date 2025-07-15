import React from "react";
import { Box, Grid, Typography, Link, styled } from "@mui/material";
import Copyright from "./Copyright";

const footers = [
  {
    title: "Team",
    description: [
      { item: "@megagus182", url: "https://github.com/megagus182" },
      { item: "@Cristianbenz", url: "https://github.com/Cristianbenz" },
      { item: "@LeandroLagreca", url: "https://github.com/LeandroLagreca" },
      { item: "@NatalEscudero190254", url: "https://github.com/NatalEscudero190254" },
      { item: "@Zaikkoz", url: "https://github.com/Zaikkoz" },
      { item: "@Mariovillalba98", url: "https://github.com/Mariovillalba98" },
      { item: "@lemarti", url: "https://github.com/lemarti" },
      { item: "@davidjss04", url: "https://github.com/davidjss04" },
    ],
  },
  {
    title: "Technologies",
    description: [
      { item: "ReactJs", url: "https://reactjs.org/" },
      { item: "MaterialUI", url: "https://mui.com/" },
      { item: "Nodejs", url: "https://nodejs.org/" },
      { item: "JavaScript", url: "https://www.javascript.com/" },
      { item: "PostgreSQL", url: "https://www.postgresql.org/" },
      { item: "Firebase", url: "https://firebase.google.com/" },
      { item: "Express", url: "https://expressjs.com/" },
      { item: "Sequelize", url: "https://sequelize.org/" },
    ],
  },
];

const List = styled("ul")({
  margin: 0,
  padding: 0,
  listStyle: "none",
  textAlign: "center",
});

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        borderTop: (theme) => `1px solid ${theme.palette.divider}`,
        mt: 8,
        py: [4, 6],
        px: 2,
        bgcolor: "background.paper",
        width: "100%",
      }}
    >
      <Grid container spacing={4} justifyContent="center">
        {footers.map((footer) => (
          <Grid item xs={12} sm={6} md={4} key={footer.title}>
            <Typography
              variant="h6"
              color="text.primary"
              gutterBottom
              align="center"
            >
              {footer.title}
            </Typography>
            <List>
              {footer.description.map((item) => (
                <li key={item.item}>
                  <Link
                    href={item.url}
                    variant="subtitle2"
                    color="text.secondary"
                    underline="hover"
                    target="_blank"
                    rel="noopener"
                    sx={{
                      display: "block",
                      paddingY: 0.5,
                      "&:hover": {
                        color: "primary.main",
                      },
                    }}
                  >
                    {item.item}
                  </Link>
                </li>
              ))}
            </List>
          </Grid>
        ))}
      </Grid>

      <Box mt={5} textAlign="center">
        <Copyright />
      </Box>
    </Box>
  );
};

export default Footer;
