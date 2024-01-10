import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table } from "@src/components/table/Table.jsx";
import { Add } from "@src/assets/icons/ButtonIcons.jsx";
import { toggle } from "@src/app/services/uiSlice.js";
import { getProject } from "@src/app/services/projectSlice.js";
import Button from "@src/components/button/Button.jsx";
import Form from "@src/components/form/Form.jsx";
import Model from "@src/components/model/Model.jsx";

function EditProject() {
  const dispatch = useDispatch();
  const { form } = useSelector((state) => state.ui);
  const { PROJECTS, status } = useSelector((state) => state.project);

  useEffect(() => {
    dispatch(getProject());
  }, [dispatch]);

  const columns = [
    { key: "title", header: "Title" },
    { key: "description", header: "Description" },
    { key: "image", header: "Image" },
    { key: "technologies", header: "Technologies" },
    { key: "date", header: "Date" },
    { key: "url", header: "Url" },
  ];

  return (
    <main>
      <h1>EditProject</h1>
      {PROJECTS.length === 0 ? (
        <Model type="error" messaage="No Project" />
      ) : (
        <Table columns={columns} data={PROJECTS} />
      )}
      <div className="flex">
        <Button
          icon={<Add />}
          label="Add Project"
          onClick={() => dispatch(toggle("form"))}
          className="btnPrimary"
        />
      </div>
      {form && <Form type="project" />}
    </main>
  );
}

export default EditProject;
