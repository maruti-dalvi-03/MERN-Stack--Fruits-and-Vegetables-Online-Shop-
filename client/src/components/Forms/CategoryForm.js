import React from "react";

const CategoryForm = ({ handleSubmit, value, setValue }) => {
  return (
    <>
      <form onSubmit={handleSubmit} className="d-flex justify-content-center">
        <div className="category-form" >
          <input
            type="text"
            placeholder="Enter new category"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />

        <button type="submit" className="blue-btn">
          Submit
        </button>
        </div>

        
      </form>
    </>
  );
};

export default CategoryForm;