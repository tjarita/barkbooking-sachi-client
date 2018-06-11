import React, { Component } from 'react';
import { Header, Image, Segment, Popup, Grid, Icon, Container, Divider, List } from 'semantic-ui-react';
import _ from 'lodash';
import moment from 'moment';

export default class PetProfile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            petId: null,
            pet: {}
        };
    }

    componentDidMount() {
        this.setTestPetState();
    }

    setTestPetState() {
        this.setState({
            petId: 1,
            pet: {
                name: "Leeta",
                species: "Dog",
                breed: ["Samoyed", "JustSamoyed"],
                birthday: "01-29-2017",
                gender: "Female",
                textNote: ["Good girl", "Loves squeaky toys"],
                pictureNote: ["BinaryPicture1"],
                petFlags: [
                    {
                        "flagType": "Type of flag. Defaults are temperament, anxiety, grooming, and medical",
                        "flagReason": "Reason for flagging / description of the condition"
                    }
                ]
            }
        });
    }

    getPetAge(birthday) {
        const birthdate = moment(birthday);
        const age = moment.duration(moment().diff(birthdate));

        var formattedAge = [];

        if (age.years() > 0) formattedAge = _.concat(formattedAge, this.pluralizeDate(age.years(), 'year'));
        if (age.months() > 0) formattedAge = _.concat(formattedAge, this.pluralizeDate(age.months(), 'month'));
        if (age.days() > 0) formattedAge = _.concat(formattedAge, this.pluralizeDate(age.days(), 'day'));


        return `Born on ${birthdate.format('MMM Do, YYYY')} so ${_.join(formattedAge, ', ')})`;
    }

    pluralizeDate(dateAmount, singularDateType) {
        if (dateAmount === 0) return '';

        return `${dateAmount} ${dateAmount > 1 ? singularDateType + 's' : singularDateType}`
    }

    render() {
        const { pet } = this.state;

        const birthdate = moment(pet.birthday, 'MM-DD-YYYY', true);
        const age = moment.duration(moment().diff(birthdate));

        return (
            <div>
                <Container>
                    <Header as='h1' attached='top'>
                        <Popup
                            trigger={<Image rounded size='huge' src={require('./leeta.jpg')} />}
                            content={<Image rounded size='massive' src={require('./leeta.jpg')} />}
                        />
                        <Header.Content>
                            {pet.name}{pet.species ? ' the ' + pet.species : ''}
                            <Popup
                                trigger={<Header.Subheader>{_.map(pet.breed).join(' | ')}</Header.Subheader>}
                                content='Breed(s)'
                            />
                        </Header.Content>
                    </Header>
                    <Segment attached>
                        <Header size='large' dividing>Quick Information</Header>
                        <Grid columns={2} divided>
                            <Grid.Row>
                                <Grid.Column>
                                    <Header size='small'>
                                        <Header.Content>
                                            Age
                                        </Header.Content>
                                        <Header.Subheader>{this.getPetAge(pet.birthday)}</Header.Subheader>
                                    </Header>
                                </Grid.Column>
                                <Grid.Column>
                                    <Header size='small'>
                                        Gender
                                    <Header.Subheader>{pet.gender}</Header.Subheader>
                                    </Header>
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Column>
                                    <Divider horizontal>Flags</Divider>
                                    <List divided relaxed selection>
                                        <List.Item>
                                            <Popup
                                                trigger={<Icon bordered name='medkit' size='large'></Icon>}
                                                content={<Container text>Medical flags indicate <strong>special medical requirements</strong> such as medicated shampoos or owner provided chemicals.</Container>}
                                            ></Popup>
                                            <List.Content>
                                                <List.Header>
                                                    Medical
                                                </List.Header>
                                                <List.Description>
                                                    Description
                                                </List.Description>
                                            </List.Content>
                                        </List.Item>
                                        <List.Item>
                                        <Popup
                                                trigger={<Icon bordered name='frown outline' size='large'></Icon>}
                                                content={<Container text>Temperament flags indicate <strong>permanent characteristics</strong> of a pet such as aggressiveness or frequent pooping.</Container>}
                                            ></Popup>
                                            <List.Content>
                                                <List.Header>
                                                    Temperament
                                                </List.Header>
                                                <List.Description>
                                                    Description
                                                </List.Description>
                                            </List.Content>
                                        </List.Item>
                                        <List.Item>
                                        <Popup
                                                trigger={<Icon bordered name='eye' size='large'></Icon>}
                                                content={<Container text>Anxiety flags indicate scenarios that can induce <strong>temporary anxiety</strong> such as bathing or blow drying.</Container>}
                                            ></Popup>
                                            <List.Content>
                                                <List.Header>
                                                    Anxiety
                                                </List.Header>
                                                <List.Description>
                                                    Description
                                                </List.Description>
                                            </List.Content>
                                        </List.Item>
                                        <List.Item>
                                        <Popup
                                                trigger={<Icon bordered name='cut' size='large'></Icon>}
                                                content={<Container text>Grooming flags indicate the need of <strong>special care when grooming</strong> such as long drying times or frequent matting.</Container>}
                                            ></Popup>
                                            <List.Content>
                                                <List.Header>
                                                    Grooming
                                                </List.Header>
                                                <List.Description>
                                                    Description
                                                </List.Description>
                                            </List.Content>
                                        </List.Item>

                                    </List>
                                </Grid.Column>
                                <Grid.Column>
                                    <Divider horizontal>Notes</Divider>
                                </Grid.Column>
                            </Grid.Row>

                        </Grid>


                    </Segment>
                </Container>
            </div>
        );

    }




}