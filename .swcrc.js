// .swcrc.js

module.exports = {
  module: {
    noInterop: true,
    type: "commonjs",
  },
  jsc: {
    experimental: {
      plugins: [
        [
          "@swc/plugin-relay",
          {
            language: "typescript",
            schema: "data/schema.graphql",
            rootDir: __dirname,
            src: "src",
            artifactDirectory: "src/__generated__",
          },
        ],
      ],
    },
    parser: {
      syntax: "typescript",
      tsx: true,
    },
    transform: {
      react: {
        runtime: "automatic",
      },
    },
  },
};
