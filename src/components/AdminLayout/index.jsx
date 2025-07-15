import React from "react";
import AdminNavBar from "../AdminNavBar";
import { Box } from "@mui/system";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
export default function AdminLayout({ children }) {
  return (
      <>
				<Navbar />
				<Box display="flex" flexDirection={{xs:'column', sm:'row'}}>
					<AdminNavBar />
					<Box component="main" sx={{ minHeight: "100vh", paddingLeft:{xs:0, md:10} }}>
						{children}
					</Box>
				</Box>
				<Footer />
    </>
  );
}
