import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import Toolbar from "./Toolbar";
import NavLink from "../NavigationLink/NavigationLink";

configure({ adapter: new Adapter() });

describe("<Toolbar/>", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Toolbar />);
  });
  it("should render two <NavLink/> elements if not authenticated", () => {
    expect(wrapper.find(NavLink)).toHaveLength(3);
  });
  it("should render two <NavLink/> elements if authenticated", () => {
    wrapper.setProps({ isAuth: true });
    expect(wrapper.find(NavLink)).toHaveLength(4);
  });
  it("should check Logout display if authenticated", () => {
    wrapper.setProps({ isAuth: true });
    expect(
      wrapper.contains(
        <NavLink className="nav-link bg-danger lead" exact={true} to="/logout">
          Logout
        </NavLink>
      )
    ).toEqual(true);
  });
});
