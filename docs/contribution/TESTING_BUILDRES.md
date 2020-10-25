
1. Import the testkit as described under `Testing` section.
```js
import { ListItemSelectTestkit } from 'wix-style-react/dist/testkit';
```

2. Render the desired builder within the `<DropdownLayout/>`. Don't forget to provide `dataHook` and `id`.
```js
      const dataHook = 'select-builder';
      const title = 'section title';

      const options = [
        listItemSelectBuilder({
          id: 0,
          title,
          dataHook,
        }),
      ];

      const { driver } = render(<DropdownLayout visible options={options} />);
```

3. Use the `getOptionElementById` driver method of the `DropdownLayout` driver to get the option native element:
```js
const wrapper = await driver.getOptionElementById(0);
```
4. Initialize the suitable testkit:
```js
const testkit = ListItemSelectTestkit({ wrapper, dataHook });
```

5. Use the desired testkit method:
```js
const listItemSelectTitle = await testkit.getTitle();
```
