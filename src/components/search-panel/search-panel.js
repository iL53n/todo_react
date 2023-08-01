import { Component } from "react";
import "./search-panel.css";

export default class SearchPanel extends Component {
  state = {
    searchPlaceholder: "Search...",
    searchText: "",
  };

  onTextChange = (e) => {
    const { onSearchChange = () => {} } = this.props;
    this.setState({
      searchText: e.target.value,
    });
    onSearchChange(e.target.value);
  };

  render() {
    return (
      <input
        className="search-input"
        placeholder={this.state.searchPlaceholder}
        onChange={this.onTextChange}
        value={this.state.searchText}
      />
    );
  }
}
