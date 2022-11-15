import { Box, Button, Typography, Avatar } from "@mui/material";
import { Upload as UploadIcon } from "../../icons/upload";
import { Download as DownloadIcon } from "../../icons/download";
import { getInitials } from "../../utils/get-initials";

export const ListToolbar = (props) => (
  <Box>
    <Box
      sx={{
        alignItems: "center",
        display: "flex",
        justifyContent: "space-between",
        flexWrap: "wrap",
        m: -1,
      }}
    >
      <Typography
        sx={{ m: 1, flexDirection: "row", display: "flex" }}
        variant="h4"
      >
        {props.item && (
          <Avatar src={props.item.avatar} sx={{ mr: 2 }}>
            {getInitials(props.item.displayName)}
          </Avatar>
        )}
        {props?.title}
      </Typography>
      {props.hidden ? (
        <Box sx={{ m: 1 }}>
          {!props.hiddenImport ? (
            <>
              <Button
                startIcon={<UploadIcon fontSize="small" />}
                sx={{ mr: 1 }}
              >
                Importar
              </Button>
              <Button
                startIcon={<DownloadIcon fontSize="small" />}
                sx={{ mr: 1 }}
              >
                Exportar
              </Button>
            </>
          ) : null}
          {props.secondAction ? (
            <Button
              color="secondary"
              variant="contained"
              onClick={props.onClickActionTwo}
              sx={{ marginRight: 2 }}
            >
              {props.titleButtonTwo}
            </Button>
          ) : null}
          <Button
            color="primary"
            variant="contained"
            onClick={props.onClickAction}
          >
            {props.titleButton}
          </Button>
        </Box>
      ) : null}
    </Box>
    {/* <Box sx={{ mt: 3 }}>
      <Card>
        <CardContent>
          <Box sx={{ maxWidth: 500 }}>
            <TextField
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SvgIcon color="action" fontSize="small">
                      <SearchIcon />
                    </SvgIcon>
                  </InputAdornment>
                ),
              }}
              placeholder="Buscar..."
              variant="outlined"
            />
          </Box>
        </CardContent>
      </Card>
    </Box> */}
  </Box>
);
