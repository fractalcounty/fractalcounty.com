Title: prompts

URL Source: https://www.npmjs.com/package/prompts#-types

❯ Prompts
---------

**Lightweight, beautiful and user-friendly interactive prompts**  
\>\_ Easy to use CLI prompts to enquire users for information▌

*   **Simple**: prompts has [no big dependencies](http://npm.anvaka.com/#/view/2d/prompts) nor is it broken into a [dozen](http://npm.anvaka.com/#/view/2d/inquirer) tiny modules that only work well together.
*   **User friendly**: prompt uses layout and colors to create beautiful cli interfaces.
*   **Promised**: uses promises and `async`/`await`. No callback hell.
*   **Flexible**: all prompts are independent and can be used on their own.
*   **Testable**: provides a way to submit answers programmatically.
*   **Unified**: consistent experience across all [prompts](https://www.npmjs.com/package/prompts#-types).

❯ Usage
-------

const prompts \= require('prompts');

(async () \=\> {
  const response \= await prompts({
    type: 'number',
    name: 'value',
    message: 'How old are you?',
    validate: value \=\> value < 18 ? \`Nightclub is 18+ only\` : true
  });

  console.log(response); // =\> { value: 24 }
})();

> See [`example.js`](https://github.com/terkelg/prompts/blob/master/example.js) for more options.

[![Image 8: split](https://github.com/terkelg/prompts/raw/master/media/split.png)](https://github.com/terkelg/prompts/raw/master/media/split.png)

❯ Examples
----------

### Single Prompt

Prompt with a single prompt object. Returns an object with the response.

const prompts \= require('prompts');

(async () \=\> {
  const response \= await prompts({
    type: 'text',
    name: 'meaning',
    message: 'What is the meaning of life?'
  });

  console.log(response.meaning);
})();

### Prompt Chain

Prompt with a list of prompt objects. Returns an object with the responses. Make sure to give each prompt a unique `name` property to prevent overwriting values.

const prompts \= require('prompts');

const questions \= \[
  {
    type: 'text',
    name: 'username',
    message: 'What is your GitHub username?'
  },
  {
    type: 'number',
    name: 'age',
    message: 'How old are you?'
  },
  {
    type: 'text',
    name: 'about',
    message: 'Tell something about yourself',
    initial: 'Why should I?'
  }
\];

(async () \=\> {
  const response \= await prompts(questions);

  // =\> response =\> { username, age, about }
})();

### Dynamic Prompts

Prompt properties can be functions too. Prompt Objects with `type` set to `falsy` values are skipped.

const prompts \= require('prompts');

const questions \= \[
  {
    type: 'text',
    name: 'dish',
    message: 'Do you like pizza?'
  },
  {
    type: prev \=\> prev \== 'pizza' ? 'text' : null,
    name: 'topping',
    message: 'Name a topping'
  }
\];

(async () \=\> {
  const response \= await prompts(questions);
})();

[![Image 9: split](https://github.com/terkelg/prompts/raw/master/media/split.png)](https://github.com/terkelg/prompts/raw/master/media/split.png)

❯ API
-----

### prompts(prompts, options)

Type: `Function`  
Returns: `Object`

Prompter function which takes your [prompt objects](https://www.npmjs.com/package/prompts#-prompt-objects) and returns an object with responses.

#### prompts

Type: `Array|Object`

Array of [prompt objects](https://www.npmjs.com/package/prompts#-prompt-objects). These are the questions the user will be prompted. You can see the list of supported [prompt types here](https://www.npmjs.com/package/prompts#-types).

Prompts can be submitted (return, enter) or canceled (esc, abort, ctrl+c, ctrl+d). No property is being defined on the returned response object when a prompt is canceled.

#### options.onSubmit

Type: `Function`  
Default: `() => {}`

Callback that's invoked after each prompt submission. Its signature is `(prompt, answer, answers)` where `prompt` is the current prompt object, `answer` the user answer to the current question and `answers` the user answers so far. Async functions are supported.

Return `true` to quit the prompt chain and return all collected responses so far, otherwise continue to iterate prompt objects.

**Example:**

(async () \=\> {
  const questions \= \[{ ... }\];
  const onSubmit \= (prompt, answer) \=\> console.log(\`Thanks I got ${answer} from ${prompt.name}\`);
  const response \= await prompts(questions, { onSubmit });
})();

#### options.onCancel

Type: `Function`  
Default: `() => {}`

Callback that's invoked when the user cancels/exits the prompt. Its signature is `(prompt, answers)` where `prompt` is the current prompt object and `answers` the user answers so far. Async functions are supported.

Return `true` to continue and prevent the prompt loop from aborting. On cancel responses collected so far are returned.

**Example:**

(async () \=\> {
  const questions \= \[{ ... }\];
  const onCancel \= prompt \=\> {
    console.log('Never stop prompting!');
    return true;
  }
  const response \= await prompts(questions, { onCancel });
})();

### override

Type: `Function`

Preanswer questions by passing an object with answers to `prompts.override`. Powerful when combined with arguments of process.

**Example**

const prompts \= require('prompts');
prompts.override(require('yargs').argv);

(async () \=\> {
  const response \= await prompts(\[
    {
      type: 'text',
      name: 'twitter',
      message: \`What's your twitter handle?\`
    },
    {
      type: 'multiselect',
      name: 'color',
      message: 'Pick colors',
      choices: \[
        { title: 'Red', value: '#ff0000' },
        { title: 'Green', value: '#00ff00' },
        { title: 'Blue', value: '#0000ff' }
      \],
    }
  \]);

  console.log(response);
})();

### inject(values)

Type: `Function`

Programmatically inject responses. This enables you to prepare the responses ahead of time. If any injected value is found the prompt is immediately resolved with the injected value. This feature is intended for testing only.

#### values

Type: `Array`

Array with values to inject. Resolved values are removed from the internal inject array. Each value can be an array of values in order to provide answers for a question asked multiple times. If a value is an instance of `Error` it will simulate the user cancelling/exiting the prompt.

**Example:**

const prompts \= require('prompts');

prompts.inject(\[ '@terkelg', \['#ff0000', '#0000ff'\] \]);

(async () \=\> {
  const response \= await prompts(\[
    {
      type: 'text',
      name: 'twitter',
      message: \`What's your twitter handle?\`
    },
    {
      type: 'multiselect',
      name: 'color',
      message: 'Pick colors',
      choices: \[
        { title: 'Red', value: '#ff0000' },
        { title: 'Green', value: '#00ff00' },
        { title: 'Blue', value: '#0000ff' }
      \],
    }
  \]);

  // =\> { twitter: 'terkelg', color: \[ '#ff0000', '#0000ff' \] }
})();

[![Image 10: split](https://github.com/terkelg/prompts/raw/master/media/split.png)](https://github.com/terkelg/prompts/raw/master/media/split.png)

❯ Prompt Objects
----------------

Prompts Objects are JavaScript objects that define the "questions" and the [type of prompt](https://www.npmjs.com/package/prompts#-types). Almost all prompt objects have the following properties:

{
  type: String | Function,
  name: String | Function,
  message: String | Function,
  initial: String | Function | Async Function
  format: Function | Async Function,
  onRender: Function
  onState: Function
  stdin: Readable
  stdout: Writeable
}

Each property be of type `function` and will be invoked right before prompting the user.

The function signature is `(prev, values, prompt)`, where `prev` is the value from the previous prompt, `values` is the response object with all values collected so far and `prompt` is the previous prompt object.

**Function example:**

{
  type: prev \=\> prev \> 3 ? 'confirm' : null,
  name: 'confirm',
  message: (prev, values) \=\> \`Please confirm that you eat ${values.dish} times ${prev} a day?\`
}

The above prompt will be skipped if the value of the previous prompt is less than 3.

### type

Type: `String|Function`

Defines the type of prompt to display. See the list of [prompt types](https://www.npmjs.com/package/prompts#-types) for valid values.

If `type` is a falsy value the prompter will skip that question.

{
  type: null,
  name: 'forgetme',
  message: \`I'll never be shown anyway\`,
}

### name

Type: `String|Function`

The response will be saved under this key/property in the returned response object. In case you have multiple prompts with the same name only the latest response will be stored.

> Make sure to give prompts unique names if you don't want to overwrite previous values.

### message

Type: `String|Function`

The message to be displayed to the user.

### initial

Type: `String|Function`

Optional default prompt value. Async functions are supported too.

### format

Type: `Function`

Receive the user input and return the formatted value to be used inside the program. The value returned will be added to the response object.

The function signature is `(val, values)`, where `val` is the value from the current prompt and `values` is the current response object in case you need to format based on previous responses.

**Example:**

{
  type: 'number',
  name: 'price',
  message: 'Enter price',
  format: val \=\> Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD' }).format(val);
}

### onRender

Type: `Function`

Callback for when the prompt is rendered. The function receives [kleur](https://github.com/lukeed/kleur) as its first argument and `this` refers to the current prompt.

**Example:**

{
  type: 'number',
  message: 'This message will be overridden',
  onRender(kleur) {
    this.msg \= kleur.cyan('Enter a number');
  }
}

### onState

Type: `Function`

Callback for when the state of the current prompt changes. The function signature is `(state)` where `state` is an object with a snapshot of the current state. The state object has two properties `value` and `aborted`. E.g `{ value: 'This is ', aborted: false }`

### stdin and stdout

Type: `Stream`

By default, prompts uses `process.stdin` for receiving input and `process.stdout` for writing output. If you need to use different streams, for instance `process.stderr`, you can set these with the `stdin` and `stdout` properties.

[![Image 11: split](https://github.com/terkelg/prompts/raw/master/media/split.png)](https://github.com/terkelg/prompts/raw/master/media/split.png)

❯ Types
-------

*   [text](https://www.npmjs.com/package/prompts#textmessage-initial-style)
*   [password](https://www.npmjs.com/package/prompts#passwordmessage-initial)
*   [invisible](https://www.npmjs.com/package/prompts#invisiblemessage-initial)
*   [number](https://www.npmjs.com/package/prompts#numbermessage-initial-max-min-style)
*   [confirm](https://www.npmjs.com/package/prompts#confirmmessage-initial)
*   [list](https://www.npmjs.com/package/prompts#listmessage-initial)
*   [toggle](https://www.npmjs.com/package/prompts#togglemessage-initial-active-inactive)
*   [select](https://www.npmjs.com/package/prompts#selectmessage-choices-initial-hint-warn)
*   [multiselect](https://www.npmjs.com/package/prompts#multiselectmessage-choices-initial-max-hint-warn)
*   [autocompleteMultiselect](https://www.npmjs.com/package/prompts#multiselectmessage-choices-initial-max-hint-warn)
*   [autocomplete](https://www.npmjs.com/package/prompts#autocompletemessage-choices-initial-suggest-limit-style)
*   [date](https://www.npmjs.com/package/prompts#datemessage-initial-warn)

* * *

### text(message, \[initial\], \[style\])

> Text prompt for free text input.

Hit tab to autocomplete to `initial` value when provided.

#### Example

[![Image 12: text prompt](https://github.com/terkelg/prompts/raw/master/media/text.gif)](https://github.com/terkelg/prompts/raw/master/media/text.gif)

{
  type: 'text',
  name: 'value',
  message: \`What's your twitter handle?\`
}

#### Options

| Param | Type | Description |
| --- | --- | --- |
| message | `string` | Prompt message to display |
| initial | `string` | Default string value |
| style | `string` | Render style (`default`, `password`, `invisible`, `emoji`). Defaults to `default` |
| format | `function` | Receive user input. The returned value will be added to the response object |
| validate | `function` | Receive user input. Should return `true` if the value is valid, and an error message `String` otherwise. If `false` is returned, a default error message is shown |
| onRender | `function` | On render callback. Keyword `this` refers to the current prompt |
| onState | `function` | On state change callback. Function signature is an `object` with two properties: `value` and `aborted` |

**↑ back to:** [Prompt types](https://www.npmjs.com/package/prompts#-types)

* * *

### password(message, \[initial\])

> Password prompt with masked input.

This prompt is a similar to a prompt of type `'text'` with `style` set to `'password'`.

#### Example

[![Image 13: password prompt](https://github.com/terkelg/prompts/raw/master/media/password.gif)](https://github.com/terkelg/prompts/raw/master/media/password.gif)

{
  type: 'password',
  name: 'value',
  message: 'Tell me a secret'
}

#### Options

| Param | Type | Description |
| --- | --- | --- |
| message | `string` | Prompt message to display |
| initial | `string` | Default string value |
| format | `function` | Receive user input. The returned value will be added to the response object |
| validate | `function` | Receive user input. Should return `true` if the value is valid, and an error message `String` otherwise. If `false` is returned, a default error message is shown |
| onRender | `function` | On render callback. Keyword `this` refers to the current prompt |
| onState | `function` | On state change callback. Function signature is an `object` with two properties: `value` and `aborted` |

**↑ back to:** [Prompt types](https://www.npmjs.com/package/prompts#-types)

* * *

### invisible(message, \[initial\])

> Prompts user for invisible text input.

This prompt is working like `sudo` where the input is invisible. This prompt is a similar to a prompt of type `'text'` with style set to `'invisible'`.

#### Example

[![Image 14: invisible prompt](https://github.com/terkelg/prompts/raw/master/media/invisible.gif)](https://github.com/terkelg/prompts/raw/master/media/invisible.gif)

{
  type: 'invisible',
  name: 'value',
  message: 'Enter password'
}

#### Options

| Param | Type | Description |
| --- | --- | --- |
| message | `string` | Prompt message to display |
| initial | `string` | Default string value |
| format | `function` | Receive user input. The returned value will be added to the response object |
| validate | `function` | Receive user input. Should return `true` if the value is valid, and an error message `String` otherwise. If `false` is returned, a default error message is shown |
| onRender | `function` | On render callback. Keyword `this` refers to the current prompt |
| onState | `function` | On state change callback. Function signature is an `object` with two properties: `value` and `aborted` |

**↑ back to:** [Prompt types](https://www.npmjs.com/package/prompts#-types)

* * *

### number(message, initial, \[max\], \[min\], \[style\])

> Prompts user for number input.

You can type in numbers and use up/down to increase/decrease the value. Only numbers are allowed as input. Hit tab to autocomplete to `initial` value when provided.

#### Example

[![Image 15: number prompt](https://github.com/terkelg/prompts/raw/master/media/number.gif)](https://github.com/terkelg/prompts/raw/master/media/number.gif)

{
  type: 'number',
  name: 'value',
  message: 'How old are you?',
  initial: 0,
  style: 'default',
  min: 2,
  max: 10
}

#### Options

| Param | Type | Description |
| --- | --- | --- |
| message | `string` | Prompt message to display |
| initial | `number` | Default number value |
| format | `function` | Receive user input. The returned value will be added to the response object |
| validate | `function` | Receive user input. Should return `true` if the value is valid, and an error message `String` otherwise. If `false` is returned, a default error message is shown |
| max | `number` | Max value. Defaults to `Infinity` |
| min | `number` | Min value. Defaults to `-infinity` |
| float | `boolean` | Allow floating point inputs. Defaults to `false` |
| round | `number` | Round `float` values to x decimals. Defaults to `2` |
| increment | `number` | Increment step when using arrow keys. Defaults to `1` |
| style | `string` | Render style (`default`, `password`, `invisible`, `emoji`). Defaults to `default` |
| onRender | `function` | On render callback. Keyword `this` refers to the current prompt |
| onState | `function` | On state change callback. Function signature is an `object` with two properties: `value` and `aborted` |

**↑ back to:** [Prompt types](https://www.npmjs.com/package/prompts#-types)

* * *

### confirm(message, \[initial\])

> Classic yes/no prompt.

Hit y or n to confirm/reject.

#### Example

[![Image 16: confirm prompt](https://github.com/terkelg/prompts/raw/master/media/confirm.gif)](https://github.com/terkelg/prompts/raw/master/media/confirm.gif)

{
  type: 'confirm',
  name: 'value',
  message: 'Can you confirm?',
  initial: true
}

#### Options

| Param | Type | Description |
| --- | --- | --- |
| message | `string` | Prompt message to display |
| initial | `boolean` | Default value. Default is `false` |
| format | `function` | Receive user input. The returned value will be added to the response object |
| onRender | `function` | On render callback. Keyword `this` refers to the current prompt |
| onState | `function` | On state change callback. Function signature is an `object` with two properties: `value` and `aborted` |

**↑ back to:** [Prompt types](https://www.npmjs.com/package/prompts#-types)

* * *

### list(message, \[initial\])

> List prompt that return an array.

Similar to the `text` prompt, but the output is an `Array` containing the string separated by `separator`.

{
  type: 'list',
  name: 'value',
  message: 'Enter keywords',
  initial: '',
  separator: ','
}

[![Image 17: list prompt](https://github.com/terkelg/prompts/raw/master/media/list.gif)](https://github.com/terkelg/prompts/raw/master/media/list.gif)

| Param | Type | Description |
| --- | --- | --- |
| message | `string` | Prompt message to display |
| initial | `boolean` | Default value |
| format | `function` | Receive user input. The returned value will be added to the response object |
| separator | `string` | String separator. Will trim all white-spaces from start and end of string. Defaults to `','` |
| onRender | `function` | On render callback. Keyword `this` refers to the current prompt |
| onState | `function` | On state change callback. Function signature is an `object` with two properties: `value` and `aborted` |

**↑ back to:** [Prompt types](https://www.npmjs.com/package/prompts#-types)

* * *

### toggle(message, \[initial\], \[active\], \[inactive\])

> Interactive toggle/switch prompt.

Use tab or arrow keys/tab/space to switch between options.

#### Example

[![Image 18: toggle prompt](https://github.com/terkelg/prompts/raw/master/media/toggle.gif)](https://github.com/terkelg/prompts/raw/master/media/toggle.gif)

{
  type: 'toggle',
  name: 'value',
  message: 'Can you confirm?',
  initial: true,
  active: 'yes',
  inactive: 'no'
}

#### Options

| Param | Type | Description |
| --- | --- | --- |
| message | `string` | Prompt message to display |
| initial | `boolean` | Default value. Defaults to `false` |
| format | `function` | Receive user input. The returned value will be added to the response object |
| active | `string` | Text for `active` state. Defaults to `'on'` |
| inactive | `string` | Text for `inactive` state. Defaults to `'off'` |
| onRender | `function` | On render callback. Keyword `this` refers to the current prompt |
| onState | `function` | On state change callback. Function signature is an `object` with two properties: `value` and `aborted` |

**↑ back to:** [Prompt types](https://www.npmjs.com/package/prompts#-types)

* * *

### select(message, choices, \[initial\], \[hint\], \[warn\])

> Interactive select prompt.

Use up/down to navigate. Use tab to cycle the list.

#### Example

[![Image 19: select prompt](https://github.com/terkelg/prompts/raw/master/media/select.gif)](https://github.com/terkelg/prompts/raw/master/media/select.gif)

{
  type: 'select',
  name: 'value',
  message: 'Pick a color',
  choices: \[
    { title: 'Red', description: 'This option has a description', value: '#ff0000' },
    { title: 'Green', value: '#00ff00', disabled: true },
    { title: 'Blue', value: '#0000ff' }
  \],
  initial: 1
}

#### Options

| Param | Type | Description |
| --- | --- | --- |
| message | `string` | Prompt message to display |
| initial | `number` | Index of default value |
| format | `function` | Receive user input. The returned value will be added to the response object |
| hint | `string` | Hint to display to the user |
| warn | `string` | Message to display when selecting a disabled option |
| choices | `Array` | Array of strings or choices objects `[{ title, description, value, disabled }, ...]`. The choice's index in the array will be used as its value if it is not specified. |
| onRender | `function` | On render callback. Keyword `this` refers to the current prompt |
| onState | `function` | On state change callback. Function signature is an `object` with two properties: `value` and `aborted` |

**↑ back to:** [Prompt types](https://www.npmjs.com/package/prompts#-types)

* * *

### multiselect(message, choices, \[initial\], \[max\], \[hint\], \[warn\])

### autocompleteMultiselect(same)

> Interactive multi-select prompt.  
> Autocomplete is a searchable multiselect prompt with the same options. Useful for long lists.

Use space to toggle select/unselect and up/down to navigate. Use tab to cycle the list. You can also use right to select and left to deselect. By default this prompt returns an `array` containing the **values** of the selected items - not their display title.

#### Example

[![Image 20: multiselect prompt](https://github.com/terkelg/prompts/raw/master/media/multiselect.gif)](https://github.com/terkelg/prompts/raw/master/media/multiselect.gif)

{
  type: 'multiselect',
  name: 'value',
  message: 'Pick colors',
  choices: \[
    { title: 'Red', value: '#ff0000' },
    { title: 'Green', value: '#00ff00', disabled: true },
    { title: 'Blue', value: '#0000ff', selected: true }
  \],
  max: 2,
  hint: '- Space to select. Return to submit'
}

#### Options

| Param | Type | Description |
| --- | --- | --- |
| message | `string` | Prompt message to display |
| format | `function` | Receive user input. The returned value will be added to the response object |
| instructions | `string` or `boolean` | Prompt instructions to display |
| choices | `Array` | Array of strings or choices objects `[{ title, value, disabled }, ...]`. The choice's index in the array will be used as its value if it is not specified. |
| optionsPerPage | `number` | Number of options displayed per page (default: 10) |
| min | `number` | Min select - will display error |
| max | `number` | Max select |
| hint | `string` | Hint to display to the user |
| warn | `string` | Message to display when selecting a disabled option |
| onRender | `function` | On render callback. Keyword `this` refers to the current prompt |
| onState | `function` | On state change callback. Function signature is an `object` with two properties: `value` and `aborted` |

This is one of the few prompts that don't take a initial value. If you want to predefine selected values, give the choice object an `selected` property of `true`.

**↑ back to:** [Prompt types](https://www.npmjs.com/package/prompts#-types)

* * *

### autocomplete(message, choices, \[initial\], \[suggest\], \[limit\], \[style\])

> Interactive auto complete prompt.

The prompt will list options based on user input. Type to filter the list. Use ⇧/⇩ to navigate. Use tab to cycle the result. Use Page Up/Page Down (on Mac: fn + ⇧ / ⇩) to change page. Hit enter to select the highlighted item below the prompt.

The default suggests function is sorting based on the `title` property of the choices. You can overwrite how choices are being filtered by passing your own suggest function.

#### Example

[![Image 21: auto complete prompt](https://github.com/terkelg/prompts/raw/master/media/autocomplete.gif)](https://github.com/terkelg/prompts/raw/master/media/autocomplete.gif)

{
  type: 'autocomplete',
  name: 'value',
  message: 'Pick your favorite actor',
  choices: \[
    { title: 'Cage' },
    { title: 'Clooney', value: 'silver-fox' },
    { title: 'Gyllenhaal' },
    { title: 'Gibson' },
    { title: 'Grant' }
  \]
}

#### Options

| Param | Type | Description |
| --- | --- | --- |
| message | `string` | Prompt message to display |
| format | `function` | Receive user input. The returned value will be added to the response object |
| choices | `Array` | Array of auto-complete choices objects `[{ title, value }, ...]` |
| suggest | `function` | Filter function. Defaults to sort by `title` property. `suggest` should always return a promise. Filters using `title` by default |
| limit | `number` | Max number of results to show. Defaults to `10` |
| style | `string` | Render style (`default`, `password`, `invisible`, `emoji`). Defaults to `'default'` |
| initial | `string | number` | Default initial value |
| clearFirst | `boolean` | The first ESCAPE keypress will clear the input |
| fallback | `string` | Fallback message when no match is found. Defaults to `initial` value if provided |
| onRender | `function` | On render callback. Keyword `this` refers to the current prompt |
| onState | `function` | On state change callback. Function signature is an `object` with three properties: `value`, `aborted` and `exited` |

Example on what a `suggest` function might look like:

const suggestByTitle \= (input, choices) \=\>
    Promise.resolve(choices.filter(i \=\> i.title.slice(0, input.length) \=== input))

**↑ back to:** [Prompt types](https://www.npmjs.com/package/prompts#-types)

* * *

### date(message, \[initial\], \[warn\])

> Interactive date prompt.

Use left/right/tab to navigate. Use up/down to change date.

#### Example

[![Image 22: date prompt](https://github.com/terkelg/prompts/raw/master/media/date.gif)](https://github.com/terkelg/prompts/raw/master/media/date.gif)

{
  type: 'date',
  name: 'value',
  message: 'Pick a date',
  initial: new Date(1997, 09, 12),
  validate: date \=\> date \> Date.now() ? 'Not in the future' : true
}

#### Options

| Param | Type | Description |
| --- | --- | --- |
| message | `string` | Prompt message to display |
| initial | `date` | Default date |
| locales | `object` | Use to define custom locales. See below for an example. |
| mask | `string` | The format mask of the date. See below for more information.  
Default: `YYYY-MM-DD HH:mm:ss` |
| validate | `function` | Receive user input. Should return `true` if the value is valid, and an error message `String` otherwise. If `false` is returned, a default error message is shown |
| onRender | `function` | On render callback. Keyword `this` refers to the current prompt |
| onState | `function` | On state change callback. Function signature is an `object` with two properties: `value` and `aborted` |

Default locales:

{
  months: \[
    'January', 'February', 'March', 'April',
    'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December'
  \],
  monthsShort: \[
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  \],
  weekdays: \[
    'Sunday', 'Monday', 'Tuesday', 'Wednesday',
    'Thursday', 'Friday', 'Saturday'
  \],
  weekdaysShort: \[
    'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'
  \]
}

> **Formatting**: See full list of formatting options in the [wiki](https://github.com/terkelg/prompts/wiki/Date-Time-Formatting)

[![Image 23: split](https://github.com/terkelg/prompts/raw/master/media/split.png)](https://github.com/terkelg/prompts/raw/master/media/split.png)

**↑ back to:** [Prompt types](https://www.npmjs.com/package/prompts#-types)

* * *

❯ Credit
--------

Many of the prompts are based on the work of [derhuerst](https://github.com/derhuerst).

❯ License
---------

MIT © [Terkel Gjervig](https://terkel.com/)