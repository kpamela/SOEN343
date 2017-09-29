import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
Enzyme.configure({ adapter: new Adapter() });
import LoginModal from '../js/NavBar/LoginModal.js';


it('Login modal opens', () => {
  const wrapper = mount(<LoginModal />);
  expect(wrapper.find(Modal)).to.have.length(1);
});

