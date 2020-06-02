import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import './autocomplete.css';

class Autocomplete extends Component {
    static propTypes = {
        suggestions: PropTypes.instanceOf(Array)
    };

    static defaultProps = {
        suggestions: []
    };

    constructor(props) {
        super(props);

        this.state = {
            // The active selection's index
            activeSuggestion: 0,
            // The suggestions that match the user's input
            filteredSuggestions: [],
            // Whether or not the suggestion list is shown
            showSuggestions: false,
            // What the user has entered
            userInput: this.props.defaultValue
        };
    }

    // componentDidMount() {
    //     this.setState({
    //         userInput: this.props.defaultValue
    //     });
    // }

    onChange = e => {
        const { suggestions, minFilter } = this.props;
        const userInput = e.currentTarget.value;

        if (minFilter && e.currentTarget.value.length < minFilter) {
            this.setState({
                userInput: e.currentTarget.value
            });
            return;
        }
        // Filter our suggestions that don't contain the user's input
        const filteredSuggestions = suggestions.filter(
            suggestion =>
                suggestion.name.toLowerCase().indexOf(userInput.toLowerCase()) > -1
        );

        this.setState({
            activeSuggestion: 0,
            filteredSuggestions,
            showSuggestions: true,
            userInput: e.currentTarget.value
        });
    };

    onClick = e => {
        this.setState({
            activeSuggestion: 0,
            filteredSuggestions: [],
            showSuggestions: false,
            userInput: e.currentTarget.innerText
        });
        const filter = e.currentTarget.innerText,
            { filteredSuggestions } = this.state;
        const obj = filteredSuggestions.find(e => e.name.toLowerCase().indexOf(filter.toLowerCase()) > -1);
        if (obj) {
            this.props.onChange && this.props.onChange(obj.id);
        }

    };

    onKeyDown = e => {
        const { activeSuggestion, filteredSuggestions } = this.state;

        // User pressed the enter key
        if (e.keyCode === 13) {
            this.setState({
                activeSuggestion: 0,
                showSuggestions: false,
                userInput: filteredSuggestions[activeSuggestion].name
            });
            this.props.onChange && this.props.onChange(filteredSuggestions[activeSuggestion].id);
        }
        // User pressed the up arrow
        else if (e.keyCode === 38) {
            if (activeSuggestion === 0) {
                return;
            }

            this.setState({ activeSuggestion: activeSuggestion - 1 });
        }
        // User pressed the down arrow
        else if (e.keyCode === 40) {
            if (activeSuggestion - 1 === filteredSuggestions.length) {
                return;
            }

            this.setState({ activeSuggestion: activeSuggestion + 1 });
        }
    };

    render() {
        const {
            onChange,
            onClick,
            onKeyDown,
            state: {
                activeSuggestion,
                filteredSuggestions,
                showSuggestions,
                userInput
            }
        } = this;

        let suggestionsListComponent;

        if (showSuggestions && userInput) {
            if (filteredSuggestions.length) {
                suggestionsListComponent = (
                    <ul class="suggestions">
                        {filteredSuggestions.map((suggestion, index) => {
                            let className;

                            // Flag the active suggestion with a class
                            if (index === activeSuggestion) {
                                className = "suggestion-active";
                            }

                            return (
                                <li className={className} key={suggestion.id} onClick={onClick}>
                                    {suggestion.name}
                                </li>
                            );
                        })}
                    </ul>
                );
            } else {
                suggestionsListComponent = (
                    <div class="no-suggestions">
                        <em>No hay datos disponibles</em>
                    </div>
                );
            }
        }

        return (
            <Fragment>
                <input
                    type="text"
                    onChange={onChange}
                    onKeyDown={onKeyDown}
                    value={userInput}
                    className={this.props.className}
                    style={{border: 'none', borderBottom: '1px solid lightgray'}}
                />
                {suggestionsListComponent}
            </Fragment>
        );
    }
}

export default Autocomplete;
