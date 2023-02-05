### data

- operating_mode:
  - mode : str // _view, crochet, edit_
  - tool : str // _pan, zoom, turn, make, del, clone, chg_type, chg_color_
  - submode : str // _make, select_stitch, select_link, select_node_
- creative_selection :
  - active_st_type : str
  - active_color : str
  - coloring_scheme: str
- modal_params:
  - visible: bool
  - msg : str
  - buttons : int // _bitmap of: 1 - OK, 2 - cancel, 4 - yes , 8 - no_
  - type : str // _what modal should be shown_
  - initial*value : str // \_what is the start value in the modal*
  - target: str // _where the data for modal should flow to_

### methods

- change_mode(str) // resets other vars to defaults when mode is chenged
- change_tool(str) // resets other vars when submode is chenged
