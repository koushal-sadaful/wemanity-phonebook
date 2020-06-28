import {createTestStore} from "../testStoreFactory";
import React from "react";
import {resetState, updateSearchInputValue, fetchAllEntries} from "../../actions/HomePageActions";
import axios from 'axios';
import {getExistingEntry, updateWorkingRecord} from "../../actions/CreateEditEntryActions";

jest.mock('axios');
let testStore = null;

const existingEntryRecord = {
    id: "someId",
    firstName: "someName",
    lastName: "someSurname",
    phoneNumber: "+85 1548 9864"
};

describe("Create Edit Reducer", () => {

    beforeEach(() => testStore = createTestStore());

    it("should have expected empty state", () => {
        expect(testStore.getState().createEdit).toEqual(getExpectedState());
    });

    it("should update the existing record data", async () => {
        axios.get.mockImplementationOnce(() => Promise.resolve({data: existingEntryRecord}));
        await testStore.dispatch(getExistingEntry("someId"));
        expect(testStore.getState().createEdit).toEqual(getExpectedState(existingEntryRecord, null));
    });

    it("should update the working record data", () => {
        testStore.dispatch(updateWorkingRecord({someDate: null}));
        expect(testStore.getState().createEdit).toEqual(getExpectedState(null, {someDate: null}));
    });

    it("should update the error message if response is error", async () => {
        axios.get.mockImplementationOnce(() => Promise.reject(new Error("Some dumb error")));

        await testStore.dispatch(getExistingEntry("someId"));
        expect(testStore.getState().createEdit).toEqual(getExpectedState(null, null, "Some dumb error"))
    });

    it("should clear the previous error message if response is 200", async () => {
        axios.get.mockImplementationOnce(() => Promise.reject(new Error("Some dumb error")));
        await testStore.dispatch(getExistingEntry("someId"));
        expect(testStore.getState().createEdit).toEqual(getExpectedState(null, null, "Some dumb error"));

        axios.get.mockImplementationOnce(() => Promise.resolve({data: existingEntryRecord}));
        await testStore.dispatch(getExistingEntry("someId"));
        expect(testStore.getState().createEdit).toEqual(getExpectedState(existingEntryRecord, null , null));
    });

    it("resets the state", async () => {
        axios.get.mockImplementationOnce(() => Promise.resolve(existingEntryRecord));

        await testStore.dispatch(getExistingEntry("someId"));
        testStore.dispatch(updateWorkingRecord("Baguette"));

        testStore.dispatch(resetState());
        expect(testStore.getState().createEdit).toEqual(getExpectedState());
    });

});

function getExpectedState(oldRecord = null, newRecord = null, errorMessage = null) {
    return {
        oldRecord: oldRecord,
        newRecord: newRecord,
        errorMessage: errorMessage
    };
}