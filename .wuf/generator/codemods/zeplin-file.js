module.exports = (file, api, options) => {
  const j = api.jscodeshift;
  const root = j(file.source);

  const { ComponentName } = options;

  j(exports[exports.length - 1]).insertAfter(
    `{
        "name": "${ComponentName}",
        "path": "src/${ComponentName}/${ComponentName}.js",
        "zeplinNames": []
        },
    `,
  );

  return root.toSource();
};
