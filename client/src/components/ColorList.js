import React, { useState } from "react";
import { axiosWithAuth } from "../axiosWithAuth";
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [colorToAdd, setColorToAdd] = useState({});

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    axiosWithAuth()
      .put(`http://localhost:5000/api/colors/${colorToEdit.id}`, { ...colorToEdit })
      .then(response => {
      })
      .catch(err => {
        console.log(err)
      })
  };

  const deleteColor = color => {
    axiosWithAuth()
      .delete(`http://localhost:5000/api/colors/${color.id}`)
      .catch(err => console.log(err))
  };

  const handleChangeColorName = e => {
    setColorToAdd({ ...colorToAdd, color: e.target.value })
  }

  const handleChangeColorHexValue = e => {
    setColorToAdd({ ...colorToAdd, code: { ...colorToAdd.code, hex: e.target.value } })
  }

  const handleAddColor = () => {
    axiosWithAuth()
      .post("http://localhost:5000/api/colors", {
        color: String(colorToAdd.color),
        code: (colorToAdd.code)
      })
      .catch((err, msg) => {
        console.log(err, msg)
      })
  }

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={() => deleteColor(color)}>
                x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      <form>
        <TextField
          id="color-name"
          label="Name"
          type="name"
          name="color-name"
          margin="normal"
          variant="outlined"
          onChange={handleChangeColorName}
        />
        <TextField
          id="color-hex"
          label="Hex"
          type="name"
          margin="normal"
          variant="outlined"
          onChange={handleChangeColorHexValue}
        />
        <Button color='primary' variant='contained' onClick={handleAddColor}>Add</Button>
      </form>
    </div>
  );
};

export default ColorList;
