import React from 'react';

const DATA_SOURCE = `(searchQuery, offset, limit) =>
new Promise(resolve =>
  setTimeout(() => {
    const items = Array(50)
      .fill(0)
      .map((_, i) => ({
        id: i,
        title: \`Title \${i}\`,
        subtitle: \`Subtitle \${i}\`,
        extraText: \`Extra Text \${i}\`,
        disabled: !(i % 2),
        image: (
          <img
            width="100%"
            height="100%"
            src="http://via.placeholder.com/100x100"
          />
        ),
      }));

    const filtered = items.filter(({ title }) =>
      title.toLowerCase().startsWith(searchQuery.toLowerCase()),
    );

    resolve({
      items: filtered.slice(offset, offset + limit),
      totalCount: filtered.length,
    });
  }, 2000),
)`;

export const single = `
() => {
  const DATA_SOURCE = ${DATA_SOURCE};
  return (
    <SelectorList
      height="540px"
      itemsPerPage={4}
      searchDebounceMs={150}
      dataSource={DATA_SOURCE}
    />
  );
};
`;

export const multi = `
() => {
  const DATA_SOURCE = ${DATA_SOURCE};
  return (
    <SelectorList
      multiple
      height="540px"
      itemsPerPage={4}
      searchDebounceMs={150}
      dataSource={DATA_SOURCE}
    />
  );
};
`;

export const modal = `
() => {
  const [itemsAmount, setItemsAmount] = React.useState(0);
  const [selectedItems, setSelectedItems] = React.useState([]);
  const DATA_SOURCE = (searchQuery, offset, limit) =>
  new Promise(resolve =>
    setTimeout(() => {
      const items = Array(50)
        .fill(0)
        .map((_, i) => ({
          id: i,
          title: \`Title \${i}\`,
          subtitle: \`Subtitle \${i}\`,
          extraText: \`Extra Text \${i}\`,
          disabled: !(i % 2),
          image: (
            <img
              width="100%"
              height="100%"
              src="http://via.placeholder.com/100x100"
            />
          ),
        }));

      const filtered = items.filter(({ title }) =>
        title.toLowerCase().startsWith(searchQuery.toLowerCase()),
      );

      setItemsAmount(filtered.length);

      resolve({
        items: filtered.slice(offset, offset + limit),
        totalCount: filtered.length,
      });
    }, 2000),
  );
  return (
    <CustomModalLayout
        width="600px"
        primaryButtonText="Select"
        secondaryButtonText="Cancel"
        onCloseButtonClick={() => {}}
        title="Choose Your Items"
        sideActions={<Checkbox>Select All ({itemsAmount})</Checkbox>}
        removeContentPadding
      >

      <SelectorList
        multiple
        itemsPerPage={4}
        searchDebounceMs={150}
        dataSource={DATA_SOURCE}
        selectedItems={selectedItems}
        onSelect={selectedItem => setSelectedItems(items => {
          const itemIsSelected = items.includes(selectedItem);
          if (itemIsSelected) {
            return items.filter(item => item !== selectedItem);
          }
          return [...items, selectedItem];
        })}
      />
      </CustomModalLayout>
  );
};
`;
