import React from "react";
import { Footer, Navbar } from "../components";
import ContactComponent from "../components/ContactUsComponent/ContactUs";

export function Contact() {

    return(
        <div>
            <Navbar/>
            <ContactComponent/>
            <Footer/>
        </div>
    )
}