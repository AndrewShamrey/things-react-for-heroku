import React from "react";
import PropTypes from "prop-types";
import DeleteBtn from "../deleteBtn/deleteBtn";
import "./thing.css";
import UpdateImg from "../../images/update.svg";

const Thing = ({ data, forUpdate }) => {
  const allKeys = Object.getOwnPropertyNames(data);
  return (
    <div className="thing-container">
      <img
        index={data.id}
        src={UpdateImg}
        className="update-btn"
        alt="update"
        title="Update thing?"
      />
      <DeleteBtn id={data.id} forUpdate={forUpdate} />
      {"{"}
      {allKeys.map((item, index) => {
        return (
          <p key={index} className="thing-key">
            "{item}": <span className="thing-value">{JSON.stringify(data[item])}</span>
          </p>
        );
      })}
      {"}"}
    </div>
  );
};

Thing.propTypes = {
  data: PropTypes.object,
  forUpdate: PropTypes.func
};

export default Thing;
