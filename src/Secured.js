import React, { Component } from 'react';
import Keycloak from 'keycloak-js';

class Secured extends Component {
	constructor(props) {
		super(props);
		this.state = {
			keycloak: null,
			authenticated: false
		};
	}

	componentDidMount() {
		const keycloak =  Keycloak('/keycloak.json');
		keycloak.init({ onLoad: 'login-required', promiseType: 'native' }).then((authenticated) => {
			this.setState({ keycloak: keycloak, authenticated: authenticated });
		});
	}

	render() {
		if (this.state.keycloak) {
			if (this.state.authenticated)
				return (
					<div>
						<p>
							This is a Keycloak-secured component of your application. You should not be able to see this
							unless you've authenticated with Keycloak
						</p>
					</div>
				);
		}
		return <div>Initializing Keycloak...</div>;
	}
}

export default Secured;
