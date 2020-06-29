import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Dropdown, Table } from 'semantic-ui-react';
import InlineError from '../InlineError/InlineError';
import { validateFormValues } from '../../utils/utils';
import { FORM_POSITION_OPTIONS } from '../../utils/constants';

class VastItemComponent extends Component {
  constructor(props) {
    super(props);
    this.handleUpdateEnter = this.handleUpdateEnter.bind(this);
    this.handleUpdateSave = this.handleUpdateSave.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleEditing = this.handleEditing.bind(this);
    this.handleGetVastById = this.handleGetVastById.bind(this);

    const {
      id, vastUrl, position, width, height,
    } = this.props;
    this.state = {
      isEditing: false,
      vast: {
        id,
        vastUrl,
        position,
        width,
        height
      },
      formErrors: {}
    };
  }

  handleTitleChange(event) {
    const { name } = event.target;
    const { value } = event.target;
    this.setState((prevState) => {
      prevState.vast[name] = value;
      return {
        vast: prevState.vast
      };
    });
  }

  handleChange = (e, result) => {
    const { name, value } = result;
    this.setState((prevState) => {
      prevState.vast[name] = value;
      return {
        vast: prevState.vast
      };
    });
  };

  handleEditing() {
    const { isEditing } = this.state;
    this.setState({ isEditing: !isEditing });
  }



  handleUpdateEnter(event) {
    const formErrors = validateFormValues(this.state.vast);
    this.setState({ formErrors });
    if (Object.keys(formErrors).length === 0 && event.charCode === 13) {
      this.props.update(this.state.vast);
      this.setState({
        isEditing: false,
      });
    }
  }

  handleUpdateSave() {
    const formErrors = validateFormValues(this.state.vast);
    this.setState({ formErrors });
    if (Object.keys(formErrors).length === 0) {
      this.props.update(this.state.vast);
      this.setState({
        isEditing: false,
      });
    }
  }

  handleGetVastById() {
    const { vast } = this.state;
    window.open(`/api/?id=${vast.id}`, '_blank');
  }

  render() {
    const {
      isEditing, vast, formErrors
    } = this.state;

    if (isEditing) {
      return (
        <Table.Row>
          <Table.Cell>
            <div className="ui input">
              <input
                type="text"
                placeholder="Vast Url"
                name="vastUrl"
                defaultValue={vast.vastUrl}
                onChange={this.handleTitleChange}
                onKeyPress={this.handleUpdateEnter}
              />
            </div>
            {formErrors.vastUrl && <InlineError text={formErrors.vastUrl} />}
          </Table.Cell>
          <Table.Cell>
            <Dropdown
              placeholder={vast.position}
              name="position"
              label="Position"
              // control={Dropdown}
              fluid
              selection
              onChange={this.handleChange}
              onKeyPress={this.handleUpdateEnter}
              options={FORM_POSITION_OPTIONS}
              value={this.state.position}
            />
          </Table.Cell>
          <Table.Cell>
            <div className="ui input">
              <input
                type="text"
                pattern="[0-9]*"
                placeholder="Width"
                name="width"
                defaultValue={vast.width}
                onChange={this.handleTitleChange}
                onKeyPress={this.handleUpdateEnter}
                  />
            </div>
            {formErrors.width && <InlineError text={formErrors.width} />}
          </Table.Cell>
          <Table.Cell>
            <div className="ui input">
              <input
                type="text"
                placeholder="Height"
                name="height"
                defaultValue={vast.height}
                onChange={this.handleTitleChange}
                onKeyPress={this.handleUpdateEnter}
              />
            </div>
            {formErrors.height && <InlineError text={formErrors.height} />}
          </Table.Cell>
          <Table.Cell>
            <input
              type="checkbox"
              name="edit"
              checked={isEditing}
              onChange={this.handleUpdateSave}
            />
            {formErrors.optionalValueRequired && <InlineError text={formErrors.optionalValueRequired} />}
          </Table.Cell>
          <Table.Cell>
            <Button disabled>view xml</Button>
          </Table.Cell>
        </Table.Row>
      );
    }
    return (
      <Table.Row>
        <Table.Cell>
          {' '}
          { vast.vastUrl }
          {' '}
        </Table.Cell>
        <Table.Cell>
          {' '}
          { vast.position }
          {' '}
        </Table.Cell>
        <Table.Cell>
          {vast.width}
        </Table.Cell>
        <Table.Cell>
          {' '}
          {vast.height}
          {' '}
        </Table.Cell>
        <Table.Cell>
          <input
            type="checkbox"
            name="edit"
            checked={isEditing}
            onChange={this.handleEditing}
          />
        </Table.Cell>
        <Table.Cell>
          <Button onClick={this.handleGetVastById}>view xml</Button>
        </Table.Cell>
      </Table.Row>
    );
  }
}


VastItemComponent.defaultProps = {
  id: null,
  update: () => {},
  vastById: '',
  vastUrl: '',
  position: '',
  width: 100,
  height: 100,
};

VastItemComponent.propTypes = {
  id: PropTypes.number,
  vastUrl: PropTypes.string,
  position: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  update: PropTypes.func,
  vastById: PropTypes.string,
};

export default VastItemComponent;
