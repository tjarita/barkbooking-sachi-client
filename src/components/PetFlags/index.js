import React, { Component } from 'react';
import { Popup, Container, List, Icon } from 'semantic-ui-react';
import _ from 'lodash';

export default class PetFlags extends Component {
    render() {
        const flags = this.props.flags;

        return (
            <List divided relaxed selection>
                {
                    _.map(flags, ({ id, name, description, reason, icon }) => (
                        <List.Item key={id}>
                            <Popup
                                trigger={<Icon bordered name={icon.name} color={icon.color ? icon.color : 'black'} size='large'></Icon>}
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
}

PetFlags.defaultProps = {
    flags: null
}