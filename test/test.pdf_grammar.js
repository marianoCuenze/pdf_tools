var assert = require('assert');

const nearley = require("nearley");
const pdf_raw_js_grammar = require("../grammar/pdf_grammar.js");
const pdf_values_raw_js_grammar = require("./grammar/pdf_grammar_values_testable.js");

function new_pdf_parser() {
    const pdf_parser = new nearley.Parser(nearley.Grammar.fromCompiled(pdf_raw_js_grammar));
    return pdf_parser;
}

function new_pdf_value_parser() {
    const pdf_parser = new nearley.Parser(nearley.Grammar.fromCompiled(pdf_values_raw_js_grammar));
    return pdf_parser;
}

function parse_pdf(pdf_string) {

    const pdf_parser = new_pdf_parser()
    pdf_parser.feed(pdf_string)
    return pdf_parser.results
}

function parse_pdf_values(pdf_string) {

    const pdf_parser = new_pdf_value_parser()
    pdf_parser.feed(pdf_string)
    return pdf_parser.results
}
describe('PDF', function () {
    describe('::GRAMMAR', function () {
        describe('::values', function () {

            describe('#null', function () {
                it('should parse pdf null values', function () {
                    const results = parse_pdf_values("null")

                    console.log(JSON.stringify(results))
                    assert.equal(results.length, 1);
                });
            });

            describe('#booleans', function () {

                it('should parse pdf boolean true', function () {
                    const results = parse_pdf_values("true")

                    console.log(JSON.stringify(results))
                    assert.equal(results.length, 1);
                });
                it('should parse pdf boolean false', function () {
                    const results = parse_pdf_values("false")

                    console.log(JSON.stringify(results))
                    assert.equal(results.length, 1);
                });

            });

            describe('#numbers', function () {
                it('should parse pdf numbers: int', function () {
                    const results = parse_pdf_values("1")

                    console.log(JSON.stringify(results))
                    assert.equal(results.length, 1);
                });
                it('should parse pdf numbers: int bigger', function () {
                    const results = parse_pdf_values("12345")

                    console.log(JSON.stringify(results))
                    assert.equal(results.length, 1);
                });
                it('should parse pdf numbers: signed int bigger', function () {
                    const results = parse_pdf_values("-12345")

                    console.log(JSON.stringify(results))
                    assert.equal(results.length, 1);
                });
                it('should parse pdf numbers: real', function () {
                    const results = parse_pdf_values("-12.345")

                    console.log(JSON.stringify(results))
                    assert.equal(results.length, 1);
                });
            });

            describe('#hexa strings', function () {
                it('should parse pdf hexa strings: odd char number', function () {

                    const results = parse_pdf_values("<0>")

                    console.log(JSON.stringify(results))
                    assert.equal(results.length, 1);
                });
                it('should parse pdf hexa strings: even char number', function () {
                    const results = parse_pdf_values("<a1>")

                    console.log(JSON.stringify(results))
                    assert.equal(results.length, 1);
                });
            });

            describe('#text strings', function () {
                it('should parse pdf text strings: 1 char', function () {
                const results = parse_pdf_values("(a)")

                    console.log(JSON.stringify(results))
                    assert.equal(results.length, 1);
                });
                it('should parse pdf text strings: special ( char', function () {
                    const results = parse_pdf_values("(\\()")

                    console.log(JSON.stringify(results))
                    assert.equal(results.length, 1);
                });
                it('should parse pdf text strings: special ) char', function () {
                    const results = parse_pdf_values("(\\))")

                    console.log(JSON.stringify(results))
                    assert.equal(results.length, 1);
                });
                it('should parse pdf text strings: special octal char', function () {
                    const results = parse_pdf_values("(\\000)")

                    console.log(JSON.stringify(results))
                    assert.equal(results.length, 1);
                });
                it('should parse pdf text strings: special octal max char', function () {
                    const results = parse_pdf_values("(\\777)")

                    console.log(JSON.stringify(results))
                    assert.equal(results.length, 1);
                });
                it('should parse pdf text strings: several characters', function () {
                    const results = parse_pdf_values("(a b c 0 A)")

                    console.log(JSON.stringify(results))
                    assert.equal(results.length, 1);
                });
            });


            describe('#names', function () {
                it('should parse pdf name: simple', function () {
                    const results = parse_pdf_values("/a")

                    console.log(JSON.stringify(results))
                    assert.equal(results.length, 1);
                });
                it('should parse pdf name: ugly name', function () {
                    const results = parse_pdf_values("/a!#$%&/()")

                    console.log(JSON.stringify(results))
                    assert.equal(results.length, 1);
                });
            });

            describe('#array', function () {
                it('should parse pdf array: 1 item', function () {
                    const results = parse_pdf_values("[null]")

                    console.log(JSON.stringify(results))
                    assert.equal(results.length, 1);
                });
                it('should parse pdf array: 1 item', function () {
                    const results = parse_pdf_values("[1]")

                    console.log(JSON.stringify(results))
                    assert.equal(results.length, 1);
                });
                it('should parse pdf array: 1 item', function () {
                    const results = parse_pdf_values("[1 2 3]")

                    console.log(JSON.stringify(results))
                    assert.equal(results.length, 1);
                });
                it('should parse pdf array: N item', function () {
                    const results = parse_pdf_values("[ null true (1) [false]]")

                    console.log(JSON.stringify(results))
                    assert.equal(results.length, 1);
                });
            });

            describe('#dict', function () {
                it('should parse pdf dict: 1 entry', function () {
                    //const results = parse_pdf("<< /key1 null /key2 true /key3 [null] /key4 <</k1 (a)>> >>")
                    const results = parse_pdf_values("<< /key1 null >>")

                    console.log(JSON.stringify(results))
                    assert.equal(results.length, 1);
                });
                it('should parse pdf dict: 2 entries', function () {
                    //const results = parse_pdf("<< /key1 null /key2 true /key3 [null] /key4 <</k1 (a)>> >>")
                    const results = parse_pdf_values("<< /key1 null /key2 true >>")

                    console.log(JSON.stringify(results))
                    assert.equal(results.length, 1);
                });
            });

            describe('#streams', function () {
                it('should parse pdf streams: minimal', function () {
                    const results = parse_pdf_values("<</k1 (a)>> streamAendstream")

                    console.log(JSON.stringify(results))
                    assert.equal(results.length, 1);
                });
                it('should parse pdf streams: long stream', function () {
                    const results = parse_pdf_values("<</k1 (a) >> streamA\nAA\nBB\nendstream")

                    console.log(JSON.stringify(results))
                    assert.equal(results.length, 1);
                });
            });

            describe('#objects', function () {
                it('should parse pdf object: minimal', function () {
                    const results = parse_pdf_values("0 0 obj null endobj")

                    console.log(JSON.stringify(results))
                    assert.equal(results.length, 1);
                });
                it('should parse pdf object: with arr', function () {
                    const results = parse_pdf_values("10 2 obj [ (a) ] endobj")

                    console.log(JSON.stringify(results))
                    assert.equal(results.length, 1);
                });
                it('should parse pdf object: arr wirh OBJ REF', function () {
                    const results = parse_pdf_values("[ 0 0 R  (aa) ]")

                    console.log(JSON.stringify(results))
                    assert.equal(results.length, 1);
                });
                it('should parse pdf object: obj wirh OBJ REF', function () {
                    const results = parse_pdf_values("<< /key1 1 2 R >>")

                    console.log(JSON.stringify(results))
                    assert.equal(results.length, 1);
                });
            });


        });

        describe('::fileformat', function () {

            describe('::minimal file', function () {

                it('should parse pdf minimal format', function () {
                    const results = parse_pdf(
                        `%PDF-1.0
1 0 obj
<<
/Type /Catalog
/Pages 3 0 R
/Outlines 2 0 R
>>
endobj
2 0 obj
<<
/Type /Outlines
/Count 0
>>
endobj
xref
0 7
0000000000 65535 f
0000000009 00000 n
0000000074 00000 n
trailer
<<
/Size 2
/Root 1 0 R
>>
startxref
408
%%EOF`
                    )

                    console.log(JSON.stringify(results))
                    assert.equal(results.length, 1);
                });
                it('should parse pdf minimal valid format', function () {
                    const results = parse_pdf(
                        `%PDF-1.0
1 0 obj
<<
/Type /Catalog
/Pages 3 0 R
/Outlines 2 0 R
>>
endobj
2 0 obj
<<
/Type /Outlines
/Count 0
>>
endobj
3 0 obj
<<
/Type /Pages
/Count 1
/Kids [ 4 0 R ]
>>
endobj
4 0 obj
<<
/Type /Page
/Parent 3 0 R
/Resources << /ProcSet 6 0 R >>
/MediaBox [ 0 0 612 792 ]
/Contents 5 0 R
>>
endobj
5 0 obj
<< /Length 35 >>
stream
%place page marking operators here
endstream
endobj
6 0 obj
[ /PDF ]
endobj
xref
0 7
0000000000 65535 f
0000000009 00000 n
0000000074 00000 n
0000000120 00000 n
0000000179 00000 n
0000000300 00000 n
0000000384 00000 n
trailer
<<
/Size 7
/Root 1 0 R
>>
startxref
408
%%EOF`
                    )

                    console.log(JSON.stringify(results))
                    assert.equal(results.length, 1);
                });
            });

        });
    });
});
