export const options = [
  'Alabama',
  'Arkansas',
  'California',
  'New York',
  'Ohio',
  'Texas',
  'Utah',
  'Washington',
].map(state => ({ value: state, id: state }));

export const simple = `
class Example extends React.Component {
  state = { selectedOptions: ['Alabama', 'California'] };

  onSelect = option => this.setState({selectedOptions: [...this.state.selectedOptions, option]});

  onDeselect = option => this.setState({selectedOptions: this.state.selectedOptions.filter(item => item !== option)});

  render() {
    const { selectedOptions } = this.state;
    return (
      <MultiSelectCheckbox
        options={${JSON.stringify(options)}}
        selectedOptions={selectedOptions}
        onSelect={this.onSelect}
        onDeselect={this.onDeselect}
      />
    );
  }
}
`;

export const usingBuilders = `
class BuildersExample extends React.Component {
  state = { selectedOptions: ['Logan Chandler'] };

  onSelect = optionId  =>
    optionId &&
        this.setState({ selectedOptions: [...this.state.selectedOptions, optionId] });

  onDeselect = optionId =>
    this.setState({
      selectedOptions: this.state.selectedOptions.filter(
        item => item !== optionId,
      ),
    });

  render() {
    const { selectedOptions } = this.state;
    const optionsList = [
        listItemSelectBuilder({
            checkbox: true,
            id: 'Logan Chandler',
            title: 'Logan Chandler',
        }),
        { value: 'Paul Simon', id: 'Paul Simon' },
        listItemSelectBuilder({
            checkbox: true,
            id: 'Etta Wheeler',
            title: 'Etta Wheeler',
          }),
        { value: 'Robert Ortega', id: 'Robert Ortega'}
        ];
    return (
      <MultiSelectCheckbox
        options={optionsList}
        selectedOptions={selectedOptions}
        onSelect={this.onSelect}
        onDeselect={this.onDeselect}
      />
    );
  }
}
`;
