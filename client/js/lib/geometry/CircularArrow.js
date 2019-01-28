import numeric from 'numeric';

export function make_circular_arrow(a, b, c, id_mesh) {

    let circular_arrow =  { vertices : new Float32Array(110*3*4),
                            elements: new Uint32Array(216*3*4),
                            labels : new Int32Array(110*4),
                            n_vertices : 110*4,
                            n_elements: 216*4};

            const verts = get_vertices();
            let rot_x90 = make_x_rotation_matrix(Math.PI/2.0);
            for (let i = 0; i < 4; i++) {
                let rot_z90 = make_z_rotation_matrix(i/4.0*Math.PI*2);
                for (let j = 0; j < 110; j++) {
                    let v = [verts[j*3 + 0], verts[j*3 + 1], verts[j*3 + 2] + b];
                    v = numeric.dot(rot_z90, v);
                    v = numeric.dot(rot_x90, v)
                    circular_arrow.vertices[i*110*3 + j*3 + 0] = v[0]*0.8;
                    circular_arrow.vertices[i*110*3 + j*3 + 1] = v[1]*0.6;
                    circular_arrow.vertices[i*110*3 + j*3 + 2] = v[2]*0.8;
                }
            }

            const elems = get_elements();
            for (let i = 0; i < 4; i++) {
                for (let j = 0; j < 216; j++) {
                    circular_arrow.elements[i*216*3 + j*3 + 0] = elems[j*3 + 0] + i*110;
                    circular_arrow.elements[i*216*3 + j*3 + 1] = elems[j*3 + 1] + i*110;
                    circular_arrow.elements[i*216*3 + j*3 + 2] = elems[j*3 + 2] + i*110;
                }
            }


            for (let i = 0; i < 4; i++)
                for (let j = 0; j < 110; j++)
                    circular_arrow.labels[i*110 + j] = (id_mesh & 0x000000FF) | (i << 8);

            return circular_arrow;
}

function make_z_rotation_matrix(angle) {
    return [[Math.cos(angle), -Math.sin(angle), 0], [Math.sin(angle), Math.cos(angle), 0], [0, 0, 1]];
}

function make_x_rotation_matrix(angle) {
    return [[1, 0, 0] , [0, Math.cos(angle), -Math.sin(angle)], [0, Math.sin(angle), Math.cos(angle)]];
}



function get_vertices() {
    return     [0.5370,    0.5370,         0,
                0.5599,    0.5130,         0,
                0.5599,    0.5130,    0.0612,
                0.5370,    0.5370,    0.0612,
                0.5130,    0.5599,         0,
                0.5130,    0.5599,    0.0612,
                0.4881,    0.5817,    0.0612,
                0.7587,    0.0331,         0,
                0.7594,         0,         0,
                0.7594,         0,    0.0612,
                0.7587,    0.0331,    0.0612,
                0.4881,    0.5817,         0,
                0.4623,    0.6025,         0,
                0.7565,    0.0662,         0,
                0.7565,    0.0662,    0.0612,
                0.4623,    0.6025,    0.0612,
                0.4356,    0.6220,         0,
                0.7529,    0.0991,         0,
                0.7529,    0.0991,    0.0612,
                0.4356,    0.6220,    0.0612,
                0.4080,    0.6405,         0,
                0.4080,    0.6405,    0.0612,
                0.7478,    0.1319,         0,
                0.7478,    0.1319,    0.0612,
                0.7414,    0.1644,    0.0612,
                0.3797,    0.6576,         0,
                0.3797,    0.6576,    0.0612,
                0.7414,    0.1644,         0,
                0.7335,    0.1965,         0,
                0.7335,    0.1965,    0.0612,
                0.7242,    0.2284,         0,
                0.7242,    0.2284,    0.0612,
                0.7136,    0.2597,         0,
                0.7136,    0.2597,    0.0612,
                0.7016,    0.2906,    0.0612,
                0.7016,    0.2906,         0,
                0.6882,    0.3209,         0,
                0.6882,    0.3209,    0.0612,
                0.6736,    0.3506,    0.0612,
                0.6736,    0.3506,         0,
                0.6576,    0.3797,         0,
                0.6576,    0.3797,    0.0612,
                0.6405,    0.4080,         0,
                0.6405,    0.4080,    0.0612,
                0.6220,    0.4356,         0,
                0.6220,    0.4356,    0.0612,
                0.6025,    0.4623,         0,
                0.6025,    0.4623,    0.0612,
                0.5817,    0.4881,         0,
                0.5817,    0.4881,    0.0612,
                0.3169,    0.4850,         0,
                0.3169,    0.4850,    0.0612,
                     0,    0.8574,    0.0612,
                     0,    0.8574,         0,
                0.5405,    1.0000,         0,
                0.5405,    1.0000,    0.0612,
                0.4777,    0.8274,    0.0612,
                0.4777,    0.8274,         0,
                0.6890,    0.6618,    0.0612,
                0.7151,    0.6335,    0.0612,
                0.7151,    0.6335,         0,
                0.6890,    0.6618,         0,
                0.6618,    0.6890,    0.0612,
                0.6618,    0.6890,         0,
                0.9554,         0,    0.0612,
                0.9554,         0,         0,
                0.9546,    0.0385,         0,
                0.9546,    0.0385,    0.0612,
                0.6335,    0.7151,         0,
                0.6335,    0.7151,    0.0612,
                0.6042,    0.7400,    0.0612,
                0.9523,    0.0769,    0.0612,
                0.9523,    0.0769,         0,
                0.6042,    0.7400,         0,
                0.5739,    0.7637,    0.0612,
                0.9484,    0.1152,    0.0612,
                0.9484,    0.1152,         0,
                0.5739,    0.7637,         0,
                0.5427,    0.7862,    0.0612,
                0.5427,    0.7862,         0,
                0.5106,    0.8075,    0.0612,
                0.9430,    0.1532,    0.0612,
                0.9430,    0.1532,         0,
                0.5106,    0.8075,         0,
                0.9360,    0.1911,    0.0612,
                0.9360,    0.1911,         0,
                0.9276,    0.2286,    0.0612,
                0.9176,    0.2658,    0.0612,
                0.9276,    0.2286,         0,
                0.9176,    0.2658,         0,
                0.9062,    0.3025,    0.0612,
                0.9062,    0.3025,         0,
                0.8933,    0.3388,    0.0612,
                0.8789,    0.3745,    0.0612,
                0.8933,    0.3388,         0,
                0.8631,    0.4096,    0.0612,
                0.8789,    0.3745,         0,
                0.8631,    0.4096,         0,
                0.8459,    0.4440,         0,
                0.8459,    0.4440,    0.0612,
                0.8274,    0.4777,    0.0612,
                0.8274,    0.4777,         0,
                0.8075,    0.5106,    0.0612,
                0.8075,    0.5106,         0,
                0.7862,    0.5427,    0.0612,
                0.7862,    0.5427,         0,
                0.7637,    0.5739,         0,
                0.7637,    0.5739,    0.0612,
                0.7400,    0.6042,    0.0612,
                0.7400,    0.6042,         0];
}

function get_elements() {
    return [     0,     1,     2,
     0,     2,     3,
     4,     0,     3,
     4,     3,     5,
     4,     5,     6,
     7,     8,     9,
     7,     9,    10,
    11,     4,     6,
    12,    11,     6,
    13,    10,    14,
    12,     6,    15,
    13,     7,    10,
    16,    12,    15,
    17,    14,    18,
    16,    15,    19,
    17,    13,    14,
    20,    16,    19,
    20,    19,    21,
    22,    18,    23,
    22,    23,    24,
    25,    21,    26,
    22,    17,    18,
    25,    20,    21,
    27,    22,    24,
    28,    24,    29,
    28,    27,    24,
    30,    29,    31,
    30,    28,    29,
    32,    31,    33,
    32,    33,    34,
    32,    30,    31,
    35,    32,    34,
    36,    34,    37,
    36,    37,    38,
    36,    35,    34,
    39,    36,    38,
    40,    39,    38,
    40,    38,    41,
    42,    40,    41,
    42,    41,    43,
    44,    42,    43,
    44,    43,    45,
    46,    44,    45,
    46,    45,    47,
    48,    46,    47,
    48,    47,    49,
     1,    48,    49,
     1,    49,     2,
    50,    25,    26,
    50,    26,    51,
    52,    50,    51,
    53,    50,    52,
    54,    53,    52,
    54,    52,    55,
    56,    57,    54,
    55,    56,    54,
    58,    59,    60,
    58,    60,    61,
    62,    58,    61,
    62,    61,    63,
    64,    65,    66,
    67,    64,    66,
    62,    63,    68,
    69,    62,    68,
    70,    69,    68,
    71,    67,    72,
    67,    66,    72,
    70,    68,    73,
    74,    70,    73,
    75,    71,    76,
    74,    73,    77,
    78,    74,    77,
    71,    72,    76,
    78,    77,    79,
    80,    78,    79,
    81,    75,    82,
    75,    76,    82,
    56,    80,    83,
    80,    79,    83,
    56,    83,    57,
    84,    81,    85,
    86,    84,    85,
    81,    82,    85,
    87,    86,    88,
    86,    85,    88,
    87,    88,    89,
    90,    87,    91,
    92,    90,    91,
    87,    89,    91,
    93,    92,    94,
    92,    91,    94,
    95,    93,    96,
    93,    94,    96,
    95,    96,    97,
    95,    97,    98,
    99,    95,    98,
   100,    99,    98,
   100,    98,   101,
   102,   100,   101,
   102,   101,   103,
   104,   102,   103,
   104,   103,   105,
   104,   105,   106,
   107,   104,   106,
   108,   107,   106,
   108,   106,   109,
    59,   108,   109,
    59,   109,    60,
     9,     8,    65,
    64,     9,    65,
    44,   105,    42,
    44,   106,   105,
    46,   106,    44,
   109,   106,    46,
    48,   109,    46,
    60,   109,    48,
     8,    66,    65,
     1,    60,    48,
    61,    60,     1,
     0,    61,     1,
     7,    72,    66,
    63,    61,     0,
     7,    66,     8,
     4,    63,     0,
    68,    63,     4,
    13,    76,    72,
    11,    68,     4,
    13,    72,     7,
    73,    68,    11,
    17,    82,    76,
    12,    73,    11,
    17,    76,    13,
    22,    85,    82,
    22,    82,    17,
    27,    88,    85,
    27,    85,    22,
    77,    12,    16,
    77,    73,    12,
    28,    89,    88,
    79,    16,    20,
    79,    77,    16,
    28,    88,    27,
    83,    20,    25,
    83,    79,    20,
    30,    91,    89,
    57,    83,    25,
    30,    89,    28,
    32,    94,    91,
    53,    25,    50,
    32,    91,    30,
    53,    54,    57,
    53,    57,    25,
    35,    96,    94,
    35,    94,    32,
    36,    97,    96,
    36,    96,    35,
    39,    98,    97,
    39,    97,    36,
    40,   101,    98,
    40,   103,   101,
    40,    98,    39,
    42,   103,    40,
    42,   105,   103,
    43,   104,    45,
   104,   107,    45,
    45,   107,    47,
    47,   107,   108,
    47,   108,    49,
    49,   108,    59,
    64,    67,     9,
    49,    59,     2,
     2,    59,    58,
     2,    58,     3,
    67,    71,    10,
     3,    58,    62,
     9,    67,    10,
     3,    62,     5,
     5,    62,    69,
    71,    75,    14,
     5,    69,     6,
    10,    71,    14,
     6,    69,    70,
    75,    81,    18,
     6,    70,    15,
    14,    75,    18,
    81,    84,    23,
    18,    81,    23,
    84,    86,    24,
    23,    84,    24,
    19,    15,    74,
    15,    70,    74,
    86,    87,    29,
    21,    19,    78,
    19,    74,    78,
    24,    86,    29,
    26,    21,    80,
    21,    78,    80,
    87,    90,    31,
    26,    80,    56,
    29,    87,    31,
    90,    92,    33,
    51,    26,    52,
    31,    90,    33,
    56,    55,    52,
    26,    56,    52,
    92,    93,    34,
    33,    92,    34,
    93,    95,    37,
    34,    93,    37,
    95,    99,    38,
    37,    95,    38,
    99,   100,    41,
   100,   102,    41,
    38,    99,    41,
    41,   102,    43,
   102,   104,    43];
}
