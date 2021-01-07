@include "./pdf_grammar_values.ne"

pdf                     -> pdf_header   spaces:?
                           pdf_body     spaces:?        #TODO: HANDLE pdf_comments
                           pdf_xtable   spaces:?        #TODO: HANDLE incremental updates
                           pdf_trailer                   {% function(data) {
                                                                return {
                                                                    header: data[0],
                                                                    body: data[2],
                                                                    xtable: data[4],
                                                                    trailer: data[6]
                                                                }
                                                            }
                                                         %}

pdf_header              -> "%PDF-1.0"                   {% id %}

pdf_body                -> pdf_objs                     {% id %}
##                      |  pdf_comment
## pdf_comment          -> "%" [^\n\r]:* end_of_line

pdf_xtable              -> pdf_xtable_section:+         {% function(data) {
                                                                return {
                                                                    sections: data[0]
                                                                }
                                                         } %}

pdf_xtable_section      -> "xref"    spaces
                           pdf_xtable_subsection:+      {% function(data) {
                                                                return {
                                                                    subsections: data[2]
                                                                }
                                                         } %}

pdf_xtable_subsection   -> pdf_num_int  spaces
                           pdf_num_int  spaces
                           pdf_xtable_entries                       {% function(data) {
                                                                        return {
                                                                            "initial_obj_num": data[0],
                                                                            "amount_of_obj_num": data[2],
                                                                            "entries": data[4]
                                                                        }
                                                                    }%}

pdf_xtable_entries      -> pdf_xtable_entry                                 {% function(data) {  return [ data[0] ] } %}
                        |  pdf_xtable_entries pdf_xtable_entry              {% function(data) {  return data[0].concat( data[1] ); } %}

pdf_xtable_entry        -> pdf_10_digits " " pdf_5_digits " " [nf] end_of_line          {% function(data) {
                                                                                                return Object.assign(
                                                                                                {
                                                                                                    "t":data[4],
                                                                                                    gen_num:data[2]
                                                                                                },
                                                                                                  (data[4] == 'n') ?
                                                                                                    {bit_off:data[0]}
                                                                                                    :
                                                                                                    {next_free_obj:data[0]}
                                                                                                );
                                                                                            }
                                                                                        %}

pdf_10_digits           -> digit digit digit digit digit digit digit digit digit digit  {% function(data) { return data.join('') } %}
pdf_5_digits            -> digit digit digit digit digit                                {% function(data) { return data.join('') } %}

pdf_trailer     -> "trailer"    spaces
                   pdf_dict     spaces
                   "startxref"  spaces
                   pdf_num_int  spaces
                   "%%EOF"                                              {% function(data) {
                                                                                return {
                                                                                    dict: data[2],
                                                                                    startxref: data[6]
                                                                                }
                                                                            }
                                                                         %}

pdf_objs        -> pdf_obj                                              {% function(data) {  return [ data[0] ] } %}
                |  pdf_objs spaces pdf_obj                              {% function(data) {  return data[0].concat( data[2] ); } %}
