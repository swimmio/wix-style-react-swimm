# Component structure

Component consists of multiple files. The following structure is the basic structure for a component.

## Component Files

```
src/ComponentName
├── index.js                                # entry file for component
├── index.d.ts                              # type definition for the component
├── ComponentName.js                        # component implementation
├── ComponentName.st.css                    # component stylesheet
├── test
│   ├── ComponentName.uni.driver.js         # public testkit based on unidriver
│   ├── ComponentName.uni.driver.d.ts       # type definition for the driver
│   ├── ComponentName.private.uni.driver.js # optional private testkit
│   ├── ComponentName.spec.js               # unit tests
│   ├── ComponentName.visual.js             # visual screenshot tests
│   ├── ComponentName.tsx                   # sanity test for the typescript types
│   └── storySettings.js                    # optional file for reusable test story data
└── docs
    ├── index.story.js                      # entry file for documentation
```

## Main files explanation and guides


### `ComponentName.js`

1. Component implementation. It can either be an atom or composition of other components.
1. Read [Component Guidelines section](./COMPONENT_GUIDELINES.md) for more information.

### `ComponentName.st.css`

1. Components stylesheets powered by Stylable.
1. Read [Styling section](./STYLING.md) for more information.

### `ComponentName.spec.js`

1. Unit tests of component behavior and methods.
1. Read [Tests section](./TESTING.md) for more information.

### `ComponentName.uni.driver.js`

1. Every component exposes a public driver to interact with it in tests (`ComponentName.spec.js`).
1. Read [Test Drivers section](./TEST_DRIVERS_GUIDELINES.md) for more information.

### `ComponentName.visual.js`

1. Component styles and variations are tested with visual in mind. This file contains visual simulations as storybook stories.
1. Read [Visual Testing](./VISUAL_TESTING.md.md) for more information.

### `docs/index.story.js`

1. Entry file for documentation. It uses `.story` convention in order to apply automated documentation tool.
1. Read [Component Documentation section](./DOCUMENTING_COMPONENTS.md) for more information.
