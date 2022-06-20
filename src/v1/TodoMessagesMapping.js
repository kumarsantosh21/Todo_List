import React from "react";
import Checkbox from "@mui/material/Checkbox";
import TodoMessages from "./TodoMessages";
import TooltipColor from "./Navbar/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
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
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useLazyQuery, useMutation } from "@apollo/client";
import { app } from "../originpages/Client";
import { UPDATE_USER_MESSAGES, GET_MESSAGES } from "./graphql";
import MessageLoader from "./MessageLoader";
import { styled } from "@mui/material/styles";
import { visuallyHidden } from "@mui/utils";
import ConfirmDialogbox from "./ConfirmDialogbox";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import Badge from "@mui/material/Badge";

const TodoMessagesMapper = ({ messa, title, lastmodifieddate }) => {
  const messagedata = messa;
  const titles = title;
  const datedata = lastmodifieddate;

  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [copy, setCopy] = React.useState("Copy to Clipboard");
  const [newmessage, setNewmessage] = React.useState();
  const [newtitle, setNewtitle] = React.useState();
  const [manualLoading, setManualLoading] = React.useState();
  const [dialogstate, setDialogstate] = React.useState(false);
  const [newdate, setNewdate] = React.useState();

  const [MESSAGES, { data }] = useLazyQuery(GET_MESSAGES, {
    variables: {
      usernam: app.currentUser._profile.data.email,
    },
    onCompleted: (mesdata) => {
      // console.log("completed");
    },
  });

  const [UPDATE_MESSAGES, { loading }] = useMutation(UPDATE_USER_MESSAGES, {
    variables: {
      username: app.currentUser._profile.data.email,
      updates: {
        message: newmessage,
        title: newtitle,
        lastmodified: newdate,
      },
    },
    onCompleted: () => {
      setManualLoading(true);
      setTimeout(() => {
        setManualLoading(false);
      }, 1000);
    },
  });
  React.useEffect(() => {
    MESSAGES();
  }, [MESSAGES]);

  React.useEffect(() => {
    const test = async () => {
      if (newmessage !== undefined) {
        await UPDATE_MESSAGES();
        MESSAGES();
        setSelected([]);
      }
    };
    test();
  }, [newmessage]);

  React.useEffect(() => {
    // removing element from array after single deletion
    selected.map((item) => {
      if (!titles.includes(item)) {
        const index = selected.indexOf(item);
        if (index !== -1) {
          let newselect;
          newselect = selected.filter((word) => word !== item);

          setSelected(newselect);
        }
      }

      return selected;
    });
  });

  const Keyframes = styled("span")({
    "@keyframes spin": {
      " 0% ": { transform: " rotate(0deg)" },
      "100%": { transform: " rotate(360deg)" },
    },
    animation: manualLoading || loading ? "spin 600ms  infinite ease-out" : "",
  });
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "rgb(237, 231, 246)",
    },
  }));
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

  for (let x = 0; x < messagedata?.length; x++) {
    objects[x] = {
      name: messagedata[x],
    };
  }
  // objects.reverse();
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
        <TableRow sx={{}}>
          <TableCell
            padding="checkbox"
            sx={{ background: "rgb(237, 231, 246)" }}
          >
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
              disableRipple
            />
          </TableCell>
          {headCells.map((headCell) => (
            <StyledTableCell
              key={headCell.id}
              align={headCell.numeric ? "right" : "left"}
              padding={headCell.disablePadding ? "none" : "normal"}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", margin: "20px" }}
              >
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div>{headCell.label}</div>
                  <div style={{ marginRight: "25px" }}>Actions</div>
                </div>
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
            </StyledTableCell>
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

    const handleCopy = () => {
      let messages = [];
      selected.map((select) => {
        const index = titles.indexOf(select);
        messages = [...messages, messagedata[index]];
        return messages;
      });
      const content = messages.join("\n\n\n\n\n\n");
      navigator.clipboard.writeText(content).then(
        function () {
          setCopy("Copied!");
          setTimeout(() => {
            setCopy("Copy to Clipboard");
          }, 5000);
        },
        function () {
          setCopy("Failed to Copy!");
          setTimeout(() => {
            setCopy("Copy to Clipboard");
          }, 5000);
        }
      );
    };

    const handleDelete = () => {
      setDialogstate(true);
    };
    return (
      <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },

          bgcolor: numSelected > 0 ? "rgb(237, 231, 246)" : "",

          margin: "10px 25px 25px 25px",
          borderRadius: "8px",
        }}
      >
        {numSelected > 0 ? (
          <Typography
            sx={{ flex: "1 1 100%", paddingLeft: "20px" }}
            color="inherit"
            variant="subtitle1"
            component="div"
          >
            {numSelected} row(s) selected
          </Typography>
        ) : (
          <Typography
            sx={{
              flex: "1 1 100%",
              color: "rgb(94, 53, 177)",
              paddingLeft: "20px",
            }}
            variant="h6"
            id="tableTitle"
            component="div"
          >
            Notepad List
          </Typography>
        )}

        {numSelected > 0 ? (
          <div style={{ marginRight: "20px" }}>
            <div style={{ display: "flex" }}>
              <TooltipColor
                placement="top"
                title={copy}
                icon={
                  copy === "Copy to Clipboard" ? (
                    <ContentCopyIcon />
                  ) : (
                    <CheckCircleOutlineIcon />
                  )
                }
                onClick={handleCopy}
                dynamicbgcolor={"white"}
                arrow={false}
              />
              <TooltipColor
                placement="top"
                title="Delete"
                icon={<DeleteIcon />}
                onClick={handleDelete}
                dynamicbgcolor={"white"}
                arrow={false}
              />
            </div>
          </div>
        ) : (
          <div style={{ marginRight: "20px" }}>
            <div style={{ display: "flex" }}>
              <div style={{ marginRight: "5px" }}>
                <TooltipColor
                  title="Filter"
                  color={"rgb(94, 53, 177)"}
                  icon={
                    <Badge
                      badgeContent={1}
                      color="secondary"
                      sx={{
                        "& .MuiBadge-badge": {
                          color: "rgb(94, 53, 177)",
                          backgroundColor: "rgb(237, 231, 246)",
                          zIndex: "0",
                        },
                      }}
                    >
                      <FilterAltIcon />
                    </Badge>
                  }
                  // onClick={handleFilter}
                  dynamicbgcolor={"white"}
                  placement="top"
                />
              </div>

              <TooltipColor
                placement="top"
                title="Refresh List"
                icon={
                  <Keyframes>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <RefreshIcon />
                    </div>
                  </Keyframes>
                }
                onClick={() => {
                  setManualLoading(true);
                  MESSAGES();
                  setTimeout(() => {
                    setManualLoading(false);
                  }, 300);
                }}
                color={manualLoading || loading ? "rgb(94, 53, 177)" : ""}
              />
            </div>
          </div>
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
      const newSelecteds = titles.map((n) => n);
      setSelected(newSelecteds);
      // console.log(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    // marking checkboxs logic
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
    // console.log(newSelected);
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
  console.log(Math.max(0, (1 + page) * rowsPerPage - rows.length));
  const handleDialogClose = () => {
    setDialogstate(false);
  };
  const handleConfirmActionClick = () => {
    let notdeletedmessages = messagedata;
    let notdeletedtitle = titles;
    let notdeleteddates = datedata;
    selected.map((id) => {
      notdeletedtitle = notdeletedtitle.filter((word) => word !== id);
      const index = titles.indexOf(id);
      if (index !== -1) {
        const deletedmessage = messagedata[index];
        notdeletedmessages = notdeletedmessages.filter(
          (word) => word !== deletedmessage
        );
        const deleteddate = datedata[index];
        notdeleteddates = notdeleteddates.filter(
          (word) => word !== deleteddate
        );
      }

      return notdeletedtitle;
    });

    // console.log(notdeletedmessages);
    // console.log(notdeletedtitle);
    setNewdate(notdeleteddates);
    setNewtitle(notdeletedtitle);
    setNewmessage(notdeletedmessages);
    setDialogstate(false);
  };

  return (
    <>
      {/* <hr /> */}

      {/* {Todoblock} */}

      <EnhancedTableToolbar numSelected={selected.length} />
      <div
        style={{
          margin: "10px 25px 25px 25px",
          border: "2px solid black",
          borderRadius: "8px",
          overflow: "hidden",
        }}
      >
        {" "}
        {manualLoading || loading ? (
          <MessageLoader />
        ) : (
          <>
            <TableContainer>
              <Table
                aria-labelledby="tableTitle"
                size={dense ? "small" : "medium"}
                sx={{ borderRadius: "8px" }}
              >
                <EnhancedTableHead
                  numSelected={selected.length}
                  order={order}
                  orderBy={orderBy}
                  onSelectAllClick={handleSelectAllClick}
                  onRequestSort={handleRequestSort}
                  rowCount={rows.length}
                />

                <TableBody>
                  {rows
                    ?.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                    .map((row, index) => {
                      const titleindex = messagedata.indexOf(row.name);
                      const isItemSelected = isSelected(titles[titleindex]);
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
                              onClick={(event) =>
                                handleClick(event, titles[titleindex])
                              }
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
                              disableRipple
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
                              title={titles[titleindex]}
                              recentupdateddate={datedata[titleindex]}
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
            <TablePagination
              sx={{ margin: "10px" }}
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />

            {/* <FormControlLabel
            control={<Switch checked={dense} onChange={handleChangeDense} />}
            label="Dense padding"
          /> </> */}
          </>
        )}
      </div>
      <ConfirmDialogbox
        dialogstate={dialogstate}
        handleClose={handleDialogClose}
        handleConfirmActionClick={handleConfirmActionClick}
      />
    </>
  );
};

export default TodoMessagesMapper;
