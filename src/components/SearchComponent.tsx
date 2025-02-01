import React from 'react';
interface Props {
  searchResult: (search: string) => void;
}
class SearchComponent extends React.Component<Props> {
  state = {
    search: '',
  };
  componentDidMount() {
    this.setState({ search: localStorage.getItem('search') });
  }
  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ search: e.target.value.trim() });
  };
  submitButton = () => {
    this.props.searchResult(this.state.search);
    localStorage.setItem('search', this.state.search);
  };
  render(): React.ReactNode {
    return (
      <div>
        <input
          type="text"
          className="searchPlace"
          defaultValue={this.state.search}
          placeholder="Search..."
          onChange={this.handleChange}
        />
        <button onClick={this.submitButton}>Search</button>
      </div>
    );
  }
}

export default SearchComponent;
