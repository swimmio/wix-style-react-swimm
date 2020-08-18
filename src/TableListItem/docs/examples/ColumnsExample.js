/* eslint-disable */
function ColumnsExample() {
  return (
    <React.Fragment>
      <TableListItem showDivider options={[{ value: 'Personal Finance' }]} />
      <TableListItem
        showDivider
        options={[
          { value: 'Personal Finance', width: '1fr' },
          { value: '7 posts', width: '2fr' },
        ]}
      />
      <TableListItem
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
