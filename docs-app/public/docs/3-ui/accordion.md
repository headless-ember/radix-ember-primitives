# Accordion

An accordion component is an element that organizes content into collapsible sections, enabling users to expand or collapse them for efficient information presentation and navigation.

<Callout>

Before reaching for this component, consider if the [native `<details>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details) is sufficient for your use case.


<details><summary>example of <code>details</code></summary>

Like with the component, `<details>` and `<summary>` can be styled with CSS.

```gjs live preview
// No imports needed!
// Though, as a TODO: for this component, we'll soon have a multi-details 
// management wrapper in case you want only one `<details>` open at a time.

<template>
  <div class="demo">
    <details>
      <summary>the header</summary>

      <span>
        Ember.js is a productive, battle-tested JavaScript framework for building modern web
        applications. It includes everything you need to build rich UIs that work on any device.
      </span>
    </details>

    <details>
      <summary>another header</summary>

      <span>
        Ember.js is a productive, battle-tested JavaScript framework for building modern web
        applications. It includes everything you need to build rich UIs that work on any device.
      </span>
    </details>

    <details>
      <summary>a third header</summary>

      <span>
        Ember.js is a productive, battle-tested JavaScript framework for building modern web
        applications. It includes everything you need to build rich UIs that work on any device.
      </span>
    </details>
  </div>

  <style>
    details {
      position: relative;
      padding-bottom: 1rem;
    }
    summary {
      cursor: pointer;
      margin-bottom: -1rem;
      transition-property: all;
      transition-duration: 150ms;
      transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);

      background: white;
      padding: 0.5rem;
      color: black;
      border: 1px solid;
      border-radius: 0.25rem;
      position: relative;
      z-index: 2;
    }
    details[open] > summary {
      background: #dcdcff; 
      font-weight: bold;
      margin-bottom: 1rem;
    }

    details > span {
      position: relative;
      z-index: 1;
    }

    .demo {
      margin: 1rem; 
      padding: 1rem;
      display: grid;
      gap: 1rem;
    }
  </style>
</template>
```

</details>

</Callout>

## Examples

<details open>
<summary><h3>Bootstrap - Single - Uncontrolled</h3></summary>

```gjs live preview
import { Accordion } from 'ember-primitives';

<template>
  <Accordion class='accordion' @type='single' as |A|>
    <A.Item class='accordion-item' @value='what' as |I|>
      <I.Header class='accordion-header' as |H|>
        <H.Trigger
          aria-expanded='{{I.isExpanded}}'
          class='accordion-button {{unless I.isExpanded "collapsed"}}'
        >What is Ember?</H.Trigger>
      </I.Header>
      <I.Content class='accordion-collapse collapse {{if I.isExpanded "show"}}'>
        <div class='accordion-body'>
          Ember.js is a productive, battle-tested JavaScript framework for building modern web
          applications. It includes everything you need to build rich UIs that work on any device.
        </div>
      </I.Content>
    </A.Item>
    <A.Item class='accordion-item' @value='why' as |I|>
      <I.Header class='accordion-header' as |H|>
        <H.Trigger
          aria-expanded='{{I.isExpanded}}'
          class='accordion-button {{unless I.isExpanded "collapsed"}}'
        >Why should I use Ember?</H.Trigger>
      </I.Header>
      <I.Content class='accordion-collapse collapse {{if I.isExpanded "show"}}'>
        <div class='accordion-body'>
          Use Ember.js for its opinionated structure and extensive ecosystem, which simplify
          development and ensure long-term stability for web applications.
        </div>
      </I.Content>
    </A.Item>
  </Accordion>

  <link
    href='https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css'
    rel='stylesheet'
    crossorigin='anonymous'
  />
</template>
```

</details>

<details>
<summary><h3>Multiple - Uncontrolled</h3></summary>

```gjs live preview
import { Accordion } from 'ember-primitives';

<template>
  <Accordion @type='multiple' as |A|>
    <A.Item @value='what' as |I|>
      <I.Header as |H|>
        <H.Trigger>What is Ember?</H.Trigger>
      </I.Header>
      <I.Content>Ember.js is a productive, battle-tested JavaScript framework for building modern
        web applications. It includes everything you need to build rich UIs that work on any device.</I.Content>
    </A.Item>
    <A.Item @value='why' as |I|>
      <I.Header as |H|>
        <H.Trigger>Why should I use Ember?</H.Trigger>
      </I.Header>
      <I.Content>Use Ember.js for its opinionated structure and extensive ecosystem, which simplify
        development and ensure long-term stability for web applications.</I.Content>
    </A.Item>
  </Accordion>
</template>
```

</details>

<details>
<summary><h3>Single - Controlled - Collapsible</h3></summary>

```gjs live preview
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { Accordion } from 'ember-primitives';

export default class ControlledAccordion extends Component {
  <template>
    <Accordion
      @type='single'
      @collapsible={{true}}
      @value={{this.value}}
      @onValueChange={{this.updateValue}}
      as |A|
    >
      <A.Item @value='what' as |I|>
        <I.Header as |H|>
          <H.Trigger>What is Ember?</H.Trigger>
        </I.Header>
        <I.Content>Ember.js is a productive, battle-tested JavaScript framework for building modern
          web applications. It includes everything you need to build rich UIs that work on any
          device.</I.Content>
      </A.Item>
      <A.Item @value='why' as |I|>
        <I.Header as |H|>
          <H.Trigger>Why should I use Ember?</H.Trigger>
        </I.Header>
        <I.Content>Use Ember.js for its opinionated structure and extensive ecosystem, which
          simplify development and ensure long-term stability for web applications.</I.Content>
      </A.Item>
    </Accordion>
  </template>

  @tracked value = 'what';

  updateValue = (value) => {
    this.value = value;
  };
}
```

</details>

<details>
<summary><h3>Multiple - Controlled</h3></summary>

```gjs live preview
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

import { Accordion } from 'ember-primitives';

export default class ControlledAccordion extends Component {
  <template>
    <Accordion @type='multiple' @value={{this.values}} @onValueChange={{this.updateValues}} as |A|>
      <A.Item @value='what' as |I|>
        <I.Header as |H|>
          <H.Trigger>What is Ember?</H.Trigger>
        </I.Header>
        <I.Content>Ember.js is a productive, battle-tested JavaScript framework for building modern
          web applications. It includes everything you need to build rich UIs that work on any
          device.</I.Content>
      </A.Item>
      <A.Item @value='why' as |I|>
        <I.Header as |H|>
          <H.Trigger>Why should I use Ember?</H.Trigger>
        </I.Header>
        <I.Content>Use Ember.js for its opinionated structure and extensive ecosystem, which
          simplify development and ensure long-term stability for web applications.</I.Content>
      </A.Item>
    </Accordion>
  </template>

  @tracked values = ['what', 'why'];

  updateValues = (values) => {
    this.values = values;
  };
}
```

</details>

## Features

- Full keyboard navigation
- Can be controlled or uncontrolled
- Can expand one or multiple items
- Can be animated


## Anatomy

```js
import { Accordion } from 'ember-primitives';
```

or for non tree-shaking environments:

```js
import { Accordion } from 'ember-primitives/components/accordion';
```

```gjs
import { Accordion } from 'ember-primitives';

<template>
  <Accordion as |A|>
    <A.Item as |I|>
      <I.Header as |H|>
        <H.Trigger>Trigger</H.Trigger>
      </I.Header>
      <I.Content>Content</I.Content>
  </Accordion>
</template>
```

## API Reference

<details>
<summary><h3>Accordion</h3></summary>

```gjs live no-shadow
import { ComponentSignature } from 'kolay';

<template>
  <ComponentSignature 
    @package="ember-primitives" 
    @module='declarations/components/accordion' 
    @name='Accordion' 
  />
</template>
```

### State Attributes

|       key       | description                                  |
| :-------------: | :------------------------------------------- |
| `data-disabled` | Indicates whether the accordion is disabled. |

</details>

<details>
<summary><h3>AccordionItem</h3></summary>

```gjs live no-shadow
import { ComponentSignature } from 'kolay';

<template>
  <ComponentSignature 
    @package="ember-primitives" 
    @module='declarations/components/accordion' 
    @name='AccordionItemExternalSignature' 
  />
</template>
```

### State Attributes

|       key       | description                                                                           |
| :-------------: | :------------------------------------------------------------------------------------ |
|  `data-state`   | "open" or "closed", depending on whether the accordion item is expanded or collapsed. |
| `data-disabled` | Indicates whether the accordion item is disabled.                                     |

</details>

<details>
<summary><h3>AccordionHeader</h3></summary>

```gjs live no-shadow
import { ComponentSignature } from 'kolay';

<template>
  <ComponentSignature 
    @package="ember-primitives" 
    @module='declarations/components/accordion' 
    @name='AccordionHeaderExternalSignature' 
  />
</template>
```

### State Attributes

|       key       | description                                                                           |
| :-------------: | :------------------------------------------------------------------------------------ |
|  `data-state`   | "open" or "closed", depending on whether the accordion item is expanded or collapsed. |
| `data-disabled` | Indicates whether the accordion item is disabled.                                     |

</details>

<details>
<summary><h3>AccordionTrigger</h3></summary>

```gjs live no-shadow
import { ComponentSignature } from 'kolay';

<template>
  <ComponentSignature 
    @package="ember-primitives" 
    @module='declarations/components/accordion' 
    @name='AccordionTriggerExternalSignature' 
  />
</template>
```

### State Attributes

|       key       | description                                                                           |
| :-------------: | :------------------------------------------------------------------------------------ |
|  `data-state`   | "open" or "closed", depending on whether the accordion item is expanded or collapsed. |
| `data-disabled` | Indicates whether the accordion item is disabled.                                     |

</details>

<details>
<summary><h3>AccordionContent</h3></summary>

```gjs live no-shadow
import { ComponentSignature } from 'kolay';

<template>
  <ComponentSignature 
    @package="ember-primitives" 
    @module='declarations/components/accordion' 
    @name='AccordionContentExternalSignature' />
</template>
```

</details>

## Accessibility

- Sets `aria-expanded` on the accordion trigger to indicate whether the accordion item is expanded or collapsed.
- Uses `aria-controls` and `id` to associate the accordion trigger with the accordion content.
- Sets `hidden` on the accordion content when it is collapsed.

## Keyboard Interactions

|                key                | description                                    |
| :-------------------------------: | :--------------------------------------------- |
|          <kbd>Tab</kbd>           | Moves focus to the next focusable element.     |
| <kbd>Shift</kbd> + <kbd>Tab</kbd> | Moves focus to the previous focusable element. |
|         <kbd>Space</kbd>          | Toggles the accordion item.                    |
|         <kbd>Enter</kbd>          | Toggles the accordion item.                    |
