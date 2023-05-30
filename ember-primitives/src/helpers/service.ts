import Helper from '@ember/component/helper';
import { assert } from '@ember/debug';
import { getOwner } from '@ember/owner';

import type { Registry } from '@ember/service';
import type Service from '@ember/service';

interface Signature<Key extends keyof Registry> {
  Args: {
    Positional: [Key];
  };
  Return: Registry[Key] & Service;
}

export default class GetService<Key extends keyof Registry> extends Helper<Signature<Key>> {
  compute([name]: [Key]): Registry[Key] & Service {
    let owner = getOwner(this);

    assert(`Could not get owner.`, owner);

    return owner.lookup(`service:${name}`);
  }
}

export const service = GetService;
