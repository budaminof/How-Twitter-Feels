import React from 'react';
import { expect } from 'chai';
import { mount, shallow } from 'enzyme';
import Tweets from '../../src/components/tweets.js';
import jsdom from 'jsdom';

const doc = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.document = doc;
global.window = doc.defaultView;


describe(<Tweets />, () => {
  const props = {
    tweets: [
      { id_str: '1',
        text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit'
      },
      { id_str: '2',
        text: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo voluptate velit esse cillum dolore eu fugiat nulla pariatur'
      },
      { id_str: '3',
        text: 'Lorem ipsum dolor sit amet, Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. '
      },
      { id_str: '4',
        text: 'Lorem ipsum dolor '
      },
      { id_str: '5',
        text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit,Ut enim ad minim veniam, quis nostrud exercitation'
      },
      { id_str: '6',
        text: 'Lorem ipsum dolor sit amet, consectetur'
      },
      { id_str: '7',
        text: 'Lorem ipsum dolor sit amet, consectetur adipisicing '
      },
      { id_str: '8',
        text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua, labore et dolore magna aliqua'
      },
      { id_str: '9',
        text: 'Lorem ipsum adipisicing elit'
      },
      { id_str: '10',
        text: 'Lorem ipsum dolor sit amet'
      },
      { id_str: '11',
        text: 'Lorem ipsum'
      },
      { id_str: '12',
        text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit'
      },
      { id_str: '13',
        text: 'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua'
      },
      { id_str: '14',
        text: 'Duis aute irure dolor in voluptate velit esse cillum dolore eu fugiat nulla pariatur'
      }
    ]
  }
  const wrapper = mount(
    <Tweets {...props} />
  );

  it('Return the last 10 tweets', () => {
    expect(wrapper.props().tweets.length).to.be.equal(14);
    expect(wrapper.find('ul').children()).to.have.length(10);
  });

});
