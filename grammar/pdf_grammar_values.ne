@{%
//   const pdf_values = require("../../values/pdf_values.js");
%}
pdf_obj         -> pdf_obj_id spaces "obj" spaces:? pdf_value spaces:? "endobj" {% function(data) {  return { "t": "O", "v": { "i": data[0], "d": data[4] } } } %}
pdf_obj_ref     -> pdf_obj_id spaces "R"                {% function(data) { return { "t": "R", "v": data[0] } } %}
pdf_obj_id      -> pdf_obj_num spaces pdf_obj_gen       {% function(data) { return { "n": data[0], "g": data[2] } } %}
pdf_obj_num     -> digit:+                              {% function(data) { return data[0].join('') } %}      #10 DIGITS
pdf_obj_gen     -> digit:+                              {% function(data) { return data[0].join('') } %}      #5 DIGITS

pdf_value       -> pdf_null                 {% function(data) {  return { "t": "N", "v": data[0] } } %}
                |  pdf_boolean              {% function(data) {  return { "t": "B", "v": data[0] } } %}
                |  pdf_name                 {% function(data) {  return { "t": "M", "v": data[0] } } %}
                |  pdf_num                  {% function(data) {  return { "t": "U", "v": data[0] } } %}
                |  pdf_string               {% id %}
                |  pdf_array                {% function(data) {  return { "t": "A", "v": data[0] } } %}
                |  pdf_dict                 {% id %}
                |  pdf_stream               {% id %}
                |  pdf_obj                  {% id %}

pdf_stream      -> pdf_dict spaces:? "stream" pdf_stream_lines "endstream"  {% function(data) {  return { "t": "S", "v": { "i": data[0], "d": data[3] } } } %}
pdf_stream_lines-> pdf_stream_lines  end_of_line pdf_stream_line            {% function(data) {  return data[0] + data[2] ; } %}
                |  pdf_stream_line                                          {% id %}
pdf_stream_line -> ascii7_printable:+                           {% function(data) {  return data[0].join('') } %}
                |  null                                         {% function(data) {  return '' } %}
                #ALLOW EMPTY LINES IN STREAM

pdf_array       -> "[" spaces:? pdf_array_items spaces:? "]"    {% function(data) {  return data[2] } %}
                #TODO: allow empty array?
                                                                                 #/* console.log(">> "+JSON.stringify(data));*/
pdf_array_items -> pdf_array_items spaces pdf_array_item      {% function(data) {  return data[0].concat( data[2] ); } %}
                |  pdf_array_item                             {% function(data) {  return [ data[0][0] ] } %}

pdf_array_item  -> pdf_value                                  {% function(data) {  return [ data[0] ] } %}
                |  pdf_obj_ref                                {% function(data) {  return [ data[0] ] } %}

pdf_dict        -> "<<" spaces:? pdf_dict_entries spaces:? ">>"    {% function(data) {  return { "t": "D", "v": data[2] } } %}

pdf_dict_entries-> pdf_dict_entries spaces pdf_dict_entry       {% function(data) {  return data[0].concat( data[2] ); } %}
                |  pdf_dict_entry                               {% function(data) {  return [ data[0] ] } %}

pdf_dict_entry  -> pdf_name spaces pdf_dict_entry_value         {% function(data) {  return { "t": "e", "v": { "k":data[0], "v":data[2]} } } %}
pdf_dict_entry_value -> pdf_value                               {% id %}
                     |  pdf_obj_ref                             {% id %}

pdf_string      -> pdf_string_text                  {% function(data) {  return { "t": "T", "v": data[0] } } %}
                |  pdf_string_hexa                  {% function(data) {  return { "t": "H", "v": data[0] } } %}

pdf_string_hexa -> "<" digit_hexa:+ ">"             {% function(data) {  return data[1].join('') } %}

pdf_string_text -> "(" pdf_string_char:+ ")"        {% function(data) {  return data[1].join('') } %}

pdf_name        -> "/" ascii7_printable_wo_space:+
                                                    {% function(data) {
                                                        const val = data[0] + data[1].join('');
                                                        return val
                                                    } %}

pdf_string_char -> "\\("                                                            {% id %}
                |  "\\)"                                                            {% id %}
                |  "\\\\"                                                           {% id %}
                |  "\\" digit_octa digit_octa digit_octa                    {% function(data){ return data.join('');} %}
                |  ascii7_printable_wo_parentesis_backslash                         {% id %}
                #TODO: add first 20 ascii scape codes?

pdf_num         -> pdf_num_int                                                      {% id %}
                |  pdf_num_dec                                                      {% id %}

pdf_num_int     ->  ("+" | "-"):? digit:+
                                                                {% function(data) {
                                                                    const val = (data[0]?data[0]:'') + data[1].join('');
                                                                    return val
                                                                } %}

pdf_num_dec     -> pdf_num_int "." digit:+
                                                                {% function(data) {
                                                                    const val = data[0] + '.' + data[2].join('')
                                                                    return val
                                                                } %}

pdf_boolean     -> "true"                                                           {% id %}
                |  "false"                                                          {% id %}

pdf_null        -> "null"                                                           {% id %}

ascii7_printable-> ascii7_num_letter                                                {% id %}
                |  " "                                                              {% id %}
                |  ascii7_simbols                                                   {% id %}

ascii7_printable_wo_space -> ascii7_num_letter                                      {% id %}
                          |  ascii7_simbols                                         {% id %}

ascii7_printable_wo_parentesis_backslash -> ascii7_num_letter                       {% id %}
                               |  " "                                               {% id %}
                               |  ascii7_simbols_wo_parentesis_backslash            {% id %}

ascii7_num_letter               -> [a-zA-Z0-9]                                      {% id %}
ascii7_simbols                  -> [!"#$%&'()*+,-./:;<=>?@\[\\\]\^_`{|}~]           {% id %}
ascii7_simbols_wo_parentesis_backslash    -> [!"#$%&'*+,-./:;<=>?@\[\]\^_`{|}~]     {% id %}


digit_hexa      -> [0-9a-fA-F]                                                      {% id %}

digit           -> [0-9]                                                            {% id %}

digit_octa      -> [0-7]                                                            {% id %}

spaces          -> [ \n\r\t]:+                                                      {% id %}

end_of_line     -> [\n\r]:+                                                         {% id %}