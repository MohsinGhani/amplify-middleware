import { IconButton, Toolbar, Tooltip, Typography, alpha } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import DeleteIcon from "@mui/icons-material/Delete";


interface EnhancedTableToolbarProps {
    numSelected: number;
}

const EnhancedTableToolbar = ({ numSelected }: EnhancedTableToolbarProps) => {

    return <Toolbar
        sx={{
            pl: { sm: 2 },
            pr: { xs: 1, sm: 1 },
            ...(numSelected > 0 && {
                bgcolor: (theme) =>
                    alpha(
                        theme.palette.primary.main,
                        theme.palette.action.activatedOpacity
                    ),
            }),
        }}
    >
        {numSelected > 0 ? (
            <Typography
                sx={{ flex: "1 1 100%" }}
                color="inherit"
                variant="subtitle1"
                component="div"
            >
                {numSelected} selected
            </Typography>
        ) : null}
        {numSelected > 0 ? (
            <Tooltip title="Delete">
                <IconButton>
                    <DeleteIcon />
                </IconButton>
            </Tooltip>
        ) : (
            <Tooltip title="Filter list">
                <IconButton>
                    <FilterListIcon />
                </IconButton>
            </Tooltip>
        )}
    </Toolbar>
}

export default EnhancedTableToolbar