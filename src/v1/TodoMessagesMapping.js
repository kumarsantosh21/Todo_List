import React from "react";
import Checkbox from "@mui/material/Checkbox";
import TodoMessages from "./TodoMessages";
import TooltipColor from "./Navbar/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Paper from "@mui/material/Paper";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import FilterListIcon from "@mui/icons-material/FilterList";
import RefreshIcon from "@mui/icons-material/Refresh";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

import { visuallyHidden } from "@mui/utils";

const TodoMessagesMapper = ({ messa, title }) => {
  const messagedata = messa;

  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);

  // old todomessagemapping
  const Todoblock = messagedata.map((data, index) => {
    const titles = title?.[index];

    return (
      <>
        {/* {messagedata[0] === data ? null : <hr />} */}
        <hr />

        <TodoMessages key={data} messagetext={data} title={titles} />
      </>
    );
  });
  const objects = [];
  console.log(messagedata);
  for (let x = 0; x < messagedata?.length; x++) {
    objects[x] = {
      name: messagedata[x],
    };
  }

  const rows = objects;

  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  function getComparator(order, orderBy) {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  // This method is created for cross-browser compatibility, if you don't
  // need to support IE11, you can use Array.prototype.sort() directly
  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  const headCells = [
    {
      id: "Title and Message",
      numeric: false,
      disablePadding: true,
      label: "Title and Message",
    },
  ];

  function EnhancedTableHead(props) {
    const {
      onSelectAllClick,
      order,
      orderBy,
      numSelected,
      rowCount,
      onRequestSort,
    } = props;
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };

    return (
      <TableHead sx={{}}>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              color="primary"
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{
                "aria-label": "select all messages",
              }}
              sx={{
                color: "black",
                margin: "0px 15px",

                "&.Mui-checked": {
                  color: "rgb(94, 53, 177)",
                },
                "&.MuiCheckbox-indeterminate": {
                  color: "rgb(94, 53, 177)",
                },
              }}
            />
          </TableCell>
          {headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              align={headCell.numeric ? "right" : "left"}
              padding={headCell.disablePadding ? "none" : "normal"}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", margin: "20px" }}
              >
                {headCell.label}
              </Typography>
              {/* <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </Box>
                ) : null}
              </TableSortLabel> */}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }

  EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(["asc", "desc"]).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
  };

  const EnhancedTableToolbar = (props) => {
    const { numSelected } = props;

    return (
      <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },

          bgcolor: numSelected > 0 ? "rgb(237, 231, 246)" : "",

          margin: "20px 20px 0px 20px",
          borderRadius: "8px",
        }}
      >
        {numSelected > 0 ? (
          <Typography
            sx={{ flex: "1 1 100%" }}
            color="inherit"
            variant="subtitle1"
            component="div"
          >
            {numSelected} row(s) selected
          </Typography>
        ) : (
          <Typography
            sx={{ flex: "1 1 100%", color: "rgb(94, 53, 177)" }}
            variant="h6"
            id="tableTitle"
            component="div"
          >
            Notepad List
          </Typography>
        )}

        {numSelected > 0 ? (
          <div style={{ display: "flex" }}>
            <TooltipColor
              title="Copy"
              icon={<ContentCopyIcon />}
              onClick={() => {}}
              dynamicbgcolor={"white"}
              arrow={false}
            />
            <TooltipColor
              title="Delete"
              icon={<DeleteIcon />}
              onClick={() => {}}
              dynamicbgcolor={"white"}
              arrow={false}
            />
          </div>
        ) : (
          <TooltipColor
            title="Refresh List"
            icon={<RefreshIcon />}
            onClick={() => {}}
          />
        )}
      </Toolbar>
    );
  };

  EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      // adding all elements to array
      const newSelecteds = rows.map((n) => n.name);
      setSelected(newSelecteds);
      console.log(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      // if element not found adding element
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      // to remove first element
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      // to remove last element
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      // to remove middle elements and adding remaining elements
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    console.log(newSelected);
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    console.log(event.target.value);
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <>
      <hr />

      {/* {Todoblock} */}

      <EnhancedTableToolbar numSelected={selected.length} />
      <TableContainer>
        <Table aria-labelledby="tableTitle" size={dense ? "small" : "medium"}>
          <EnhancedTableHead
            numSelected={selected.length}
            order={order}
            orderBy={orderBy}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={rows.length}
          />
          <TableBody>
            {rows?.map((row, index) => {
              const isItemSelected = isSelected(row.name);
              const labelId = `enhanced-table-checkbox-${index}`;

              return (
                <TableRow
                  role="checkbox"
                  aria-checked={isItemSelected}
                  tabIndex={-1}
                  key={row.name}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      onClick={(event) => handleClick(event, row.name)}
                      checked={isItemSelected}
                      inputProps={{
                        "aria-labelledby": labelId,
                      }}
                      sx={{
                        color: "black",
                        margin: "0px 15px",
                        "&.Mui-checked": {
                          color: "rgb(94, 53, 177)",
                        },
                      }}
                      onChange={(e) => {
                        console.log(e.target.checked);
                      }}
                    />
                  </TableCell>
                  <TableCell
                    omcponent="th"
                    id={labelId}
                    scope="row"
                    padding="none"
                  >
                    <TodoMessages
                      key={row.name}
                      messagetext={row.name}
                      title={title[index]}
                    />
                  </TableCell>
                </TableRow>
              );
            })}
            {emptyRows > 0 && (
              <TableRow
                style={{
                  height: (dense ? 33 : 53) * emptyRows,
                }}
              >
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {/* <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      /> */}

      {/* <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      /> */}
    </>
  );
};

export default TodoMessagesMapper;
