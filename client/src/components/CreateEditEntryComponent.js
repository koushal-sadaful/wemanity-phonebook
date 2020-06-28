import React from 'react'
import {push} from 'connected-react-router'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Container, Header, Search, Grid, Select, Input} from "semantic-ui-react";
import _ from 'lodash'
import {fetchAllEntries, resetState, updateSearchInputValue} from "../actions/HomePageActions";
import HomePageEntryDisplay from "./EntryComponent";
import EntriesComponent from "./EntriesComponent";


class CreateEditEntryComponent extends React.Component {

    searchInputUpdated = (e, {value}) => {
        console.log(value)
        this.props.updateSearchInputValue(value);
    };

    componentWillUnmount() {
        this.props.resetState()
    }

    componentDidMount() {
        this.props.fetchAllEntries()
    }


    render() {

        return (
            <div>
                <Container fluid>
                    <Container textAlign='center'>
                        <Header
                            as='h1'
                            content="Wemanity PhoneBook"
                            style={{
                                fontSize: '1.2em',
                                marginTop: '2em',
                            }}
                        />
                        <Header
                            as='h5'
                            style={{
                                fontSize: '1.2em',
                                fontWeight: 'normal',
                                marginBottom: 0,
                            }}
                        >
                            <Input
                                size={"large"}
                                icon={{name: 'search', circular: true, link: true}}
                                placeholder='Search phone number...'
                                onChange={_.debounce(this.searchInputUpdated, 500, {leading: true})}
                            />
                        </Header>

                        <EntriesComponent
                            entries={this.props.allEntries}
                            searchValue={this.props.searchValue}
                        />
                    </Container>

                </Container>
            </div>
        )
    }
}


const mapStateToProps = ({homePage}) => ({
    allEntries: homePage.allEntries,
    errorMessage: homePage.errorMessage,
    searchValue: homePage.searchValue
});

const mapDispatchToProps = dispatch => bindActionCreators({
    updateSearchInputValue,
    fetchAllEntries,
    resetState,
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CreateEditEntryComponent)