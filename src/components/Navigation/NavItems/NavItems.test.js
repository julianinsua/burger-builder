import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import NavItems from "./NavItems";
import NavItem from "../Navitem/NavItem";

configure({ adapter: new Adapter() });

describe("<NavigationItems />", () => {
	let wrapper;
	beforeEach(() => {
		wrapper = shallow(<NavItems />);
	});

	it("should render 2 <NavItem /> if not authenticated", () => {
		expect(wrapper.find(NavItem)).toHaveLength(2);
	});

	it("should render 3 <NavItem /> if authenticated", () => {
		// wrapper = shallow(<NavItems isAuth />);
		wrapper.setProps({ isAuth: true });
		expect(wrapper.find(NavItem)).toHaveLength(3);
	});
});
