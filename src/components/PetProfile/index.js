import React, { Component } from 'react';
import { Header, Image, Segment, Popup } from 'semantic-ui-react';
import _ from 'lodash';

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
                birthday: "1-29-2017",
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

    render() {
        const { pet } = this.state;

        return (
            <div>
                <Header as='h1' attached='top'>
                    <Popup
                        trigger={<Image rounded size='huge' src={require('./leeta.jpg')} />}
                        content={<Image rounded size='massive' src={require('./leeta.jpg')} />}
                    />
                    <Header.Content>
                        {pet.name} the {pet.species}
                        <Popup
                            trigger={<Header.Subheader>{_.map(pet.breed).join(' | ')}</Header.Subheader>}
                            content='Breed(s)'
                        />
                    </Header.Content>
                </Header>
                <Segment attached>
                    Info
                </Segment>



            </div>
        );

    }




}