import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function MovieModal({
  Moviedata,
  updating,
  setupdating,
  setCurrentdata,
  modalIsVisible,
  setModalIsVisible,
  updateMovie,
  addMovie,
}) {
  const [open, setOpen] = React.useState(modalIsVisible);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);

    setModalIsVisible(!modalIsVisible);
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} >
          <h1>Add Details</h1>
         <div style={{display:"flex", flexDirection:"column", justifyContent:"space-between", paddingBottom:"2rem"}}> <TextField
            id="standard-basic"
            label="Title"
            variant="standard"
            value={Moviedata.Title}
            onChange={(e) => {
              console.log(e.target.value);

              setCurrentdata({ ...Moviedata, Title: e.target.value });
            }}
          />
          <TextField
            id="standard-basic"
            label="Year"
            variant="standard"
            value={Moviedata.Year}
            onChange={(e) => {
              console.log(e.target.value);
              const re = /^[0-9\b]+$/;

              if (e.target.value === "" || re.test(e.target.value)) {
                setCurrentdata({ ...Moviedata, Year: e.target.value });
              }
            }}
          />
          <TextField
            id="standard-basic"
            label="Director"
            variant="standard"
            value={Moviedata.Director}
            onChange={(e) => {
              setCurrentdata({ ...Moviedata, Director: e.target.value });
            }}
          /></div>
          <Button
            variant="contained"
            onClick={() => {
              setModalIsVisible(!modalIsVisible);
              if (updating === "updateMovie") {
                updateMovie(Moviedata._id, Moviedata);
                setupdating("");
              } else {
                addMovie(Moviedata);
              }
            }}
          >
          {updating=='updateMovie'?"Update Movie":"Save Movie"} 
          </Button>
          <Button style={{marginLeft:"1rem"}}
            variant="contained"
            onClick={() => {
              setModalIsVisible(!modalIsVisible);
            }}
          >
            Close Modal
          </Button>
        </Box>
      </Modal>
    </div>
  );
}

export default MovieModal;
