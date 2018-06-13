import React from 'react';
import { Popup, Container, List, Icon, Button } from 'semantic-ui-react';
import _ from 'lodash';

export default function PetFlags(props = { flags: null }) {
    const flags = props.flags;

    return (
        <List divided relaxed selection>
            {
                _.map(flags, ({ id, name, description, reason, icon }) => (
                    <List.Item key={id}>
                        <List.Content floated='right'>
                            <Button animated='vertical'>
                                <Button.Content hidden>Edit</Button.Content>
                                <Button.Content visible>
                                    <Icon name='edit outline'/>
                                </Button.Content>
                            </Button>
                        </List.Content>
                        <Popup
                            trigger={<Icon bordered name={icon.name} color={icon.color || 'black'} size='large'></Icon>}
                            content={<Container text>{description}</Container>}
                        ></Popup>
                        <List.Content>
                            <List.Header>
                                {name}
                            </List.Header>
                            <List.Description>
                                {reason}
                            </List.Description>
                        </List.Content>
                    </List.Item>
                ))
            }
        </List >
    );
}