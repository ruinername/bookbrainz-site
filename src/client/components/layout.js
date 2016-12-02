/*
 * Copyright (C) 2016  Max Prettyjohns
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License along
 * with this program; if not, write to the Free Software Foundation, Inc.,
 * 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.
 */

const React = require('react');

const Footer = require('./footer');


/**
 * Returns list of component children that have been injected with the specified props (does not override existing ones)
 * @param {Object} props - The props object that is injected into the children
 * @returns {Array}
 */
function injectChildElemsWithProps(props) {
	return React.Children.map(props.children, (Child) => {
		const filteredProps = Object.assign({}, props, Child.props);
		return React.cloneElement(Child, filteredProps);
	});
}

class Layout extends React.Component {

	constructor(props) {
		super(props);
		this.state = {};
		this.renderNavContent = this.renderNavContent.bind(this);
		this.renderNavHeader = this.renderNavHeader.bind(this);
	}

	renderNavHeader() {
		const {homepage} = this.props;

		return (
			<div className="navbar-header">
				<a role="button" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" className="navbar-toggle collapsed">
					<span className="sr-only">Toggle navigation</span>
					<span className="icon-bar"></span>
					<span className="icon-bar"></span>
					<span className="icon-bar"></span>
				</a>
				<a href="/" className="navbar-brand logo">
					{homepage ?
						<img alt="BookBrainz icon" src="/images/BookBrainz_logo_icon.svg" title="BookBrainz"/>
						:
						<img alt="BookBrainz icon" src="/images/BookBrainz_logo_mini.svg" title="BookBrainz"/>
					}
				</a>
			</div>
		);
	}

	renderNavContent() {
		const {user, homepage, hideSearch} = this.props;

		return (
			<div id="bs-example-navbar-collapse-1" className="collapse navbar-collapse">
				<ul className="nav navbar-nav navbar-right">
					{user && user.id ?
						<div>
							<li className="dropdown">
								<a id="dNewEntities" href="#" data-toggle="dropdown" role="button" aria-expanded="false" className="dropdown-toggle">
									<span className="fa fa-plus"></span>&nbsp;Create&nbsp;
									<span className="caret"></span>
								</a>
								<ul role="menu" aria-labelledby="dNewEntities" className="dropdown-menu">
									<li><a href="/publication/create">Create Publication</a></li>
									<li><a href="/edition/create">Create Edition</a></li>
									<li><a href="/work/create">Create Work</a></li>
									<li className="divider"></li>
									<li><a href="/creator/create">Create Creator</a></li>
									<li><a href="/publisher/create">Create Publisher</a></li>
								</ul>
							</li>
							<li className="dropdown">
								<a id="dUserDropdown" href="#" data-toggle="dropdown" role="button" aria-expanded="false" className="dropdown-toggle">
									<span className="fa fa-user"></span><span>&nbsp; {user.name}</span><span className="caret"></span>
								</a>
								<ul role="menu" aria-labelledby="dUserDropdown" className="dropdown-menu">
									<li><a href={`/editor/${user.id}`}><span className="fa fa-info fa-fw"></span>&nbsp;Profile</a></li>
									<li><a href="/logout"><span className="fa fa-sign-out fa-fw"></span>&nbsp;Sign Out</a></li>
								</ul>
							</li>
						</div>
						:
						<li>
							<a href="/auth">
								<span className="fa fa-sign-in"></span>&nbsp;Sign In / Register
							</a>
						</li>
					}
				</ul>
				{!(homepage || hideSearch) &&
				<form role="search" action="/search" className="navbar-form navbar-right">
					<div className="form-group">
						<div className="input-group">
						<input type="text" placeholder="Search for..." name="q" className="form-control"/><span className="input-group-btn">
							<button type="submit" className="btn btn-success"><span className="fa fa-search"></span></button></span>
						</div>
					</div>
				</form>
				}
			</div>
		);
	}

	render() {
		const {homepage, siteRevision, repositoryUrl} = this.props;

		// Shallow merges parents props into child components
		const children = homepage ? React.Children.map(this.props.children, (Child) => injectChildElemsWithProps(this.props)) : (
			<div id="content" className="container">
				{injectChildElemsWithProps(this.props)}
			</div>);

		return (
			<div>
				<a href="#content" className="sr-only sr-only-focusable">Skip to main content</a>
				<div role="navigation" className="navbar navbar-default navbar-fixed-top BookBrainz">
					<div className="container-fluid">
						{this.renderNavHeader()}
						{this.renderNavContent()}
					</div>
				</div>
				{children}
				<Footer repositoryUrl={repositoryUrl}
					siteRevision={siteRevision}
				/>
			</div>
		);
	}
}

Layout.displayName = 'Layout';
Layout.propTypes = {
	achievement: React.PropTypes.object,
	basedir: React.PropTypes.string,
	creatorTypes: React.PropTypes.array,
	editor: React.PropTypes.object,
	entity: React.PropTypes.object,
	genders: React.PropTypes.array,
	hideSearch: React.PropTypes.bool,
	identifierTypes: React.PropTypes.array,
	languages: React.PropTypes.array,
	publicationTypes: React.PropTypes.array,
	publisherTypes: React.PropTypes.array,
	repositoryUrl: React.PropTypes.string,
	siteRevision: React.PropTypes.string,
	title: React.PropTypes.string,
	user: React.PropTypes.object,
	workTypes: React.PropTypes.array
};

module.exports = Layout;
