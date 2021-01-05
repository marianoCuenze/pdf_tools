pdf_obj         -> pdf_obj_id spaces "obj" spaces:? pdf_value spaces:? "endobj"
pdf_obj_ref     -> pdf_obj_id spaces "R"
pdf_obj_id      -> pdf_obj_num spaces pdf_obj_gen
pdf_obj_num     -> digit:+ #10 DIGITS
pdf_obj_gen     -> digit:+  #5 DIGITS

pdf_value       -> pdf_null
                |  pdf_boolean
                |  pdf_name
                |  pdf_num
                |  pdf_string
                |  pdf_array
                |  pdf_dict
                |  pdf_stream
                |  pdf_obj

pdf_stream      -> pdf_dict spaces:? "stream" pdf_stream_lines "endstream"
pdf_stream_lines-> pdf_stream_lines  end_of_line pdf_stream_line
                |  pdf_stream_line
pdf_stream_line -> ascii7_printable:+
                |  null                                         #ALLOW EMPTY LINES IN STREAM

pdf_array       -> "[" spaces:? pdf_array_items spaces:? "]"  #TODO: allow empty array?

pdf_array_items -> pdf_array_items spaces pdf_array_item
                |  pdf_array_item

pdf_array_item  -> pdf_value
                |  pdf_obj_ref

pdf_dict        -> "<<" spaces:? pdf_dict_entries spaces:? ">>"

pdf_dict_entries-> pdf_dict_entries spaces pdf_dict_entry
                |  pdf_dict_entry

pdf_dict_entry  -> pdf_name spaces pdf_dict_entry_value
pdf_dict_entry_value -> pdf_value
                     |  pdf_obj_ref

pdf_string      -> pdf_string_text   {% id %}
                |  pdf_string_hexa   {% id %}

pdf_string_hexa -> "<" digit_hexa:+ ">"

pdf_string_text -> "(" pdf_string_char:+ ")"

pdf_name        -> "/" ascii7_printable_wo_space:+

pdf_string_char -> "\\("
                |  "\\)"
                |  "\\\\"
                |  "\\" digit_octa digit_octa digit_octa
                |  ascii7_printable_wo_parentesis_backslash       #TODO: add first 20 ascii scape codes?

pdf_num         -> pdf_num_int
                |  pdf_num_dec

pdf_num_int     ->  digit:+
                |   "-" digit:+
                |   "+" digit:+

pdf_num_dec     -> pdf_num_int "." digit:+

pdf_boolean     -> "true"   {% id %}
                |  "false"  {% id %}

pdf_null        -> "null"   {% id %}

ascii7_printable-> ascii7_num_letter
                |  " "
                |  ascii7_simbols

ascii7_printable_wo_space -> ascii7_num_letter
                          |  ascii7_simbols

ascii7_printable_wo_parentesis_backslash -> ascii7_num_letter
                               |  " "
                               |  ascii7_simbols_wo_parentesis_backslash

ascii7_num_letter               -> [a-zA-Z0-9]
ascii7_simbols                  -> [!"#$%&'()*+,-./:;<=>?@\[\\\]\^_`{|}~]
ascii7_simbols_wo_parentesis_backslash    -> [!"#$%&'*+,-./:;<=>?@\[\]\^_`{|}~]


digit_hexa      -> [0-9a-fA-F]

digit           -> [0-9]

digit_octa      -> [0-7]

spaces          -> [ \n\r\t]:+

end_of_line     -> [\n\r]:+