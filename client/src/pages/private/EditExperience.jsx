import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table } from "@src/components/table/Table.jsx";
import { Add } from "@src/assets/icons/ButtonIcons.jsx";
import { toggle } from "@src/app/services/uiSlice.js";
import Button from "@src/components/button/Button.jsx";
import Form from "@src/components/form/Form.jsx";
import { getExperience } from "@src/app/services/experienceSlice.js";
import Model from "@src/components/model/Model.jsx";

function EditExperience() {
  const dispatch = useDispatch();
  const { form } = useSelector((state) => state.ui);
  const { EXPERIENCES, status } = useSelector((state) => state.experience);

  useEffect(() => {
    dispatch(getExperience());
  }, [dispatch]);

  const columns = [
    { key: "company", header: "Company" },
    { key: "position", header: "Position" },
    { key: "description", header: "Description" },
    { key: "image", header: "Image" },
    { key: "technologies", header: "Technologies" },
    { key: "startDate", header: "StartDate" },
    { key: "endDate", header: "EndDate" },
  ];

  return (
    <main>
      <h1>Edit Experience</h1>
      {EXPERIENCES.length === 0 ? (
        <Model type="error" messaage="No Experience" />
      ) : (
        <Table columns={columns} data={EXPERIENCES} />
      )}
      <div className="flex">
        <Button
          icon={<Add />}
          label="Add Experience"
          onClick={() => dispatch(toggle("form"))}
          className="btnPrimary"
        />
      </div>
      {form && <Form type="experience" />}
    </main>
  );
}

export default EditExperience;
