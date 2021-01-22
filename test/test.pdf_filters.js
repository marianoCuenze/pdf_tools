var assert = require('assert');

const pdf_filters = require("../pdf_filters/pdf_filters");

describe('PDF', function () {
    describe('::FILTERS', function () {
        it('hex - encode ', function() {
            const result = pdf_filters.pdf_filter_hex_encode([0,255,14,14<<4+10])
            console.log(result)
            assert.equal(result, "00FF0DDA");
        });

        it('hex - decode ', function() {
            const result = pdf_filters.pdf_filter_hex_decode("00FF0DDA")
            console.log(result)
            assert.equal(result, [0,255,14,14<<4+10]);
        });

    });
});
