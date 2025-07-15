import { Box } from "@mui/material";
import { Filter } from "../components";

const FilterSection = () => {
  return (
    <Box sx={{display:'flex', flexDirection: 'column', alignItems: 'center', paddingLeft: 6, fontSize: 24}} className="FiltersFather">
      <Filter />
    </Box>
  );
};

export default FilterSection;
