### data
* operating_mode:
	* mode : str // *view, crochet, edit*
	* tool : str // *pan, zoom, turn, make, del, clone, chg_type, chg_color*
	* submode : str // *make, select_stitch, select_link, select_node*
* creative_selection :
	* active_st_type : str
	* active_color : str
	* coloring_scheme: str
* modal_params:
	* visible: bool
	* msg  : str
	* buttons : int // *bitmap of: 1 - OK, 2 - cancel, 4 - yes , 8 - no*
	* type : str // *what modal should be shown*
	* initial_value : str // *what is the start value in the modal*
	* target: str // *where the data for modal should flow to*
### methods
* change_mode(str) // resets other vars to defaults when mode is chenged
* change_tool(str) // resets other vars when submode is chenged