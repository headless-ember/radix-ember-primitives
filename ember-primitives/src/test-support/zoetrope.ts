/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { click } from '@ember/test-helpers';

export class ZoetropeHelper {
  parentSelector = '.ember-primitives__zoetrope';

  constructor(parentSelector?: string) {
    if (parentSelector) {
      this.parentSelector = parentSelector;
    }
  }

  async scrollLeft() {
    await click(`${this.parentSelector} .ember-primitives__zoetrope__controls button:first-child`);
  }

  async scrollRight() {
    await click(`${this.parentSelector} .ember-primitives__zoetrope__controls button:last-child`);
  }

  visibleItems() {
    const zoetropeContent = document.querySelectorAll(
      `${this.parentSelector} .ember-primitives__zoetrope__scroller > *`
    );

    let firstFullyVisibleItemIndex = -1;
    let lastFullyVisibleItemIndex = -1;

    for (let i = 0; i < zoetropeContent.length; i++) {
      const item = zoetropeContent[i]!;
      const rect = item.getBoundingClientRect();
      const parentRect = item.parentElement!.getBoundingClientRect();

      if (rect.right >= parentRect?.left && rect.left <= parentRect?.right) {
        if (firstFullyVisibleItemIndex === -1) {
          firstFullyVisibleItemIndex = i;
        }

        lastFullyVisibleItemIndex = i;
      } else if (firstFullyVisibleItemIndex !== -1) {
        break;
      }
    }

    return Array.from(zoetropeContent).slice(
      firstFullyVisibleItemIndex,
      lastFullyVisibleItemIndex + 1
    );
  }

  visibleItemCount() {
    return this.visibleItems().length;
  }
}
