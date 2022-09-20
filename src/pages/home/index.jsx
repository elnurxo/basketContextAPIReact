import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { basketContext } from "../../context/basketItems";
import { useQuery } from "react-query";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";

function HomePage() {
  const navigate = useNavigate();

  const { addProductToCart , axiosInstance } = useContext(basketContext);

  const addItem = (item) => {
    addProductToCart(item);
  };

  const { isLoading, error, data } = useQuery("products", () =>
    axiosInstance.get('products')
      .then((res) => res.data)
  );
  return (
    <>
      {isLoading && <h3>Loading...</h3>}
      {data && (
        <Container maxWidth="lg" sx={{ marginTop: "30px" }}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow sx={{ backgroundColor: "black" }}>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                    Name
                  </TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                    Product Id
                  </TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                    Unit Price
                  </TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                    Units InStock
                  </TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                    Add To cart
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((product) => (
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    key={product.id}
                    onClick={()=> navigate(`/product/${product.id}`)}
                  >
                    <TableCell component="th" scope="row">
                      {product.name}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {product.supplierId}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {product.unitPrice}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {product.unitsInStock}
                    </TableCell>
                    <TableCell
                      component="th"
                      scope="row"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Button variant="contained" onClick={()=> addItem(product)}>Add</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      )}
      {error && (<h3>Oops! Unexpected Error occured.</h3>)}
    </>
  )
}

export default HomePage;
