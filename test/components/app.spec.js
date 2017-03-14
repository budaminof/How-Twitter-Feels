import React from 'react';
import { expect } from 'chai';
import { mount, shallow } from 'enzyme';
import App from '../src/components/app';

describe(<App />, () => {

  it('calls componentDidMount', () => {
    const wrapper = mount(<App />);
    expect(App.prototype.componentDidMount.calledOnce).to.equal(true);
  });

});
