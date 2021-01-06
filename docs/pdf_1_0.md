# Pdf format 1.0 Notes

## General File Info

* A pdf is a 7-bit ASCII encoded file

## Low Level File Structure

A pdf encode information into values. Those values can be:

### Basic values
* Null values: just the word `null`
* Bool values: just the textual words: `true` or `false`
* Num values: a number like: `-1`, `123` or `123.456`
* Str textual values: A string enclosed in (), i.e: `(Hi)`
* Str hexa encode values: A <> enclosed secuence of hexa vals, i.e:
  `<a>` `<A192F>` .
* Name values: / plus text ( atomic value / constant ), i.e: `/name1`

### Complex values:

* Array: enclosed by [], space separated. Like: `[ (txt) 1 null true ]`
  or `[ [ (subArr) 1 [] ] true ]`

* Dict: enclosed by << >>, keys are name values, val can be anything. Like:
  `<< /key1 1 key2 true >>`
   or `<< /key1 1 key2 << /key21 1 key22 true >> /key3 [ 1 2 3 ] >>`

* Streams: a dictionary (with specific keys) + textual word *stream* +
    some characters + textual word *endstream*  

#### Stream details

Keys in a stream

|  Key          | Meaning                                               |
|---------------|-------------------------------------------------------|
|  /Length      | num of bytes (chars) between *stream* and *endstream* |
|  /Filter      | filter name or list of filters names                  |
|  /DecodeParms | direct value of filter params or list of those        |

A decode param can be null if that filter has no param

If no param is required, entry can be omited

*Possible Filters*

* ASCIIHexDecode: (no params) write hexa val of each byte 00 to FF.
* ASCII85Decode: (no params) 5 ASCII = 4 bytes.