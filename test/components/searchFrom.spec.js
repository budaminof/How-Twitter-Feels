import React from 'react';
import { expect } from 'chai';
import { mount, shallow } from 'enzyme';
import SearchForm from '../../src/components/searchForm.js';
import jsdom from 'jsdom';

const doc = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.document = doc;
global.window = doc.defaultView;

describe(<SearchForm />, () => {
  const props = {
    handleSubmit: () => {}
  }
  const wrapper = mount(
    // <SearchForm {...props} />
  );

// look up form validation testing unite with Enzyme.

});
