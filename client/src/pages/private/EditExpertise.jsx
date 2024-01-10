import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table } from "@src/components/table/Table.jsx";
import { Add } from "@src/assets/icons/ButtonIcons.jsx";
import { toggle } from "@src/app/services/uiSlice.js";
import Button from "@src/components/button/Button.jsx";
import Form from "@src/components/form/Form.jsx";
import { getExpertise } from "@src/app/services/expertiseSlice.js";
import Model from "@src/components/model/Model.jsx";

function EditExpertise() {
  const dispatch = useDispatch();
  const { form } = useSelector((state) => state.ui);
  const { EXPERTISES, status } = useSelector((state) => state.expertise);

  useEffect(() => {
    dispatch(getExpertise());
  }, [dispatch]);

  const columns = [
    { key: "name", header: "Name" },
    { key: "image", header: "Image" },
    { key: "level", header: "Level" },
  ];

  return (
    <main>
      <h1>Edit Expertise</h1>
      {EXPERTISES.length === 0 ? (
        <Model type="error" messaage="No Expertise" />
      ) : (
        <Table columns={columns} data={EXPERTISES} />
      )}
      <div className="flex">
        <Button
          icon={<Add />}
          label="Add Expertise"
          onClick={() => dispatch(toggle("form"))}
          className="btnPrimary"
        />
      </div>
      {form && <Form type="expertise" />}
    </main>
  );
}

export default EditExpertise;
