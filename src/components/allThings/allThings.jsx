import React from "react";
import PropTypes from "prop-types";
import "./allThings.css";
import Thing from "../thing/thing";
import Modal from "../modal/modal";

const AllThings = ({ things, forUpdate }) => {
  return (
    <div className="all-things-wrapper">
      <Modal forUpdate={forUpdate} />
      <p className="add-thing">Add new Thing?</p>
      {things.map((item, index) => {
        return <Thing key={index} data={item} forUpdate={forUpdate} />;
      })}
    </div>
  );
};

AllThings.propTypes = {
  things: PropTypes.array,
  forUpdate: PropTypes.func
};

export default AllThings;
