# Ascii 85 encoding

Conversion:

    B1B2B3B4 <-> C1C2C3C4C5

Basic formula:

    ( b1 × 256^3) + ( b2 × 256^2 ) + ( b3 × 256 ) + b4 = ( c1 × 85^4 ) + ( c2 × 85^3 ) + ( c3 × 85^2 ) + ( c4 × 85 ) + c5

Bin to char:
    
    Divide by 85.
    Keep the remainded PLUS 33 as C5.
    With the result of the division, repeat to get C4, and so on.

    Special case: FOUR 0 -> 0000 => output z instead of !!!!
    
    Special case: last tuple is less than 4 bytes. Complete with 0.
    Write only firs n+1 chars, complete with ~>
    
    Ie: B1 -> C1C2 ~>           LEN 4
    Ie: B1B2 -> C1C2C3 ~>       LEN 5
    Ie: B1B2B3 -> C1C2C3C4 ~>   LEN 6