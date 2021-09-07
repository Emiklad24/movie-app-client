import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import "./DiscoverParamSettingsModal.css";
import { DiscoverStore } from "../../store/discover.store";

export default function DiscoverParamSettingsModal() {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const currentView = DiscoverStore((state) => state?.currentView);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div>
        <div className="btn-Modal-discover" onClick={handleClickOpen}>
          <i className="fa fa-filter uk-animation-fade"></i>
        </div>

        <Dialog
          fullScreen={fullScreen}
          open={open}
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          {currentView === "movies" && (
            <>
              <DialogTitle id="responsive-dialog-title">
                {"Search movie by multiple filters"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Let Google help apps determine location. This means sending
                  anonymous location data to Google, even when no apps are
                  running.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Disagree
                </Button>
                <Button onClick={handleClose} color="primary">
                  Agree
                </Button>
              </DialogActions>
            </>
          )}
        </Dialog>
      </div>
    </>
  );
}
