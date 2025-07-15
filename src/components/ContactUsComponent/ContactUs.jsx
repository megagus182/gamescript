import emailjs from "@emailjs/browser";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useState, useRef, useEffect } from "react";
import Swal from "sweetalert2";
import validation from "./validations";

const ContactComponent = () => {
  const theme = useTheme();
  const [touched, setTouched] = useState({});

  const [contactInfo, setContactInfo] = useState({
    phone: "",
    fullName: "",
    email: "",
  });
  const [errors, setErrors] = useState({});
  const formRef = useRef(null);

  useEffect(() => {
    setErrors(validation(contactInfo));
  }, [contactInfo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContactInfo((prev) => ({ ...prev, [name]: value }));

    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs.sendForm(
      "service_dnv4ntv",
      "template_hnrenol",
      e.target,
      "4zpSHHNBQ0hkdXKkq"
    );
    e.target.reset();
    Swal.fire({
      icon: "success",
      text: "Your message has been successfully sent!",
    });
  };

  return (
    <Box
      id="contacto"
      sx={{
        backgroundImage: `url("/assets/imgcontact.png")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 3,
      }}
    >
      <Box
        component="form"
        ref={formRef}
        onSubmit={sendEmail}
        sx={{
          width: "100%",
          maxWidth: 500,
          bgcolor: theme.palette.mode === "dark" ? "#1e1e1e" : "#fefefe",
          borderRadius: 4,
          boxShadow: 6,
          padding: 4,
        }}
      >
        <Typography
          variant="h5"
          fontWeight="bold"
          textAlign="center"
          color="primary"
          mb={3}
        >
          Contact Us
        </Typography>

        <FormControl
          fullWidth
          sx={{ mb: 2 }}
          error={!!errors.name && touched.fullName}
        >
          <TextField
            label="Full Name"
            name="fullName"
            value={contactInfo.fullName}
            onChange={handleChange}
            required
            color="primary"
          />
          {errors.name && touched.fullName && (
            <FormHelperText>{errors.name}</FormHelperText>
          )}
        </FormControl>

        <FormControl
          fullWidth
          sx={{ mb: 2 }}
          error={!!errors.phoneFormat && touched.phone}
        >
          <TextField
            label="Phone Number"
            name="phone"
            value={contactInfo.phone}
            onChange={handleChange}
            required
            color="primary"
          />
          {errors.phoneFormat && touched.phone && (
            <FormHelperText>{errors.phoneFormat}</FormHelperText>
          )}
        </FormControl>

        <FormControl
          fullWidth
          sx={{ mb: 2 }}
          error={!!errors.emailFormat && touched.email}
        >
          <TextField
            label="Email"
            name="email"
            value={contactInfo.email}
            onChange={handleChange}
            required
            type="email"
            color="primary"
          />
          {errors.emailFormat && touched.email && (
            <FormHelperText>{errors.emailFormat}</FormHelperText>
          )}
        </FormControl>

        <FormControl fullWidth sx={{ mb: 3 }}>
          <TextField
            label="Message"
            name="message"
            multiline
            rows={4}
            required
            color="primary"
          />
        </FormControl>

        <Button
          type="submit"
          variant="contained"
          fullWidth
          disabled={!!errors.emailFormat || !!errors.phoneFormat}
          sx={{
            backgroundColor: "#5e83ba",
            color: "#fff",
            fontWeight: "bold",
            "&:hover": {
              backgroundColor: "#091d36",
              color: "#fff",
            },
          }}
        >
          Send Message
        </Button>
      </Box>
    </Box>
  );
};

export default ContactComponent;
