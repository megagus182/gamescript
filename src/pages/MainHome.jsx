import { About, Games, FilterSection } from "../sections";
import { ClientLayout, Footer, Social } from "../components";
import { Stack } from "@mui/material";
import ContactComponent from "../components/ContactUsComponent/ContactUs";

const MainHome = () => {
  return (
    <ClientLayout>
      <Social />
      <Stack direction={{xs:'column', sm:'row'}}>
        <FilterSection />
        <Games />
      </Stack>
      <About />
      <ContactComponent />
    </ClientLayout>
  );
};

export default MainHome;
