var pdf_filter_ascii85 = require ('./pdf_filters_ascii85.js')
var pdf_filter_hex = require ('./pdf_filters_hex.js')

pdf_filter_ascii85_encode = pdf_filter_ascii85.pdf_filter_ascii85_encode;
pdf_filter_ascii85_decode = pdf_filter_ascii85.pdf_filter_ascii85_decode;
pdf_filter_hex_encode = pdf_filter_hex.pdf_filter_hex_encode;
pdf_filter_hex_decode = pdf_filter_hex.pdf_filter_hex_decode;

module.exports = {    pdf_filter_hex_encode    , pdf_filter_hex_decode
                    , pdf_filter_ascii85_encode, pdf_filter_ascii85_decode }