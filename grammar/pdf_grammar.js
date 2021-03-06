// Generated automatically by nearley, version 2.20.1
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }

//   const pdf_values = require("../../values/pdf_values.js");
var grammar = {
    Lexer: undefined,
    ParserRules: [
    {"name": "pdf_obj$string$1", "symbols": [{"literal":"o"}, {"literal":"b"}, {"literal":"j"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "pdf_obj$ebnf$1", "symbols": ["spaces"], "postprocess": id},
    {"name": "pdf_obj$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "pdf_obj$ebnf$2", "symbols": ["spaces"], "postprocess": id},
    {"name": "pdf_obj$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "pdf_obj$string$2", "symbols": [{"literal":"e"}, {"literal":"n"}, {"literal":"d"}, {"literal":"o"}, {"literal":"b"}, {"literal":"j"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "pdf_obj", "symbols": ["pdf_obj_id", "spaces", "pdf_obj$string$1", "pdf_obj$ebnf$1", "pdf_value", "pdf_obj$ebnf$2", "pdf_obj$string$2"], "postprocess": function(data) {  return { "t": "O", "v": { "i": data[0], "d": data[4] } } }},
    {"name": "pdf_obj_ref", "symbols": ["pdf_obj_id", "spaces", {"literal":"R"}], "postprocess": function(data) { return { "t": "R", "v": data[0] } }},
    {"name": "pdf_obj_id", "symbols": ["pdf_obj_num", "spaces", "pdf_obj_gen"], "postprocess": function(data) { return { "n": data[0], "g": data[2] } }},
    {"name": "pdf_obj_num$ebnf$1", "symbols": ["digit"]},
    {"name": "pdf_obj_num$ebnf$1", "symbols": ["pdf_obj_num$ebnf$1", "digit"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "pdf_obj_num", "symbols": ["pdf_obj_num$ebnf$1"], "postprocess": function(data) { return data[0].join('') }},
    {"name": "pdf_obj_gen$ebnf$1", "symbols": ["digit"]},
    {"name": "pdf_obj_gen$ebnf$1", "symbols": ["pdf_obj_gen$ebnf$1", "digit"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "pdf_obj_gen", "symbols": ["pdf_obj_gen$ebnf$1"], "postprocess": function(data) { return data[0].join('') }},
    {"name": "pdf_value", "symbols": ["pdf_null"], "postprocess": function(data) {  return { "t": "N", "v": data[0] } }},
    {"name": "pdf_value", "symbols": ["pdf_boolean"], "postprocess": function(data) {  return { "t": "B", "v": data[0] } }},
    {"name": "pdf_value", "symbols": ["pdf_name"], "postprocess": function(data) {  return { "t": "M", "v": data[0] } }},
    {"name": "pdf_value", "symbols": ["pdf_num"], "postprocess": function(data) {  return { "t": "U", "v": data[0] } }},
    {"name": "pdf_value", "symbols": ["pdf_string"], "postprocess": id},
    {"name": "pdf_value", "symbols": ["pdf_array"], "postprocess": function(data) {  return { "t": "A", "v": data[0] } }},
    {"name": "pdf_value", "symbols": ["pdf_dict"], "postprocess": id},
    {"name": "pdf_value", "symbols": ["pdf_stream"], "postprocess": id},
    {"name": "pdf_value", "symbols": ["pdf_obj"], "postprocess": id},
    {"name": "pdf_stream$ebnf$1", "symbols": ["spaces"], "postprocess": id},
    {"name": "pdf_stream$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "pdf_stream$string$1", "symbols": [{"literal":"s"}, {"literal":"t"}, {"literal":"r"}, {"literal":"e"}, {"literal":"a"}, {"literal":"m"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "pdf_stream$string$2", "symbols": [{"literal":"e"}, {"literal":"n"}, {"literal":"d"}, {"literal":"s"}, {"literal":"t"}, {"literal":"r"}, {"literal":"e"}, {"literal":"a"}, {"literal":"m"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "pdf_stream", "symbols": ["pdf_dict", "pdf_stream$ebnf$1", "pdf_stream$string$1", "pdf_stream_lines", "pdf_stream$string$2"], "postprocess": function(data) {  return { "t": "S", "v": { "i": data[0], "d": data[3] } } }},
    {"name": "pdf_stream_lines", "symbols": ["pdf_stream_lines", "end_of_line", "pdf_stream_line"], "postprocess": function(data) {  return data[0] + data[2] ; }},
    {"name": "pdf_stream_lines", "symbols": ["pdf_stream_line"], "postprocess": id},
    {"name": "pdf_stream_line$ebnf$1", "symbols": ["ascii7_printable"]},
    {"name": "pdf_stream_line$ebnf$1", "symbols": ["pdf_stream_line$ebnf$1", "ascii7_printable"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "pdf_stream_line", "symbols": ["pdf_stream_line$ebnf$1"], "postprocess": function(data) {  return data[0].join('') }},
    {"name": "pdf_stream_line", "symbols": [], "postprocess": function(data) {  return '' }},
    {"name": "pdf_array$ebnf$1", "symbols": ["spaces"], "postprocess": id},
    {"name": "pdf_array$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "pdf_array$ebnf$2", "symbols": ["spaces"], "postprocess": id},
    {"name": "pdf_array$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "pdf_array", "symbols": [{"literal":"["}, "pdf_array$ebnf$1", "pdf_array_items", "pdf_array$ebnf$2", {"literal":"]"}], "postprocess": function(data) {  return data[2] }},
    {"name": "pdf_array_items", "symbols": ["pdf_array_items", "spaces", "pdf_array_item"], "postprocess": function(data) {  return data[0].concat( data[2] ); }},
    {"name": "pdf_array_items", "symbols": ["pdf_array_item"], "postprocess": function(data) {  return [ data[0][0] ] }},
    {"name": "pdf_array_item", "symbols": ["pdf_value"], "postprocess": function(data) {  return [ data[0] ] }},
    {"name": "pdf_array_item", "symbols": ["pdf_obj_ref"], "postprocess": function(data) {  return [ data[0] ] }},
    {"name": "pdf_dict$string$1", "symbols": [{"literal":"<"}, {"literal":"<"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "pdf_dict$ebnf$1", "symbols": ["spaces"], "postprocess": id},
    {"name": "pdf_dict$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "pdf_dict$ebnf$2", "symbols": ["spaces"], "postprocess": id},
    {"name": "pdf_dict$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "pdf_dict$string$2", "symbols": [{"literal":">"}, {"literal":">"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "pdf_dict", "symbols": ["pdf_dict$string$1", "pdf_dict$ebnf$1", "pdf_dict_entries", "pdf_dict$ebnf$2", "pdf_dict$string$2"], "postprocess": function(data) {  return { "t": "D", "v": data[2] } }},
    {"name": "pdf_dict_entries", "symbols": ["pdf_dict_entries", "spaces", "pdf_dict_entry"], "postprocess": function(data) {  return data[0].concat( data[2] ); }},
    {"name": "pdf_dict_entries", "symbols": ["pdf_dict_entry"], "postprocess": function(data) {  return [ data[0] ] }},
    {"name": "pdf_dict_entry", "symbols": ["pdf_name", "spaces", "pdf_dict_entry_value"], "postprocess": function(data) {  return { "t": "e", "v": { "k":data[0], "v":data[2]} } }},
    {"name": "pdf_dict_entry_value", "symbols": ["pdf_value"], "postprocess": id},
    {"name": "pdf_dict_entry_value", "symbols": ["pdf_obj_ref"], "postprocess": id},
    {"name": "pdf_string", "symbols": ["pdf_string_text"], "postprocess": function(data) {  return { "t": "T", "v": data[0] } }},
    {"name": "pdf_string", "symbols": ["pdf_string_hexa"], "postprocess": function(data) {  return { "t": "H", "v": data[0] } }},
    {"name": "pdf_string_hexa$ebnf$1", "symbols": ["digit_hexa"]},
    {"name": "pdf_string_hexa$ebnf$1", "symbols": ["pdf_string_hexa$ebnf$1", "digit_hexa"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "pdf_string_hexa", "symbols": [{"literal":"<"}, "pdf_string_hexa$ebnf$1", {"literal":">"}], "postprocess": function(data) {  return data[1].join('') }},
    {"name": "pdf_string_text$ebnf$1", "symbols": ["pdf_string_char"]},
    {"name": "pdf_string_text$ebnf$1", "symbols": ["pdf_string_text$ebnf$1", "pdf_string_char"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "pdf_string_text", "symbols": [{"literal":"("}, "pdf_string_text$ebnf$1", {"literal":")"}], "postprocess": function(data) {  return data[1].join('') }},
    {"name": "pdf_name$ebnf$1", "symbols": ["ascii7_printable_wo_space"]},
    {"name": "pdf_name$ebnf$1", "symbols": ["pdf_name$ebnf$1", "ascii7_printable_wo_space"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "pdf_name", "symbols": [{"literal":"/"}, "pdf_name$ebnf$1"], "postprocess":  function(data) {
            const val = data[0] + data[1].join('');
            return val
        } },
    {"name": "pdf_string_char$string$1", "symbols": [{"literal":"\\"}, {"literal":"("}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "pdf_string_char", "symbols": ["pdf_string_char$string$1"], "postprocess": id},
    {"name": "pdf_string_char$string$2", "symbols": [{"literal":"\\"}, {"literal":")"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "pdf_string_char", "symbols": ["pdf_string_char$string$2"], "postprocess": id},
    {"name": "pdf_string_char$string$3", "symbols": [{"literal":"\\"}, {"literal":"\\"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "pdf_string_char", "symbols": ["pdf_string_char$string$3"], "postprocess": id},
    {"name": "pdf_string_char", "symbols": [{"literal":"\\"}, "digit_octa", "digit_octa", "digit_octa"], "postprocess": function(data){ return data.join('');}},
    {"name": "pdf_string_char", "symbols": ["ascii7_printable_wo_parentesis_backslash"], "postprocess": id},
    {"name": "pdf_num", "symbols": ["pdf_num_int"], "postprocess": id},
    {"name": "pdf_num", "symbols": ["pdf_num_dec"], "postprocess": id},
    {"name": "pdf_num_int$ebnf$1$subexpression$1", "symbols": [{"literal":"+"}]},
    {"name": "pdf_num_int$ebnf$1$subexpression$1", "symbols": [{"literal":"-"}]},
    {"name": "pdf_num_int$ebnf$1", "symbols": ["pdf_num_int$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "pdf_num_int$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "pdf_num_int$ebnf$2", "symbols": ["digit"]},
    {"name": "pdf_num_int$ebnf$2", "symbols": ["pdf_num_int$ebnf$2", "digit"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "pdf_num_int", "symbols": ["pdf_num_int$ebnf$1", "pdf_num_int$ebnf$2"], "postprocess":  function(data) {
            const val = (data[0]?data[0]:'') + data[1].join('');
            return val
        } },
    {"name": "pdf_num_dec$ebnf$1", "symbols": ["digit"]},
    {"name": "pdf_num_dec$ebnf$1", "symbols": ["pdf_num_dec$ebnf$1", "digit"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "pdf_num_dec", "symbols": ["pdf_num_int", {"literal":"."}, "pdf_num_dec$ebnf$1"], "postprocess":  function(data) {
            const val = data[0] + '.' + data[2].join('')
            return val
        } },
    {"name": "pdf_boolean$string$1", "symbols": [{"literal":"t"}, {"literal":"r"}, {"literal":"u"}, {"literal":"e"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "pdf_boolean", "symbols": ["pdf_boolean$string$1"], "postprocess": id},
    {"name": "pdf_boolean$string$2", "symbols": [{"literal":"f"}, {"literal":"a"}, {"literal":"l"}, {"literal":"s"}, {"literal":"e"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "pdf_boolean", "symbols": ["pdf_boolean$string$2"], "postprocess": id},
    {"name": "pdf_null$string$1", "symbols": [{"literal":"n"}, {"literal":"u"}, {"literal":"l"}, {"literal":"l"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "pdf_null", "symbols": ["pdf_null$string$1"], "postprocess": id},
    {"name": "ascii7_printable", "symbols": ["ascii7_num_letter"], "postprocess": id},
    {"name": "ascii7_printable", "symbols": [{"literal":" "}], "postprocess": id},
    {"name": "ascii7_printable", "symbols": ["ascii7_simbols"], "postprocess": id},
    {"name": "ascii7_printable_wo_space", "symbols": ["ascii7_num_letter"], "postprocess": id},
    {"name": "ascii7_printable_wo_space", "symbols": ["ascii7_simbols"], "postprocess": id},
    {"name": "ascii7_printable_wo_parentesis_backslash", "symbols": ["ascii7_num_letter"], "postprocess": id},
    {"name": "ascii7_printable_wo_parentesis_backslash", "symbols": [{"literal":" "}], "postprocess": id},
    {"name": "ascii7_printable_wo_parentesis_backslash", "symbols": ["ascii7_simbols_wo_parentesis_backslash"], "postprocess": id},
    {"name": "ascii7_num_letter", "symbols": [/[a-zA-Z0-9]/], "postprocess": id},
    {"name": "ascii7_simbols", "symbols": [/[!"#$%&'()*+,-.\/:;<=>?@\[\\\]\^_`{|}~]/], "postprocess": id},
    {"name": "ascii7_simbols_wo_parentesis_backslash", "symbols": [/[!"#$%&'*+,-.\/:;<=>?@\[\]\^_`{|}~]/], "postprocess": id},
    {"name": "digit_hexa", "symbols": [/[0-9a-fA-F]/], "postprocess": id},
    {"name": "digit", "symbols": [/[0-9]/], "postprocess": id},
    {"name": "digit_octa", "symbols": [/[0-7]/], "postprocess": id},
    {"name": "spaces$ebnf$1", "symbols": [/[ \n\r\t]/]},
    {"name": "spaces$ebnf$1", "symbols": ["spaces$ebnf$1", /[ \n\r\t]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "spaces", "symbols": ["spaces$ebnf$1"], "postprocess": id},
    {"name": "end_of_line$ebnf$1", "symbols": [/[\n\r]/]},
    {"name": "end_of_line$ebnf$1", "symbols": ["end_of_line$ebnf$1", /[\n\r]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "end_of_line", "symbols": ["end_of_line$ebnf$1"], "postprocess": id},
    {"name": "pdf$ebnf$1", "symbols": ["spaces"], "postprocess": id},
    {"name": "pdf$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "pdf$ebnf$2", "symbols": ["spaces"], "postprocess": id},
    {"name": "pdf$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "pdf$ebnf$3", "symbols": ["spaces"], "postprocess": id},
    {"name": "pdf$ebnf$3", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "pdf", "symbols": ["pdf_header", "pdf$ebnf$1", "pdf_body", "pdf$ebnf$2", "pdf_xtable", "pdf$ebnf$3", "pdf_trailer"], "postprocess":  function(data) {
            return {
                header: data[0],
                body: data[2],
                xtable: data[4],
                trailer: data[6]
            }
        }
                                                                 },
    {"name": "pdf_header$string$1", "symbols": [{"literal":"%"}, {"literal":"P"}, {"literal":"D"}, {"literal":"F"}, {"literal":"-"}, {"literal":"1"}, {"literal":"."}, {"literal":"0"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "pdf_header", "symbols": ["pdf_header$string$1"], "postprocess": id},
    {"name": "pdf_body", "symbols": ["pdf_objs"], "postprocess": id},
    {"name": "pdf_xtable$ebnf$1", "symbols": ["pdf_xtable_section"]},
    {"name": "pdf_xtable$ebnf$1", "symbols": ["pdf_xtable$ebnf$1", "pdf_xtable_section"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "pdf_xtable", "symbols": ["pdf_xtable$ebnf$1"], "postprocess":  function(data) {
               return {
                   sections: data[0]
               }
        } },
    {"name": "pdf_xtable_section$string$1", "symbols": [{"literal":"x"}, {"literal":"r"}, {"literal":"e"}, {"literal":"f"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "pdf_xtable_section$ebnf$1", "symbols": ["pdf_xtable_subsection"]},
    {"name": "pdf_xtable_section$ebnf$1", "symbols": ["pdf_xtable_section$ebnf$1", "pdf_xtable_subsection"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "pdf_xtable_section", "symbols": ["pdf_xtable_section$string$1", "spaces", "pdf_xtable_section$ebnf$1"], "postprocess":  function(data) {
               return {
                   subsections: data[2]
               }
        } },
    {"name": "pdf_xtable_subsection", "symbols": ["pdf_num_int", "spaces", "pdf_num_int", "spaces", "pdf_xtable_entries"], "postprocess":  function(data) {
            return {
                "initial_obj_num": data[0],
                "amount_of_obj_num": data[2],
                "entries": data[4]
            }
        }},
    {"name": "pdf_xtable_entries", "symbols": ["pdf_xtable_entry"], "postprocess": function(data) {  return [ data[0] ] }},
    {"name": "pdf_xtable_entries", "symbols": ["pdf_xtable_entries", "pdf_xtable_entry"], "postprocess": function(data) {  return data[0].concat( data[1] ); }},
    {"name": "pdf_xtable_entry", "symbols": ["pdf_10_digits", {"literal":" "}, "pdf_5_digits", {"literal":" "}, /[nf]/, "end_of_line"], "postprocess":  function(data) {
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
                                                                                                },
    {"name": "pdf_10_digits", "symbols": ["digit", "digit", "digit", "digit", "digit", "digit", "digit", "digit", "digit", "digit"], "postprocess": function(data) { return data.join('') }},
    {"name": "pdf_5_digits", "symbols": ["digit", "digit", "digit", "digit", "digit"], "postprocess": function(data) { return data.join('') }},
    {"name": "pdf_trailer$string$1", "symbols": [{"literal":"t"}, {"literal":"r"}, {"literal":"a"}, {"literal":"i"}, {"literal":"l"}, {"literal":"e"}, {"literal":"r"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "pdf_trailer$string$2", "symbols": [{"literal":"s"}, {"literal":"t"}, {"literal":"a"}, {"literal":"r"}, {"literal":"t"}, {"literal":"x"}, {"literal":"r"}, {"literal":"e"}, {"literal":"f"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "pdf_trailer$string$3", "symbols": [{"literal":"%"}, {"literal":"%"}, {"literal":"E"}, {"literal":"O"}, {"literal":"F"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "pdf_trailer", "symbols": ["pdf_trailer$string$1", "spaces", "pdf_dict", "spaces", "pdf_trailer$string$2", "spaces", "pdf_num_int", "spaces", "pdf_trailer$string$3"], "postprocess":  function(data) {
            return {
                dict: data[2],
                startxref: data[6]
            }
        }
                                                                                 },
    {"name": "pdf_objs", "symbols": ["pdf_obj"], "postprocess": function(data) {  return [ data[0] ] }},
    {"name": "pdf_objs", "symbols": ["pdf_objs", "spaces", "pdf_obj"], "postprocess": function(data) {  return data[0].concat( data[2] ); }}
]
  , ParserStart: "pdf"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
