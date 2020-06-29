import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  Button, Icon, Table, Form, Dropdown
} from 'semantic-ui-react';
import VastItemComponent from '../VastItemComponent/VastItemComponent';
import { validateFormValues } from '../../utils/utils';
import { FORM_POSITION_OPTIONS } from '../../utils/constants';

import {
  fetchVastsAsync,
  addVastAsync,
  updateVastAsync,
  getVastByIdAsync,
} from '../../actions/vast';
import InlineError from '../InlineError/InlineError';

class VastComponent extends Component {
  constructor(props) {
    super(props);
    this.handleVastChange = this.handleVastChange.bind(this);
    this.handleAddVast = this.handleAddVast.bind(this);
    this.handleToggleAddVast = this.handleToggleAddVast.bind(this);

    this.state = {
      isToggle: false,
      formValues: {
        vastUrl: '',
        position: '',
        width: 100,
        height: 100,
      },
      formErrors: {}
    };
  }

  componentDidMount() {
    this.props.fetchVastsAsync();
  }

  handleVastChange(event) {
    event.preventDefault();
    const { formValues } = this.state;
    const { name } = event.target;
    const { value } = event.target;

    formValues[name] = value;

    this.setState((prevState) => {
      prevState.formValues[name] = value;
      return {
        formValues: prevState.formValues
      };
    });
  }

  handleToggleAddVast() {
    this.setState({ isToggle: !this.state.isToggle });
  }

  handleAddVast(event) {
    event.preventDefault();

    const {
      vastUrl, position, width, height
    } = this.state.formValues;

    const payload = {
      vastUrl,
      position,
      width,
      height
    };
    const formErrors = validateFormValues(payload);
    this.setState({ formErrors });
    if (Object.keys(formErrors).length === 0) {
      this.props.addVastAsync(payload);
      const emptyValues = JSON.parse(JSON.stringify(this.state.formValues));
      Object.keys(emptyValues).forEach(key => emptyValues[key] = '');
      this.setState({ formValues: emptyValues });
    }
  }

  handleDropdownChange = (e, result) => {
    const { name, value } = result;
    this.setState((prevState) => {
      prevState.formValues[name] = value;
      return {
        formValues: prevState.formValues
      };
    });
  };

  render() {
    const { vastsArray } = this.props;
    const {
      vastUrl, position, width, height
    } = this.state.formValues;
    const { formErrors } = this.state;

    return (
      <div className="vastContainer">
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell colSpan="7">
                <Button
                  floated="right"
                  icon
                  labelPosition="left"
                  primary
                  size="small"
                  onClick={this.handleToggleAddVast}
                  onChange={this.handleVastChange}
                  style={{ display: this.state.isToggle ? 'none' : 'block' }}
                >
                  <Icon name="plus" />
                  {' '}
                  Add Vast
                </Button>

                <div
                  style={{ display: this.state.isToggle ? 'block' : 'none' }}
                  className="container"
                >
                  <div>
                    <Form>
                      <Form.Group widths="equal">
                        <Form.Input
                          fluid
                          name="vastUrl"
                          placeholder="Vast Url"
                          value={vastUrl}
                          onChange={this.handleVastChange}
                        />
                        <Dropdown
                            placeholder={position}
                            name="position"
                            label="Position"
                            fluid
                            selection
                            onChange={this.handleDropdownChange}
                            options={FORM_POSITION_OPTIONS}
                            value={position}
                          />
                        <Form.Input
                          fluid
                          name="width"
                          placeholder="Width"
                          value={width}
                          onChange={this.handleVastChange}
                        />
                        <Form.Input
                          fluid
                          name="height"
                          placeholder="Height"
                          value={height}
                          onChange={this.handleVastChange}
                        />
                        <Form.Button
                          onChange={this.handleVastChange}
                          onClick={this.handleAddVast}
                        >
                          Submit
                        </Form.Button>
                      </Form.Group>
                    </Form>
                    <div>
                      {formErrors.vastUrl && <InlineError text={formErrors.vastUrl} />}
                      {formErrors.vastUrlValid && <InlineError text={formErrors.vastUrlValid} />}
                      {formErrors.height && <InlineError text={formErrors.height} />}
                      {formErrors.width && <InlineError text={formErrors.width} />}
                      {formErrors.position && <InlineError text={formErrors.position} />}
                      {formErrors.optionalValueRequired && <InlineError text={formErrors.optionalValueRequired} />}
                    </div>
                  </div>
                </div>
              </Table.HeaderCell>
            </Table.Row>
            <Table.Row>
              <Table.HeaderCell> Vast Url </Table.HeaderCell>
              <Table.HeaderCell> Position </Table.HeaderCell>
              <Table.HeaderCell> Width </Table.HeaderCell>
              <Table.HeaderCell> Height </Table.HeaderCell>
              <Table.HeaderCell> Edit </Table.HeaderCell>
              <Table.HeaderCell> XML </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {vastsArray.map(vast => (
              <VastItemComponent
                id={vast.id}
                vastUrl={vast.vastUrl}
                position={vast.position}
                width={vast.width}
                height={vast.height}
                update={this.props.updateVastAsync}
                getById={this.props.getVastByIdAsync}
              />
            ))
            }
          </Table.Body>
        </Table>
      </div>
    );
  }
}

VastComponent.defaultProps = {
  vastsArray: [],
  vastById: '',
  fetchVastsAsync: () => {},
  addVastAsync: () => {},
  updateVastAsync: () => {},
  getVastByIdAsync: () => {},
};

VastComponent.propTypes = {
  vastsArray: PropTypes.array.isRequired,
  vastById: PropTypes.string.isRequired,
  fetchVastsAsync: PropTypes.func.isRequired,
  addVastAsync: PropTypes.func.isRequired,
  updateVastAsync: PropTypes.func.isRequired,
  getVastByIdAsync: PropTypes.func.isRequired,
};

const mapStateToProps = state => (
  {
    vastsArray: state.vast.vastsArray,
    vastById: state.vast.vastById,
  }
);

export default connect(mapStateToProps, {
  fetchVastsAsync,
  addVastAsync,
  updateVastAsync,
  getVastByIdAsync,
})(VastComponent);
