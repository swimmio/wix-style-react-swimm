/* eslint-disable */
function PaddingExample() {
  return (
    <React.Fragment>
      <TableListItem
        verticalPadding="small"
        showDivider
        options={[
          { value: 'Personal Finance' },
          { value: '7 posts' },
          { value: 'Last update on 27 April 2020' },
        ]}
      />
      <TableListItem
        verticalPadding="medium"
        showDivider
        options={[
          { value: 'Personal Finance' },
          { value: '7 posts' },
          { value: 'Last update on 27 April 2020' },
        ]}
      />
    </React.Fragment>
  );
}
