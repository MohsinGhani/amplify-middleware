import React, { useState, MouseEvent } from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import EnhancedTableToolbar from "./EnhancedTableToolbar";
import EnhancedTableHead from "./EnhancedTableHead";
import Image from "next/image";
import { Tooltip, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import OndemandVideo from "@mui/icons-material/OndemandVideo";
import InsertChart from "@mui/icons-material/InsertChart";
import CommentIcon from "@mui/icons-material/Comment";

interface Data {
  id: number;
  calories: number;
  carbs: number;
  fat: number;
  protein: number;
  name: string;
  visibility: string;
  restriction: string;
  date: any;
  views: number;
  comments: number;
  likes_unlikes: any;
}

const createData = (
  title: string,
  description: string,
  visibility: string,
  restrictions: string,
  date: string,
  views: string,
  comments: string,
  likes: string,
  src: string
) => ({
  id: Math.random(),
  title,
  description,
  visibility,
  restrictions,
  date,
  views,
  comments,
  likes,
  src,
});

const rows = [
  createData(
    "4k Video",
    "Stunning landscapes in 4K resolution",
    "Public",
    "None",
    "2023-01-15",
    "1500",
    "300",
    "10k",
    "https://i9.ytimg.com/vi/KcjSFj0d91s/mqdefault.jpg?sqp=CIDO26sG-oaymwEmCMACELQB8quKqQMa8AEB-AH-BIAC6AKKAgwIABABGEEgZSgwMA8=&rs=AOn4CLB9MJzIUIPp5zwALpWSaGEBT5X3dg"
  ),
  createData(
    "City Timelapse",
    "Timelapse of a busy city life",
    "Public",
    "Age restricted",
    "2023-02-20",
    "2000",
    "450",
    "5k",
    "https://i9.ytimg.com/vi/iu6lgZqeA5g/mqdefault.jpg?sqp=CIDO26sG-oaymwEmCMACELQB8quKqQMa8AEB-AH-CYAC0AWKAgwIABABGFwgZShAMA8=&rs=AOn4CLBUN4t88qbhYe6TXcDTNDoPc20E1g"
  ),
  createData(
    "Underwater Exploration",
    "Exploring the deep sea",
    "Unlisted",
    "None",
    "2023-03-05",
    "980",
    "200",
    "10",
    "https://i9.ytimg.com/vi/9BRD3An6CrU/mqdefault.jpg?sqp=CIDO26sG-oaymwEmCMACELQB8quKqQMa8AEB-AH-BIAC6AKKAgwIABABGFQgZShPMA8=&rs=AOn4CLBO_PTCK-JUMlih5SRwN2LMFr1XFQ"
  ),
  createData(
    "Mountain Biking",
    "Adventures on mountain trails",
    "Public",
    "None",
    "2023-04-10",
    "1200",
    "320",
    "5",
    "https://i9.ytimg.com/vi/KcjSFj0d91s/mqdefault.jpg?sqp=CIDO26sG-oaymwEmCMACELQB8quKqQMa8AEB-AH-BIAC6AKKAgwIABABGEEgZSgwMA8=&rs=AOn4CLB9MJzIUIPp5zwALpWSaGEBT5X3dg"
  ),
  createData(
    "Space Documentary",
    "Journey through the universe",
    "Private",
    "None",
    "2023-05-18",
    "3000",
    "600",
    "-",
    "https://i9.ytimg.com/vi/9BRD3An6CrU/mqdefault.jpg?sqp=CIDO26sG-oaymwEmCMACELQB8quKqQMa8AEB-AH-BIAC6AKKAgwIABABGFQgZShPMA8=&rs=AOn4CLBO_PTCK-JUMlih5SRwN2LMFr1XFQ"
  ),
  createData(
    "Wildlife in Africa",
    "The beauty of African wildlife",
    "Public",
    "None",
    "2023-06-21",
    "2500",
    "200",
    "-",
    "https://i9.ytimg.com/vi/iu6lgZqeA5g/mqdefault.jpg?sqp=CIDO26sG-oaymwEmCMACELQB8quKqQMa8AEB-AH-CYAC0AWKAgwIABABGFwgZShAMA8=&rs=AOn4CLBUN4t88qbhYe6TXcDTNDoPc20E1g"
  ),
  createData(
    "Drone Shots",
    "Captivating scenes captured by drone",
    "Public",
    "None",
    "2023-07-30",
    "1800",
    "410",
    "-",
    "https://i9.ytimg.com/vi/iu6lgZqeA5g/mqdefault.jpg?sqp=CIDO26sG-oaymwEmCMACELQB8quKqQMa8AEB-AH-CYAC0AWKAgwIABABGFwgZShAMA8=&rs=AOn4CLBUN4t88qbhYe6TXcDTNDoPc20E1g"
  ),
  createData(
    "Cooking Masterclass",
    "Learn to cook delicious meals",
    "Unlisted",
    "None",
    "2023-08-12",
    "2200",
    "480",
    "-",
    "https://i9.ytimg.com/vi/9BRD3An6CrU/mqdefault.jpg?sqp=CIDO26sG-oaymwEmCMACELQB8quKqQMa8AEB-AH-BIAC6AKKAgwIABABGFQgZShPMA8=&rs=AOn4CLBO_PTCK-JUMlih5SRwN2LMFr1XFQ"
  ),
  createData(
    "Art Tutorial",
    "Step-by-step guide to painting",
    "Public",
    "None",
    "2023-09-22",
    "1600",
    "350",
    "-",
    "https://i9.ytimg.com/vi/KcjSFj0d91s/mqdefault.jpg?sqp=CIDO26sG-oaymwEmCMACELQB8quKqQMa8AEB-AH-BIAC6AKKAgwIABABGEEgZSgwMA8=&rs=AOn4CLB9MJzIUIPp5zwALpWSaGEBT5X3dg"
  ),
  createData(
    "Yoga for Beginners",
    "Start your yoga journey here",
    "Public",
    "None",
    "2023-10-05",
    "1900",
    "400",
    "-",
    "https://i9.ytimg.com/vi/9BRD3An6CrU/mqdefault.jpg?sqp=CIDO26sG-oaymwEmCMACELQB8quKqQMa8AEB-AH-BIAC6AKKAgwIABABGFQgZShPMA8=&rs=AOn4CLBO_PTCK-JUMlih5SRwN2LMFr1XFQ"
  ),
];

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = "asc" | "desc";

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(
  array: readonly T[],
  comparator: (a: T, b: T) => number
) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const ContentTab = () => {
  const [order, setOrder] = useState<Order>("asc");
  const [selected, setSelected] = useState<readonly number[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [hoveredRow, setHoveredRow] = useState("");

  const handleRequestSort = () => {
    setOrder(order === "asc" ? "desc" : "asc");
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: MouseEvent<unknown>, id: number) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (id: number) => selected.indexOf(id) !== -1;

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(rows, getComparator(order, "date")).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, page, rowsPerPage]
  );
  const onMouseEnter = (row: any) => {
    setHoveredRow(row?.id);
  };
  const onMouseLeave = () => {
    setHoveredRow("");
  };

  return (
    <Box>
      <Paper>
        <Box
          sx={{
            overflowX: "auto",
            width: "100%",
          }}
        >
          <EnhancedTableToolbar numSelected={selected.length} />
          <TableContainer>
            <Table
              sx={{ minWidth: 1000 }}
              aria-labelledby="tableTitle"
              size={"medium"}
            >
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
              />
              <TableBody>
                {visibleRows.map((row: any, index) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      key={index}
                      hover
                      onClick={(event) => handleClick(event, row.id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      selected={isItemSelected}
                      sx={{ cursor: "pointer" }}
                      onMouseEnter={() => onMouseEnter(row)}
                      onMouseLeave={() => onMouseLeave()}
                    >
                      <TableCell padding="checkbox" sx={styles.stickyCellStyle}>
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            "aria-labelledby": labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                        width={350}
                        sx={[styles.stickyCellStyle, { left: 48 }]}
                      >
                        <Box sx={styles.videoCard} width={350}>
                          <img
                            src={row.src}
                            alt="thumbnail"
                            width={130}
                            height={130}
                          />
                          {/* <Image
                            src={"/assets/example-thumbnail.jpg"}
                            alt="thumbnail"
                            width={130}
                            height={130}
                          /> */}
                          <Box
                            display={"flex"}
                            flexDirection={"column"}
                            justifyContent={"space-between"}
                          >
                            <Box>
                              <Typography mt={1} fontSize={14}>
                                {row.title}
                              </Typography>
                              {hoveredRow !== row?.id ? (
                                <Typography variant="subtitle1" fontSize={12}>
                                  {row.description}
                                </Typography>
                              ) : null}
                            </Box>

                            {hoveredRow === row?.id ? (
                              <Box sx={styles.actionIconsContainer}>
                                <Tooltip title="Details">
                                  <EditIcon style={styles.iconStyles} />
                                </Tooltip>
                                <Tooltip title="Analytics">
                                  <InsertChart style={styles.iconStyles} />
                                </Tooltip>
                                <Tooltip title="Comments">
                                  <CommentIcon style={styles.iconStyles} />
                                </Tooltip>
                                <Tooltip title="View">
                                  <OndemandVideo style={styles.iconStyles} />
                                </Tooltip>
                                <Tooltip title="Options">
                                  <MoreVertIcon style={styles.iconStyles} />
                                </Tooltip>
                              </Box>
                            ) : null}
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell align="right">{row.visibility}</TableCell>
                      <TableCell align="right">{row.restriction}</TableCell>
                      <TableCell align="right">
                        {row.date ?? "May 9, 2023"}
                      </TableCell>
                      <TableCell align="right">{row.views}</TableCell>
                      <TableCell align="right">{row.comments}</TableCell>
                      <TableCell align="right">{row.likes}</TableCell>
                    </TableRow>
                  );
                })}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: 53 * emptyRows,
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Box>
      </Paper>
      {/* <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      /> */}
    </Box>
  );
};

/** @type {import("@mui/material").SxProps} */
const styles = {
  videoCard: {
    display: "flex",
    gap: 2,
    padding: "10px 0px",
  },
  iconStyles: {
    fontSize: 20,
    margin: "0px 10px",
    color: "#696a6d",
  },
  actionIconsContainer: {
    marginTop: "7px",
  },
  stickyColumn: {
    position: "sticky",
  },
  stickyCellStyle: {
    position: "sticky",
    left: 0,
    backgroundColor: "white",
    zIndex: 99,
  },
};

export default ContentTab;
