import NoResultgif from "./NoDataFound.gif";
import Typography from "@mui/material/Typography";

const NoResults = () => {
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div style={{ flex: "40%", textAlign: "right" }}>
          <Typography
            sx={{
              fontWeight: "bold",
              fontSize: "25px",
              color: "rgb(94, 53, 177)",
            }}
          >
            No Data Found...
          </Typography>
          <Typography
            sx={{
              fontWeight: "bold",
              fontSize: "18px",
              color: "rgb(94, 53, 177)",
            }}
          >
            Add New List
          </Typography>
        </div>
        <div style={{ flex: "60%", textAlign: "right" }}>
          <img src={NoResultgif} alt="NoResults" width={"80%"} />
        </div>
      </div>
    </>
  );
};
export default NoResults;
