import React, { useContext } from "react";
import { basketContext } from "../../context/basketItems";
import { useNavigate } from "react-router-dom";
import {
    Box,
  Button,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import toast, { Toaster } from 'react-hot-toast';

function Basket() {
  const navigate = useNavigate();
  const {
    addProductToBasket,
    removeProductFromBasket,
    emptyBasket,
    basketItems,
  } = useContext(basketContext);
  const notify = () => {
    toast.success('Product added to basket successfully!',{
      duration: 1000,
      position: "top-center",
      icon: '👏',
      theme: {
        primary: 'green',
        secondary: 'black',
      }
    });
  };
  const notifyRemove = () => {
    toast.error('Product removed from basket successfully!',{
      duration: 1000,
      position: "top-center",
      icon: '👏',
      theme: {
        primary: 'green',
        secondary: 'black',
      }
    });
};
  return (
    <>
      {basketItems.length > 0 && (
        <Container maxWidth="lg" sx={{ marginTop: "30px" }}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow sx={{ backgroundColor: "black" }}>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                    ID
                  </TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                    Name
                  </TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                    Quantity
                  </TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                    Add
                  </TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                    Remove
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {basketItems.map((product, key) => (
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    key={key}
                    onClick={() => navigate(`/product/${product.productId}`)}
                  >
                    <TableCell component="th" scope="row">
                      {product.productId}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {product.name}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {product.quantity}
                    </TableCell>
                    <TableCell
                      component="th"
                      scope="row"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Button
                        variant="contained"
                        onClick={() =>{
                            addProductToBasket(product, product.productId)
                            notify();
                        }
                        }
                      >
                        Add
                      </Button>
                      <Toaster/>
                    </TableCell>
                    <TableCell
                     component="th"
                     scope="row"
                     onClick={(e) => e.stopPropagation()}
                    >
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => {
                            removeProductFromBasket(product)
                            notifyRemove();
                        }} 
                      >
                        Remove
                      </Button>
                      <Toaster/>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Box
            sx={{
              textAlign: "center",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button
              sx={{ marginTop: "20px" }}
              variant="contained"
              color="error"
              onClick={() => emptyBasket()}
            >
              Remove All
            </Button>
          </Box>
        </Container>
      )}
      {basketItems.length === 0 && (
        <h2
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "80vh",
          }}
        >
          Basket is Empty
        </h2>
      )}
    </>
  );
}

export default Basket;
