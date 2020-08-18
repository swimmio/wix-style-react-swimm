/* eslint-disable */
function DraggableExample() {
  return (
    <React.Fragment>
      <TableListItem
        showDivider
        options={[
          { value: 'Personal Finance' },
          { value: '12 posts' },
          { value: 'Last update on 27 April 2020' },
        ]}
      />
      <TableListItem
        draggable
        showDivider
        options={[
          { value: 'Personal Finance' },
          { value: '12 posts' },
          { value: 'Last update on 27 April 2020' },
        ]}
      />
      <TableListItem
        draggable
        dragDisabled
        showDivider
        options={[
          { value: 'Personal Finance' },
          { value: '12 posts' },
          { value: 'Last update on 27 April 2020' },
        ]}
      />
    </React.Fragment>
  );
}
