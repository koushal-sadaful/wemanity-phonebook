import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import {configure, mount} from 'enzyme';
import {Card} from "semantic-ui-react";
import allEntries from "./../fakeData/allEntries"
import EntriesComponent from "../../components/EntriesComponent";


configure({adapter: new Adapter()});

describe("EntriesComponent", () => {
    let wrapper = null;

    let defaultTestProps = {
        entries: allEntries.data,
        searchValue: null,
    };

    afterEach(() => {
        if (wrapper) {
            wrapper.unmount();
            wrapper = null
        }
    });

    it("should render all the entries if no search value", () => {
        wrapper = mount(<EntriesComponent {...defaultTestProps}/>);
        const actualNames = wrapper.find(Card.Header).map(it => it.text());
        const expectedNames = [
            "Sax, John",
            "Doe, Jane",
            "Smith, Will",
            "Jacobs, Marc",
        ];
        expect(actualNames).toEqual(expectedNames);
    });

    it("should render only the entries that match the value for last name", () => {
        wrapper = mount(<EntriesComponent entries={allEntries.data} searchValue={"Sax"}/>);
        const actualNames = wrapper.find(Card.Header).map(it => it.text());
        const expectedNames = [
            "Sax, John"
        ];
        expect(actualNames).toEqual(expectedNames);
    });
    it("should render only the entries that match the value for phone number", () => {
        wrapper = mount(<EntriesComponent entries={allEntries.data} searchValue={"852"}/>);
        const actualNames = wrapper.find(Card.Header).map(it => it.text());
        const expectedNames = [
            "Sax, John",
            "Doe, Jane"
        ];
        expect(actualNames).toEqual(expectedNames);
    });
});