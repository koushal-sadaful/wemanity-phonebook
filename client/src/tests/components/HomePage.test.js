import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import {configure, mount} from 'enzyme';
import {Header, Input, Search} from "semantic-ui-react";
import HomePage from "../../components/HomePage";
import {createTestStore} from "../testStoreFactory";
import axios from "axios";
import {runTheSnapshotTest} from "../testUtils/TestHelpers";

configure({adapter: new Adapter()});
jest.mock('axios');
jest.useFakeTimers()

describe("HomePage", () => {
    let wrapper = null;
    afterEach(() => {
        console.log(wrapper)
        if (wrapper){
            wrapper.unmount()
            wrapper = null
        }

    });

    it("should render a clean search page", () => {
        wrapper = mount(<HomePage store={createTestStore()}/>);

        const pageTitle = wrapper.find(Header).first().props().content;
        expect(pageTitle).toMatch("Wemanity PhoneBook");

        const searchBarProps = wrapper.find(Input).props();
        expect(searchBarProps.placeholder).toMatch("Search phone number...");

    });

    it("should pass the snapshot test", () => {
        runTheSnapshotTest(<HomePage store={createTestStore()}/>)
    });
});