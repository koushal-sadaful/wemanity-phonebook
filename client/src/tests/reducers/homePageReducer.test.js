import {createTestStore} from "../testStoreFactory";
import React from "react";
import {resetState, updateSearchInputValue, fetchAllEntries} from "../../actions/HomePageActions";
import axios from 'axios';

jest.mock('axios');
let testStore = null;

const expectedAllEntries = [
    {"phone": "+852 15884 2"},
    {"phone": "+852 15884 12"},
    {"phone": "+852 15884 1"}
];

describe("Home Page Reducer", () => {

    beforeEach(() => testStore = createTestStore());

    it("should have expected empty state", () => {
        expect(testStore.getState().homePage).toEqual(getExpectedState());
    });

    it("should update the search input value", () => {
        testStore.dispatch(updateSearchInputValue("Baguette"));
        expect(testStore.getState().homePage).toEqual(getExpectedState("Baguette"));
    });

    it("should update the suggestions if response is 200", async () => {
        axios.get.mockImplementationOnce(() => Promise.resolve({data: expectedAllEntries} ));

        await testStore.dispatch(fetchAllEntries());
        expect(testStore.getState().homePage).toEqual(getExpectedState(null, expectedAllEntries));
    });

    it("should update the error message if response is error", async () => {
        axios.get.mockImplementationOnce(() => Promise.reject(new Error("Some dumb error")));

        await testStore.dispatch(fetchAllEntries());
        expect(testStore.getState().homePage).toEqual(getExpectedState(null, [], "Some dumb error"))
    });

    it("should clear the previous error message if response is 200", async () => {
        axios.get.mockImplementationOnce(() => Promise.reject(new Error("Some dumb error")));
        await testStore.dispatch(fetchAllEntries());
        expect(testStore.getState().homePage).toEqual(getExpectedState(null, [], "Some dumb error"));

        axios.get.mockImplementationOnce(() => Promise.resolve({data: expectedAllEntries}));
        await testStore.dispatch(fetchAllEntries("axios"));
        expect(testStore.getState().homePage).toEqual(getExpectedState(null, expectedAllEntries, null));
    });

    it("resets the state", async () => {
        axios.get.mockImplementationOnce(() => Promise.resolve(expectedAllEntries));

        await testStore.dispatch(fetchAllEntries());
        testStore.dispatch(updateSearchInputValue("Baguette"));

        testStore.dispatch(resetState());
        expect(testStore.getState().homePage).toEqual(getExpectedState());
    });

});

function getExpectedState(searchInputValue = null, allEntries = [], errorMsg = null) {
    return {
        allEntries: allEntries,
        searchValue: searchInputValue,
        errorMessage: errorMsg
    };
}