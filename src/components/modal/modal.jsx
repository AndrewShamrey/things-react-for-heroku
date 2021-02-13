import React from "react";
import PropTypes from "prop-types";
import "./modal.css";
import Done from "../../images/done.svg";

const buildState = () => ({
  attributes: [
    { name: "name", value: "" },
    { name: "", value: "" },
  ],
  countLabels: 1,
  emptyValue: "",
  showClass: "",
  currentId: "",
});

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ...buildState() };

    this.showModal = this.showModal.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.addLabel = this.addLabel.bind(this);
    this.sendThing = this.sendThing.bind(this);
  }

  showModal(e) {
    if (e.target.className === "add-thing") {
      this.setState({ showClass: "modal-visible" });
    } else if (e.target.className === "update-btn") {
      this.setState({
        showClass: "modal-visible",
        currentId: e.target.getAttribute("index"),
      });
    } else if (e.target.classList.contains("modal-visible")) {
      this.setState({ ...buildState() });
      document.querySelector(".other-labels").innerHTML = "";
    }
  }

  handleInputChange(event) {
    const target = event.target;
    const index = +target.getAttribute("index");
    const value = target.value;
    const name = target.name;

    const newArray = this.state.attributes.slice();
    newArray[index][name] = value;

    this.setState({
      attributes: newArray,
    });

    if (target.classList.contains("empty-name-value")) {
      this.setState({
        emptyValue: "",
      });
    }
  }

  addLabel() {
    const currentLabel = this.state.countLabels;

    if (!this.state.attributes[0].value) {
      this.setState({
        emptyValue: "empty-name-value",
      });
      return;
    }

    if (!this.state.attributes[currentLabel - 1].name) {
      const warningInput = document.querySelectorAll(".input-name")[currentLabel - 1];
      warningInput.style.border = "1px solid red";
      setTimeout(() => {
        warningInput.style.border = "1px solid #fff";
      }, 1500);
      return;
    }

    this.setState({
      attributes: [...this.state.attributes, { name: "", value: "" }],
    });

    const labelsDiv = document.querySelector(".other-labels");
    const label = document.createElement("label");

    const createInput = (name) => {
      const result = document.createElement("input");
      result.classList.add(`input-${name}`);
      result.name = name;
      result.type = "text";
      result.value = this.state.attributes[currentLabel][name];
      result.placeholder = name === "name" ? "attribute" : "value";
      result.onchange = this.handleInputChange;
      result.setAttribute("index", currentLabel + "");
      return result;
    }
    this.createInput = createInput.bind(this);

    label.append(this.createInput("name"));
    label.append(this.createInput("value"));
    labelsDiv.append(label);

    this.setState({
      countLabels: this.state.countLabels + 1,
    });
  }

  sendThing() {
    const currentLabelsCount = this.state.countLabels;
    const label = this.state.attributes[currentLabelsCount - 1];

    if (!label.name && label.value) {
      const warningInput = document.querySelectorAll(".input-name")[currentLabelsCount - 1];
      warningInput.style.border = "1px solid red";
      setTimeout(() => {
        warningInput.style.border = "1px solid #fff";
      }, 1500);
      return;
    }

    const currentAttributes = this.state.attributes.filter((item) => item.name);
    const keys = currentAttributes.slice().map((item) => item.name);
    let values = currentAttributes.slice().map((item) => item.value);
    if (!values[0]) {
      this.setState({
        emptyValue: "empty-name-value",
      });
      return;
    }

    function validatedValues(arr) {
      return arr.map((item) => {
        try {
          if (typeof JSON.parse(item) === "number") {
            return item;
          }
          return JSON.parse(item);
        } catch (e) {
          if (item === "") {
            return undefined;
          }
          return item;
        }
      });
    }

    values = validatedValues(values);

    const newThing = {};
    for (let i = 0; i < keys.length; i++) {
      newThing[keys[i]] = values[i];
    }

    const id = this.state.currentId;
    const method = id ? "PUT" : "POST"; 

    this.setState({ ...buildState() });
    document.querySelector(".other-labels").innerHTML = "";

    fetch("https://safe-garden-89946.herokuapp.com/api/v1/things/" + id, {
      method: method,
      body: JSON.stringify(newThing),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => this.props.forUpdate());
  }

  componentDidMount() {
    document.addEventListener("click", this.showModal);
  }

  render() {
    return (
      <div className={"modal-wrapper " + this.state.showClass}>
        <div className="modal-content">
          <form className="modal-form">
            <label>
              <input
                className="input-name"
                disabled="disabled"
                index="0"
                name="name"
                type="text"
                value={this.state.attributes[0].name}
                onChange={this.handleInputChange}
              />
              <input
                className={"input-value " + this.state.emptyValue}
                index="0"
                name="value"
                type="text"
                value={this.state.attributes[0].value}
                placeholder="value"
                onChange={this.handleInputChange}
              />
            </label>
            <div className="other-labels"></div>
          </form>
          <div className="buttons">
            <p className="add-attribute" onClick={this.addLabel}>Add attribute?</p>
            <img
              className="modal-done"
              src={Done}
              alt="done"
              title="Send info?"
              onClick={this.sendThing}
            />
          </div>
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  forUpdate: PropTypes.func,
};

export default Modal;
