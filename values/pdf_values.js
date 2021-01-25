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
e   den    Dict Entry           val:    k = key name       v = key value
S   stm    Stream               val:    i = Info in dic    d = raw Data in stream
O   obj    Obj                  val:    i = obj Id         d = obj Data (value)
R   Ref    obj Ref              val:    n = obj Num        g = obj Gen num
* */
export function pdf_val_null_new () {
    return {
        "t": "N",
        "v": null
    }
}

export function pdf_val_bool_new (v) {

    return {
        "t": "B",
        "v": ( typeof v === 'string' ? v === "true" : v )
    }
}

export function pdf_val_num_new (v) {

    return {
        "t": "U",
        "v": 1*v
    }
}

export function pdf_val_str_txt_new (v) {

    return {
        "t": "T",
        "v": v
    }
}

export function pdf_val_str_hex_new (v) {

    return {
        "t": "H",
        "v": v
    }
}


export function pdf_val_name_new (v) {

    return {
        "t": "M",
        "v": v.substr(1)
    }
}


export function pdf_val_arr_new (v) {

    return {
        "t": "A",
        "v": v
    }
}

export function pdf_val_dic_entry_new (k, v) {

    return {
        "t": "e",
        "v": {  "k": k,
                "v": v
             }
    }
}

export function pdf_val_stream_new (i, d) {

    return {
        "t": "S",
        "v": { "i": i,
               "d": d
        }
    }
}

export function pdf_val_obj_new (i, d) {

    return {
        "t": "O",
        "v": { "i": i,
               "d": d
        }
    }
}