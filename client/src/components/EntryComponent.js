import {Button, Card, Header, Icon, List} from "semantic-ui-react";
import React from "react";


const EntryComponent = ({entryData}) => {
    return (
        <Card className="home-page-entry">
            <Card.Content>
                <Card.Header>{entryData.lastName}, {entryData.firstName}</Card.Header>
                <Card.Description> {entryData.phoneNumber}  </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button basic color='blue'> Edit </Button>
            </Card.Content>
        </Card>
    );
};

export default EntryComponent