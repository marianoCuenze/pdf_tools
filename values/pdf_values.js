/*
* Types of values:
N   nul    Null
B   bol    Boll
U   num    num (Digits)
T   txt    Txt text
H   hex    Hexa text
M   nam    naMe
A   arr    Array
D   dic    Dict
e   den    Dict Entry           <<aux type
S   stm    Stream               val:    i = Info in dic    d = raw Data in stream
O   obj    Obj                  val:    i = obj Id         d = obj Data (value)
R   Ref    obj Ref              val:    n = obj Num        g = obj Gen num
* */
export function pdf_val_null_new () {
    return {
        "type": "pdf_val_null",
        "val": null
    }
}

export function pdf_val_bool_new (val) {

    return {
        "type": "pdf_val_bool",
        "val": ( typeof val === 'string' ? val === "true" : val )
    }
}

export function pdf_val_num_new (val) {

    return {
        "type": "pdf_val_num",
        "val": 1*val
    }
}

export function pdf_val_str_txt_new (val) {

    return {
        "type": "pdf_val_str_txt",
        "val": val
    }
}

export function pdf_val_str_hex_new (val) {

    return {
        "type": "pdf_val_hex_hex",
        "val": val
    }
}


export function pdf_val_name_new (val) {

    return {
        "type": "pdf_val_name",
        "val": val.substr(1)
    }
}
