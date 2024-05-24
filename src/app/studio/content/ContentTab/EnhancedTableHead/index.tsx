import { ChangeEvent, MouseEvent } from "react";
import {
  Box,
  Checkbox,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@mui/material";
import { visuallyHidden } from "@mui/utils";

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (event: MouseEvent<unknown>, property: keyof any) => void;
  onSelectAllClick: (event: ChangeEvent<HTMLInputElement>) => void;
  order: "asc" | "desc";
  rowCount: number;
}

const EnhancedTableHead = ({
  onSelectAllClick,
  order,
  numSelected,
  rowCount,
  onRequestSort,
}: EnhancedTableProps) => {
  const createSortHandler =
    (property: keyof any) => (event: MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox" sx={styles.stickyCellStyle}>
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell>

        <TableCell
          sx={[styles.stickyCellStyle, { left: 48 }]}
          width={350}
          align={"left"}
        >
          Video
        </TableCell>
        <TableCell align={"right"}>Visibility</TableCell>
        <TableCell align={"right"}>Restriction</TableCell>
        <TableCell
          key={"protein"}
          align={"right"}
          padding={"normal"}
          sortDirection={order}
        >
          <TableSortLabel
            active={true}
            direction={order}
            onClick={createSortHandler("protein")}
          >
            Date
            <Box component="span" sx={visuallyHidden}>
              {order === "desc" ? "sorted descending" : "sorted ascending"}
            </Box>
          </TableSortLabel>
        </TableCell>
        <TableCell align={"right"}>Views</TableCell>
        <TableCell align={"right"}>Comments</TableCell>
        <TableCell align={"right"}>Likes (vs. dislikes)</TableCell>
      </TableRow>
    </TableHead>
  );
};

/** @type {import("@mui/material").SxProps} */
const styles = {
  stickyCellStyle: {
    position: "sticky",
    left: 0,
    backgroundColor: "white",
    zIndex: 99,
  },
};

export default EnhancedTableHead;
