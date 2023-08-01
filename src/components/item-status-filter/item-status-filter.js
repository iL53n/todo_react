import { Component } from "react";
import "./item-status-filter.css";

export default class ItemStatusFilter extends Component {
  state = {
    filter: "all",
    buttons: [
      { name: "all", label: "All" },
      { name: "active", label: "Active" },
      { name: "done", label: "Done" },
    ],
  };

  onFilterChange(filter) {
    this.setState({
      filter: filter,
    });
    this.props.onFilterChange(filter);
  }

  setClassName(buttonName) {
    return (
      "btn " +
      (this.state.filter === buttonName ? "btn-info" : "btn-outline-secondary")
    );
  }

  render() {
    return (
      <div className="btn-group">
        {this.state.buttons.map(({ name, label }) => {
          return (
            <button
              key={name}
              type="button"
              className={this.setClassName(name)}
              onClick={() => this.onFilterChange(name)}
            >
              {label}
            </button>
          );
        })}
      </div>
    );
  }
}
