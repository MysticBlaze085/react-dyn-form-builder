const withMT = require("@material-tailwind/html/utils/withMT");

module.exports = withMT({
  content: ['src/**/!(*.stories|*.spec).{ts,html}', 'projects/ng-lib/src/**/!(*.stories|*.spec).{ts,html}'],
  theme: {
    extend: {},
  },
  plugins: [],
});
