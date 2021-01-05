@include "./pdf_grammar_values.ne"

pdf                     -> pdf_header   spaces:?
                           pdf_body     spaces:?        #TODO: HANDLE pdf_comments
                           pdf_xtable   spaces:?        #TODO: HANDLE incremental updates
                           pdf_trailer

pdf_header              -> "%PDF-1.0"

pdf_body                -> pdf_objs
##                      |  pdf_comment
## pdf_comment          -> "%" [^\n\r]:* end_of_line

pdf_xtable              -> pdf_xtable_section:+

pdf_xtable_section      -> "xref"    spaces
                           pdf_xtable_subsection:+

pdf_xtable_subsection   -> pdf_num_int  spaces
                           pdf_num_int  spaces
                           pdf_xtable_entries

pdf_xtable_entries      -> pdf_xtable_entry
                        |  pdf_xtable_entries pdf_xtable_entry

pdf_xtable_entry        -> pdf_10_digits " " pdf_5_digits " " "n" end_of_line
                        |  pdf_10_digits " " pdf_5_digits " " "f" spaces

pdf_10_digits           -> digit digit digit digit digit digit digit digit digit digit
pdf_5_digits            -> digit digit digit digit digit

pdf_trailer     -> "trailer"    spaces
                   pdf_dict     spaces
                   "startxref"   spaces
                   pdf_num_int  spaces
                   "%%EOF"

pdf_objs        -> pdf_obj
                |  pdf_objs spaces pdf_obj
