export function pdf_filter_hex_encode(byte_arr_to_encode) {
    let b0, chars;
    let ret_val_arr = []

    const bin_2_char = [ '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F']
    for (let i = 0; i < byte_arr_to_encode.length; i ++) {
        b0 = byte_arr_to_encode[i]
        ret_val_arr.push(
             bin_2_char[ b0 & 0xF ]
            ,bin_2_char[ (b0>>4) & 0xF ]
        );
    }
    return bin_2_char.join('')
}

export function pdf_filter_hex_decode(str) {
    let ret_val_arr = []
    const special_z_code = "z".charCodeAt(0);
    let chunk_tmp

    for(let cur_pos=0; cur_pos <str.length;){
        if(str.charCodeAt(cur_pos) == special_z_code ) {