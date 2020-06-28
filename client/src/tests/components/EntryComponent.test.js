import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import {configure, mount} from 'enzyme';
import {Button, Card} from "semantic-ui-react";

import EntryComponent from "../../components/EntryComponent";


configure({adapter: new Adapter()});

describe("EntryComponent", () => {
    let wrapper = null;
    let defaultTestProps = {
        firstName: "FirstName",
        lastName: "LastName",
        phoneNumber: "+125 584 201568"
    };

    afterEach(() => {
        if (wrapper) {
            wrapper.unmount();
            wrapper = null
        }
    });

    it("should render the details of the entry", () => {
        wrapper = mount(<EntryComponent entryData={defaultTestProps} />);
        const entryName = wrapper.find(Card.Header).text();
        const entryPhoneNumber = wrapper.find(Card.Description).text();
        expect(entryName).toMatch("LastName, FirstName");
        expect(entryPhoneNumber).toMatch(" +125 584 201568");
    });
});