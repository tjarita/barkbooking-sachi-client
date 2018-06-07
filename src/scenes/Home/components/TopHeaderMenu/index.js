import React, { Component } from 'react';
import { Menu, Button } from 'semantic-ui-react';
import logo from '../../../../logo.svg';

export default class TopHeaderMenu extends Component {
    constructor(props) {
        super(props);

        this.state = { activeItem: 'home' }
    }

    handleMenuClick = (e, { name }) => {
        this.setState({ activeItem: name });
    }

    render() {
        const { activeItem } = this.state

        return (
            <Menu size='large'>
                <Menu.Item>
                    <img src={logo} alt='BarkBookingLogo' />
                </Menu.Item>
                <Menu.Item name='home' active={activeItem === 'home'} onClick={this.handleMenuClick} />
                <Menu.Item name='customers' active={activeItem === 'customers'} onClick={this.handleMenuClick} />
                <Menu.Item name='appointments' active={activeItem === 'appointments'} onClick={this.handleMenuClick} />
                <Menu.Item name='pets' active={activeItem === 'pets'} onClick={this.handleMenuClick} />

                <Menu.Menu position='right'>
                    <Menu.Item>
                        <Button primary>Sign in</Button>
                    </Menu.Item>
                </Menu.Menu>
            </Menu>
        );
    }
}