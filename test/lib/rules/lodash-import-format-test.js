const rule = require('../../../lib/rules/lodash-import-format');
const RuleTester = require('eslint').RuleTester;

const ruleTester = new RuleTester({ parserOptions: { ecmaVersion: 2018, sourceType: 'module' } });
const lodashErrorMessage = "Use the explicit import of lodash: `import <name> from 'lodash/<name>';`";
const goodFirst = "import first from 'lodash/first';";
const goodSecond = "import second from 'lodash/second';";
const goodThird = "import third from 'lodash/third';";
const goodFourth = "import fourth from 'lodash/fourth';";
const goodFifth = "import fifth from 'lodash/fifth';";

ruleTester.run('lodash-import-format', rule, {
  valid: [
    "import get from 'lodash/get'",
    "import map from 'lodash/map'",
    "import first from 'lodash/first'",
    "import first from 'lodash/first';\nimport last from 'lodash/last';"
  ],
  invalid: [
    {
      code: "import { get } from 'lodash';",
      errors: [{ message:  lodashErrorMessage}],
    },
    {
      code: "import { map } from 'lodash';",
      errors: [{ message: lodashErrorMessage }],
    },
    {
      code: "import { first } from 'lodash';",
      errors: [{ message: lodashErrorMessage }],
    },
    {
      code: "import { last } from 'lodash';",
      output: "import last from 'lodash/last';",
      errors: [{ message: lodashErrorMessage }],
    },
    {
      code: "import { first, second } from 'lodash';",
      output: goodFirst + "\n" + goodSecond,
      errors: [{ message: lodashErrorMessage }],
    },
    {
      code: "import { first, second, third } from 'lodash';",
      output: goodFirst + "\n" + goodSecond + "\n" + goodThird,
      errors: [{ message: lodashErrorMessage }],
    },
    {
      code: "import { first, second, third, fourth } from 'lodash';",
      output: goodFirst + "\n" + goodSecond + "\n" + goodThird + "\n" + goodFourth,
      errors: [{ message: lodashErrorMessage }],
    },
    {
      code: "import { first, second, third, fourth, fifth } from 'lodash';",
      output: goodFirst + "\n" + goodSecond + "\n" + goodThird + "\n" + goodFourth + "\n" + goodFifth,
      errors: [{ message: lodashErrorMessage }],
    },
  ],
});
