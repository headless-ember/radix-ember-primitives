import { setApplication } from '@ember/test-helpers';
import * as QUnit from 'qunit';
import { setup } from 'qunit-dom';
import { start as qunitStart } from 'ember-qunit';

import Application from 'docs-app/app';
import config from 'docs-app/config/environment';

QUnit.config.urlConfig.push({
  id: 'debugA11yAudit',
  label: 'Log a11y violations',
});

export async function start() {
  let response = await fetch('/kolay-manifest/manifest.json');
  let json = await response.json();
  let pages = json.groups[0].list;

  // The accessibility page deliberately
  // has violations for demonstration
  (window as any).__pages__ = pages.filter(
    (page: { path: string }) => !page.path.includes('accessibility')
  );

  setApplication(Application.create(config.APP));

  setup(QUnit.assert);

  qunitStart();
}
