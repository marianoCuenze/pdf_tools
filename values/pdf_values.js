function pdf_val_null_new () {
    return {
        "type": "pdf_val_null",
        "val": null
    }
}

function pdf_val_bool_new (val) {

    return {
        "type": "pdf_val_bool",
        "val": ( typeof val === 'string' ? val === "true" : val )
    }
}

function pdf_val_bool_new (val) {

    return {
        "type": "pdf_val_bool",
        "val": ( typeof val === 'string' ? val === "true" : val )
    }
}

function pdf_val_num_new (val) {

    return {
        "type": "pdf_val_num",
        "val": 1*val
    }
}

function pdf_val_str_txt_new (val) {

    return {
        "type": "pdf_val_str_txt",
        "val": val
    }
}

function pdf_val_str_hex_new (val) {

    return {
        "type": "pdf_val_hex_hex",
        "val": val
    }
}


function pdf_val_name_new (val) {

    return {
        "type": "pdf_val_name",
        "val": val.substr(1);
    }
}
