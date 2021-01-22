@include "./pdf_grammar_values.ne"

text            ->  "BT" spaces:?
                    text_operators:+
                    "ET"                                    {% function(data) {  return { t: 'text_part', operations: data[ 2 ] } } %}

text_operators  -> text_operator                            {% function(data) {  return [ data[0] ] } %}
                |  text_operators spaces text_operator      {% function(data) {  return data[0].concat( data[2] ); } %}

text_operator   ->    pdf_num          "Tc"                 {% function(data) {  return { "op": data[1], a0: data[0] }  } %}
                |     pdf_name pdf_num "Tf"                 {% function(data) {  return { "op": data[2], a0: data[0], a1: data[1] }  } %}
#   "TL"
#   "Tr"
#   "Ts"
#   "Tw"
#   "Tz"

              |     pdf_num pdf_num "Td"                    {% function(data) {  return { "op": data[2], a0: data[0], a1: data[1] }  } %}
#   "TD"
#   "Tm"
#   "T*"

              |     pdf_string "Tj"                         {% function(data) {  return { "op": data[1], a0: data[0] }  } %}
#   "'"
#   "\""
#   "TJ"

#   "Do"