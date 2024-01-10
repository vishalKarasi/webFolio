import React from "react";
import "./table.scss";
import Button from "../button/Button.jsx";
import { useDispatch } from "react-redux";
import { setEditMode, setId, toggle } from "@src/app/services/uiSlice.js";
import { deleteProject } from "@src/app/services/projectSlice.js";
import { useLocation } from "react-router-dom";
import { deleteExperience } from "@src/app/services/experienceSlice.js";
import { deleteExpertise } from "@src/app/services/expertiseSlice.js";

export const Table = ({ columns, data }) => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const handleDelete = (id) => {
    if (pathname === "/admin/editExperience") dispatch(deleteExperience(id));
    if (pathname === "/admin/editExpertise") dispatch(deleteExpertise(id));
    if (pathname === "/admin/editProject") dispatch(deleteProject(id));
  };

  return (
    <table>
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.key}>{column.header}</th>
          ))}
          <th>Edit</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {columns.map((column) => (
              <td key={column.key} head={column.header}>
                {row[column.key]}
              </td>
            ))}
            <td head="Edit">
              <Button
                label="edit"
                className="editBtn"
                onClick={() => {
                  dispatch(toggle("form"));
                  dispatch(setEditMode(true));
                  dispatch(setId(row._id));
                }}
              />
              <Button
                label="delete"
                className="delBtn"
                onClick={() => handleDelete(row._id)}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
