/* eslint-disable */

class TableExample extends React.Component {
  state = {
    data: [
      {
        shortText: 'Meghan',
        longText:
          'By the end of the 20th century, paper-and-binder personal organizers started to be replaced by electronic devices',
      },
      {
        shortText: 'Sara',
        longText:
          'The 2014 Paris–Tours was the 108th edition of the Paris–Tours cycle race',
      },
      {
        shortText: 'Deborah',
        longText:
          'New Georgia, with an area of 2,037 km2, is the largest of the islands in Western Province, Solomon Islands',
      },
      {
        shortText: 'Walter',
        longText:
          'The 2016 World Senior Curling Championships was from April 16 to 23 at the Karlstad Curling Arena in Karlstad, Sweden.',
      },
    ],
  };

  render() {
    return (
      <Table
        data={this.state.data}
        columns={[
          { title: 'Short Text', render: row => row.shortText },
          { title: 'Long Text', render: row => row.longText },
        ]}
        layout="auto"
      >
        <Table.Content />
      </Table>
    );
  }
}
