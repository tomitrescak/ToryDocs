import * as React from 'react';
import { ToryEditor, themes } from '@toryjs/editor';

import { merge, LocalStorage } from '@toryjs/ui';

import { catalogue as apc } from '@toryjs/components-apollo';
import { catalogueEditor as apce } from '@toryjs/components-apollo';
import { catalogue as vac } from '@toryjs/components-vanilla';
import { catalogueEditor as vace } from '@toryjs/components-vanilla';
import { catalogue as sec } from '@toryjs/components-semantic-ui';
import { catalogueEditor as sece } from '@toryjs/components-semantic-ui';
import { catalogue as rac } from '@toryjs/components-react-alert';
import { catalogueEditor as race } from '@toryjs/components-react-alert';
import { catalogue as rrc } from '@toryjs/components-react-router';
import { catalogueEditor as rrce } from '@toryjs/components-react-router';

const catalogue = merge(apc, vac, sec, rac, rrc);
const catalogueEditor = merge(apce, vace, sece, race, rrce);
const storage = new LocalStorage('tory_storage');

export const Editor = props => (
  <ToryEditor
    componentCatalogue={catalogue}
    editorCatalogue={catalogueEditor}
    storage={storage}
    handlers={{}}
    theme={themes.dark}
  />
);
