import {Button, Card} from "semantic-ui-react";
import React from "react";
import EntryComponent from "./EntryComponent";

const EntriesComponent = ({entries, searchValue}) => {

    const doesEntryMatchSearch = (item, searchValue) => {
        let phoneNumberMatches = item.phoneNumber.match(searchValue);
        let lastNameMatches = item.lastName.match(searchValue);
        let firstNameMatches = item.firstName.match(searchValue);
        return phoneNumberMatches || lastNameMatches || firstNameMatches
    };

    let entriesToBeRendered = null;
    if (searchValue === "" || searchValue == null) {
        entriesToBeRendered = entries.map(entry => <EntryComponent entryData={entry}/>)
    } else {
        const matchedPhoneEntries = entries.filter(item => doesEntryMatchSearch(item, searchValue));
        entriesToBeRendered = matchedPhoneEntries.map( (entry, key) => <EntryComponent key={key} entryData={entry}/>)
    }

    return (
        <div className="all-entreies">
            <Card.Group itemsPerRow={3}>
                {entriesToBeRendered}
            </Card.Group>
        </div>
    );
};

export default EntriesComponent