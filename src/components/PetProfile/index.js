import React, { Component } from 'react';
import { Header, Image, Segment, Popup, Grid, Icon, Container, Divider, List, Button } from 'semantic-ui-react';
import _ from 'lodash';
import moment from 'moment';
import PetFlags from '../PetFlags';

export default class PetProfile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            pet: {}
        };
    }

    componentDidMount() {
        this.setTestPetState();
    }

    setTestPetState() {
        this.setState({
            pet: {
                id: 1,
                name: "Leeta",
                species: "Dog",
                breed: ["Samoyed", "JustSamoyed"],
                birthday: "01-29-2017",
                gender: "Female",
                comments: [{ date: "01-01-2018", text: "Good girl", userId: 1 }, { date: "02-01-2018", text: "Loves squeaky toys", userId: 1 }],
                petFlags: [
                    {
                        id: 1,
                        name: "Medical",
                        description: "Medical flags indicate special medical requirements such as medicated shampoos or owner provided medication.",
                        reason: "Heartworm medicine",
                        icon: { name: "medkit", color: "red" }
                    },
                    {
                        id: 2,
                        name: "Temperament",
                        description: "Temperament flags indicate permanent characteristics of a pet such as aggressiveness or frequent pooping.",
                        reason: "ReasonForFlag",
                        icon: { name: "frown outline", color: "" }
                    },
                    {
                        id: 3,
                        name: "Anxiety",
                        description: "Anxiety flags indicate scenarios that can induce temporary anxiety such as bathing or blow drying.",
                        reason: "ReasonForFlag",
                        icon: { name: "eye", color: "" }
                    },
                    {
                        id: 4,
                        name: "Grooming",
                        description: "Grooming flags indicate the need of special care when grooming such as long drying times or frequent matting.",
                        reason: "ReasonForFlag",
                        icon: { name: "cut", color: "" }
                    },
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


        return `Born on ${birthdate.format('MMM Do, YYYY')} so ${_.join(formattedAge, ', ')}`;
    }

    pluralizeDate(dateAmount, singularDateType) {
        if (dateAmount === 0) return '';

        return `${dateAmount} ${dateAmount > 1 ? singularDateType + 's' : singularDateType}`
    }

    render() {
        const { pet } = this.state;

        return (
            <div>
                <Container key={pet.id}>
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
                                    <Segment attached>
                                        <PetFlags flags={pet.petFlags}></PetFlags>
                                    </Segment>
                                    <Segment attached='bottom'>
                                        <Button primary animated='vertical'>
                                            <Button.Content hidden><Icon name='flag outline' /></Button.Content>
                                            <Button.Content visible>
                                                Add Flag
                                            </Button.Content>
                                        </Button>
                                    </Segment>



                                </Grid.Column>
                                <Grid.Column>
                                    <Divider horizontal>Comments</Divider>
                                </Grid.Column>
                            </Grid.Row>

                        </Grid>


                    </Segment>
                </Container>
            </div>
        );

    }




}