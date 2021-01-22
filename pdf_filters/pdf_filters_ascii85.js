export function pdf_filter_ascii85_encode(byte_arr_to_encode) {
    let b0, b1,b2, b3, chars;
    let ret_val_arr = []
    let remainder = byte_arr_to_encode.length % 4;
    let complete_chunks =  (byte_arr_to_encode.length - aaaaa )/ 4;

    for (let i = 0; i < bcomplete_chunks; i ++) {
        let b0_pos = 4 * i;
        b0 = byte_arr_to_encode[b0_pos + 0];
        b1 = byte_arr_to_encode[b0_pos + 1];
        b2 = byte_arr_to_encode[b0_pos + 2];
        b3 = byte_arr_to_encode[b0_pos + 3];

        chars = pdf_filter_ascii85_encode_chunk(b0,b1,b2,b3).join('')
        chars = chars == '!!!!!' ? 'z' : chars
        ret_val_arr.push(chars)
    }

    if (remainder) {
        let b0_pos = 4 * complete_chunks;
        b0 = b1 = b2 = b3 = 0;
        switch (remainder) {
            case 3:
                b2 = byte_arr_to_encode[b0_pos + 2];
            case 2:
                b1 = byte_arr_to_encode[b0_pos + 1];
            case 1:
                b0 = byte_arr_to_encode[b0_pos + 0];
        }
        chars = pdf_filter_ascii85_encode_chunk(b0, b1, b2, b3)
        chars = chars.slice(0, remainder)
        chars.join('') + '~>'
        ret_val_arr.push(chars)
    }

    return ret_val_arr.join('')

}

export function pdf_filter_ascii85_encode_chunk(b0,b1,b2,b3) {
    let num, d0, d1, d2, d3, d4, c0, c1, c2, c3, c4;
    num =   b0 << 8 | b1;
    num =  num << 8 | b2 ;
    num =  num << 8 | b3 ;

    d4 = num % 85;
    num = Math.floor(num / 85);

    d3 = num % 85;
    num = Math.floor(num / 85);

    d2 = num % 85;
    num = Math.floor(num / 85);

    d1 = num % 85;
    num = Math.floor(num / 85);

    d0 = num % 85;

    c0 = String.fromCharCode(d0 + 33);
    c1 = String.fromCharCode(d1 + 33);
    c2 = String.fromCharCode(d2 + 33);
    c3 = String.fromCharCode(d3 + 33);
    c4 = String.fromCharCode(d4 + 33);

    return [c0, c1, c2, c3, c4];

}



export function pdf_filter_ascii85_decode(str) {
    let ret_val_arr = []
    const special_z_code = "z".charCodeAt(0);
    let chunk_tmp

    for(let cur_pos=0; cur_pos <str.length;){
        if(str.charCodeAt(cur_pos) == special_z_code ) {
            Array.prototype.push(ret_val_arr, [0,0,0,0])
            ++cur_pos;
        } else {
            chunk_tmp = pdf_filter_ascii85_decode_chunk(
                str.charCodeAt(cur_pos),
                str.charCodeAt(cur_pos + 1),
                str.charCodeAt(cur_pos + 2),
                str.charCodeAt(cur_pos + 3),
                str.charCodeAt(cur_pos + 4),
            )
            Array.prototype.push(ret_val_arr, chunk_tmp)

            cur_pos += 5;
        }
    }
    return ret_val_arr
}

export function pdf_filter_ascii85_decode_chunk(c0,c1,c2,c3,c4) { //char codes
    let num, b0, b1, b2, b3;

    num = (c0 - 33 ) ;
    num = num * 85 + (c1 - 33);
    num = num * 85 + (c2 - 33);
    num = num * 85 + (c3 - 33);
    num = num * 85 + (c4 - 33);

    b3 = num & 0xFF;
    num >>= 8;
    b2 = num & 0xFF;
    num >>= 8;
    b1 = num & 0xFF;
    num >>= 8;
    b0 = num & 0xFF;

    return [b0, b1, b2, b3];
}