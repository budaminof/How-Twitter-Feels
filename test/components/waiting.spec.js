import React from 'react';
import { expect } from 'chai';
import { mount, shallow } from 'enzyme';
import Waiting from '../../src/components/waiting.js';
import WaitingForSearch from '../../src/components/WaitingForSearch.js';
import jsdom from 'jsdom';

const doc = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.document = doc;
global.window = doc.defaultView;

describe(<Waiting />, () => {
  const props = {
    show: true,
    error: false
  }
  const wrapper = mount(
    <Waiting {...props} />
  );

  it('Waiting component has props', () => {
    expect(wrapper.props().show).to.be.equal(true);
    expect(wrapper.props().error).to.be.equal(false);
  });

});

describe(<WaitingForSearch />, () => {
  const wrapper = mount(<WaitingForSearch />);
  it('Waiting for search component is defined', () => {
    expect(wrapper.children.length).to.be.equal(1);
  })
})
