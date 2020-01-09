const rule = require('../../../lib/rules/lodash-import-format');
const RuleTester = require('eslint').RuleTester;

const ruleTester = new RuleTester({ parserOptions: { ecmaVersion: 2018, sourceType: 'module' } });
const lodashErrorMessage = "Use the explicit import of lodash: `import <name> from 'lodash/<name>';`";
const lodashWildcardErrorMessage = "Import specific modules from lodash; do not use \"import { _ } from 'lodash'\"";
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
    "import first from 'lodash/first';\nimport last from 'lodash/last';",
    "import { first, second, third, fourth, fifth, sixth } from 'lodash';",
    "import { _, first, second, third, fourth, fifth, sixth } from 'lodash';",
    "import { something } from 'somewhere-else';",
  ],
  invalid: [
    {
      code: "import { get } from 'lodash';",
      output: "import get from 'lodash/get';",
      errors: [{ message:  lodashErrorMessage}],
    },
    {
      code: "import { map } from 'lodash';",
      output: "import map from 'lodash/map';",
      errors: [{ message: lodashErrorMessage }],
    },
    {
      code: "import assign from 'lodash';",
      output: "import assign from 'lodash/assign';",
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
    {
      code: "import { get, xor as toggle } from 'lodash';",
      output: "import get from 'lodash/get';\nimport toggle from 'lodash/xor';",
      errors: [{ message: lodashErrorMessage }],
    },
    {
      code: "import { get as g, xor as toggle } from 'lodash';",
      output: "import g from 'lodash/get';\nimport toggle from 'lodash/xor';",
      errors: [{ message: lodashErrorMessage }],
    },
    {
      code: "import { _, get } from 'lodash';",
      errors: [{ message: lodashWildcardErrorMessage }]
    },
    {
      code: "import _ from 'lodash';",
      errors: [{ message: lodashWildcardErrorMessage }]
    },


  ],
});
