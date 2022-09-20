import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import { Box } from "@mui/material";
import { BasketItemProvider } from "./context/basketItems"; 
import { Navbar, HomePage, Basket, NotFound } from "./components";

function App() {
  return (
    <BrowserRouter>
      <BasketItemProvider>
        <Navbar />
        <Box sx={{ pt: "58px" }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/basket" element={<Basket />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Box>
      </BasketItemProvider>
    </BrowserRouter>
  );
}

export default App;
