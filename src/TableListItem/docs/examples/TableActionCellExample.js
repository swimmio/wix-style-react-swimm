/* eslint-disable */
function TableActionCellExample() {
  return (
    <TableListItem
      onClick={() => window.alert('onClick')}
      checkbox
      draggable
      showDivider
      options={[
        { value: 'Personal Finance' },
        { value: '12 posts' },
        { value: 'Last update on 27 April 2020' },
        {
          value: (
            <TableActionCell
              primaryAction={{
                text: 'Edit',
                skin: 'standard',
                onClick: () => window.alert('Primary action was triggered!'),
              }}
              secondaryActions={[
                {
                  text: 'Star',
                  icon: <Icons.Star />,
                  onClick: () => window.alert('Star action was triggered.'),
                },
                {
                  text: 'Download',
                  icon: <Icons.Download />,
                  onClick: () => window.alert('Download action was triggered.'),
                },
                {
                  text: 'Duplicate',
                  icon: <Icons.Duplicate />,
                  onClick: () =>
                    window.alert('Duplicate action was triggered.'),
                },
                {
                  text: 'Print',
                  icon: <Icons.Print />,
                  onClick: () => window.alert('Print action was triggered.'),
                },
              ]}
              numOfVisibleSecondaryActions={0}
            />
          ),
        },
      ]}
    />
  );
}
