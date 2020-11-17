import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import NavItems from "./NavItems";
import NavItem from "../Navitem/NavItem";

configure({ adapter: new Adapter() });

describe("<NavigationItems />", () => {
	it("should render 2 <NavItem /> if not authenticated", () => {
		const wrapper = shallow(<NavItems />);
		expect(wrapper.find(<NavItem />));
	});
});
