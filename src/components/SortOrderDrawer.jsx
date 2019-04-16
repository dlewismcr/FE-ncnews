import React from "react";
import PropTypes from "prop-types";
import "./SortOrderDrawer.css";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import Sort from "mdi-material-ui/Sort";

const styles = {
  list: {
    width: 238
  },
  fullList: {
    width: "auto"
  }
};

class SortOrderDrawer extends React.Component {
  state = {
    drawerOpen: false
  };

  toggleDrawer = isOpen => () => {
    this.setState({
      drawerOpen: isOpen
    });
  };

  render() {
    const { classes, sortBy, updateSortOrder } = this.props;
    const sideList = (
      <div className={classes.list}>
        <List>
          <ListItemText className="sortby-heading" primary={`Sort By`} />
        </List>
        <Divider />
        <List>
          {[
            "Newest",
            "Oldest",
            "Votes (high to low)",
            "Votes (low to high)"
          ].map((text, index) => (
            <div key={text}>
              <ListItem button onClick={() => updateSortOrder(text)}>
                <ListItemText className="sortby-text" primary={text} />
                <Checkbox
                  checked={sortBy === text}
                  tabIndex={-1}
                  disableRipple
                />
              </ListItem>
              <Divider />
            </div>
          ))}
        </List>
      </div>
    );

    return (
      <div>
        <Sort
          aria-label="Sort"
          className="sort"
          style={{ fontSize: 30}}
          onClick={this.toggleDrawer(true)}
        />
        <Drawer
          anchor="right"
          open={this.state.drawerOpen}
          onClose={this.toggleDrawer(false)}
        >
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer(false)}
            onKeyDown={this.toggleDrawer(false)}
          >
            {sideList}
          </div>
        </Drawer>
      </div>
    );
  }
}

SortOrderDrawer.propTypes = {
  sortBy: PropTypes.string,
  updateSortOrder: PropTypes.func
};

export default withStyles(styles)(SortOrderDrawer);
