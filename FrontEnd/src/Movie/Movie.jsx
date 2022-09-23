import React, { useState, useEffect } from "react";
import axios from "axios";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import MovieModal from "./MovieModal";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const Movie = () => {
  const [movieList, setMovieList] = useState([]);
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [Currentdata, setCurrentdata] = useState();
  const [updating, setupdating] = useState();

  const getMovieList = () => {
    axios
      .get("http://localhost:3002/api")
      .then((response) => {
        if(response.status===200)   setMovieList(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const addMovie = (Moviedata) => {
    axios
      .post("http://localhost:3002/api/", { Moviedata })
      .then((response) => {
        if(response.status===200)  getMovieList();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const deleteMovie = (id) => {
    axios
      .delete(`http://localhost:3002/api/${id}`)
      .then((response) => {
        if(response.status===200)  getMovieList();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const updateMovie = (id, Moviedata) => {
    axios
      .put(`http://localhost:3002/api/${id}`, { Moviedata })
      .then((response) => {
        if(response.status===200) getMovieList();
       
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getMovieList();
  }, []);

  return (
    <>
      <div style={{ margin: " auto",height: "100%", width: "100%" }}>
        {modalIsVisible && (
          <MovieModal
            Moviedata={Currentdata}
            updating={updating}
            setupdating={setupdating}
            setCurrentdata={setCurrentdata}
            modalIsVisible={modalIsVisible}
            setModalIsVisible={setModalIsVisible}
            updateMovie={updateMovie}
            addMovie={addMovie}
          ></MovieModal>
        )}
        <Button
          variant="contained"
          onClick={() => {
            setCurrentdata("");
            setModalIsVisible(!modalIsVisible);
          }}
        >
          Add Movie
        </Button>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Id </StyledTableCell>
                <StyledTableCell align="right">Title</StyledTableCell>
                <StyledTableCell align="right">Year</StyledTableCell>
                <StyledTableCell align="right">Director</StyledTableCell>
                <StyledTableCell align="right">Actions</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {movieList.map((row, idx) => (
                <StyledTableRow key={idx}>
                  <StyledTableCell component="th" scope="row">
                    {row._id}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.Title}</StyledTableCell>
                  <StyledTableCell align="right">{row.Year}</StyledTableCell>
                  <StyledTableCell align="right">
                    {row.Director}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <EditIcon style={{cursor: 'pointer'}}
                      onClick={() => {
                        setCurrentdata(row);
                        setupdating("updateMovie");
                        setModalIsVisible(!modalIsVisible);
                      }}
                    ></EditIcon>
                    <DeleteIcon
                    style={{cursor: 'pointer'}}
                      onClick={() => {
                        console.log("Delete", row);
                        deleteMovie(row._id);
                      }}
                    ></DeleteIcon>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

export default Movie;
