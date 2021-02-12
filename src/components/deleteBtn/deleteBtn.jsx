import React from "react";
import PropTypes from "prop-types";
import "./deleteBtn.css";
import DeleteImg from "../../images/delete.svg";

class DeleteBtn extends React.Component {
  render() {
    return (
      <img
        src={DeleteImg}
        className="delete-btn"
        alt="delete"
        title="Delete thing?"
        onClick={() => {
          fetch("http://localhost:8080/api/v1/things/" + this.props.id, {
            method: "DELETE",
          }).then(() => this.props.forUpdate());
        }}
      />
    );
  }
}

DeleteBtn.propTypes = {
  id: PropTypes.string,
  forUpdate: PropTypes.func,
};

export default DeleteBtn;
